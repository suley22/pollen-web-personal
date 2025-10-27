import { useJobById } from "@/jobs/_services/jobs-page-service";
import { useState } from "react";

export function useEmployerView(id) {
  const [activeTab, setActiveTab] = useState("description");
  const { data: job, isLoading, error } = useJobById(id);

  return {
    activeTab,
    setActiveTab,
    job,
    isLoading,
    error: error?.message || null,
  };
}
