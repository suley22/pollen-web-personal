import { createClient } from "@/lib/utils/supabase/server";

export interface JobFilters {
  status?: string;
  assignment?: string;
  searchTerm?: string;
}

export class JobService {
  private supabase: any;

  constructor(supabase: any) {
    this.supabase = supabase;
  }

  /**
   * Fetches application counts for a specific job
   */
  private async fetchJobApplicationCounts(jobId: string) {
    try {
      // Count new applications to review (new_applicants status)
      const { count: newApplicationsCount } = await this.supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("job_id", jobId)
        .eq("status", "new_applicants");

      // Count Pollen interviews booked (in_progress status)
      const { count: pollenInterviewsCount } = await this.supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("job_id", jobId)
        .eq("status", "in_progress");

      // Count candidates matched to employer (matched_to_employer status)
      const { count: candidatesMatchedCount } = await this.supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("job_id", jobId)
        .eq("status", "matched_to_employer");

      // Count feedback sent (complete status)
      const { count: feedbackSentCount } = await this.supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("job_id", jobId)
        .eq("status", "complete");

      // Count total applications
      const { count: totalApplicationsCount } = await this.supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("job_id", jobId);

      return {
        newApplicationsToReview: newApplicationsCount || 0,
        pollenInterviewsBooked: pollenInterviewsCount || 0,
        candidatesMatchedToEmployer: candidatesMatchedCount || 0,
        feedbackSent: feedbackSentCount || 0,
        total_applications: totalApplicationsCount || 0,
      };
    } catch (error) {
      console.error(
        `Error fetching application counts for job ${jobId}:`,
        error,
      );
      return {
        newApplicationsToReview: 0,
        pollenInterviewsBooked: 0,
        candidatesMatchedToEmployer: 0,
        feedbackSent: 0,
        total_applications: 0,
      };
    }
  }

  /**
   * Builds the query with filters applied
   */
  private buildJobQuery(filters: JobFilters) {
    let query = this.supabase
      .from("job")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    // Apply status filter
    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    // Apply assignment filter
    if (filters.assignment && filters.assignment !== "all") {
      if (filters.assignment === "mine") {
        // TODO: Replace with actual current user logic
        query = query.eq("assigned_to", "Current User");
      } else if (filters.assignment === "karen") {
        query = query.ilike("assigned_to", "karen");
      } else if (filters.assignment === "sophie") {
        query = query.ilike("assigned_to", "sophie");
      }
    }

    // Apply search filter
    if (filters.searchTerm) {
      query = query.or(
        `company_name.ilike.%${filters.searchTerm}%,job_title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,assigned_to.ilike.%${filters.searchTerm}%`,
      );
    }

    return query;
  }

  /**
   * Parses array fields from FormData (handles JSON and CSV formats)
   */
  private parseArrayField(fieldData: any): string[] {
    if (!fieldData) return [];
    try {
      const parsed = JSON.parse(fieldData);
      // If it's an array of objects with 'value', extract the values
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed[0].value !== undefined
      ) {
        return parsed.map((item) => item.value).filter((v) => v && v.trim());
      }
      // If it's already a simple array, return it
      if (Array.isArray(parsed)) {
        return parsed.filter((v) => v && v.trim());
      }
      return [];
    } catch (e) {
      // If it's not JSON, try parsing as CSV (backward compatibility)
      console.log("Parsing field as CSV for backward compatibility:", e);
      return fieldData
        .split(",")
        .map((item: string) => item.trim())
        .filter((item: string) => item);
    }
  }

  /**
   * Transforms form data to database format for job creation/update
   */
  private transformFormDataToDatabase(formData: FormData) {
    const formJobData = Object.fromEntries(formData.entries());

    // Parse array fields
    const responsibilities = this.parseArrayField(formJobData.responsibilities);
    const who_would_love = this.parseArrayField(formJobData.who_would_love);
    const pollen_approved_requirements = this.parseArrayField(
      formJobData.pollen_approved_requirements,
    );

    return {
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
    };
  }

  /**
   * Transforms assessment form data to database format
   */
  private transformAssessmentDataToDatabase(formData: FormData, jobId: string) {
    const formJobData = Object.fromEntries(formData.entries());

    // Prepare structured_questions as JSONB
    const structuredQuestions = {
      title: formJobData.assessment_title || "",
      estimatedTime: formJobData.assessment_estimated_time
        ? parseInt(formJobData.assessment_estimated_time as string)
        : formJobData.estimated_time
          ? parseInt(formJobData.estimated_time as string)
          : null,
      totalQuestions: formJobData.assessment_total_questions
        ? parseInt(formJobData.assessment_total_questions as string)
        : formJobData.total_questions
          ? parseInt(formJobData.total_questions as string)
          : null,
      instructions: formJobData.assessment_instructions || "",
      openingQuestion: {
        title:
          formJobData.assessment_opening_question_title ||
          formJobData.opening_question_title ||
          "",
        content:
          formJobData.assessment_opening_question_content ||
          formJobData.opening_question_content ||
          "",
      },
      guidelines: {
        timeGuideline: formJobData.assessment_estimated_time
          ? `${formJobData.assessment_estimated_time} minutes`
          : formJobData.estimated_time
            ? `${formJobData.estimated_time} minutes`
            : null,
      },
    };

    return {
      job_id: jobId,
      assessment_type: "skills_assessment",
      estimated_duration: formJobData.assessment_estimated_time
        ? `${formJobData.assessment_estimated_time} minutes`
        : formJobData.estimated_time
          ? `${formJobData.estimated_time} minutes`
          : null,
      generated_content:
        formJobData.assessment_content || formJobData.generated_content || "",
      structured_questions: structuredQuestions,
      scoring_criteria:
        formJobData.assessment_scoring_criteria ||
        formJobData.scoring_criteria ||
        "",
    };
  }

  /**
   * Fetches jobs list with filters and application counts
   */
  async fetchJobs(filters: JobFilters = {}) {
    try {
      console.log("🔍 JobService: Fetching jobs with filters:", filters);

      const query = this.buildJobQuery(filters);
      const { data, error } = await query;

      if (error) {
        console.error("❌ JobService: Error fetching jobs:", error);
        return { success: false, error: error.message };
      }

      console.log(
        `📦 JobService: Fetched ${data?.length || 0} jobs from database`,
      );

      // Fetch application counts for each job
      const jobsWithApplicationCounts = await Promise.all(
        data.map(async (job) => {
          const applicationCounts = await this.fetchJobApplicationCounts(
            job.id,
          );

          return {
            ...job,
            ...applicationCounts,
          };
        }),
      );

      return { success: true, data: jobsWithApplicationCounts };
    } catch (error) {
      console.error("JobService: Unexpected error:", error);
      return { success: false, error: "Failed to fetch jobs" };
    }
  }

  /**
   * Fetches a single job by ID (for viewing/editing)
   */
  async fetchJobById(id: string) {
    try {
      console.log("JobService: Fetching job by ID:", id);

      const { data, error } = await this.supabase
        .from("job")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("JobService: Error fetching job by ID:", error);
        return { success: false, error: error.message };
      }

      // Normalize the job data
      const job = {
        ...data,
        who_would_love: data?.who_would_love || [],
        candidate_counts: data?.candidate_counts || {},
        candidateCounts: {
          total: data?.candidate_counts?.total || 15,
          new: data?.candidate_counts?.new || 10,
          inProgress: data?.candidate_counts?.inProgress || 5,
          complete: data?.candidate_counts?.complete || 8,
          hired: data?.candidate_counts?.hired || 2,
        },
      };

      return { success: true, data: job };
    } catch (error) {
      console.error("JobService: Unexpected error fetching job:", error);
      return { success: false, error: "Failed to fetch job" };
    }
  }

  /**
   * Fetches a job with its assessment data
   */
  async fetchJobWithAssessment(jobId: string) {
    try {
      console.log("JobService: Fetching job with assessment:", jobId);

      // Fetch job data
      const { data: job, error: jobError } = await this.supabase
        .from("job")
        .select("*")
        .eq("id", jobId)
        .single();

      if (jobError) {
        console.error("JobService: Error fetching job:", jobError);
        return { success: false, error: jobError.message, data: null };
      }

      // Fetch assessment data
      const { data: assessment, error: assessmentError } = await this.supabase
        .from("job_assessment")
        .select("*")
        .eq("job_id", jobId)
        .single();

      if (assessmentError && assessmentError.code !== "PGRST116") {
        // PGRST116 is "not found", which is okay
        console.error(
          "JobService: Error fetching assessment:",
          assessmentError,
        );
      }

      return { success: true, data: { job, assessment }, error: null };
    } catch (error) {
      console.error(
        "JobService: Unexpected error fetching job with assessment:",
        error,
      );
      return {
        success: false,
        error: "Failed to fetch job with assessment",
        data: null,
      };
    }
  }

  /**
   * Fetches persona data for a job
   */
  async fetchPersonaData(jobId: string) {
    try {
      const { data, error } = await this.supabase
        .from("persona_data")
        .select("*")
        .eq("job_id", jobId)
        .single();

      if (error) {
        return { success: false, error: error.message, data: null };
      }

      const persona_data = {
        ...data,
        primaryDisc: data?.primary_disc || "N/A",
        traits: data?.traits || [],
        workStyle: data?.work_style || "Not specified",
        idealEnvironment: data?.ideal_environment || "Not specified",
        behavioralInsights: data?.behavioral_insights || "Not specified",
      };

      return { success: true, data: persona_data, error: null };
    } catch (error) {
      console.error("JobService: Error fetching persona data:", error);
      return {
        success: false,
        error: "Failed to fetch persona data",
        data: null,
      };
    }
  }

  /**
   * Fetches assessment data for a job
   */
  async fetchAssessmentData(jobId: string) {
    try {
      const { data, error } = await this.supabase
        .from("job_assessment")
        .select("*")
        .eq("job_id", jobId);

      if (error) {
        return { success: false, error: error.message, data: null };
      }

      const assessment = data ? data : [];

      return { success: true, data: assessment, error: null };
    } catch (error) {
      console.error("JobService: Error fetching assessment data:", error);
      return {
        success: false,
        error: "Failed to fetch assessment data",
        data: null,
      };
    }
  }

  /**
   * Fetches job applicants with job seeker details
   */
  async fetchJobApplicants(jobId: string) {
    try {
      const { data: applicants, error } = await this.supabase
        .from("job_applications")
        .select(
          `
          *,
          job_seeker:applicant_id (
            *
          )
        `,
        )
        .eq("job_id", jobId);

      if (error) {
        return { success: false, error: error.message, data: null };
      }

      return { success: true, data: applicants, error: null };
    } catch (error) {
      console.error("JobService: Error fetching job applicants:", error);
      return {
        success: false,
        error: "Failed to fetch job applicants",
        data: null,
      };
    }
  }

  /**
   * Fetches employer profiles (for dropdowns/selects)
   */
  async fetchEmployerProfiles(searchTerm: string = "") {
    try {
      let query = this.supabase
        .from("employer_profile")
        .select("id, company_name")
        .order("company_name");

      if (searchTerm.trim()) {
        query = query.ilike("company_name", `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("JobService: Error fetching employer profiles:", error);
        return { success: false, error: error.message, data: null };
      }

      return { success: true, data: data || [], error: null };
    } catch (error) {
      console.error("JobService: Error fetching employer profiles:", error);
      return {
        success: false,
        error: "Failed to fetch employer profiles",
        data: null,
      };
    }
  }

  /**
   * Fetches job assessments for a specific job
   */
  async fetchJobAssessments(jobId: string) {
    try {
      const { data, error } = await this.supabase
        .from("job_assessment")
        .select("*")
        .eq("job_id", jobId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("JobService: Error fetching job assessments:", error);
        return { success: false, error: error.message, data: null };
      }

      return { success: true, data: data || [], error: null };
    } catch (error) {
      console.error("JobService: Error fetching job assessments:", error);
      return {
        success: false,
        error: "Failed to fetch job assessments",
        data: null,
      };
    }
  }

  /**
   * Creates a new job with optional assessment
   */
  async createJob(formData: FormData) {
    try {
      const transformedData = this.transformFormDataToDatabase(formData);

      // Validate required fields
      if (
        !transformedData.job_title ||
        !transformedData.job_title.toString().trim()
      ) {
        return {
          success: false,
          error: "Job title is required",
        };
      }

      // 1. Create the job
      const { data: jobData, error: jobError } = await this.supabase
        .from("job")
        .insert(transformedData)
        .select()
        .single();

      if (jobError) {
        console.error("JobService: Error creating job:", jobError);
        return {
          success: false,
          error: jobError.message || "Failed to create job",
        };
      }

      console.log("JobService: Created job:", jobData);

      // 2. Create assessment if there's assessment data
      const formJobData = Object.fromEntries(formData.entries());
      const hasAssessmentData =
        formJobData.assessment_title ||
        formJobData.assessment_content ||
        formJobData.assessment_scoring_criteria;

      if (hasAssessmentData && jobData.id) {
        const assessmentData = this.transformAssessmentDataToDatabase(
          formData,
          jobData.id,
        );

        const { data: assessmentResult, error: assessmentError } =
          await this.supabase
            .from("job_assessment")
            .insert(assessmentData)
            .select()
            .single();

        if (assessmentError) {
          console.error(
            "JobService: Error creating assessment:",
            assessmentError,
          );
          console.warn(
            "Job was created but assessment failed:",
            assessmentError.message,
          );
        } else {
          console.log("JobService: Created assessment:", assessmentResult);
        }
      }

      return {
        success: true,
        data: { job: jobData, hasAssessment: hasAssessmentData },
        message: "Job created successfully",
      };
    } catch (error) {
      console.error("JobService: Unexpected error creating job:", error);
      return {
        success: false,
        error: "Failed to create job",
      };
    }
  }

  /**
   * Updates an existing job with optional assessment
   */
  async updateJob(jobId: string, formData: FormData) {
    try {
      const transformedData = this.transformFormDataToDatabase(formData);

      // Validate required fields
      if (
        !transformedData.job_title ||
        !transformedData.job_title.toString().trim()
      ) {
        return {
          success: false,
          error: "Job title is required",
        };
      }

      // 1. Update the job
      const { data: jobData, error: jobError } = await this.supabase
        .from("job")
        .update({
          ...transformedData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId)
        .select()
        .single();

      if (jobError) {
        console.error("JobService: Error updating job:", jobError);
        return {
          success: false,
          error: jobError.message || "Failed to update job",
        };
      }

      console.log("JobService: Updated job:", jobData);

      // 2. Handle assessment
      const formJobData = Object.fromEntries(formData.entries());
      const hasAssessmentData =
        formJobData.assessment_title ||
        formJobData.assessment_content ||
        formJobData.scoring_criteria;

      if (hasAssessmentData && jobData.id) {
        const assessmentData = this.transformAssessmentDataToDatabase(
          formData,
          jobData.id,
        );

        // Check if assessment already exists
        const { data: existingAssessment } = await this.supabase
          .from("job_assessment")
          .select("id")
          .eq("job_id", jobData.id)
          .single();

        if (existingAssessment) {
          // Update existing assessment
          const { data: assessmentResult, error: assessmentError } =
            await this.supabase
              .from("job_assessment")
              .update(assessmentData)
              .eq("id", existingAssessment.id)
              .select()
              .single();

          if (assessmentError) {
            console.error(
              "JobService: Error updating assessment:",
              assessmentError,
            );
            console.warn(
              "Job was updated but assessment update failed:",
              assessmentError.message,
            );
          } else {
            console.log("JobService: Updated assessment:", assessmentResult);
          }
        } else {
          // Create new assessment
          const { data: assessmentResult, error: assessmentError } =
            await this.supabase
              .from("job_assessment")
              .insert(assessmentData)
              .select()
              .single();

          if (assessmentError) {
            console.error(
              "JobService: Error creating assessment:",
              assessmentError,
            );
            console.warn(
              "Job was updated but assessment creation failed:",
              assessmentError.message,
            );
          } else {
            console.log("JobService: Created assessment:", assessmentResult);
          }
        }
      }

      return {
        success: true,
        data: { job: jobData, hasAssessment: hasAssessmentData },
        message: "Job updated successfully",
      };
    } catch (error) {
      console.error("JobService: Unexpected error updating job:", error);
      return {
        success: false,
        error: "Failed to update job",
      };
    }
  }
}

/**
 * Factory function to create JobService instance
 */
export async function createJobService() {
  const supabase = await createClient();
  return new JobService(supabase);
}
