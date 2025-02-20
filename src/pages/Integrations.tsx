import { api } from "@/lib/axios";
import { OuraIcon } from "@/components/icons/OuraIcon";
import { WhoopIcon } from "@/components/icons/WhoopIcon";
import { FitbitIcon } from "@/components/icons/FitbitIcon";
import { AppleHealthIcon } from "@/components/icons/AppleHealthIcon";
import { GarminIcon } from "@/components/icons/GarminIcon";
import { CorosIcon } from "@/components/icons/CorosIcon";
import { IntegrationCard } from "@/components/IntegrationCard";
import { useIntegrations } from "@/hooks/useIntegrations";
import { Integration, IntegrationStatus } from "@/types/integration";

export const IntegrationsPage = () => {
  const { data: integrations, isLoading, error } = useIntegrations();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-slate-800 rounded w-1/4"></div>
          <div className="h-40 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-rose-900/30 border border-rose-700 rounded-lg p-4">
          <p className="text-rose-400">Failed to load integrations</p>
        </div>
      </div>
    );
  }

  const sortedIntegrations = integrations?.sort((a, b) => {
    const statusOrder = {
      [IntegrationStatus.Connected]: 0,
      [IntegrationStatus.Available]: 1,
      [IntegrationStatus.ComingSoon]: 2,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-gray-50">
            Integrations
          </h1>
          <p className="mt-2 text-gray-400">
            Connect third-party services to enhance your life tracking
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedIntegrations?.map((integration: Integration) => (
            <IntegrationCard
              key={integration.provider}
              title={integration.name}
              description={integration.description}
              icon={
                integration.provider === "oura" ? (
                  <OuraIcon className="text-gray-200" size={45} />
                ) : integration.provider === "whoop" ? (
                  <WhoopIcon className="text-gray-200" size={45} />
                ) : integration.provider === "fitbit" ? (
                  <FitbitIcon className="text-gray-200" size={45} />
                ) : integration.provider === "apple_health" ? (
                  <AppleHealthIcon className="text-gray-200" size={45} />
                ) : integration.provider === "garmin" ? (
                  <GarminIcon className="text-gray-200" size={45} />
                ) : integration.provider === "coros" ? (
                  <CorosIcon className="text-gray-200" size={45} />
                ) : null
              }
              status={integration.status}
              onAction={async () => {
                if (integration.status === IntegrationStatus.Connected) {
                  try {
                    await api.delete(`/integrations/${integration.id}`);
                  } catch (error) {
                    console.error("Failed to disconnect integration:", error);
                  }
                  return;
                }

                try {
                  const response = await api.get(
                    `/integrations/oauth/authorize/${integration.provider}`
                  );
                  window.location.href = response.data.url;
                } catch (error) {
                  console.error("Failed to get authorization URL:", error);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
