import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    role: "user",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      await api.post("register/", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow p-4 rounded-4">
        <h3 className="text-center mb-4">Create Your Account</h3>
        <form onSubmit={submit}>
          {error && (
            <p className="text-danger text-center mb-3">
              {error}
            </p>
          )}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                name="first_name"
                className="form-control"
                value={form.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                name="last_name"
                className="form-control"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                name="username"
                className="form-control"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="3"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
            ></textarea>
          </div>

          <input type="hidden" name="role" value="user" />
          <button className="btn btn-primary w-100 mt-3" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
