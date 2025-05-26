import { TimeRange } from "@/types/metrics";
import { format } from "date-fns";

/**
 * Formats seconds into a human-readable string in the format "XXhXXmin"
 * @param seconds - The number of seconds to format
 * @returns A string in the format "XXhXXmin", "XXh" if minutes is 0, or "XXmin" if hours is 0
 */
export const formatSecondsToHoursMinutes = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    // Handle case where both hours and minutes are 0
    return minutes === 0 ? "0min" : `${minutes}min`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h${minutes}min`;
};

export const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: TimeRange.Week, label: "Past Week" },
  { value: TimeRange.FourWeek, label: "Past 4 Weeks" },
  { value: TimeRange.ThreeMonth, label: "3 Months" },
  { value: TimeRange.OneYear, label: "1 Year" },
  { value: TimeRange.FiveYear, label: "5 Years" },
];

export const formatDate = (timeRange: TimeRange) => {
  return (timestamp: string) => {
    const date = new Date(timestamp);
    switch (timeRange) {
      case TimeRange.Week:
        return format(date, "EEE");
      case TimeRange.FourWeek:
      case TimeRange.ThreeMonth:
        return format(date, "MMM d");
      case TimeRange.OneYear:
        return format(date, "MMM");
      default:
        return format(date, "MMM yyyy");
    }
  };
};
