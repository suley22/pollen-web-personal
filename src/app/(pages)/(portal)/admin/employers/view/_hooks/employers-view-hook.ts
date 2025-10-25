import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminRoutes } from "@/admin/router";
import {
  fetchEmployerById,
  fetchJobsByEmployer,
} from "@/employers/_services/employers-service";

export function useEmployerView(id = null) {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (id) {
        setIsLoadingJobs(true);
        try {
          const result = await fetchEmployerById(id);
          setProfile(result.error ? [] : result.data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setProfile([]);
        } finally {
          setIsLoadingJobs(false);
        }
      } else {
        setIsLoadingJobs(false);
      }
    };

    loadProfile();
  }, [id]);

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
