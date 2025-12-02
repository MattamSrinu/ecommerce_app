import { useState, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const submit = async (e) => {e.preventDefault();
    try {
      const res = await api.post("login/", { username, password });
      login(res.data.token);
      const profile = await api.get("auth/me/");
      if (profile.data.role !== "admin") {
        setError("You are not an Admin!");
        return;
      }
      navigate("/admin");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container p-4">
      <h3 className="text-center mb-4 text-warning">Admin Login</h3>
      <form className="col-md-4 mx-auto" onSubmit={submit}>
        {error && <p className="text-danger">{error}</p>}
        <input className="form-control mb-3" placeholder="Admin Username" onChange={(e) => setUsername(e.target.value)}/>
        <input className="form-control mb-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button className="btn btn-warning w-100 fw-bold">
          Login as Admin
        </button>
      </form>
    </div>
  );
}
