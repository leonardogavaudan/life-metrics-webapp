import { useQuery } from "@tanstack/react-query";
import { DashboardMetricResponse, TimeRange } from "@/types/metrics";
import { api } from "@/lib/axios";
import { showApiError } from "@/lib/api-error";

interface UseMetricDataParams {
  metric: string;
  timeRange: TimeRange;
}

const fetchMetricData = async ({
  metric,
  timeRange,
}: UseMetricDataParams): Promise<DashboardMetricResponse> => {
  try {
    const { data } = await api.get<DashboardMetricResponse>(
      "/metrics/dashboard",
      {
        params: {
          metric,
          timeRange,
        },
      }
    );

    return data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Error fetching metric data:", error);
    }
    throw error;
  }
};

export const useMetricData = ({ metric, timeRange }: UseMetricDataParams) => {
  return useQuery({
    queryKey: ["metric", metric, timeRange],
    queryFn: async () => {
      try {
        return await fetchMetricData({ metric, timeRange });
      } catch (error) {
        showApiError(error, "Failed to load metric data");
        throw error;
      }
    },
  });
};
