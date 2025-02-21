export type Category = 'Sleep' | 'Activity' | 'Other';

export const CATEGORIES: Category[] = ['Sleep', 'Activity', 'Other'];

export type Provider = {
  provider: string;
  isIntegrated: boolean;
};

export type Metric = {
  name: string;
  displayName: string;
  category: Category;
  supportedProviders: Provider[];
  selectedProvider?: string;
};

export type MetricsPreferencesResponse = {
  metrics: Metric[];
};
