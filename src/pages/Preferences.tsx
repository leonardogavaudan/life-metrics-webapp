import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMetricsPreferences } from "@/hooks/useMetricsPreferences";
import { MetricCard } from "@/components/MetricCard";
import { CATEGORIES } from "@/types/metrics";

export const PreferencesPage = () => {
  const { data: metrics, isLoading } = useMetricsPreferences();

  if (isLoading || !metrics) {
    return (
      <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-gray-50">Preferences</h1>
          <p className="mt-2 text-gray-400">Customize how you track and visualize your metrics</p>
        </header>
        <p>Loading...</p>
      </div>
    );
  }

  const getMetricsByCategory = (category: string) => {
    return metrics.filter((metric) => metric.category === category);
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-gray-50">Preferences</h1>
          <p className="mt-2 text-gray-400">Customize how you track and visualize your metrics</p>
        </header>

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
    </div>
  );
};
