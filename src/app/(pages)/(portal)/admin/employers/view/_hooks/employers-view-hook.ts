import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminRoutes } from "@/admin/router";

import { fetchEmployerById } from "@/employers/_services/employers-service";

export function useEmployerView(id = null) {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const result = await fetchEmployerById(id);
          setProfile(result.error ? [] : result.data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setProfile([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProfile();
  }, [id]);

  const handleEdit = () => {
    router.push(AdminRoutes.employersEdit(profile.id));
  };

  const handleSetLive = () => {
    // TODO: Implement set live functionality
    console.log("Setting profile live");
  };

  const handleHideProfile = () => {
    // TODO: Implement hide profile functionality
    console.log("Hiding profile");
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Deleting profile");
  };

  return {
    profile,
    isLoading,
    handleEdit,
    handleSetLive,
    handleHideProfile,
    handleDelete,
  };
}
