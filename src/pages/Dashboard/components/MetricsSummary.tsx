import { CardFooter } from "@/components/ui/card";
import { formatSecondsToHoursMinutes } from "@/pages/Dashboard/components/utils";
import { DashboardMetricResponse, MetricType } from "@/types/metrics";
import { TrendingUp, TrendingDown } from "lucide-react";

type MetricSummaryProps = {
  metricData: DashboardMetricResponse;
  metricType: MetricType;
};

export const MetricSummary = ({ metricData, metricType }: MetricSummaryProps) => {
  if (!metricData?.metadata?.summary) return null;

  const { summary, aggregation } = metricData.metadata || {};

  return (
    <CardFooter className="flex-col items-start gap-2 text-sm">
      {summary?.changePercentage && (
        <div className="flex gap-2 font-medium leading-none">
          {summary?.changePercentage > 0 ? (
            <>
              Trending up by {summary?.changePercentage}% this {aggregation ?? ""}{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : (
            <>
              Trending down by {Math.abs(summary?.changePercentage)}% this{" "}
              {aggregation ?? ""} <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
        </div>
      )}
      <div className="leading-none text-muted-foreground">
        Average {metricType === MetricType.DailyTotalSleep ? "duration" : "score"}: {
          metricType === MetricType.DailyTotalSleep && summary?.average !== undefined
            ? formatSecondsToHoursMinutes(summary.average)
            : summary?.average?.toFixed(1)
        }
      </div>
    </CardFooter>
  );
};
