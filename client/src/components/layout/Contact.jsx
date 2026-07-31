import "./Contact.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Let's Connect
          </h2>

          <p className="text-muted">
            Have a question, suggestion or need support? Our team is always ready
            to help you build smarter invoices and grow your business.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="contact-card">

              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <h5>Email Us</h5>

              <p>
                support@invoiceflow.com
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-card">

              <div className="contact-icon">
                <FaPhone />
              </div>

              <h5>Call Us</h5>

              <p>
                +91 98765 43210
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-card">

              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>

              <h5>Visit Us</h5>

              <p>
                Noida, Uttar Pradesh, India
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;