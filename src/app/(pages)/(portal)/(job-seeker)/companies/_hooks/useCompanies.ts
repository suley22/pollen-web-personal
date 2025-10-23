import { useState, useEffect, useRef, useCallback } from "react";
import { getRecommendedCompanies, getAllCompanies } from "../_services/companies-service";

export function useCompanies() {
  const loadingRef = useRef(false);
  const [recommendedCompanies, setRecommendedCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const loadCompanies = useCallback(async () => {
    // Evitar llamadas duplicadas
    if (loadingRef.current) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const recommendedCompaniesResult = await getRecommendedCompanies();
      const allCompaniesResult = await getAllCompanies();

      if (recommendedCompaniesResult.success) {
        setRecommendedCompanies(recommendedCompaniesResult.data || []);
        setError(null);
      } else {
        console.error("❌ Error from server:", recommendedCompaniesResult.error);
        setError(recommendedCompaniesResult.error);
      }

      if (allCompaniesResult.success) {
        setAllCompanies(allCompaniesResult.data || []);
        setError(null);
      } else {
        console.error("❌ Error from server:", allCompaniesResult.error);
        setError(allCompaniesResult.error);
      }

    } catch (err) {
      console.error("💥 Exception caught:", err);
      setError("Failed to load employers: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

     const setIsLoading = (value) => {
    setLoading(value);
    loadingRef.current = value;
  };

 useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return { recommendedCompanies: recommendedCompanies, allCompanies: allCompanies, loading: loading, error: error };
}