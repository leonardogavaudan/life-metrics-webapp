import type { FunctionComponent } from "react";
import { Card } from "@/components/ui/card";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>Some dashboard content</Card>
    </div>
  );
};

export default Dashboard;
