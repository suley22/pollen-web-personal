// Helpers and types for Job entities

export interface JobRecord {
	id?: string;
	job_title?: string;
	company_name?: string;
	location?: string;
	working_hours?: string;
	salary_range?: string;
	work_arrangement?: string;
	employment_type?: string;
	employment_type_details?: string;
	start_date?: string;
	application_deadline?: string;
	work_authorisation?: string;
	description?: string;
	responsibilities?: string[];
	who_would_love?: string[];
	qualifications?: string[];
	benefits?: string[];
	success_looks?: string;
	pollen_approved_requirements?: string[];
	internal_notes?: string; // does not count toward completeness
	employer_profile?: { company_name?: string; logo_url?: string } | null;
}

export class JobHelper {
	/**
	 * Calculates a job profile completeness percentage based on key fields filled.
	 * Internal-only fields (like internal_notes) are excluded from the score.
	 */
	static calculateProfileCompleteness(job: Partial<JobRecord> | any): number {
		const requiredFields = [
			// Core details
			"job_title",
			"company_name",
			"location",
			"working_hours",
			"salary_range",
			"work_arrangement",
			"employment_type",
			"employment_type_details",
			"start_date",
			"application_deadline",
			"work_authorisation",
			"description",
			// Structured content
			"responsibilities",
			"who_would_love",
			"qualifications",
			"benefits",
			"success_looks",
			"pollen_approved_requirements",
		];

		// Prefer the normalized company_name if present, otherwise fallback to employer_profile.company_name
		const normalizedJob = {
			...job,
			company_name:
				job?.company_name || job?.employer_profile?.company_name || job?.company_name,
		} as any;

		const filledFields = requiredFields.filter((field) => {
			const value = normalizedJob[field];
			if (value === undefined || value === null) return false;
			if (typeof value === "string") return value.trim().length > 0;
			if (Array.isArray(value)) return value.length > 0;
			// For other types (objects/dates), count as filled if truthy
			return Boolean(value);
		});

		const score = Math.round((filledFields.length / requiredFields.length) * 100);
		return Number.isFinite(score) ? score : 0;
	}
}

