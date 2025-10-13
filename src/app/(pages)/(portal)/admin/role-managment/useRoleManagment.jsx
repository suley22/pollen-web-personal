import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  getUsers as getUsers,
  updateUserRole,
} from "@/app/(pages)/(portal)/admin/role-managment/actions";

export function useRoleManagment() {
  const [selectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadingRef = useRef(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: null,
    userName: "",
    currentRole: "",
    newRole: "",
  });

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadUsers = useCallback(async () => {
    // Evitar llamadas duplicadas
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await getUsers({
        status: selectedStatus,
        searchTerm: debouncedSearchTerm.trim(),
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
      loadingRef.current = false;
    }
  }, [selectedStatus, debouncedSearchTerm]);

  // Load users when loadUsers function changes
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onHandleRoleChange = useCallback(
    (userId, newRole) => {
      const user = profiles.find((profile) => profile.id === userId);
      if (!user) return;

      if (user.role === newRole) return;

      setConfirmDialog({
        isOpen: true,
        userId: userId,
        userName: `${user.first_name} ${user.last_name}`,
        currentRole: user.role,
        newRole: newRole,
      });
    },
    [profiles],
  );

  const confirmRoleChange = useCallback(async () => {
    const { userId, newRole } = confirmDialog;

    try {
      const result = await updateUserRole(userId, newRole);

      if (result.success) {
        // Actualizar el estado local inmediatamente para reflejar el cambio en la UI
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) =>
            profile.id === userId ? { ...profile, role: newRole } : profile,
          ),
        );
      } else {
        console.error("❌ Error actualizando rol:", result.message);
        setError(result.message || "Error updating user role");
      }
    } catch (error) {
      console.error("💥 Error inesperado:", error);
      setError("Unexpected error updating user role");
    }
  }, [confirmDialog]);

  const closeConfirmDialog = useCallback(() => {
    setConfirmDialog({
      isOpen: false,
      userId: null,
      userName: "",
      currentRole: "",
      newRole: "",
    });
  }, []);

  return useMemo(
    () => ({
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
    }),
    [
      selectedStatus,
      searchTerm,
      profiles,
      loading,
      error,
      confirmDialog,
      loadUsers,
      onHandleRoleChange,
      confirmRoleChange,
      closeConfirmDialog,
    ],
  );
}
