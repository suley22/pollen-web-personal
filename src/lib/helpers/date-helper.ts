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

  /**
   * Formats a date string to relative time format
   * @param dateString - ISO date string
   * @returns Formatted relative time string (e.g., "Today", "Yesterday", "3 days ago", "2 weeks ago")
   * @example
   * DateHelper.formatRelativeDate("2025-10-28T14:30:00Z") // "Today"
   * DateHelper.formatRelativeDate("2025-10-27T14:30:00Z") // "Yesterday"
   * DateHelper.formatRelativeDate("2025-10-25T14:30:00Z") // "3 days ago"
   * DateHelper.formatRelativeDate("2025-10-15T14:30:00Z") // "1 week ago"
   * DateHelper.formatRelativeDate("2025-09-15T14:30:00Z") // "15/09/2025"
   */
  static formatRelativeDate(dateString?: string | null): string {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid date";

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }

    // For dates older than 30 days, return formatted date
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
}
