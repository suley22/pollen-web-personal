import { SocialMediaLink } from "@/types/social-media-links";

export type EmployerApprovalStatus = "approved" | "pending" | "rejected";

export enum EmployerApprovalStatusEnum {
  Approved = "approved",
  Pending = "pending",
  Rejected = "rejected",
}

export interface EmployerProfile {
  id: number;
  company_name?: string;
  logo_url?: string;
  company_size?: string;
  company_location?: string;
  founded_year?: string;
  website_url?: string;
  industries?: string[];
  company_about?: string;
  work_environment?: string;
  company_loves?: string;
  company_entry_level?: string;
  company_accolades?: string[];
  contact_name?: string;
  job_title?: string;
  contact_email?: string;
  contact_phone?: string;
  created_at?: string;
  updated_at?: string;
  approval_status?: "draft" | "live" | "hidden" | "pending";
  how_did_you_hear_about_us?: string;
  more_info?: string;
  hiring_frequency?: string;
  previous_hiring_methods?: string[];
  additional_notes?: string;
  jobs?: any[];
  entry_level_support?: string;
  social_medias?: Array<SocialMediaLink>;
  how_hired_previously?: string[];
  profile_completeness?: number;
}

export class EmployerProfileHelper {
  /**
   * Creates an EmployerProfile with default values for display purposes
   * Used for listing and viewing profiles where we want user-friendly defaults
   */
  static fromDatabaseWithDefaults(employer: any): EmployerProfile {
    return {
      ...employer,
      company_name: employer.company_name || "Unknown Company",
      approval_status: employer.approval_status || "draft",
      logo_url: employer.logo_url,
      industries: employer.industries?.length ? employer.industries : [],
      contact_email: employer.contact_email || "No email provided",
      contact_phone: employer.contact_phone || "No phone provided",
      profile_completeness:
        EmployerProfileHelper.calculateProfileCompleteness(employer),
      updated_at: employer.updated_at || "N/A",
      company_location: employer.company_location || "Location not specified",
      company_size: employer.company_size || "Size not specified",
      contact_name: employer.contact_name || "No contact name provided",
      founded_year: employer.founded_year || "N/A",
    };
  }

  /**
   * Creates an EmployerProfile preserving raw values from database
   * Used for editing where we need the original values (nulls, empty strings, etc.)
   */
  static fromDatabaseRaw(employer: any): EmployerProfile {
    return {
      ...employer,
      profile_completeness:
        EmployerProfileHelper.calculateProfileCompleteness(employer),
    };
  }

  /**
   * Calculates profile completeness percentage based on filled fields
   * Excludes "Internal Pollen Data" fields as they don't count toward profile completeness
   */
  static calculateProfileCompleteness(employer: any): number {
    const requiredFields = [
      // Company Information
      "company_name",
      "company_location",
      "company_size",
      "founded_year",
      "logo_url",
      "website_url",
      "industries",
      // Company Details (TextAreaCards)
      "company_about",
      "work_environment",
      "company_loves",
      "company_entry_level", // Database field name (form uses entry_level_support)
      // Accolades
      "company_accolades",
      // Contact Information
      "contact_name",
      "job_title",
      "contact_email",
      "contact_phone",
      // Social Media
      "social_medias",
      // NOTE: Internal Pollen Data fields are NOT included:
      // - how_did_you_hear_about_us
      // - more_info
      // - hiring_frequency
      // - previous_hiring_methods
      // - additional_notes
    ];

    const filledFields = requiredFields.filter(
      (field) =>
        employer[field] &&
        employer[field] !== null &&
        employer[field] !== "" &&
        (Array.isArray(employer[field]) ? employer[field].length > 0 : true),
    );

    return Math.round((filledFields.length / requiredFields.length) * 100);
  }

  /**
   * Returns industries as comma-separated string for display
   */
  static getIndustriesDisplay(industries?: string[]): string {
    return industries?.length ? industries.join(", ") : "Not specified";
  }

  /**
   * Returns formatted updated date
   */
  static getFormattedUpdatedAt(updated_at?: string): string {
    if (!updated_at) return "N/A";
    try {
      return new Date(updated_at).toLocaleDateString();
    } catch {
      return updated_at;
    }
  }
}
