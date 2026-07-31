import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaChartLine,
  FaFileInvoiceDollar,
  FaShieldAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await login(formData);

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="login-page">

      {/* LEFT PANEL */}

      <div className="login-left">

        <div className="brand">

          <h1>InvoiceFlow</h1>

          <p>
            Create professional invoices, manage clients,
            track payments and grow your business with one
            modern invoicing platform.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature">

            <div className="feature-icon">
              <FaFileInvoiceDollar />
            </div>

            <div>

              <h5>Smart Invoicing</h5>

              <p>Create GST-ready invoices in seconds.</p>

            </div>

          </div>

          <div className="feature">

            <div className="feature-icon">
              <FaChartLine />
            </div>

            <div>

              <h5>Track Payments</h5>

              <p>Monitor paid & pending invoices easily.</p>

            </div>

          </div>

          <div className="feature">

            <div className="feature-icon">
              <FaShieldAlt />
            </div>

            <div>

              <h5>Secure Access</h5>

              <p>Protected authentication with JWT & Google.</p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="login-right">

        <div className="login-card">

          <div className="login-header">

            <h2>Welcome Back 👋</h2>

            <p>
              Login to continue managing your invoices.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Email Address</label>

              <div className="input-box">

                <FaEnvelope className="input-icon" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="mb-4">

              <label>Password</label>

              <div className="input-box">

                <FaLock className="input-icon" />

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="login-btn auth-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleLogin}
            >
              <FaGoogle />
              Continue with Google
            </button>

          </form>

          <div className="register-text">

            Don't have an account?

            <span
              onClick={() => navigate("/register")}
            >
              Register
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;