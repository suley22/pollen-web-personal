import { useState, useEffect } from "react";
import {
  getUsers as getUsers,
  updateUserRole,
} from "@/app/(portal)/admin/role-managment/actions";

export function useRoleManagment() {
  const [selectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [selectedStatus]);

  // Usar debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== "") {
        loadUsers();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Cargar todas las aplicaciones cuando se borre la búsqueda
  useEffect(() => {
    if (searchTerm === "") {
      loadUsers();
    }
  }, [searchTerm]);

  async function loadUsers() {
    setLoading(true);
    setError(null);

    try {
      const result = await getUsers({
        status: selectedStatus,
        searchTerm: searchTerm.trim(),
      });

      if (result.success) {
        setProfiles(result.data || []);
        setError(null);
      } else {
        //console.error("❌ Error from server:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("💥 Exception caught:", err);
      setError("Failed to load employers: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function onHandleRoleChange(userId, role) {
    updateUserRole(userId, role);
    loadUsers();
  }

  return {
    form: {
      selectedStatus: selectedStatus,
      searchTerm: searchTerm,
      profiles: profiles,
      loading: loading,
      error: error,
      setSearchTerm: setSearchTerm,
      loadApplications: loadUsers,
      onHandleRoleChange: onHandleRoleChange,
    },
  };
}
