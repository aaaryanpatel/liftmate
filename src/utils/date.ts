/**
 * Converts a Date object to ISO date string (YYYY-MM-DD format)
 */
export const toISODate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Formats a date string or Date object into a human-readable format
 */
export const prettyDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  return dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
