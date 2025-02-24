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

export type MetricsPreferencesResponse = {
  metrics: Metric[];
};
