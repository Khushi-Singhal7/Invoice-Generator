import "./CreativeTemplate.css";

function CreativeTemplate({ invoice, company }) {
  return (
    <div className="creative-invoice">

      {/* Header */}
      <div className="creative-header">

        <div>
          <h1>Invoice</h1>
          <p>#{invoice.invoiceNumber}</p>
        </div>

        <div className="creative-status">
          {invoice.status}
        </div>

      </div>

      {/* Company & Customer */}
      <div className="creative-customer">

        {/* Company */}
        <div>

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

          <h4>{company?.companyName || "InvoiceFlow"}</h4>

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
      <table className="creative-table">

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
      <div className="creative-bottom">

        <div>

          <h5>Notes</h5>

          <p>{invoice.notes || "No Notes Available"}</p>

        </div>

        <div className="creative-total">

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

export default CreativeTemplate;