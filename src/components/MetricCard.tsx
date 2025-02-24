import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Metric } from "@/types/metrics";
import { api } from "@/lib/axios";
import { ProvidersToDisplayNames } from "../types/integration";

interface MetricCardProps {
  metric: Metric;
}

export const MetricCard = ({ metric }: MetricCardProps) => {
  const queryClient = useQueryClient();

  const { mutate: updateProvider } = useMutation({
    mutationFn: async (provider: string | null) => {
      if (provider === null) {
        await api.delete(`/user-preferences/${metric.type}`);
      } else {
        await api.put(`/user-preferences/${metric.type}`, {
          provider,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-preferences"] });
    },
  });

  const integratedProviders = metric.supportedProviders.filter(
    (provider) => provider.isIntegrated
  );

  const handleProviderChange = (value: string) => {
    updateProvider(value === "none" ? null : value);
  };

  return (
    <div className="flex items-center justify-between py-1.5 px-4 border-b border-gray-700 last:border-b-0">
      <div className="text-gray-200">{metric.displayName}</div>
      <Select
        value={metric.selectedProvider ?? "none"}
        onValueChange={handleProviderChange}
        disabled={integratedProviders.length === 0}
      >
        <SelectTrigger className="w-[180px] !border !border-gray-700 dark:!border-gray-700 focus:!border-gray-500">
          <SelectValue placeholder="Select provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {metric.supportedProviders.map((supportedProvider) => (
            <SelectItem
              key={supportedProvider.provider}
              value={supportedProvider.provider}
              disabled={!supportedProvider.isIntegrated}
            >
              {ProvidersToDisplayNames[supportedProvider.provider]}
              {!supportedProvider.isIntegrated && " (Not Integrated)"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
