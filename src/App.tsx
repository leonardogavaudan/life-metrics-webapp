import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { Outlet } from "react-router-dom";

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
    <Routes>
      <Route element={<Root />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export { App };
