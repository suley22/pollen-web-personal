"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useEmployerById,
  useCreateEmployer,
  useUpdateEmployer,
} from "../../_services/employers-page-service";
import { processImageFromFormData } from "@/services/storageService";
import { getLoggedInUserId } from "@/services/userService";
import { AdminRoutes } from "@/admin/router";

export function useEmployersPage({ id = null }) {
  const router = useRouter();
  const formRef = useRef(null);

  const [logoUrl, setLogoUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Query para obtener employer (solo si hay id - modo edición)
  const { data: employer, isLoading } = useEmployerById(id || "");

  // Mutation para crear
  const createMutation = useCreateEmployer();

  // Mutation para actualizar
  const updateMutation = useUpdateEmployer();

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
        await updateMutation.mutateAsync({ id, formData });
      } else {
        await createMutation.mutateAsync({ formData });
      }

      // Redirect to employers list after success
      router.push(AdminRoutes.employers);
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
