"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { AdminRoutes } from "@/admin/router";

export function useJobsPage({ action, job = null }) {
  const formRef = useRef(null);
  const router = useRouter();
  const isEditMode = !!job;

  // ✅ Usa la action que recibes como prop (create o update)
  const [state, formAction, isPending] = useActionState(action, null);

  const [editedAssessment, setEditedAssessment] = useState({
    title: job?.assessment?.structured_questions?.title || "",
    estimatedTime: job?.assessment?.structured_questions?.estimatedTime || "",
    totalQuestions: job?.assessment?.structured_questions?.totalQuestions || "",
    instructions: job?.assessment?.structured_questions?.instructions || "",
    openingQuestion: {
      title:
        job?.assessment?.structured_questions?.openingQuestion?.title || "",
      content:
        job?.assessment?.structured_questions?.openingQuestion?.content || "",
    },
    generatedContent: job?.assessment?.generated_content || "",
    scoringCriteria: job?.assessment?.scoring_criteria || "",
  });

  const [editedPersonaData, setEditedPersonaData] = useState({
    primaryDisc: "Influencer (I/D)",
    traits: [
      "Enthusiastic",
      "People-focused",
      "Creative",
      "Collaborative",
      "Optimistic",
    ],
    workStyle:
      "Thrives in collaborative environments with opportunities for creativity and social interaction",
    idealEnvironment:
      "Dynamic, team-oriented workspace with variety and opportunities to present ideas",
    behavioralInsights:
      "This role is perfect for someone who enjoys building relationships, creating engaging content, and working in a fast-paced, collaborative environment. The ideal candidate will be naturally outgoing and comfortable with change.",
  });

  const [editedJob, setEditedJob] = useState({
    job_title: job?.job_title || "",
    company_name: job?.company_name || "",
    location: job?.location || "",
    job_type: job?.job_type || "",
    salary_range: job?.salary_range || "",
    work_arrangement: job?.work_arrangement || "",
    employment_type: job?.employment_type || "",
    employment_type_details: job?.employment_type_details || "",
    start_date: job?.start_date || "",
    application_deadline: job?.application_deadline || "",
    work_authorization: job?.work_authorization || "",
    description: job?.description || "",
    responsibilities: job?.responsibilities || [],
    who_would_love: job?.who_would_love || [],
    success_looks: job?.success_looks || "",
    pollen_approved_requirements: job?.pollen_approved_requirements || [],
    internal_notes: job?.internal_notes || "",
  });

  const [activeTab, setActiveTab] = useState("description");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✅ Efecto para manejar la redirección después de crear/actualizar
  useEffect(() => {
    if (state?.success && isEditMode && job?.id) {
      console.log(
        "Update successful, redirecting to:",
        AdminRoutes.jobView(job.id),
      );
      router.push(AdminRoutes.jobView(job.id));
      router.refresh();
    } else if (state?.success && !isEditMode) {
      // ✅ En modo create, redirige a la lista de jobs
      console.log("Create successful, redirecting to jobs list");
      router.push(AdminRoutes.jobs);
      router.refresh();
    } else if (state?.error) {
      console.error("Action failed:", state.error);
    }
  }, [state, router, isEditMode, job?.id]);

  const handleBack = () => {
    router.back();
  };

  // ✅ Soporta tanto eventos como valores directos
  const updateEditedJob = (fieldOrEvent, value) => {
    if (typeof fieldOrEvent === "string") {
      // Llamada directa: updateEditedJob('job_title', 'New Title')
      setEditedJob((prev) => ({ ...prev, [fieldOrEvent]: value }));
    } else {
      // Event object: updateEditedJob(event)
      const { name, value } = fieldOrEvent.target;
      setEditedJob((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateEditedAssessment = (fieldOrEvent, value) => {
    if (typeof fieldOrEvent === "string") {
      // Llamada directa: updateEditedAssessment('title', 'New Title')
      setEditedAssessment((prev) => ({ ...prev, [fieldOrEvent]: value }));
    } else {
      // Event object: updateEditedAssessment(event)
      const { name, value } = fieldOrEvent.target;
      setEditedAssessment((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Función especial para actualizar campos anidados del assessment
  const updateAssessmentNestedField = (parentField, childField, value) => {
    setEditedAssessment((prev) => ({
      ...(prev ?? {}),
      [parentField]: {
        ...(prev?.[parentField] ?? {}),
        [childField]: value,
      },
    }));
  };

  const updateArrayField = (field, index, value) => {
    setEditedJob((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const removeArrayItem = (field, index) => {
    setEditedJob((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addArrayItem = (field) => {
    setEditedJob((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleConfirmSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return {
    // Refs
    formRef,
    // Form state
    state,
    formAction,
    isPending,
    // Field states
    editedJob,
    setEditedJob,
    editedAssessment,
    setEditedAssessment,
    editedPersonaData,
    setEditedPersonaData,
    activeTab,
    setActiveTab,
    isDialogOpen,
    setIsDialogOpen,
    // Handlers
    handleBack,
    handleConfirmSubmit,
    updateEditedJob,
    updateEditedAssessment,
    updateAssessmentNestedField,
    updateArrayField,
    removeArrayItem,
    addArrayItem,
    // Mode
    isEditMode,
  };
}
