import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getInvoices } from "../../services/invoiceService";
import { useTheme } from "../../context/ThemeContext";
import "./RevenueChart.css";

function RevenueChart() {
  const [chartData, setChartData] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {
    try {
      const response = await getInvoices();
      const invoices = response.data || [];

      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      const revenue = Array(12).fill(0);

      invoices.forEach((invoice) => {
        if (!invoice.issueDate) return;

        const month = new Date(invoice.issueDate).getMonth();
        revenue[month] += Number(invoice.grandTotal || 0);
      });

      setChartData(
        months.map((month, index) => ({
          month,
          revenue: revenue[index],
        }))
      );
    } catch (error) {
      console.error("Failed to load revenue:", error);
    }
  };

  return (
    <div className="chart-card">

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h4 className="fw-bold mb-1">Revenue Overview</h4>
          <small>Monthly Revenue</small>
        </div>
      </div>

      <div className="revenue-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#6366f1"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="#6366f1"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke={darkMode ? "#334155" : "#e5e7eb"}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: darkMode ? "#f8fafc" : "#1f2937",
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fill: darkMode ? "#f8fafc" : "#1f2937",
                fontSize: 12,
              }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              contentStyle={{
                background: darkMode ? "#1e293b" : "#ffffff",
                border: "none",
                borderRadius: "12px",
                color: darkMode ? "#ffffff" : "#111827",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              fill="url(#colorRevenue)"
              stroke="none"
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default RevenueChart;