import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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
  className = "w-1/3",
}: MetricCardProps) => {
  const [showRollingAverage, setShowRollingAverage] = useState(true);
  const { data: metricData, isLoading } = useMetricData({
    metric: metricType,
    timeRange,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="rolling-avg-toggle"
              className="text-xs text-slate-400 font-normal"
            >
              7d avg
            </Label>
            <Switch
              id="rolling-avg-toggle"
              checked={showRollingAverage}
              onCheckedChange={setShowRollingAverage}
            />
          </div>
        </CardTitle>
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
