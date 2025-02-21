export type Category = 'Sleep' | 'Activity' | 'General';

export const CATEGORIES: Category[] = ['Sleep', 'Activity', 'General'];

type BaseProvider = {
  provider: string;
};

type IntegratedProvider = BaseProvider & {
  isIntegrated: true;
  providerId: string;
};

type UnintegratedProvider = BaseProvider & {
  isIntegrated: false;
};

export type SupportedProvider = IntegratedProvider | UnintegratedProvider;

export type Metric = {
  name: string;
  category: Category;
  supportedProviders: SupportedProvider[];
  selectedProviderId?: string;
};

export type MetricsPreferencesResponse = {
  metrics: Metric[];
};
