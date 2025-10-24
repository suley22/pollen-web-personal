import { useState, useEffect, useRef, useCallback } from "react";
import { getRecommendedCompanies, getAllCompanies, fetchEmployerById } from "../_services/companies-service";

export function useCompanies(id = null) {
  const loadingRef = useRef(false);
  const [recommendedCompanies, setRecommendedCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

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
        } else {
          setIsLoading(false);
        }
      };
  
      loadProfile();
    }, [id]);

  return { recommendedCompanies: recommendedCompanies, allCompanies: allCompanies, profile: profile, loading: loading, error: error };
}