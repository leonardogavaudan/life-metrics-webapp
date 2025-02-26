import { Provider } from "./integration";

export const Categories = {
  Sleep: "sleep",
  Activity: "activity",
  Other: "other",
} as const;
export type Category = (typeof Categories)[keyof typeof Categories];

export const CategoriesToDisplayNames = {
  sleep: "Sleep",
  activity: "Activity",
  other: "Other",
} as const;

export type SupportedProvider = {
  provider: Provider;
  isIntegrated: boolean;
};

export type Metric = {
  type: string;
  displayName: string;
  category: Category;
  supportedProviders: SupportedProvider[];
  selectedProvider?: string;
};

export const MetricType = {
  DailySleepScore: "daily_sleep_score",
} as const;
export type MetricType = (typeof MetricType)[keyof typeof MetricType];

export type MetricsPreferencesResponse = {
  metrics: Metric[];
};

export const TimeRange = {
  Week: "week",
  FourWeek: "4_week",
  ThreeMonth: "3_month",
  OneYear: "1_year",
  FiveYear: "5_year",
  AllTime: "all_time",
} as const;
export type TimeRange = (typeof TimeRange)[keyof typeof TimeRange];

export const AggregationType = {
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly",
  Quarterly: "quarterly",
  Yearly: "yearly",
} as const;
export type AggregationType =
  (typeof AggregationType)[keyof typeof AggregationType];

export interface MetricDataPoint {
  timestamp: string;
  value: number;
}

export interface DashboardMetricResponse {
  data: MetricDataPoint[];
  metadata: {
    metricType: string;
    timeRange: TimeRange;
    aggregation: AggregationType;
    unit: string;
    summary?: {
      average?: number;
      trend?: number;
      changePercentage?: number;
    };
  };
}
