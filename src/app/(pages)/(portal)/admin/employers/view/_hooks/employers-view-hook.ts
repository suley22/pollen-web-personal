import { useQuery } from "@tanstack/react-query";
import { fetchEmployerById } from "../_services/employers-view-service";

export function useEmployerView(id: string) {
  const getEmployerProfileKey = ["employer", id];

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: getEmployerProfileKey,
    queryFn: () => fetchEmployerById(id),
    enabled: !!id,
  });

  const handleSetLive = () => {
    //status: live
    console.log("Set live functionality - TODO");
  };

  const handleHideProfile = () => {
    //status: pending
    console.log("Hide profile functionality - TODO");
  };

  const handleDelete = () => {
    //status: deleted_at = now()
    console.log("Delete functionality - TODO");
  };

  return {
    profile,
    isLoading,
    error: error?.message || null,
    handleSetLive,
    handleHideProfile,
    handleDelete,
  };
}
