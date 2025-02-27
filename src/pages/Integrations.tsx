import { AppleHealthIcon } from "@/components/icons/AppleHealthIcon";
import { CorosIcon } from "@/components/icons/CorosIcon";
import { FitbitIcon } from "@/components/icons/FitbitIcon";
import { GarminIcon } from "@/components/icons/GarminIcon";
import { OuraIcon } from "@/components/icons/OuraIcon";
import { WhoopIcon } from "@/components/icons/WhoopIcon";
import { IntegrationCard } from "@/components/IntegrationCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteIntegration, useIntegrations } from "@/hooks/useIntegrations";
import { api } from "@/lib/axios";
import { Integration, IntegrationStatus } from "@/types/integration";
import { format, subMonths } from "date-fns";
import { useState } from "react";

export const IntegrationsPage = () => {
  const { data: integrations, isLoading, error } = useIntegrations();
  const deleteIntegration = useDeleteIntegration();
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Function to handle historical sync
  const handleHistoricalSync = async () => {
    if (!selectedIntegration) return;

    setIsSyncing(true);
    try {
      const endDate = new Date();
      const startDate = subMonths(endDate, 6); // 6 months ago

      await api.post("/historical-sync", {
        provider: selectedIntegration.provider,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      });

      // Show success message or notification here if needed
      setSyncDialogOpen(false);
    } catch (error) {
      console.error("Failed to sync historical data:", error);
      // Show error message here if needed
    } finally {
      setIsSyncing(false);
    }
  };

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

  const statusOrder = {
    [IntegrationStatus.Connected]: 0,
    [IntegrationStatus.Available]: 1,
    [IntegrationStatus.ComingSoon]: 2,
  };
  const sortedIntegrations = integrations?.sort((a, b) => {
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
                    await deleteIntegration.mutateAsync(integration.id);
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
              onSync={
                integration.status === IntegrationStatus.Connected
                  ? () => {
                      setSelectedIntegration(integration);
                      setSyncDialogOpen(true);
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Historical Sync Dialog */}
      <Dialog open={syncDialogOpen} onOpenChange={setSyncDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sync Historical Data</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-400">
              This will sync your data from {selectedIntegration?.name} for the
              past 6 months. The process may take a few minutes to complete.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSyncDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleHistoricalSync} disabled={isSyncing}>
              {isSyncing ? "Syncing..." : "Sync Data"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
