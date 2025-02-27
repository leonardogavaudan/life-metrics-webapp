import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { MetricDataPoint } from "@/types/metrics";
import { format } from "date-fns/format";
import {
  TooltipProps,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

const chartConfig = {
  sleepScore: {
    label: "Sleep Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type MetricChartProps = {
  data: MetricDataPoint[];
  formatDate: (timestamp: string) => string;
};

export const MetricChart = ({ data, formatDate }: MetricChartProps) => {
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
