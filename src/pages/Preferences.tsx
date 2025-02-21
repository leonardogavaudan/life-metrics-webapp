import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMetricsPreferences } from "@/hooks/useMetricsPreferences";
import { MetricCard } from "@/components/MetricCard";
import { CATEGORIES } from "@/types/metrics";

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

  const getMetricsByCategory = (category: string) => {
    return metrics.filter((metric) => metric.category === category);
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
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
