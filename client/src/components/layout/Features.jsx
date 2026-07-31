import {
  FaFileInvoice,
  FaChartLine,
  FaCloud,
  FaFilePdf,
  FaUsers,
  FaLock,
} from "react-icons/fa";
import "./Features.css";

const features = [
  {
    icon: <FaFileInvoice />,
    title: "Professional Invoices",
    description:
      "Create beautiful invoices with GST, discounts and multiple premium templates in just a few clicks.",
  },
  {
    icon: <FaChartLine />,
    title: "Business Analytics",
    description:
      "Track revenue, monitor invoice performance and gain valuable business insights from your dashboard.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Access",
    description:
      "Access your invoices securely anytime, anywhere with reliable cloud storage and automatic backups.",
  },
  {
    icon: <FaFilePdf />,
    title: "One-Click PDF Export",
    description:
      "Generate clean, professional A4-ready PDF invoices instantly for printing or sharing with clients.",
  },
  {
    icon: <FaUsers />,
    title: "Client Management",
    description:
      "Store client information, manage customer records and create invoices faster than ever.",
  },
  {
    icon: <FaLock />,
    title: "Secure Authentication",
    description:
      "Protect your business with secure authentication and safe access to your financial data.",
  },
];

function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Everything You Need to Manage Your Business
          </h2>

          <p className="text-muted">
            Powerful tools designed to help freelancers, startups and businesses
            create professional invoices, manage clients and track payments
            effortlessly.
          </p>

        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="feature-card">

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h5>{feature.title}</h5>

                <p>{feature.description}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;