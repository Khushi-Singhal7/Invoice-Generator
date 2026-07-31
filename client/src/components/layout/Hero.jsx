import "./Hero.css";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaArrowRight,
  FaPlayCircle,
} from "react-icons/fa";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side */}
          <div className="col-lg-6">

            <div className="hero-badge">
              ⭐ Trusted by 500+ Businesses
            </div>

            <h1 className="hero-title">
              Create <span>Professional</span>
              <br />
              Invoices
              <br />
              In Minutes
            </h1>

            <p className="hero-subtitle">
              Generate GST-ready invoices, manage clients, track payments and
              export beautiful PDFs with one modern platform built for
              freelancers, startups and growing businesses.
            </p>

            <div className="hero-buttons">

              <Link
                to="/login"
                className="btn btn-primary btn-lg"
              >
                <FaArrowRight className="me-2" />
                Get Started
              </Link>

              <Link
                to="/dashboard"
                className="btn btn-outline-dark btn-lg"
              >
                <FaPlayCircle className="me-2" />
                Live Demo
              </Link>

            </div>

            <div className="hero-features">

              <span>
                <FaCheckCircle />
                GST Ready
              </span>

              <span>
                <FaCheckCircle />
                PDF Export
              </span>

              <span>
                <FaCheckCircle />
                Cloud Sync
              </span>

            </div>

          </div>

          {/* Right Side */}
          <div className="col-lg-6 mt-5 mt-lg-0">

            <div className="card invoice-card border-0">

              <div className="invoice-header">

                <div>
                  <small>Invoice</small>
                  <h5>INV-1001</h5>
                </div>

                <span className="badge bg-success">
                  Paid
                </span>

              </div>

              <hr />

              <div className="invoice-row">
                <span>Company</span>
                <strong>InvoiceFlow</strong>
              </div>

              <div className="invoice-row">
                <span>Client</span>
                <strong>Khushi Singhal</strong>
              </div>

              <div className="invoice-row">
                <span>Status</span>
                <strong className="text-success">
                  Completed
                </strong>
              </div>

              <div className="invoice-row total-row">
                <span>Total</span>
                <strong>₹12,500</strong>
              </div>

              <div className="progress mt-4">

                <div
                  className="progress-bar bg-success"
                  style={{ width: "100%" }}
                >
                  Paid
                </div>

              </div>

              <p className="text-center text-muted mt-3 mb-0">
                Last Updated Today
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;