import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { MetricsPreferencesResponse } from "@/types/metrics";

export const useUserMetricPreferences = () => {
  return useQuery({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const { data } = await api.get<MetricsPreferencesResponse>(
        "/user-preferences"
      );
      return data.metrics;
    },
  });
};
