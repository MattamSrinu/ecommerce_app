import { createContext, useEffect, useState } from "react";
import api from "../api/axiosConfig";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const loadUser = async () => {
    if (!token) return;
    try {
      const res = await api.get("auth/me/");
      setUser(res.data);
    } catch (err) {
      console.log("Failed to load user");
    }
  };

  useEffect(() => {loadUser();}, [token]);
  const login = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
    loadUser();
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
