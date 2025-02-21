import { useQuery } from "@tanstack/react-query";
// import { api } from "@/lib/axios";
// import type { MetricsPreferencesResponse } from "@/types/metrics";

export const useMetricsPreferences = () => {
  return useQuery({
    queryKey: ["metrics-preferences"],
    queryFn: async () => {
      const dummyData = [
        {
          name: "sleep_duration",
          displayName: "Sleep Duration",
          category: "Sleep",
          selectedProvider: "Oura",
          supportedProviders: [
            {
              provider: "Oura",
              isIntegrated: true,
            },
            {
              provider: "Fitbit",
              isIntegrated: false,
            },
          ],
        },
        {
          name: "sleep_quality",
          displayName: "Sleep Quality",
          category: "Sleep",
          selectedProvider: "Fitbit",
          supportedProviders: [
            {
              provider: "Oura",
              isIntegrated: true,
            },
            {
              provider: "Fitbit",
              isIntegrated: true,
            },
            {
              provider: "Apple Health",
              isIntegrated: false,
            },
          ],
        },
      ];
      return dummyData;
      // const { data } = await api.get<MetricsPreferencesResponse>("/metrics/preferences");
      // return data.metrics;
    },
  });
};
