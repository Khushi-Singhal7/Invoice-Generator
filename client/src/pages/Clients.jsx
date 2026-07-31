import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import "./Clients.css";
import {
    getClients,
    saveClient,
    updateClient,
    deleteClient,
} from "../services/clientService";

import { toast } from "react-toastify";

function Clients() {

    const emptyClient = {
        clientName: "",
        email: "",
        phone: "",
        gstNumber: "",
        address: "",
    };

    const [clients, setClients] = useState([]);
    const [client, setClient] = useState(emptyClient);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const data = await getClients();
            setClients(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateClient(editingId, client);

                toast.success("Client Updated successfully");

            } else {

                await saveClient(client);

                toast.success("Client Added successfully");

            }

            setClient(emptyClient);
            setEditingId(null);

            loadClients();

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message ||
                "Operation failed!"
            );

        }

    };

    const filteredClients = clients.filter((c) =>
        c.clientName.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <DashboardLayout>

            <div className="clients-page">

                <div className="clients-card">

                    <div className="clients-card-body">
                        <h2 className="mb-4">
                            Client Management
                        </h2>

                        <form className="client-form" onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <input
                                        className="form-control"
                                        placeholder="Client Name"
                                        name="clientName"
                                        value={client.clientName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <input
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={client.email}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <input
                                        className="form-control"
                                        placeholder="Phone"
                                        name="phone"
                                        value={client.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <input
                                        className="form-control"
                                        placeholder="GST Number"
                                        name="gstNumber"
                                        value={client.gstNumber}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-12 mb-3">

                                    <textarea
                                        rows="3"
                                        className="form-control"
                                        placeholder="Address"
                                        name="address"
                                        value={client.address}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-12 d-grid d-md-block">
                                    <button className="btn btn-primary">
                                        {editingId ? "Update Client" : "Add Client"}
                                    </button>
                                </div>

                            </div>

                        </form>

                        <hr />

                        <input
                            className="form-control client-search mb-4"
                            placeholder="🔍 Search Client..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-dark">

                                    <tr>

                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>GST</th>
                                        <th>Address</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>
                                    {filteredClients.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No Clients Found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredClients.map((c) => (
                                            <tr key={c.id}>

                                                <td>{c.clientName}</td>

                                                <td>{c.email}</td>

                                                <td>{c.phone}</td>

                                                <td>{c.gstNumber}</td>

                                                <td>{c.address}</td>

                                                <td>

                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => {

                                                            setEditingId(c.id);

                                                            setClient({
                                                                clientName: c.clientName,
                                                                email: c.email,
                                                                phone: c.phone,
                                                                gstNumber: c.gstNumber,
                                                                address: c.address,
                                                            });

                                                        }}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={async () => {

                                                            if (!window.confirm("Delete this client?")) return;

                                                            try {

                                                                await deleteClient(c.id);

                                                                toast.success("Client Deleted successfully!");

                                                                loadClients();

                                                            } catch (err) {

                                                                console.log(err);

                                                                toast.error(
                                                                    err.response?.data?.message ||
                                                                    "Failed to delete client!"
                                                                );
                                                            }

                                                        }}
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>
                                        ))
                                    )}

                                </tbody>

                            </table>


                        </div>

                    </div>

                </div>
            </div>

        </DashboardLayout>

    );

}

export default Clients;