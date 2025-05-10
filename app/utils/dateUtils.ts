/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string or any valid date string
 * @returns Formatted date string (e.g., "Jan 15, 2023")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if there's an error
  }
}

/**
 * Format a date string to include time
 * @param dateString - ISO date string or any valid date string
 * @returns Formatted date and time string (e.g., "Jan 15, 2023, 2:30 PM")
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  } catch (error) {
    console.error("Error formatting date and time:", error);
    return dateString; // Return original string if there's an error
  }
}

/**
 * Calculate the difference between two dates in days
 * @param startDate - Start date string
 * @param endDate - End date string (defaults to current date if not provided)
 * @returns Number of days between the dates
 */
export function daysBetween(startDate: string, endDate?: string): number {
  try {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 0;
    }
    
    // Calculate difference in milliseconds and convert to days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  } catch (error) {
    console.error("Error calculating days between dates:", error);
    return 0;
  }
}

/**
 * Check if a date is in the past
 * @param dateString - Date string to check
 * @returns Boolean indicating if the date is in the past
 */
export function isDatePast(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return false;
    }
    
    return date < now;
  } catch (error) {
    console.error("Error checking if date is past:", error);
    return false;
  }
}

/**
 * Format a relative time (e.g., "2 days ago", "in 3 days")
 * @param dateString - Date string to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else if (diffDays === -1) {
      return "Yesterday";
    } else if (diffDays > 0) {
      return `In ${diffDays} days`;
    } else {
      return `${Math.abs(diffDays)} days ago`;
    }
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return dateString;
  }
}