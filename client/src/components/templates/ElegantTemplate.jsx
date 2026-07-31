import "./ElegantTemplate.css";

function ElegantTemplate({ invoice, company }) {
  return (
    <div className="elegant-invoice">

      {/* Header */}
      <div className="elegant-header">

        <div>
          <h1>INVOICE</h1>
          <p>#{invoice.invoiceNumber}</p>
        </div>

        <div className="status">
          <span>{invoice.status}</span>
        </div>

      </div>

      {/* Company & Customer */}
      <div className="info-section">

        {/* Company */}
        <div>

          <h4>From</h4>

          {company?.logoUrl && (
            <img
              src={company.logoUrl}
              alt="Company Logo"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
          )}

          <p><strong>{company?.companyName || "InvoiceFlow"}</strong></p>

          <p><strong>GST:</strong> {company?.gstNumber || "-"}</p>

          <p>{company?.email || "support@invoiceflow.com"}</p>

          <p>{company?.phone || "+91 9876543210"}</p>

          <p>{company?.address}</p>

        </div>

        {/* Customer */}
        <div>

          <h4>Bill To</h4>

          <p><strong>{invoice.customer?.name}</strong></p>

          <p>{invoice.customer?.email}</p>

          <p>{invoice.customer?.phone}</p>

          <p>{invoice.customer?.address}</p>

        </div>

      </div>

      {/* Items */}
      <table className="elegant-table">

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

      {/* Bottom */}
      <div className="bottom-section">

        <div>

          <h5>Notes</h5>

          <p>{invoice.notes || "No Notes"}</p>

        </div>

        <div className="summary">

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

          <h3>
            Total
            <span>₹{invoice.grandTotal}</span>
          </h3>

        </div>

      </div>

    </div>
  );
}

export default ElegantTemplate;