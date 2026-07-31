import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row gy-5">

          <div className="col-lg-4">

            <h3 className="footer-logo">
              InvoiceFlow
            </h3>

            <p className="footer-text">
              Create, manage and download professional invoices with a modern,
              secure and powerful invoicing platform built for freelancers,
              startups and businesses.
            </p>

          </div>

          <div className="col-lg-2 col-md-4">

            <h5>Company</h5>

            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#stats">Statistics</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

          </div>

          <div className="col-lg-3 col-md-4">

            <h5>Contact</h5>

            <ul className="footer-links">
              <li>📧 support@invoiceflow.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 Noida, Uttar Pradesh</li>
            </ul>

          </div>

          <div className="col-lg-3 col-md-4">

            <h5>Follow Us</h5>

            <div className="social-icons">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaGithub />
              </a>

            </div>

          </div>

        </div>

        <hr />

        <div className="copyright">

          © {new Date().getFullYear()} <strong>InvoiceFlow</strong>. All Rights
          Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;