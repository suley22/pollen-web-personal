"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { fetchEmployers, fetchEmployerById } from "../_services/employersService";

export function useEmployers() {
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
  const loadingRef = useRef(false);

  // Debounce search term y resetear filtros cuando se busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Si hay término de búsqueda, resetear el filtro de status
      if (searchTerm.trim()) {
        setSelectedStatus("all");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadApplications = useCallback(async () => {
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

      const result = await fetchEmployers({
        status: statusToUse,
        searchTerm: debouncedSearchTerm.trim(),
      });

      const employersResult = result.data || [];

      if (result.success) {
        setEmployers(employersResult);

        // Si no hay filtros activos, guardar todos los empleadores y calcular estadísticas
        if (selectedStatus === "all" && !debouncedSearchTerm.trim()) {
          setAllEmployers(employersResult);
          const stats = {
            total: employersResult.length,
            approved: employersResult.filter(
              (e) => e.approval_status === "approved",
            ).length,
            pending: employersResult.filter(
              (e) => e.approval_status === "pending",
            ).length,
            rejected: employersResult.filter(
              (e) => e.approval_status === "rejected",
            ).length,
          };
          setStatistics(stats);
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
  }, [selectedStatus, debouncedSearchTerm]);

  // Load employers when loadApplications function changes
  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const addButtonOnClick = useCallback(() => {
    console.log("Funciona");
  }, []);

  // Función personalizada para cambiar el status y limpiar el buscador
  const handleStatusChange = useCallback((status) => {
    setSelectedStatus(status);
    setSearchTerm("");
    setDebouncedSearchTerm("");
  }, []);

  

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
      setSelectedStatus: handleStatusChange,
      setSearchTerm: setSearchTerm,
      loadApplications: loadApplications,
      addButtonOnClick: addButtonOnClick,
      getEmployerById: getEmployerById,
    }),
    [
      selectedStatus,
      searchTerm,
      employers,
      allEmployers,
      statistics,
      loading,
      error,
      handleStatusChange,
      loadApplications,
      addButtonOnClick,
      getEmployerById
    ],
  );
}
