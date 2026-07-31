import { useEffect, useState } from "react";
import "./Topbar.css";
import {
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode } = useTheme();

  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  const pageConfig = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Welcome back 👋",
    },
    "/create-invoice": {
      title: "Create Invoice",
      subtitle: "Create a new invoice",
    },
    "/clients": {
      title: "Clients",
      subtitle: "Manage your clients",
    },
    "/company-settings": {
      title: "Company Settings",
      subtitle: "Manage your company profile",
    },
  };

  const currentPage =
    pageConfig[location.pathname] || {
      title: "Dashboard",
      subtitle: "Welcome back 👋",
    };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>{currentPage.title}</h2>
        <p>{currentPage.subtitle}</p>
      </div>

      <div className="topbar-right">

        <button
          type="button"
          className="theme-btn"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle Theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="profile">
          <FaUserCircle size={34} />
          <span>{userName}</span>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/create-invoice")}
        >
          + Create Invoice
        </button>

      </div>
    </div>
  );
}

export default Topbar;