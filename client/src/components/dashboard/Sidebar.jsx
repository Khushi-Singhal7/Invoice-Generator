import {
  FaChartPie,
  FaFileInvoice,
  FaUsers,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>

      <div>

        <div className="logo">
          <h2>InvoiceFlow</h2>
          <p>Invoice Management</p>
        </div>

        <nav>

          <NavLink to="/dashboard" className="menu-item">
            <FaChartPie />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/create-invoice" className="menu-item">
            <FaFileInvoice />
            <span>Create Invoice</span>
          </NavLink>

          <NavLink to="/clients" className="menu-item">
            <FaUsers />
            <span>Clients</span>
          </NavLink>

          <NavLink to="/company-settings" className="menu-item">
            <FaCog />
            <span>Company Settings</span>
          </NavLink>
          <NavLink to="/profile" className="menu-item">
            <FaUserCircle />
            <span>Profile</span>
          </NavLink>

        </nav>

      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;