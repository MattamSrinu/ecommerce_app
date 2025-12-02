import { useState, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("login/", { username, password });
    login(res.data.token);
    navigate("/");
  };

  return (
    <div className="container p-4">
      <h3 className="text-center mb-4">Login</h3>
      <form className="col-md-4 mx-auto" onSubmit={submit}>
        <input className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />

        <input className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
