import { useState, useEffect } from "react";
import { getEmployerProfile } from "@/app/(portal)/admin/employers-managment/actions";

export function useEmployerManagement() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadApplications();
  }, [selectedStatus]);

  // Usar debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== "") {
        loadApplications();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Cargar todas las aplicaciones cuando se borre la búsqueda
  useEffect(() => {
    if (searchTerm === "") {
      loadApplications();
    }
  }, [searchTerm]);

  async function loadApplications() {
    setLoading(true);
    setError(null);

    try {
      const result = await getEmployerProfile({
        status: selectedStatus,
        searchTerm: searchTerm.trim(),
      });

      const employersResult = result.data.map((employer) => ({
        ...employer,
        company_name: employer.company_name || "Unknown Company",
        approval_status: employer.approval_status || "pending",
        logo: employer.logo_url,
        industries: employer.industries || "Not specified",
        contact_email: employer.contact_email || "No email provided",
        contact_phone: employer.contact_phone || "No phone provided",
        live_jobs_count: 10,
        draft_jobs_count: 5,
        profileCompleteness: 45,
        lastUpdated: employer.updated_at || "N/A",
        location: employer.company_location || "Location not specified",
        size: employer.company_size || "Size not specified",
      }));

      if (result.success) {
        setEmployers(employersResult);
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
    }
  }

  const addButtonOnClick = () => {
    console.log("Funciona");
  };

  // Función para obtener el badge según el status
  const getStatusBadge = (status) => {
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
  };

  return {
    form: {
      selectedStatus: selectedStatus,
      searchTerm: searchTerm,
      employers: employers,
      loading: loading,
      error: error,
      setSelectedStatus: setSelectedStatus,
      setSearchTerm: setSearchTerm,
      loadApplications: loadApplications,
      addButtonOnClick: addButtonOnClick,
      getStatusBadge: getStatusBadge,
    },
  };
}
