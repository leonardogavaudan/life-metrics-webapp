import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { IntegrationsPage } from "./pages/Integrations";
import SettingsPage from "./pages/Settings";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toast";

const Root = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Outlet />
      <Toaster />
    </div>
  );
};

const ProtectedLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const ProtectedRoutes = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Root />}>
          <Route element={<ProtectedRoutes />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export { App };
