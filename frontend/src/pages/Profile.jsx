import { useEffect, useState } from "react";
import { Link } from "react-router-dom";   // ⭐ FIXED
import api from "../api/axiosConfig";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [address, setAddress] = useState("");

  const loadProfile = async () => {
    const res = await api.get("auth/me/");
    setProfile(res.data);
    setAddress(res.data.address || "");
  };

  const updateProfile = async () => {
    await api.put("auth/update-profile/", { address });
    alert("Profile updated!");
  };

  useEffect(() => {loadProfile();}, []);

  const isAdmin = profile.role === "admin";

  return (
    <div className="container mt-4" style={{ maxWidth: "1000px" }}>
      <h2 className="fw-bold mb-4">My Profile</h2>
      <div className="row">
        <div className="col-md-5">
          <div className="card shadow rounded-4 p-4 mb-4">
            <div className="d-flex align-items-center mb-4">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px", fontSize: "32px" }}
              >
                {profile.username ? profile.username[0].toUpperCase() : "U"}
              </div>
              <div className="ms-4">
                <h4 className="mb-1">{profile.username}</h4>
                <p className="text-muted mb-0">{profile.email}</p>
              </div>
            </div>
            {!isAdmin && (
              <>
                <label className="form-label fw-semibold">Address</label>
                <textarea
                  className="form-control rounded-3"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address..."
                ></textarea>
                <button
                  className="btn btn-dark w-100 mt-4 rounded-3 py-2"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
        <div className="col-md-7">
          {isAdmin ? (
            <>
              <div className="card p-4 shadow-sm mb-3 rounded-4">
                <h5 className="fw-semibold">Admin Dashboard</h5>
                <p className="text-muted mb-2">Manage products & system</p>
                <Link to="/admin" className="btn btn-warning rounded-3 w-100">
                  Go to Dashboard
                </Link>
              </div>
              <div className="card p-4 shadow-sm mb-3 rounded-4">
                <h5 className="fw-semibold">Admin Orders</h5>
                <p className="text-muted mb-2">Manage all customer orders</p>
                <Link to="/admin/orders" className="btn btn-dark rounded-3 w-100">
                  Manage Orders
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="card p-4 shadow-sm mb-3 rounded-4">
                <h5 className="fw-semibold">My Orders</h5>
                <p className="text-muted mb-2">Track your orders</p>
                <Link to="/orders" className="btn btn-outline-dark rounded-3 w-100">
                  View Orders
                </Link>
              </div>
              <div className="card p-4 shadow-sm mb-3 rounded-4">
                <h5 className="fw-semibold">My Wishlist</h5>
                <p className="text-muted mb-2">Saved items</p>
                <Link to="/wishlist" className="btn btn-outline-danger rounded-3 w-100">
                  View Wishlist
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
