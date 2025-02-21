import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMetricsPreferences } from "@/hooks/useMetricsPreferences";
import type { Category, Metric } from "@/types/metrics";

const CATEGORIES: Category[] = ["Sleep", "Activity", "General"];

export const PreferencesPage = () => {
  const { data: metrics, isLoading } = useMetricsPreferences();

  if (isLoading || !metrics) {
    return (
      <div className="container max-w-2xl mx-auto py-6">
        <h1 className="text-xl font-bold mb-6 text-gray-200">Preferences</h1>
        <p>Loading...</p>
      </div>
    );
  }

  const getMetricsByCategory = (category: Category) =>
    metrics.filter((metric) => metric.category === category);

  const MetricCard = ({ metric }: { metric: Metric }) => {
    const integratedProviders = metric.supportedProviders.filter(
      (
        provider
      ): provider is {
        provider: string;
        isIntegrated: true;
        providerId: string;
      } => provider.isIntegrated
    );

    return (
      <div className="flex items-center justify-between py-1.5 px-4 border-b border-gray-700 last:border-b-0">
        <div className="text-gray-200">{metric.name}</div>
        <Select
          value={metric.selectedProviderId}
          disabled={integratedProviders.length === 0}
        >
          <SelectTrigger className="w-[180px] !border !border-gray-700 dark:!border-gray-700 focus:!border-gray-500">
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            {metric.supportedProviders.map((provider) => (
              <SelectItem
                key={provider.provider}
                value={
                  provider.isIntegrated
                    ? provider.providerId
                    : provider.provider
                }
                disabled={!provider.isIntegrated}
              >
                {provider.provider}
                {!provider.isIntegrated && " (Not Integrated)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <div className="container max-w-2xl mx-auto py-6">
      <h1 className="text-xl font-bold mb-6 text-gray-200">Preferences</h1>
      <Tabs defaultValue={CATEGORIES[0].toLowerCase()} className="w-full">
        <TabsList className="mb-4 w-full">
          {CATEGORIES.map((category) => (
            <TabsTrigger
              key={category}
              value={category.toLowerCase()}
              className="flex-1"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((category) => (
          <TabsContent key={category} value={category.toLowerCase()}>
            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
              {getMetricsByCategory(category).map((metric) => (
                // @ts-ignore
                <MetricCard key={metric.name} metric={metric} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
