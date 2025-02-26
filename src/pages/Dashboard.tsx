import { TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useMetricData } from "@/hooks/useMetricData";
import {
  DashboardMetricResponse,
  MetricDataPoint,
  MetricType,
  TimeRange,
} from "@/types/metrics";
import { format } from "date-fns";
import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const chartConfig = {
  sleepScore: {
    label: "Sleep Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: TimeRange.Week, label: "Past Week" },
  { value: TimeRange.FourWeek, label: "Past 4 Weeks" },
  { value: TimeRange.ThreeMonth, label: "3 Months" },
  { value: TimeRange.OneYear, label: "1 Year" },
  { value: TimeRange.FiveYear, label: "5 Years" },
];

type MetricChartProps = {
  data: MetricDataPoint[];
  formatDate: (timestamp: string) => string;
};

const MetricChart = ({ data, formatDate }: MetricChartProps) => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = format(date, "yyyy-MM-dd");
      const score = payload[0].value;

      return (
        <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-md dark:border-slate-800 dark:bg-slate-950">
          <p className="font-medium">{formattedDate}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Score: </span>
            <span className="font-mono font-medium">{score}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%">
        <LineChart
          data={data}
          margin={{
            top: 2,
            left: 10,
            right: 10,
            bottom: 2,
          }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            horizontal={true}
            horizontalCoordinatesGenerator={(props) => {
              // Force specific y-coordinates for grid lines
              const { height } = props.yAxis;
              const domain = [0, 100];
              const values = [0, 20, 40, 60, 80, 100];

              return values.map((value) => {
                const ratio = (value - domain[0]) / (domain[1] - domain[0]);
                return height * (1 - ratio);
              });
            }}
          />
          <XAxis
            dataKey="timestamp"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={formatDate}
            fontSize={9}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={9}
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickCount={6}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            dataKey="value"
            type="monotone"
            stroke="var(--color-sleepScore)"
            strokeWidth={1.5}
            dot={{
              fill: "var(--color-sleepScore)",
              r: 2,
            }}
            activeDot={{
              r: 3,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

type MetricSummaryProps = {
  metricData: DashboardMetricResponse;
};

const MetricSummary = ({ metricData }: MetricSummaryProps) => {
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
