import { useState } from "react";

import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import { MetricCard } from "@/pages/Dashboard/components/MetricCard";
import {
  formatDate,
  timeRangeOptions,
} from "@/pages/Dashboard/components/utils";
import { MetricType, TimeRange } from "@/types/metrics";

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.FourWeek);
  const dateFormatter = formatDate(timeRange);

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
      <div className="flex gap-4">
        <MetricCard
          metricType={MetricType.DailySleepScore}
          title="Sleep Score"
          timeRange={timeRange}
          formatDate={dateFormatter}
        />
        <MetricCard
          metricType={MetricType.DailySteps}
          title="Daily Steps"
          timeRange={timeRange}
          formatDate={dateFormatter}
        />
        <MetricCard
          metricType={MetricType.DailyTotalCalories}
          title="Daily Calories"
          timeRange={timeRange}
          formatDate={dateFormatter}
        />
        <MetricCard
          metricType={MetricType.DailyTotalSleep}
          title="Daily Sleep"
          timeRange={timeRange}
          formatDate={dateFormatter}
        />
      </div>
    </div>
  );
};
