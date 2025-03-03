import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMetricData } from "@/hooks/useMetricData";
import { MetricChart } from "@/pages/Dashboard/components/MetricsChart";
import { MetricSummary } from "@/pages/Dashboard/components/MetricsSummary";
import { timeRangeOptions } from "@/pages/Dashboard/components/utils";
import { MetricType, TimeRange } from "@/types/metrics";

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
  const { data: metricData, isLoading } = useMetricData({
    metric: metricType,
    timeRange,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
          />
        ) : null}
      </CardContent>
      {metricData && <MetricSummary metricData={metricData} />}
    </Card>
  );
};
