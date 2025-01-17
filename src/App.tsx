import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const Root = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Outlet />
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

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Root />}>
          <Route element={<ProtectedLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export { App };
