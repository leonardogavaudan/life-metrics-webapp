import { OuraIcon } from "@/components/icons/OuraIcon";

export const IntegrationsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integrations</h1>
      <div className="grid gap-4">
        <div className="p-4 bg-slate-700 rounded-lg">
          <h2 className="text-lg font-semibold">Connect Services</h2>
          <p className="text-gray-300">
            Manage your connected apps and services
          </p>
        </div>

        <div className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg">
          <OuraIcon className="text-gray-200" size={45} />
          <div>
            <h3 className="font-semibold">Oura Ring</h3>
            <p className="text-gray-300">Connect your Oura Ring data</p>
          </div>
        </div>
      </div>
    </div>
  );
};
