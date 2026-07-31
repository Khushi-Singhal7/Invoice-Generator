import "./Stats.css";

function Stats() {
  return (
    <section id="stats" className="stats">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Trusted by Thousands of Growing Businesses
          </h2>

          <p className="text-muted">
            From freelancers to enterprises, InvoiceFlow simplifies invoicing,
            client management and business growth with reliable tools.
          </p>
        </div>

        <div className="row g-4 text-center">

          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <h2>10K+</h2>
              <p>Invoices Generated</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <h2>500+</h2>
              <p>Happy Businesses</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <h2>50K+</h2>
              <p>PDF Downloads</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <h2>99.9%</h2>
              <p>Platform Uptime</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Stats;