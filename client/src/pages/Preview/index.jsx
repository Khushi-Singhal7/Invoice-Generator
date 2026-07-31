import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  getInvoiceById,
  sendInvoiceEmail,
  markInvoiceAsPaid,
} from "../../services/invoiceService";
import { getCompanies } from "../../services/companyService";

import ModernTemplate from "../../components/templates/ModernTemplate";
import MinimalTemplate from "../../components/templates/MinimalTemplate";
import ElegantTemplate from "../../components/templates/ElegantTemplate";
import CreativeTemplate from "../../components/templates/CreativeTemplate";

import "./Preview.css";
import { toast } from "react-toastify";

function Preview() {
  const { id } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const invoiceRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [invoiceResponse, companies] = await Promise.all([
        getInvoiceById(id),
        getCompanies(),
      ]);

      setInvoice(invoiceResponse.data);

      if (companies.length > 0) {
        setCompany(companies[0]);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Unable to load invoice!"
      );
    } finally {
      setLoading(false);
    }
  };
  const generatePdfBlob = async () => {
    const canvas = await html2canvas(invoiceRef.current, {
      scale: 1,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    return {
      pdf,
      blob: pdf.output("blob"),
    };
  };

  const downloadPDF = async () => {
    try {
      const { pdf } = await generatePdfBlob();

      pdf.save(`Invoice-${invoice.invoiceNumber}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Failed to download PDF!"
      );
    }
  };

  const handleSendEmail = async () => {
    try {
      setSending(true);

      const { blob } = await generatePdfBlob();

      const formData = new FormData();

      formData.append(
        "pdf",
        blob,
        `Invoice-${invoice.invoiceNumber}.pdf`
      );

      formData.append(
        "email",
        invoice.customer.email
      );

      formData.append(
        "invoiceNumber",
        invoice.invoiceNumber
      );

      await sendInvoiceEmail(formData);

      toast.success("Invoice emailed successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Unable to send invoice!"
      );
    } finally {
      setSending(false);
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      await markInvoiceAsPaid(invoice.id);

      setInvoice({
        ...invoice,
        status: "Paid",
      });

      toast.success("Invoice marked as paid!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Unable to update invoice!"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary"></div>
          <h5 className="mt-3">Loading Invoice...</h5>
        </div>
      </DashboardLayout>
    );
  }

  if (!invoice) {
    return (
      <DashboardLayout>
        <div className="container py-5 text-center">
          <h3 className="text-danger">Invoice Not Found</h3>
        </div>
      </DashboardLayout>
    );
  }

  const renderTemplate = () => {
    switch (invoice.template) {
      case "modern":
        return (
          <ModernTemplate
            invoice={invoice}
            company={company}
          />
        );

      case "minimal":
        return (
          <MinimalTemplate
            invoice={invoice}
            company={company}
          />
        );

      case "elegant":
        return (
          <ElegantTemplate
            invoice={invoice}
            company={company}
          />
        );

      case "creative":
        return (
          <CreativeTemplate
            invoice={invoice}
            company={company}
          />
        );

      default:
        return (
          <ModernTemplate
            invoice={invoice}
            company={company}
          />
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="preview-page">

        <div className="preview-toolbar responsive-toolbar">

          <span
            className={`invoice-status ${invoice.status === "Paid"
              ? "paid"
              : invoice.status === "Overdue"
                ? "overdue"
                : "pending"
              }`}
          >
            {invoice.status}
          </span>

          {invoice.status !== "Paid" && (
            <button
              className="btn btn-warning"
              onClick={handleMarkAsPaid}
            >
              💰 Mark as Paid
            </button>
          )}

          <button
            className="btn btn-primary"
            disabled={sending}
            onClick={handleSendEmail}
          >
            {sending ? "Sending..." : "📧 Send Email"}
          </button>

          <button
            className="btn btn-success"
            onClick={downloadPDF}
          >
            ⬇ Download PDF
          </button>

        </div>

        <div
          className="preview-card invoice-preview-wrapper"
          ref={invoiceRef}
        >
          {renderTemplate()}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Preview;