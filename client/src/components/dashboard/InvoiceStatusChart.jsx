import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getInvoices } from "../../services/invoiceService";
import { useTheme } from "../../context/ThemeContext";
import "./InvoiceStatusChart.css";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function InvoiceStatusChart() {
  const [chartData, setChartData] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchInvoiceStatus();
  }, []);

  const fetchInvoiceStatus = async () => {
    try {
      const response = await getInvoices();

      const invoices = Array.isArray(response?.data)
        ? response.data
        : [];

      let paid = 0;
      let pending = 0;
      let overdue = 0;

      invoices.forEach((invoice) => {
        const status = String(invoice.status || "")
          .trim()
          .toLowerCase();

        switch (status) {
          case "paid":
            paid++;
            break;
          case "pending":
            pending++;
            break;
          case "overdue":
            overdue++;
            break;
          default:
            break;
        }
      });

      const data = [
        {
          name: "Paid",
          value: paid,
        },
        {
          name: "Pending",
          value: pending,
        },
        {
          name: "Overdue",
          value: overdue,
        },
      ].filter((item) => item.value > 0);

      if (data.length === 0) {
        setChartData([
          {
            name: "No Data",
            value: 1,
          },
        ]);
      } else {
        setChartData(data);
      }
    } catch (error) {
      console.error(error);

      setChartData([
        {
          name: "No Data",
          value: 1,
        },
      ]);
    }
  };

  return (
    <div className="chart-card">

      <h4 className="fw-bold mb-3">
        Invoice Status
      </h4>

      <div className="status-chart-wrapper">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
              cornerRadius={8}
              stroke="none"
              label={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.name === "No Data"
                      ? "#CBD5E1"
                      : COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                `${value} Invoice(s)`,
                name,
              ]}
              contentStyle={{
                background: darkMode
                  ? "#1e293b"
                  : "#ffffff",
                color: darkMode
                  ? "#ffffff"
                  : "#111827",
                border: "none",
                borderRadius: "12px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,.15)",
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{
                color: darkMode
                  ? "#ffffff"
                  : "#111827",
                paddingTop: "10px",
                fontSize: "14px",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default InvoiceStatusChart;