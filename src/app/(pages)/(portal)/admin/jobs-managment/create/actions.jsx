"use server";
import { createClient } from "@/utils/supabase/server";

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

export async function getJobAssessments(jobId) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("job_assessment")
    .select("*")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching job assessments:", error);
    return { error: error.message };
  }

  return { success: true, data: data || [] };
}

export async function createJobData(_, formData) {
  const supabase = await createClient();
  const formJobData = Object.fromEntries(formData.entries());
  
  // Convertir los arrays que vienen como strings separados por comas a arrays reales
  const responsibilities = formJobData.responsibilities ? formJobData.responsibilities.split(',').map(r => r.trim()).filter(r => r) : [];
  const who_would_love = formJobData.who_would_love ? formJobData.who_would_love.split(',').map(w => w.trim()).filter(w => w) : [];
  const pollen_approved_requirements = formJobData.pollen_approved_requirements ? formJobData.pollen_approved_requirements.split(',').map(p => p.trim()).filter(p => p) : [];
  
  // Preparar datos del job (sin el assessment)
  const jobDataToInsert = {
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
    internal_notes: formJobData.internal_notes
  };
  
  // 1. Primero crear el job
  const { data: jobData, error: jobError } = await supabase
    .from("job")
    .insert(jobDataToInsert)
    .select()
    .single();

  if (jobError) {
    console.error("Error creating job:", jobError);
    return { error: jobError.message };
  }

  console.log("Created job:", jobData);

  // 2. Después crear el assessment si hay datos del assessment
  const hasAssessmentData = formJobData.assessment_title || 
                           formJobData.assessment_content || 
                           formJobData.assessment_scoring_criteria;

  if (hasAssessmentData && jobData.id) {
    // Preparar structured_questions como JSONB
    const structuredQuestions = {
      title: formJobData.assessment_title || '',
      estimatedTime: formJobData.assessment_estimated_time ? parseInt(formJobData.assessment_estimated_time) : null,
      totalQuestions: formJobData.assessment_total_questions ? parseInt(formJobData.assessment_total_questions) : null,
      instructions: formJobData.assessment_instructions || '',
      openingQuestion: {
        title: formJobData.assessment_opening_question_title || '',
        content: formJobData.assessment_opening_question_content || ''
      },
      guidelines: {
        timeGuideline: formJobData.assessment_estimated_time ? `${formJobData.assessment_estimated_time} minutes` : null
      }
    };

    const assessmentDataToInsert = {
      job_id: jobData.id,
      assessment_type: "skills_assessment",
      estimated_duration: formJobData.assessment_estimated_time ? `${formJobData.assessment_estimated_time} minutes` : null,
      generated_content: formJobData.assessment_content || '',
      structured_questions: structuredQuestions,
      scoring_criteria: formJobData.assessment_scoring_criteria || ''
    };

    const { data: assessmentData, error: assessmentError } = await supabase
      .from("job_assessment")
      .insert(assessmentDataToInsert)
      .select()
      .single();

    if (assessmentError) {
      console.error("Error creating assessment:", assessmentError);
      // No fallar completamente si el job se creó pero el assessment falló
      console.warn("Job was created but assessment failed:", assessmentError.message);
    } else {
      console.log("Created assessment:", assessmentData);
    }
  }
  
  return { success: true, data: { job: jobData, hasAssessment: hasAssessmentData } };
}
