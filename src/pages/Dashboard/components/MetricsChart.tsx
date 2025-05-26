import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  GridCoordinateProps,
  HorizontalCoordinatesGenerator,
  metricConfigs,
} from "@/pages/Dashboard/components/metricConfigs";
import { formatSecondsToHoursMinutes } from "@/pages/Dashboard/components/utils";
import { MetricDataPoint, MetricType } from "@/types/metrics";
import { format } from "date-fns/format";
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

// Chart configuration for different metric types
const chartConfig = {
  sleepScore: {
    label: "Sleep Score",
    color: "hsl(var(--chart-1))",
  },
  steps: {
    label: "Steps",
    color: "hsl(var(--chart-2))",
  },
  calories: {
    label: "Calories",
    color: "hsl(var(--chart-3))",
  },
  sleep: {
    label: "Sleep",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type MetricChartProps = {
  data: MetricDataPoint[];
  formatDate: (timestamp: string) => string;
  metricType: MetricType;
};

export const MetricChart = ({
  data,
  formatDate,
  metricType,
}: MetricChartProps) => {
  // Get the configuration for the current metric type
  const config = metricConfigs[metricType];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = format(date, "yyyy-MM-dd");
      const value = payload[0].value;

      // Format the value based on the metric type
      const displayValue =
        metricType === MetricType.DailyTotalSleep && typeof value === "number"
          ? formatSecondsToHoursMinutes(value)
          : value;

      return (
        <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-md dark:border-slate-800 dark:bg-slate-950">
          <p className="font-medium">{formattedDate}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">{config.valueLabel}: </span>
            <span className="font-mono font-medium">{displayValue}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  // Create a grid coordinates generator if needed
  const gridCoordinatesGenerator: HorizontalCoordinatesGenerator | undefined =
    config.gridConfig
      ? (props: GridCoordinateProps) => {
          const { height } = props.yAxis;
          const { domain, values } = config.gridConfig!;

          return values.map((value: number) => {
            const ratio = (value - domain[0]) / (domain[1] - domain[0]);
            return height * (1 - ratio);
          });
        }
      : undefined;

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
            horizontalCoordinatesGenerator={gridCoordinatesGenerator}
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
            domain={config.yAxisConfig.domain}
            ticks={config.yAxisConfig.ticks}
            tickCount={config.yAxisConfig.tickCount}
            tickFormatter={
              metricType === MetricType.DailyTotalSleep
                ? (value) =>
                    typeof value === "number"
                      ? formatSecondsToHoursMinutes(value)
                      : ""
                : undefined
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            dataKey="value"
            type="monotone"
            stroke={config.colorVar}
            strokeWidth={1.5}
            dot={{
              fill: config.colorVar,
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
