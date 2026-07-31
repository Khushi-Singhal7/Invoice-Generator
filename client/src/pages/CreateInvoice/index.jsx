import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  saveInvoice,
  getInvoiceById,
  updateInvoice,
} from "../../services/invoiceService";

import { getClients } from "../../services/clientService";

import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import "./CreateInvoice.css";

function CreateInvoice() {
  const { id } = useParams();

  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [clients, setClients] = useState([]);

  const [items, setItems] = useState([
    {
      description: "",
      quantity: 1,
      price: 0,
    },
  ]);

  const [gst, setGst] = useState(18);

  const [discount, setDiscount] = useState(0);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [invoiceNumber, setInvoiceNumber] = useState(
    "INV-" + Date.now()
  );

  const [issueDate, setIssueDate] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [status, setStatus] = useState("Pending");

  const [notes, setNotes] = useState("");

  const [template, setTemplate] = useState("modern");

  const loadClients = async () => {
    try {
      const data = await getClients();

      console.log("Clients API =", data);
      console.log("Is Array =", Array.isArray(data));

      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClientSelect = (e) => {
    const value = e.target.value;

    if (value === "") {
      setCustomer({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      return;
    }

    const client = clients.find((c) => c.clientName === value);

    if (!client) return;

    setCustomer({
      name: client.clientName,
      email: client.email,
      phone: client.phone,
      address: client.address,
    });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;

    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const gstAmount = (subtotal * gst) / 100;

  const grandTotal = subtotal + gstAmount - discount;

  const loadInvoiceForEdit = async () => {
    try {
      const response = await getInvoiceById(id);

      const data = response.data;

      setCustomer({
        name: data.customer?.name || "",
        email: data.customer?.email || "",
        phone: data.customer?.phone || "",
        address: data.customer?.address || "",
      });

      setItems(
        (data.items || []).map((item) => ({
          description: item.name,
          quantity: item.quantity,
          price: item.price,
        }))
      );

      setIssueDate(data.issueDate);
      setDueDate(data.dueDate);
      setStatus(data.status || "Pending");

      setGst(
        data.subtotal
          ? Math.round((data.tax / data.subtotal) * 100)
          : 18
      );

      setDiscount(data.discount);
      setNotes(data.notes);
      setTemplate(data.template || "modern");

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Failed to load invoice!"
      );
    }
  };
  useEffect(() => {
    loadClients();

    if (isEdit) {
      loadInvoiceForEdit();
    }
  }, [id]);


  const handleSaveInvoice = async () => {
    try {
      if (
        !customer.name ||
        !customer.email ||
        !customer.phone ||
        !customer.address
      ) {
        toast.error("Please fill all customer details");
        return;
      }

      if (!issueDate || !dueDate) {
        toast.error("Please select invoice and due dates");
        return;
      }

      if (
        items.length === 0 ||
        items.some((item) => !item.description)
      ) {
        toast.error("Please add at least one valid item");
        return;
      }

      const payload = {
        invoiceNumber,

        customer,

        items: items.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
        })),

        subtotal,

        tax: gstAmount,

        discount,

        grandTotal,

        issueDate,

        dueDate,

        status,

        notes,

        template,
      };

      if (isEdit) {
        await updateInvoice(id, payload);

        toast.success("Invoice updated successfully!");

        navigate("/dashboard"); // ya tumhare invoice list ka route
      } else {
        await saveInvoice(payload);

        toast.success("Invoice saved successfully!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

        setCustomer({
          name: "",
          email: "",
          phone: "",
          address: "",
        });

        setItems([
          {
            description: "",
            quantity: 1,
            price: 0,
          },
        ]);

        setDiscount(0);
        setGst(18);
        setIssueDate("");
        setDueDate("");
        setNotes("");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to save invoice!"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="invoice-page">
        <div className="invoice-header">
          <h2>
            {isEdit ? "Edit Invoice" : "Create Invoice"}
          </h2>

          <button
            className="btn btn-success save-btn"
            onClick={handleSaveInvoice}
          >
            {isEdit
              ? "Update Invoice"
              : "Save Invoice"}
          </button>
        </div>

        <div className="invoice-card">

          <div className="row">

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Invoice Number
              </label>

              <input
                className="form-control"
                value={invoiceNumber}
                readOnly
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Invoice Date
              </label>

              <input
                type="date"
                className="form-control"
                value={issueDate}
                onChange={(e) =>
                  setIssueDate(e.target.value)
                }
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Due Date
              </label>

              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
              />

            </div>

          </div>

          <hr />

          <h4>Client Details</h4>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Select Client
              </label>

              <select
                className="form-select"
                value={customer.name}
                onChange={handleClientSelect}
              >
                <option value="">
                  -- Select Client --
                </option>

                {Array.isArray(clients) &&
                  clients.map((client) => (
                    <option
                      key={client._id}
                      value={client.clientName}
                    >
                      {client.clientName}
                    </option>
                  ))
                }
              </select>

            </div>
            <div className="col-md-6 mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                value={customer.email}
                readOnly
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Phone
              </label>

              <input
                className="form-control"
                value={customer.phone}
                readOnly
              />

            </div>

            <div className="col-12 mb-4">

              <label className="form-label">
                Address
              </label>

              <textarea
                className="form-control"
                rows="3"
                value={customer.address}
                readOnly
              />

            </div>

          </div>

          <hr />

          <h4 className="mb-3">
            Invoice Items
          </h4>

          <div className="table-responsive">

            <table className="table table-bordered align-middle">

              <thead >

                <tr>

                  <th>Description</th>

                  <th width="120">
                    Qty
                  </th>

                  <th width="150">
                    Price
                  </th>

                  <th width="150">
                    Amount
                  </th>

                  <th width="70">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {items.map((item, index) => (

                  <tr key={index}>

                    <td>

                      <input
                        className="form-control"
                        placeholder="Product / Service"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />

                    </td>

                    <td>

                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                      />

                    </td>

                    <td>

                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            Number(e.target.value)
                          )
                        }
                      />

                    </td>

                    <td className="fw-bold">
                      ₹{item.quantity * item.price}
                    </td>

                    <td>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          removeItem(index)
                        }
                      >
                        <FaTrash />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={addItem}
          >
            <FaPlus className="me-2" />
            Add Item
          </button>

          <hr className="my-4" />

          <div className="mb-4">

            <label className="form-label">
              Notes
            </label>

            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter notes..."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Invoice Template
            </label>

            <select
              className="form-select"
              value={template}
              onChange={(e) =>
                setTemplate(e.target.value)
              }
            >
              <option value="modern">
                Modern Blue
              </option>

              <option value="minimal">
                Minimal White
              </option>

              <option value="elegant">
                Elegant Black
              </option>

              <option value="creative">
                Creative Purple
              </option>

            </select>

          </div>

          <hr className="my-4" />

          <div className="row justify-content-end">

            <div className="col-lg-4 col-md-6 col-12">
              <div className="mb-3">

                <label className="form-label">
                  GST (%)
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={gst}
                  onChange={(e) =>
                    setGst(Number(e.target.value))
                  } s
                />

              </div>
              <div className="mb-3">

                <label className="form-label">
                  Discount (₹)
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={discount}
                  onChange={(e) =>
                    setDiscount(Number(e.target.value))
                  }
                />

              </div>

              <div className="invoice-summary">

                <table className="table">

                  <tbody>

                    <tr>
                      <th>Subtotal</th>
                      <td className="text-end">
                        ₹{subtotal.toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <th>GST</th>
                      <td className="text-end">
                        ₹{gstAmount.toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <th>Discount</th>
                      <td className="text-end">
                        - ₹{discount.toFixed(2)}
                      </td>
                    </tr>

                    <tr className="table-primary">

                      <th className="fw-bold">
                        Grand Total
                      </th>

                      <th className="text-end fw-bold">
                        ₹{grandTotal.toFixed(2)}
                      </th>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default CreateInvoice;
