import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import {
    getProfile,
    updateProfile,
    changePassword,
} from "../services/profileService";
import { toast } from "react-toastify";
import "./Profile.css";

function Profile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: "",
        provider: "",
    });

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load profile");
        }
    };

    const handleSave = async () => {
        try {

            setLoading(true);

            const updatedProfile = await updateProfile({
                name: profile.name,
            });

            setProfile(updatedProfile);

            setEditing(false);

            toast.success("Profile Updated Successfully");

        } catch (error) {

            console.log(error);

            toast.error("Failed to update profile");

        } finally {

            setLoading(false);

        }
    };
    const handlePasswordChange = async () => {

        if (
            !passwordData.currentPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            setPasswordLoading(true);

            await changePassword(passwordData);

            toast.success("Password changed successfully");

            setShowPasswordModal(false);

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to change password"
            );

        } finally {

            setPasswordLoading(false);

        }
    };

    return (
        <DashboardLayout>

            <div className="profile-page">

                <div className="profile-card">

                    <div className="profile-header">

                        <img
                            src={`https://ui-avatars.com/api/?name=${profile.name}&background=6366f1&color=fff&size=200`}
                            alt="Profile"
                            className="profile-avatar"
                        />

                        <h2>{profile.name}</h2>

                        <p>{profile.email}</p>

                    </div>

                    <div className="profile-section">

                        <h4>Personal Information</h4>

                        <div className="profile-grid">

                            <div>

                                <label>Full Name</label>

                                <input
                                    className="form-control"
                                    value={profile.name}
                                    readOnly={!editing}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            name: e.target.value,
                                        })
                                    }
                                />

                            </div>

                            <div>

                                <label>Email</label>

                                <input
                                    className="form-control"
                                    value={profile.email}
                                    readOnly
                                />

                            </div>

                            <div>

                                <label>Role</label>

                                <input
                                    className="form-control"
                                    value={profile.role}
                                    readOnly
                                />

                            </div>

                            <div>

                                <label>Login Provider</label>

                                <input
                                    className="form-control"
                                    value={profile.provider}
                                    readOnly
                                />

                            </div>

                        </div>

                    </div>

                    <div className="profile-buttons">

                        {editing ? (

                            <button
                                className="btn btn-success profile-btn"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>

                        ) : (

                            <button
                                className="btn btn-primary profile-btn"
                                onClick={() => setEditing(true)}
                            >
                                Edit Profile
                            </button>

                        )}

                        <button
                            className="btn btn-outline-primary profile-btn"
                            onClick={() => setShowPasswordModal(true)}
                        >
                            Change Password
                        </button>

                    </div>

                </div>

            </div>
            {showPasswordModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0,0,0,.5)",
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Change Password
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setShowPasswordModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">

                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    placeholder="Current Password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    placeholder="New Password"
                                    value={passwordData.newPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowPasswordModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={handlePasswordChange}
                                    disabled={passwordLoading}
                                >
                                    {passwordLoading
                                        ? "Changing..."
                                        : "Change Password"}
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}


        </DashboardLayout>
    );
}

export default Profile;