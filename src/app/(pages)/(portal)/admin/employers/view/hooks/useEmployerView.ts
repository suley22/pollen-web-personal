import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminRoutes } from "@/admin/router";
import { EmployerProfile } from "@/types/employer-profile";
import { fetchJobsByEmployer } from "@/employers/actions";

export function useEmployerView(profile: EmployerProfile | null) {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      if (profile?.id) {
        setIsLoadingJobs(true);
        try {
          const result = await fetchJobsByEmployer(profile.id);
          setJobs(result.error ? [] : result.data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setJobs([]);
        } finally {
          setIsLoadingJobs(false);
        }
      } else {
        setIsLoadingJobs(false);
      }
    };

    loadJobs();
  }, [profile?.id]);

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
    jobs,
    isLoadingJobs,
    setJobs,
    setIsLoadingJobs,
    handleEdit,
    handleSetLive,
    handleHideProfile,
    handleDelete,
  };
}
