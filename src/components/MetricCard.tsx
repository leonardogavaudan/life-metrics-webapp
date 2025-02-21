import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Metric } from "@/types/metrics";

interface MetricCardProps {
  metric: Metric;
}

export const MetricCard = ({ metric }: MetricCardProps) => {
  const integratedProviders = metric.supportedProviders.filter(
    (provider) => provider.isIntegrated
  );

  return (
    <div className="flex items-center justify-between py-1.5 px-4 border-b border-gray-700 last:border-b-0">
      <div className="text-gray-200">{metric.displayName}</div>
      <Select
        value={metric.selectedProvider}
        disabled={integratedProviders.length === 0}
      >
        <SelectTrigger className="w-[180px] !border !border-gray-700 dark:!border-gray-700 focus:!border-gray-500">
          <SelectValue placeholder="Select provider" />
        </SelectTrigger>
        <SelectContent>
          {metric.supportedProviders.map((provider) => (
            <SelectItem
              key={provider.provider}
              value={provider.provider}
              disabled={!provider.isIntegrated}
            >
              {provider.provider}
              {!provider.isIntegrated && " (Not Integrated)"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
