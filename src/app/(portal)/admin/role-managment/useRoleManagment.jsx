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

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: null,
    userName: "",
    currentRole: "",
    newRole: ""
  });

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

  function onHandleRoleChange(userId, newRole) {
    const user = profiles.find(profile => profile.id === userId);
    if (!user) return;

    if (user.role === newRole) return;

    setConfirmDialog({
      isOpen: true,
      userId: userId,
      userName: `${user.first_name} ${user.last_name}`,
      currentRole: user.role,
      newRole: newRole
    });
  }

  async function confirmRoleChange() {
    const { userId, newRole } = confirmDialog;

    try {
      const result = await updateUserRole(userId, newRole);

      if (result.success) {
        // Actualizar el estado local inmediatamente para reflejar el cambio en la UI
        setProfiles(prevProfiles =>
          prevProfiles.map(profile =>
            profile.id === userId
              ? { ...profile, role: newRole }
              : profile
          )
        );
      } else {
        console.error("❌ Error actualizando rol:", result.message);
        setError(result.message || "Error actualizando el rol del usuario");
      }
    } catch (error) {
      console.error("💥 Error inesperado:", error);
      setError("Error inesperado al actualizar el rol del usuario");
    }
  }

  function closeConfirmDialog() {
    setConfirmDialog({
      isOpen: false,
      userId: null,
      userName: "",
      currentRole: "",
      newRole: ""
    });
  }

  return {
    form: {
      selectedStatus: selectedStatus,
      searchTerm: searchTerm,
      profiles: profiles,
      loading: loading,
      error: error,
      confirmDialog: confirmDialog,
      setSearchTerm: setSearchTerm,
      loadApplications: loadUsers,
      onHandleRoleChange: onHandleRoleChange,
      confirmRoleChange: confirmRoleChange,
      closeConfirmDialog: closeConfirmDialog,
    },
  };
}
