import api from "../api/api";

export const saveInvoice = (invoice) =>
  api.post("/invoices", invoice);

export const getInvoices = () =>
  api.get("/invoices");

export const getInvoiceById = (id) =>
  api.get(`/invoices/${id}`);

export const updateInvoice = (id, invoice) =>
  api.put(`/invoices/${id}`, invoice);

export const deleteInvoice = (id) =>
  api.delete(`/invoices/${id}`);

// ✅ Mark Invoice as Paid
export const markInvoiceAsPaid = (id) =>
  api.put(`/invoices/${id}/paid`);

// ✅ Send Invoice Email
export const sendInvoiceEmail = (formData) =>
  api.post("/invoices/send-email", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });