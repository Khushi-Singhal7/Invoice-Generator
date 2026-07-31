import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getInvoices,
  deleteInvoice,
} from "../../services/invoiceService";

import "./RecentInvoices.css";

function RecentInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("latest");

  const navigate = useNavigate();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const response = await getInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load invoices!"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmDelete) return;

    try {
      await deleteInvoice(id);

      toast.success("Invoice deleted successfully!");

      loadInvoices();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete invoice!"
      );
    }
  };

  // Search + Filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      invoice.customer?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      invoice.status?.toLowerCase() ===
        statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Sort
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.issueDate) - new Date(a.issueDate);

      case "oldest":
        return new Date(a.issueDate) - new Date(b.issueDate);

      case "high":
        return b.grandTotal - a.grandTotal;

      case "low":
        return a.grandTotal - b.grandTotal;

      default:
        return 0;
    }
  });

  return (
    <div className="recent-section shadow-sm">
      <div className="recent-header d-flex justify-content-between align-items-center flex-wrap gap-2">

        <div>
          <h2>Recent Invoices</h2>
          <p>Latest invoices created</p>
        </div>

        <div className="recent-filters">

          <input
            type="text"
            className="form-control search-box"
            placeholder="🔍 Search Invoice / Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="ALL">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>

          <select
            className="form-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="high">Highest Amount</option>
            <option value="low">Lowest Amount</option>
          </select>

        </div>
      </div>

      <div className="table-responsive mt-3">

        <table className="table table-hover align-middle">

          <thead className="table-light">

            <tr>
              <th>Invoice No.</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Issue Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {sortedInvoices.length > 0 ? (

              sortedInvoices.map((invoice) => (

                <tr key={invoice.id}>

                  <td>{invoice.invoiceNumber}</td>

                  <td>{invoice.customer?.name}</td>

                  <td>
                    ₹{invoice.grandTotal?.toFixed(2)}
                  </td>

                  <td>{invoice.issueDate}</td>

                  <td>
                    <span
                      className={
                        invoice.status?.toUpperCase() ===
                        "PAID"
                          ? "badge bg-success"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td className="text-center action-buttons">

                    <button
                      className="btn btn-sm btn-primary me-2"
                      title="Preview"
                      onClick={() =>
                        navigate(`/preview/${invoice.id}`)
                      }
                    >
                      <FaEye />
                    </button>

                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() =>
                        navigate(
                          `/create-invoice/${invoice.id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      title="Delete"
                      onClick={() =>
                        handleDelete(invoice.id)
                      }
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-4"
                >
                  No invoices found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentInvoices;