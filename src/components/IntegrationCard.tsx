import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type IntegrationCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  buttonText: string;
  status: "connected" | "disconnected";
  onManage?: () => void;
};

export const IntegrationCard = ({
  title,
  description,
  icon,
  buttonText,
  status,
  onManage,
}: IntegrationCardProps) => {
  return (
    <div className="group relative bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-50">{title}</h3>
          <p className="mt-1 text-gray-400 text-sm">{description}</p>
          <div className="mt-4">
            <Button variant="outline" className="gap-2" onClick={onManage}>
              {buttonText}
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-full",
            status === "connected"
              ? "bg-emerald-900/30 text-emerald-400"
              : "bg-rose-900/30 text-rose-400"
          )}
        >
          {status === "connected" ? "Connected" : "Disconnected"}
        </div>
      </div>
    </div>
  );
};
