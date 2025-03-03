import { TimeRange } from "@/types/metrics";
import { format } from "date-fns";

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
