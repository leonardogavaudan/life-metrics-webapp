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
    <CardFooter className="flex-col items-start gap-3 text-sm border-t border-slate-800 bg-slate-900/30 mt-2 p-4">
      {summary?.changePercentage && (
        <div className="flex gap-2 font-medium leading-none">
          {summary?.changePercentage > 0 ? (
            <>
              <span className="text-green-400 font-semibold">
                Trending up by {summary?.changePercentage}% this {aggregation ?? ""}
              </span>
              <TrendingUp className="h-4 w-4 text-green-400 animate-pulse" />
            </>
          ) : (
            <>
              <span className="text-red-400 font-semibold">
                Trending down by {Math.abs(summary?.changePercentage)}% this{" "}
                {aggregation ?? ""}
              </span>
              <TrendingDown className="h-4 w-4 text-red-400 animate-pulse" />
            </>
          )}
        </div>
      )}
      <div className="leading-none text-slate-400 font-medium">
        <span className="text-slate-300">
          Average {metricType === MetricType.DailyTotalSleep ? "duration" : "score"}:
        </span>{" "}
        <span className="text-white font-mono">
          {metricType === MetricType.DailyTotalSleep && summary?.average !== undefined
            ? formatSecondsToHoursMinutes(summary.average)
            : summary?.average?.toFixed(1)}
        </span>
      </div>
    </CardFooter>
  );
};
