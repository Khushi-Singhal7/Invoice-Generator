import { useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "./DashboardLayout.css";

function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard">

      <Sidebar isOpen={sidebarOpen} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <div className="dashboard-content">
        <button
          className="menu-toggle"
          onClick={() => {
            console.log("Clicked");
            console.log("Current:", sidebarOpen);
            setSidebarOpen((prev) => !prev);
          }}
        >
          <FaBars />
        </button>

        <Topbar />

        {children}

      </div>

    </div>
  );
}

export default DashboardLayout;