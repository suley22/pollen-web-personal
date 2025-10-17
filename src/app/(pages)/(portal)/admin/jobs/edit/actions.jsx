"use server";
import { createClient } from "@/utils/supabase/server";

export async function updateJobData(jobId, _, formData) {
  const supabase = await createClient();
  const formJobData = Object.fromEntries(formData.entries());

  // Los datos de DynamicListInput vienen como JSON strings con objetos { id, value }
  // Necesitamos extraer solo los valores
  const parseArrayField = (fieldData) => {
    if (!fieldData) return [];
    try {
      const parsed = JSON.parse(fieldData);
      // Si es un array de objetos con 'value', extraemos los valores
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed[0].value !== undefined
      ) {
        return parsed.map((item) => item.value).filter((v) => v && v.trim());
      }
      // Si ya es un array simple, lo devolvemos
      if (Array.isArray(parsed)) {
        return parsed.filter((v) => v && v.trim());
      }
      return [];
    } catch (e) {
      // Si no es JSON, intentamos parsearlo como CSV (backward compatibility)
      return fieldData
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
    }
  };

  const responsibilities = parseArrayField(formJobData.responsibilities);
  const who_would_love = parseArrayField(formJobData.who_would_love);
  const pollen_approved_requirements = parseArrayField(
    formJobData.pollen_approved_requirements,
  );

  // Preparar datos del job (sin el assessment)
  const jobDataToUpdate = {
    job_title: formJobData.job_title,
    company_name: formJobData.company_name,
    location: formJobData.location,
    job_type: formJobData.job_type,
    salary_range: formJobData.salary_range,
    work_arrangement: formJobData.work_arrangement,
    employment_type: formJobData.employment_type,
    employment_type_details: formJobData.employment_type_details,
    start_date: formJobData.start_date,
    application_deadline: formJobData.application_deadline,
    work_authorization: formJobData.work_authorization,
    description: formJobData.description,
    responsibilities: responsibilities,
    who_would_love: who_would_love,
    success_looks: formJobData.success_looks,
    pollen_approved_requirements: pollen_approved_requirements,
    internal_notes: formJobData.internal_notes,
    updated_at: new Date().toISOString(),
  };

  // 1. Actualizar el job
  const { data: jobData, error: jobError } = await supabase
    .from("job")
    .update(jobDataToUpdate)
    .eq("id", jobId)
    .select()
    .single();

  if (jobError) {
    console.error("Error updating job:", jobError);
    return { error: jobError.message };
  }

  console.log("Updated job:", jobData);

  // 2. Manejar el assessment
  const hasAssessmentData =
    formJobData.assessment_title ||
    formJobData.assessment_content ||
    formJobData.scoring_criteria;

  if (hasAssessmentData && jobData.id) {
    // Preparar structured_questions como JSONB
    const structuredQuestions = {
      title: formJobData.assessment_title || "",
      estimatedTime: formJobData.estimated_time
        ? parseInt(formJobData.estimated_time)
        : null,
      totalQuestions: formJobData.total_questions
        ? parseInt(formJobData.total_questions)
        : null,
      instructions: formJobData.assessment_instructions || "",
      openingQuestion: {
        title: formJobData.opening_question_title || "",
        content: formJobData.opening_question_content || "",
      },
      guidelines: {
        timeGuideline: formJobData.estimated_time
          ? `${formJobData.estimated_time} minutes`
          : null,
      },
    };

    const assessmentDataToUpsert = {
      job_id: jobData.id,
      assessment_type: "skills_assessment",
      estimated_duration: formJobData.estimated_time
        ? `${formJobData.estimated_time} minutes`
        : null,
      generated_content: formJobData.assessment_content || "",
      structured_questions: structuredQuestions,
      scoring_criteria: formJobData.scoring_criteria || "",
    };

    // Verificar si ya existe un assessment para este job
    const { data: existingAssessment } = await supabase
      .from("job_assessment")
      .select("id")
      .eq("job_id", jobData.id)
      .single();

    if (existingAssessment) {
      // Actualizar assessment existente
      const { data: assessmentData, error: assessmentError } = await supabase
        .from("job_assessment")
        .update(assessmentDataToUpsert)
        .eq("id", existingAssessment.id)
        .select()
        .single();

      if (assessmentError) {
        console.error("Error updating assessment:", assessmentError);
        console.warn(
          "Job was updated but assessment update failed:",
          assessmentError.message,
        );
      } else {
        console.log("Updated assessment:", assessmentData);
      }
    } else {
      // Crear nuevo assessment
      const { data: assessmentData, error: assessmentError } = await supabase
        .from("job_assessment")
        .insert(assessmentDataToUpsert)
        .select()
        .single();

      if (assessmentError) {
        console.error("Error creating assessment:", assessmentError);
        console.warn(
          "Job was updated but assessment creation failed:",
          assessmentError.message,
        );
      } else {
        console.log("Created assessment:", assessmentData);
      }
    }
  }

  return {
    success: true,
    data: { job: jobData, hasAssessment: hasAssessmentData },
  };
}

export async function getEmployerProfiles(searchTerm = "") {
  const supabase = await createClient();

  let query = supabase
    .from("employer_profile")
    .select("id, company_name")
    .order("company_name");

  if (searchTerm.trim()) {
    query = query.ilike("company_name", `%${searchTerm}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching employer profiles:", error);
    return { error: error.message };
  }

  return { success: true, data: data || [] };
}
