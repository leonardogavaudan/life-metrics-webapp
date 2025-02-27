import { CardFooter } from "@/components/ui/card";
import { DashboardMetricResponse } from "@/types/metrics";
import { TrendingUp, TrendingDown } from "lucide-react";

type MetricSummaryProps = {
  metricData: DashboardMetricResponse;
};

export const MetricSummary = ({ metricData }: MetricSummaryProps) => {
  if (!metricData.metadata.summary) return null;

  const { summary, aggregation } = metricData.metadata;

  return (
    <CardFooter className="flex-col items-start gap-2 text-sm">
      {summary.changePercentage && (
        <div className="flex gap-2 font-medium leading-none">
          {summary.changePercentage > 0 ? (
            <>
              Trending up by {summary.changePercentage}% this {aggregation}{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : (
            <>
              Trending down by {Math.abs(summary.changePercentage)}% this{" "}
              {aggregation} <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
        </div>
      )}
      <div className="leading-none text-muted-foreground">
        Average score: {summary.average?.toFixed(1)}
      </div>
    </CardFooter>
  );
};
