import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IntegrationStatus } from "@/types/integration";
import { ReactNode } from "react";

type IntegrationCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  status: IntegrationStatus;
  onAction?: () => void;
  onSync?: () => void;
};

export const IntegrationCard = ({
  title,
  description,
  icon,
  status,
  onAction,
  onSync,
}: IntegrationCardProps) => {
  return (
    <div className="group relative bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors min-h-[160px]">
      <div
        className={cn(
          "absolute top-4 right-4 px-3 py-1 text-sm font-medium rounded-full",
          {
            "bg-green-950 text-green-400":
              status === IntegrationStatus.Connected,
            "bg-blue-950 text-blue-400": status === IntegrationStatus.Available,
            "bg-slate-800 text-slate-400":
              status === IntegrationStatus.ComingSoon,
          }
        )}
      >
        {status === IntegrationStatus.Connected
          ? "Connected"
          : status === IntegrationStatus.Available
          ? "Available"
          : "Coming Soon"}
      </div>

      <div className="flex items-start gap-5">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-50">{title}</h3>
          <p className="mt-1 text-gray-400 text-sm">{description}</p>
          <div className="mt-4 flex gap-2">
            {status !== IntegrationStatus.ComingSoon && (
              <Button variant="outline" className="gap-2" onClick={onAction}>
                {status === IntegrationStatus.Connected ? "Remove" : "Add"}
              </Button>
            )}
            {status === IntegrationStatus.Connected && onSync && (
              <Button variant="secondary" className="gap-2" onClick={onSync}>
                Sync History
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
