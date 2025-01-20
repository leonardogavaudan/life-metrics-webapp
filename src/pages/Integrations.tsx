import { OuraIcon } from "@/components/icons/OuraIcon";
import { IntegrationCard } from "@/components/IntegrationCard";

export const IntegrationsPage = () => {
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
          <div className="col-span-full">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-semibold text-gray-50">
                Connected Services
              </h2>
              <p className="mt-2 text-gray-400">
                Manage your active integrations and data sources
              </p>
            </div>
          </div>

          <IntegrationCard
            title="Oura Ring"
            description="Sleep tracking, readiness scores, and activity data"
            icon={<OuraIcon className="text-gray-200" size={45} />}
            buttonText="Manage Connection"
            status="connected"
          />
        </div>
      </div>
    </div>
  );
};
