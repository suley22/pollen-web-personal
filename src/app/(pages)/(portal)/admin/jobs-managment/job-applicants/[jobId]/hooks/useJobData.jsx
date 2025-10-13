"use client";

import { useState, useEffect } from "react";
import { fetchJobApplicants, fetchJobDetails } from "../actions";

export function useJobData(jobId) {
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar datos de aplicantes y job en paralelo
        const [applicantsResult, jobResult] = await Promise.all([
          fetchJobApplicants(jobId),
          fetchJobDetails(jobId),
        ]);

        // Manejar errores
        if (applicantsResult.error) {
          throw new Error(applicantsResult.error.message);
        }
        if (jobResult.error) {
          throw new Error(jobResult.error.message);
        }

        // Establecer datos
        setCandidates(applicantsResult.data || []);
        setJob(jobResult.data);
      } catch (err) {
        console.error("Error loading job data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [jobId]);

  // Función para refrescar los datos
  const refetch = async () => {
    if (!jobId) return;

    try {
      setLoading(true);
      const [applicantsResult, jobResult] = await Promise.all([
        fetchJobApplicants(jobId),
        fetchJobDetails(jobId),
      ]);

      if (!applicantsResult.error && !jobResult.error) {
        setCandidates(applicantsResult.data || []);
        setJob(jobResult.data);
      }
    } catch (err) {
      console.error("Error refetching job data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    candidates,
    job,
    loading,
    error,
    refetch,
  };
}
