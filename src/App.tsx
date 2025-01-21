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
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Toaster } from "@/components/ui/toast";
import { OAuthCallback } from "./pages/OAuthCallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<Root />}>
            <Route element={<ProtectedRoutes />}>
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/integrations" element={<IntegrationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                  path="/integrations/oauth/callback"
                  element={<OAuthCallback />}
                />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export { App };
