"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  fetchEmployerById,
  createEmployer,
  updateEmployer,
} from "../_services/employer-create-service";
import { processImageFromFormData } from "@/services/storageService";
import { getLoggedInUserId } from "@/services/userService";
import { EMPLOYERS_QUERY_KEYS as QueryKeys } from "@/employers/_queries/employers-query-keys";
import { AdminRoutes } from "@/admin/router";

export function useEmployersPage({ id = null }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formRef = useRef(null);

  const [logoUrl, setLogoUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Query para obtener employer (solo si hay id - modo edición)
  const { data: employer, isLoading } = useQuery({
    queryKey: QueryKeys.profile(id || ""),
    queryFn: () => fetchEmployerById(id || ""),
    enabled: !!id,
  });

  // Mutation para crear
  const createMutation = useMutation({
    mutationFn: ({
      formData,
      userId,
    }: {
      formData: FormData;
      userId: string;
    }) => createEmployer(formData, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.all });
      router.push(AdminRoutes.employers);
    },
  });

  // Mutation para actualizar
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
      userId,
    }: {
      id: string;
      formData: FormData;
      userId: string;
    }) => updateEmployer(id, formData, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.all });
      router.push(AdminRoutes.employers);
    },
  });

  // Update logoUrl when employer data loads
  useEffect(() => {
    if (employer?.logo_url) {
      setLogoUrl(employer.logo_url);
    }
  }, [employer]);

  const handleBack = () => {
    router.back();
  };

  const saveEmployer = async () => {
    try {
      const formData = new FormData(formRef.current);

      // Procesar y subir la imagen si es necesario
      const logoUrl = await processImageFromFormData(
        formData,
        "logo_url",
        "logo_url_file",
        "images",
        "employer_logo",
      );
      formData.set("logo_url", logoUrl);

      const userId = await getLoggedInUserId();

      if (!userId) {
        throw new Error("User not authenticated");
      }

      if (id) {
        await updateMutation.mutateAsync({ id, formData, userId });
      } else {
        await createMutation.mutateAsync({ formData, userId });
      }
    } catch (error) {
      console.error("Error saving employer:", error);
      throw error;
    }
  };

  return {
    formRef,
    employer,
    isLoadingProfile:
      isLoading || createMutation.isPending || updateMutation.isPending,
    logoUrl,
    setLogoUrl,
    isDialogOpen,
    setIsDialogOpen,
    handleBack,
    handleSubmit: saveEmployer,
  };
}
