import { useEffect, useState } from "react";
import {
  FaFileInvoice,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { getInvoices } from "../../services/invoiceService";
import "./DashboardCards.css";

function DashboardCards() {
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    paidInvoices: 0,
    overdueInvoices: 0,
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await getInvoices();

      const invoices = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];

      let revenue = 0;
      let paid = 0;
      let pending = 0;
      let overdue = 0;

      invoices.forEach((invoice) => {
        revenue += Number(invoice.grandTotal || 0);

        const status = (invoice.status || "").toUpperCase();

        if (status === "PAID") paid++;
        else if (status === "PENDING") pending++;
        else if (status === "OVERDUE") overdue++;
      });

      setStats({
        totalInvoices: invoices.length,
        totalRevenue: revenue,
        pendingInvoices: pending,
        paidInvoices: paid,
        overdueInvoices: overdue,
      });

    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const cards = [
    {
      title: "Total Invoices",
      value: stats.totalInvoices,
      subtitle: "All invoices",
      icon: <FaFileInvoice />,
      color: "#6366f1",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      subtitle: "Revenue Generated",
      icon: <FaRupeeSign />,
      color: "#10b981",
    },
    {
      title: "Pending",
      value: stats.pendingInvoices,
      subtitle: "Awaiting Payment",
      icon: <FaClock />,
      color: "#f59e0b",
    },
    {
      title: "Paid",
      value: stats.paidInvoices,
      subtitle: "Completed",
      icon: <FaCheckCircle />,
      color: "#06b6d4",
    },
    {
      title: "Overdue",
      value: stats.overdueInvoices,
      subtitle: "Past Due",
      icon: <FaExclamationTriangle />,
      color: "#ef4444",
    },
  ];

  return (
    <div className="row g-4">

      {cards.map((card, index) => (

        <div
          key={index}
          className="col-12 col-sm-6 col-lg-4 col-xxl"
        >

          <div className="dashboard-card">

            <div
              className="dashboard-icon"
              style={{ background: card.color }}
            >
              {card.icon}
            </div>

            <div className="dashboard-content">
              <h6>{card.title}</h6>
              <h2>{card.value}</h2>
              <p>{card.subtitle}</p>
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;