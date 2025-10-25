import { useEffect, useState } from "react";
import { useEmployer } from "../../_hooks/use-employers-query";

export function useEmployerView(id: string) {
  const { data: profile, isLoading, error } = useEmployer(id);

  return {
    profile,
    isLoading,
    error: error?.message || null,
  };
}
