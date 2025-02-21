import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useDeleteIntegration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (integrationId: string) => {
      await api.delete(`/integrations/${integrationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
  });
};
