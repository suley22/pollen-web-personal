/**
 * Date formatting utilities
 */
export class DateHelper {
  /**
   * Formats a date string to UK format with date and time
   * @param dateString - ISO date string
   * @returns Formatted date string in format: dd/MM/yyyy, HH:mm
   * @example
   * DateHelper.formatDateTime("2025-10-26T14:30:00Z") // "26/10/2025, 14:30"
   */
  static formatDateTime(dateString?: string | null): string {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  /**
   * Formats a date string to UK format (date only)
   * @param dateString - ISO date string
   * @returns Formatted date string in format: dd/MM/yyyy
   * @example
   * DateHelper.formatDate("2025-10-26T14:30:00Z") // "26/10/2025"
   */
  static formatDate(dateString?: string | null): string {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  /**
   * Formats a date string to UK format (time only)
   * @param dateString - ISO date string
   * @returns Formatted time string in format: HH:mm
   * @example
   * DateHelper.formatTime("2025-10-26T14:30:00Z") // "14:30"
   */
  static formatTime(dateString?: string | null): string {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid time";

    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
}
