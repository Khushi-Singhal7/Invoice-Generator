import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import "./CompanySettings.css";
import {
  saveCompany,
  getCompanies,
  updateCompany,
} from "../services/companyService";
import { toast } from "react-toastify";

export default function CompanySettings() {
  const [company, setCompany] = useState({
    companyName: "",
    gstNumber: "",
    email: "",
    phone: "",
    address: "",
    logoUrl: "",
  });

  const [companyId, setCompanyId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      const data = await getCompanies();

      if (data && data.length > 0) {
        const c = data[0];

        setCompany({
          companyName: c.companyName || "",
          gstNumber: c.gstNumber || "",
          email: c.email || "",
          phone: c.phone || "",
          address: c.address || "",
          logoUrl: c.logoUrl || "",
        });

        setCompanyId(c.id || c._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "invoice-logo");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/m5tlvvtx/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setCompany((prev) => ({
        ...prev,
        logoUrl: data.secure_url,
      }));

      toast.success("Logo Uploaded Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Logo upload failed!");
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (companyId) {
        await updateCompany(companyId, company);
        toast.success("Company Updated Successfully");
      } else {
        const saved = await saveCompany(company);
        setCompanyId(saved.id || saved._id);
        toast.success("Company Saved Successfully");
      }

      await loadCompany();
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Something went wrong!"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="company-page">

        <div className="company-card">

          <div className="company-card-body">

            <h2>Company Settings</h2>

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Company Name
                  </label>

                  <input
                    className="form-control"
                    name="companyName"
                    value={company.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    GST Number
                  </label>

                  <input
                    className="form-control"
                    name="gstNumber"
                    value={company.gstNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={company.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    className="form-control"
                    name="phone"
                    value={company.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    rows="4"
                    className="form-control"
                    name="address"
                    value={company.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-4">

                  <label className="form-label fw-bold">
                    Company Logo
                  </label>

                  {company.logoUrl && (
                    <div className="text-center mb-3">
                      <img
                        src={company.logoUrl}
                        alt="Logo"
                        className="company-logo-preview"
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />

                  {uploading && (
                    <p className="uploading-text">
                      Uploading Logo...
                    </p>
                  )}

                </div>

                <div className="col-12">

                  <button
                    className="btn company-save-btn"
                    disabled={uploading}
                  >
                    {companyId
                      ? "Update Company"
                      : "Save Company"}
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}