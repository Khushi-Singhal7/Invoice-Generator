import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardCards from "../../components/dashboard/DashboardCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import InvoiceStatusChart from "../../components/dashboard/InvoiceStatusChart";
import RecentInvoices from "../../components/dashboard/RecentInvoices";

function Dashboard() {
  return (
    <DashboardLayout>

      <DashboardCards />

      <div className="row mt-4">

        <div className="col-lg-8 mb-4">
          <RevenueChart />
        </div>

        <div className="col-lg-4 mb-4">
          <InvoiceStatusChart />
        </div>

      </div>

      <RecentInvoices />

    </DashboardLayout>
  );
}

export default Dashboard;