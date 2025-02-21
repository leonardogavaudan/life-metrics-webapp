import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { MetricsPreferencesResponse } from "@/types/metrics";

export const useMetricsPreferences = () => {
  return useQuery({
    queryKey: ["metrics-preferences"],
    queryFn: async () => {
      const dummyData = [
        {
          id: "1",
          name: "Sleep Duration",
          category: "Sleep",
          selectedProviderId: "oura-123",
          supportedProviders: [
            {
              provider: "Oura",
              providerId: "oura-123",
              isIntegrated: true,
            },
            {
              provider: "Fitbit",
              providerId: "fitbit",
              isIntegrated: false,
            },
          ],
        },
        {
          id: "2",
          name: "Sleep Quality",
          category: "Sleep",
          selectedProviderId: "fitbit",
          supportedProviders: [
            {
              provider: "Oura",
              providerId: "oura-123",
              isIntegrated: true,
            },
            {
              provider: "Fitbit",
              providerId: "fitbit",
              isIntegrated: true,
            },
            {
              provider: "Apple Health",
              providerId: "apple_health",
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
