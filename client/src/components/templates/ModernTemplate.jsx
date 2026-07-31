import "./ModernTemplate.css";

function ModernTemplate({ invoice, company }) {
  return (
    <div className="modern-invoice">

      {/* Header */}
      <div className="modern-header">

        <div className="header-left">

          <h1>INVOICE</h1>

          <p className="invoice-id">
            Invoice #{invoice.invoiceNumber}
          </p>

        </div>

        <div className="header-right">

          <div className="date-box">

            <small>Issue Date</small>

            <strong>{invoice.issueDate}</strong>

          </div>

          <div className="date-box">

            <small>Due Date</small>

            <strong>{invoice.dueDate}</strong>

          </div>

          <div className="status-box">

            <span
              className={
                invoice.status === "PAID"
                  ? "paid"
                  : "pending"
              }
            >
              {invoice.status}
            </span>

          </div>

        </div>

      </div>

      {/* Company & Customer */}
      <div className="company-section">

        {/* Company Card */}
        <div className="company-card">
          {company?.logoUrl && (
            <img
              src={company.logoUrl}
              alt="Company Logo"
              className="company-logo"
            />
          )}

          <h3 className="company-name">
            {company?.companyName || "InvoiceFlow"}
          </h3>

          <p>
            <strong>GST:</strong> {company?.gstNumber || "-"}
          </p>

          <p>{company?.email || "support@invoiceflow.com"}</p>

          <p>{company?.phone || "+91 9876543210"}</p>

          <p>{company?.address}</p>
        </div>

        {/* Customer Details */}
        <div className="customer-card">
          <h5>Bill To</h5>

          <h3 className="customer-name">
            {invoice.customer?.name}
          </h3>

          <p>{invoice.customer?.email}</p>

          <p>{invoice.customer?.phone}</p>

          <p>{invoice.customer?.address}</p>
        </div>
      </div>

      {/* Items */}
      <table className="modern-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items?.map((item, index) => (
            <tr key={index}>

              <td>{index + 1}</td>

              <td>{item.name}</td>

              <td>{item.quantity}</td>

              <td>₹{item.price}</td>

              <td>₹{item.total}</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="totals">

        <div className="notes">
          <h5>Notes</h5>
          <p>
            {invoice.notes ||
              "Thank you for your business. We appreciate your trust and look forward to working with you again."}
          </p>
        </div>

        <div className="amounts">
          <div>
            <span>Subtotal</span>
            <span>₹{invoice.subtotal}</span>
          </div>

          <div>
            <span>Tax</span>
            <span>₹{invoice.tax}</span>
          </div>

          <div>
            <span>Discount</span>
            <span>- ₹{invoice.discount}</span>
          </div>

          <div className="grand-total">
            <span>Grand Total</span>
            <span>₹{invoice.grandTotal}</span>
          </div>
        </div>
      </div>
      <div className="modern-footer">

        <h4>Thank You!</h4>

        <p>
          This invoice was generated electronically and is valid without a signature.
        </p>

      </div>

    </div>
  );
}

export default ModernTemplate;