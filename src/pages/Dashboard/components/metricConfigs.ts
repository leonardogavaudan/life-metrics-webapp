import { MetricType } from "@/types/metrics";

// Type for grid coordinate generator props
export interface GridCoordinateProps {
  yAxis: {
    height: number;
  };
}

// Define the horizontal coordinates generator type
export type HorizontalCoordinatesGenerator = (
  props: GridCoordinateProps
) => number[];

// Interface for metric configuration
export interface MetricConfig {
  valueLabel: string;
  colorVar: string;
  yAxisConfig: {
    domain: [number, number] | undefined;
    ticks: number[] | undefined;
    tickCount: number;
  };
  gridConfig?: {
    values: number[];
    domain: [number, number];
  };
}

// Metric-specific configurations
export const metricConfigs: Record<MetricType, MetricConfig> = {
  [MetricType.DailySleepScore]: {
    valueLabel: "Score",
    colorVar: "var(--color-sleepScore)",
    yAxisConfig: {
      domain: [0, 100],
      ticks: [0, 20, 40, 60, 80, 100],
      tickCount: 6,
    },
    gridConfig: {
      values: [0, 20, 40, 60, 80, 100],
      domain: [0, 100],
    },
  },
  [MetricType.DailySteps]: {
    valueLabel: "Steps",
    colorVar: "var(--color-steps)",
    yAxisConfig: {
      domain: undefined,
      ticks: undefined,
      tickCount: 5,
    },
    gridConfig: undefined,
  },
  [MetricType.DailyTotalCalories]: {
    valueLabel: "Calories",
    colorVar: "var(--color-calories)",
    yAxisConfig: {
      domain: undefined,
      ticks: undefined,
      tickCount: 5,
    },
    gridConfig: undefined,
  },
};
