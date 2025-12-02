import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { token, user, logout } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">🛒 MyShop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            {token ? (
              <>
                {isAdmin && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/orders">
                        Admin Orders
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-warning fw-bold" to="/admin">
                        Admin Dashboard
                      </Link>
                    </li>
                  </>
                )}
                {!isAdmin && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/wishlist">Wishlist❤️</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/orders">Orders</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm ms-2" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">User Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning fw-bold" to="/admin-login">
                    Admin Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
