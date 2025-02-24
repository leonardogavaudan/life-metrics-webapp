import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserMetricPreferences } from "@/hooks/useUserMetricPreferences";
import { MetricCard } from "@/components/MetricCard";
import {
  Categories,
  CategoriesToDisplayNames,
  Category,
} from "@/types/metrics";

export const PreferencesPage = () => {
  const { data: metrics, isLoading } = useUserMetricPreferences();

  const getMetricsByCategory = (category: Category) => {
    return metrics?.filter((metric) => metric.category === category) || [];
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-gray-50">
            Preferences
          </h1>
          <p className="mt-2 text-gray-400">
            Customize how you track and visualize your metrics
          </p>
        </header>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Tabs
            defaultValue={Object.values(Categories)[0].toLowerCase()}
            className="w-full"
          >
            <TabsList className="mb-4 w-full">
              {Object.values(Categories).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category.toLowerCase()}
                  className="flex-1"
                >
                  {CategoriesToDisplayNames[category]}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.values(Categories).map((category) => (
              <TabsContent key={category} value={category.toLowerCase()}>
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
                  {getMetricsByCategory(category).map((metric) => (
                    <MetricCard key={metric.type} metric={metric} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
};
