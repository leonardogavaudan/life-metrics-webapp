import { useState } from "react";

import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import { MetricCard } from "@/pages/Dashboard/components/MetricCard";
import {
  formatDate,
  timeRangeOptions,
} from "@/pages/Dashboard/components/utils";
import { MetricType, TimeRange } from "@/types/metrics";

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.ThreeMonth);
  const dateFormatter = formatDate(timeRange);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">Track your health metrics over time</p>
        </div>
        <TimeRangeSelector
          value={timeRange}
          onChange={(value: TimeRange) => setTimeRange(value)}
          options={timeRangeOptions}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
