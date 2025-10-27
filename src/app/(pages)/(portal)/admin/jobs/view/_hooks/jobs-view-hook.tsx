import { useJobById } from "@/jobs/_services/jobs-page-service";
import { useState } from "react";

export function useJobView(id: string) {
  const [activeTab, setActiveTab] = useState("description");
  const { data: job, isLoading, error } = useJobById(id);

  return {
    job,
    isLoading,
    error: error?.message || null,
    activeTab,
    setActiveTab,
  };
}
