import { useState } from "react";

import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMetricData } from "@/hooks/useMetricData";
import { MetricType, TimeRange } from "@/types/metrics";
import { format } from "date-fns";
import { MetricChart } from "@/pages/Dashboard/components/MetricsChart";
import { MetricSummary } from "@/pages/Dashboard/components/MetricsSummary";

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: TimeRange.Week, label: "Past Week" },
  { value: TimeRange.FourWeek, label: "Past 4 Weeks" },
  { value: TimeRange.ThreeMonth, label: "3 Months" },
  { value: TimeRange.OneYear, label: "1 Year" },
  { value: TimeRange.FiveYear, label: "5 Years" },
];

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.FourWeek);
  const { data: metricData, isLoading } = useMetricData({
    metric: MetricType.DailySleepScore,
    timeRange,
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    switch (timeRange) {
      case TimeRange.Week:
      case TimeRange.FourWeek:
        return format(date, "EEE");
      case TimeRange.ThreeMonth:
        return format(date, "MMM d");
      case TimeRange.OneYear:
        return format(date, "MMM");
      default:
        return format(date, "MMM yyyy");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <TimeRangeSelector
          value={timeRange}
          onChange={(value: TimeRange) => setTimeRange(value)}
          options={timeRangeOptions}
        />
      </div>

      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Sleep Score</CardTitle>
          <CardDescription>
            {timeRangeOptions.find((opt) => opt.value === timeRange)?.label}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[80px] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : metricData ? (
            <MetricChart data={metricData.data} formatDate={formatDate} />
          ) : null}
        </CardContent>
        {metricData && <MetricSummary metricData={metricData} />}
      </Card>
    </div>
  );
};
