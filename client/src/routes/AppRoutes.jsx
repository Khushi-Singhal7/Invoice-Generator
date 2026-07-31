import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import CompanySettings from "../pages/CompanySettings";
import CreateInvoice from "../pages/CreateInvoice";
import Preview from "../pages/Preview";
import NotFound from "../pages/NotFound";
import OAuthSuccess from "../pages/OAuthSuccess";
import Profile from "../pages/Profile";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company-settings"
        element={
          <ProtectedRoute>
            <CompanySettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-invoice"
        element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-invoice/:id"
        element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/preview/:id"
        element={
          <ProtectedRoute>
            <Preview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;