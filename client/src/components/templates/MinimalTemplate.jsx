import "./MinimalTemplate.css";

function MinimalTemplate({ invoice, company }) {
  return (
    <div className="minimal-invoice">

      {/* Header */}
      <div className="minimal-header">

        {/* Company Details */}
        <div>

          {company?.logoUrl && (
            <img
              src={company.logoUrl}
              alt="Company Logo"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />

          )}

          <h3>{company?.companyName || "InvoiceFlow"}</h3>

          <p><strong>GST:</strong> {company?.gstNumber || "-"}</p>

          <p>{company?.email || "support@invoiceflow.com"}</p>

          <p>{company?.phone || "+91 9876543210"}</p>

          <p>{company?.address}</p>

        </div>

        {/* Invoice Info */}
        <div className="text-end">

          <h2>INVOICE</h2>

          <p>#{invoice.invoiceNumber}</p>

          <p><strong>Issue:</strong> {invoice.issueDate}</p>

          <p><strong>Due:</strong> {invoice.dueDate}</p>

          <h5>{invoice.status}</h5>

        </div>

      </div>

      <hr />

      {/* Customer */}
      <div className="customer-section">

        <h4>Bill To</h4>

        <p><strong>{invoice.customer?.name}</strong></p>

        <p>{invoice.customer?.email}</p>

        <p>{invoice.customer?.phone}</p>

        <p>{invoice.customer?.address}</p>

      </div>

      {/* Items */}
      <table className="minimal-table">

        <thead>

          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>

        </thead>

        <tbody>

          {invoice.items?.map((item, index) => (

            <tr key={index}>

              <td>{item.name}</td>

              <td>{item.quantity}</td>

              <td>₹{item.price}</td>

              <td>₹{item.total}</td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Footer */}
      <div className="minimal-footer">

        <div>

          <h5>Notes</h5>

          <p>{invoice.notes || "No Notes"}</p>

        </div>

        <div className="total-box">

          <p>
            Subtotal
            <span>₹{invoice.subtotal}</span>
          </p>

          <p>
            Tax
            <span>₹{invoice.tax}</span>
          </p>

          <p>
            Discount
            <span>₹{invoice.discount}</span>
          </p>

          <h4>
            Total
            <span>₹{invoice.grandTotal}</span>
          </h4>

        </div>

      </div>

    </div>
  );
}

export default MinimalTemplate;