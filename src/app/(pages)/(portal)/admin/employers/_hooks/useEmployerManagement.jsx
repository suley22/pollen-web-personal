"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getEmployerProfile } from "@/admin/employers/actions";

export function useEmployerManagement() {
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

      const result = await getEmployerProfile({
        status: statusToUse,
        searchTerm: debouncedSearchTerm.trim(),
      });

      const employersResult = result.data.map((employer) => ({
        ...employer,
        company_name: employer.company_name || "Unknown Company",
        approval_status: employer.approval_status || "pending",
        logo: employer.logo_url,
        industries: employer.industries.length
          ? employer.industries.join(", ")
          : "Not specified",
        contact_email: employer.contact_email || "No email provided",
        contact_phone: employer.contact_phone || "No phone provided",
        live_jobs_count: 10,
        draft_jobs_count: 5,
        profileCompleteness: 45,
        lastUpdated: employer.updated_at || "N/A",
        location: employer.company_location || "Location not specified",
        size: employer.company_size || "Size not specified",
        contact_name: employer.contact_name || "No contact name provided",
      }));

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

  // Función para obtener el badge según el status
  const getStatusBadge = useCallback((status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return null;
    }
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
      getStatusBadge: getStatusBadge,
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
      getStatusBadge,
    ],
  );
}
