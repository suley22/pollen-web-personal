import { useJobById } from "@/jobs/_services/jobs-page-service";
import { useState } from "react";

export function useJobViewHook(id: string) {
  const [activeTab, setActiveTab] = useState("description");

  const { data, isLoading, error } = useJobById(id);

  return {
    job: data,
    isLoading,
    error: error?.message || null,
    activeTab,
    setActiveTab,
  };
}
