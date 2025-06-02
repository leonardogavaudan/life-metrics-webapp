import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useMetricData } from "@/hooks/useMetricData";
import { MetricChart } from "@/pages/Dashboard/components/MetricsChart";
import { MetricSummary } from "@/pages/Dashboard/components/MetricsSummary";
import { timeRangeOptions } from "@/pages/Dashboard/components/utils";
import { MetricType, TimeRange } from "@/types/metrics";
import { useState } from "react";

export type MetricCardProps = {
  metricType: MetricType;
  title: string;
  timeRange: TimeRange;
  formatDate: (timestamp: string) => string;
  className?: string;
};

export const MetricCard = ({
  metricType,
  title,
  timeRange,
  formatDate,
  className = "",
}: MetricCardProps) => {
  const [showRollingAverage, setShowRollingAverage] = useState(true);
  const { data: metricData, isLoading } = useMetricData({
    metric: metricType,
    timeRange,
  });

  return (
    <Card className={`${className} hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 border-slate-800 hover:border-slate-700 hover:-translate-y-1`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            {title}
          </span>
          <button
            onClick={() => setShowRollingAverage(!showRollingAverage)}
            className={`px-2 py-1 text-xs rounded-md border transition-all duration-200 cursor-pointer focus:outline-none transform hover:scale-105 ${
              showRollingAverage
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25"
                : "bg-slate-800 text-slate-400 border-slate-600 hover:border-slate-500 hover:bg-slate-700 hover:shadow-md"
            }`}
          >
            7d avg
          </button>
        </CardTitle>
        <CardDescription>
          {timeRangeOptions.find((opt) => opt.value === timeRange)?.label}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-[120px] w-full" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ) : metricData ? (
          <MetricChart
            data={metricData.data}
            formatDate={formatDate}
            metricType={metricType}
            showRollingAverage={showRollingAverage}
            rollingAverageWindow={7}
          />
        ) : null}
      </CardContent>
      {metricData && (
        <MetricSummary metricData={metricData} metricType={metricType} />
      )}
    </Card>
  );
};
