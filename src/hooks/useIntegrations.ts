import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { IntegrationsResponse } from "@/types/integration";

export const useIntegrations = () => {
  return useQuery({
    queryKey: ["integrations"],
    queryFn: async () => {
      const { data } = await api.get<IntegrationsResponse>("/integrations");
      return data.integrations;
    },
  });
};
