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
  rollingAverage: {
    label: "Rolling Average",
    color: "#ef4444",
  },
} satisfies ChartConfig;

type MetricChartProps = {
  data: MetricDataPoint[];
  formatDate: (timestamp: string) => string;
  metricType: MetricType;
  showRollingAverage?: boolean;
  rollingAverageWindow?: number;
};

export const MetricChart = ({
  data,
  formatDate,
  metricType,
  showRollingAverage = true,
  rollingAverageWindow = 7,
}: MetricChartProps) => {
  // Get the configuration for the current metric type
  const config = metricConfigs[metricType];

  // Calculate rolling average
  const calculateRollingAverage = (data: MetricDataPoint[], window: number) => {
    return data.map((point, index) => {
      const start = Math.max(0, index - window + 1);
      const slice = data.slice(start, index + 1);
      const validValues = slice
        .map((p) => p.value)
        .filter(
          (value) => value !== 0 && value !== null && value !== undefined
        );

      const average =
        validValues.length > 0
          ? validValues.reduce((sum, val) => sum + val, 0) / validValues.length
          : null;

      return {
        ...point,
        rollingAverage: average,
      };
    });
  };

  // Process data to replace zero values with null and add rolling average
  const processedData = calculateRollingAverage(data, rollingAverageWindow).map(
    (point) => ({
      ...point,
      value: point.value === 0 ? null : point.value,
    })
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = format(date, "yyyy-MM-dd");

      // Find the actual value and rolling average from payload
      const actualPayload = payload.find((p) => p.dataKey === "value");
      const rollingPayload = payload.find(
        (p) => p.dataKey === "rollingAverage"
      );

      const actualValue = actualPayload?.value;
      const rollingValue = rollingPayload?.value;

      // Format the values based on the metric type
      const formatValue = (value: number | null | undefined) =>
        metricType === MetricType.DailyTotalSleep && typeof value === "number"
          ? formatSecondsToHoursMinutes(value)
          : value;

      return (
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-xl backdrop-blur-sm">
          <p className="font-semibold text-white">{formattedDate}</p>
          {actualValue !== null && actualValue !== undefined && (
            <p className="text-sm">
              <span className="text-slate-400">
                {config.valueLabel}:{" "}
              </span>
              <span className="font-mono font-semibold text-white">
                {formatValue(actualValue)}
              </span>
            </p>
          )}
          {showRollingAverage &&
            rollingValue !== null &&
            rollingValue !== undefined && (
              <p className="text-sm">
                <span className="text-slate-400">
                  {rollingAverageWindow}-day avg:{" "}
                </span>
                <span className="font-mono font-semibold text-red-400">
                  {formatValue(rollingValue)}
                </span>
              </p>
            )}
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
          data={processedData}
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
            stroke="rgb(51, 65, 85)"
            strokeOpacity={0.3}
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
            strokeWidth={2}
            connectNulls={false}
            dot={{
              fill: config.colorVar,
              r: 2,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 4,
              stroke: config.colorVar,
              strokeWidth: 2,
              fill: "rgb(2, 6, 23)",
            }}
          />
          {showRollingAverage && (
            <Line
              dataKey="rollingAverage"
              type="monotone"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls={true}
              name={`${rollingAverageWindow}-day average`}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
