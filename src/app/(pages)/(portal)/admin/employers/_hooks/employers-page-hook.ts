"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  fetchEmployers,
  fetchEmployerById,
  fetchEmployerStatistics,
  EmployerPaginationInfo,
} from "../_services/employers-service";

export function useEmployersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [employers, setEmployers] = useState([]);
  const [allEmployers, setAllEmployers] = useState([]);

  const [statistics, setStatistics] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState<EmployerPaginationInfo | null>(
    null,
  );
  const loadingRef = useRef(false);

  // Debounce search term y resetear filtros cuando se busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Si hay término de búsqueda, resetear el filtro de status y pagination
      if (searchTerm.trim()) {
        setSelectedStatus("all");
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadEmployers = useCallback(
    async (resetPage = false) => {
      // Evitar llamadas duplicadas
      if (loadingRef.current) {
        return;
      }

      loadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        // Si hay búsqueda activa, ignorar el filtro de status y buscar en todos
        const statusToUse = debouncedSearchTerm.trim() ? "all" : selectedStatus;
        const pageToUse = resetPage ? 1 : currentPage;

        if (resetPage) {
          setCurrentPage(1);
        }

        const result = await fetchEmployers({
          status: statusToUse,
          searchTerm: debouncedSearchTerm.trim(),
          page: pageToUse,
          pageSize: pageSize,
        });

        const employersResult = result.data || [];

        if (result.success) {
          setEmployers(employersResult);
          setPagination(result.pagination || null);

          // Para estadísticas, hacemos una consulta separada cuando no hay filtros
          if (
            selectedStatus === "all" &&
            !debouncedSearchTerm.trim() &&
            pageToUse === 1
          ) {
            const statsResult = await fetchEmployerStatistics();
            if (statsResult.success && statsResult.data) {
              setStatistics(statsResult.data);
            }
          }
          setError(null);
        } else {
          console.error("❌ Error from server:", result.error);
          setError(result.error);
        }
      } catch (err) {
        console.error("💥 Exception caught:", err);
        setError("Failed to load employers: " + err.message);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    },
    [selectedStatus, debouncedSearchTerm, currentPage, pageSize],
  );

  // Load employers when loadApplications function changes
  useEffect(() => {
    loadEmployers();
  }, [loadEmployers]);

  const addButtonOnClick = useCallback(() => {
    console.log("Funciona");
  }, []);

  // Función personalizada para cambiar el status y limpiar el buscador
  const handleStatusChange = useCallback((status) => {
    setSelectedStatus(status);
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setCurrentPage(1); // Reset to first page when changing status
  }, []);

  // Pagination functions
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  }, []);

  const goToNextPage = useCallback(() => {
    if (pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [pagination?.hasNextPage]);

  const goToPreviousPage = useCallback(() => {
    if (pagination?.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [pagination?.hasPreviousPage]);

  const getEmployerById = useCallback(async (id) => {
    return await fetchEmployerById(id);
  }, []);

  return useMemo(
    () => ({
      selectedStatus: selectedStatus,
      searchTerm: searchTerm,
      employers: employers,
      allEmployers: allEmployers,
      statistics: statistics,
      loading: loading,
      error: error,
      pagination: pagination,
      currentPage: currentPage,
      pageSize: pageSize,
      setSelectedStatus: handleStatusChange,
      setSearchTerm: setSearchTerm,
      loadApplications: loadEmployers,
      addButtonOnClick: addButtonOnClick,
      getEmployerById: getEmployerById,
      handlePageChange: handlePageChange,
      handlePageSizeChange: handlePageSizeChange,
      goToNextPage: goToNextPage,
      goToPreviousPage: goToPreviousPage,
    }),
    [
      selectedStatus,
      searchTerm,
      employers,
      allEmployers,
      statistics,
      loading,
      error,
      pagination,
      currentPage,
      pageSize,
      handleStatusChange,
      loadEmployers,
      addButtonOnClick,
      getEmployerById,
      handlePageChange,
      handlePageSizeChange,
      goToNextPage,
      goToPreviousPage,
    ],
  );
}
