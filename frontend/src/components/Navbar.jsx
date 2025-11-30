import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      style={{
        background: "#333",
        color: "white",
        padding: "1rem 0",
        marginBottom: "2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Clothing Store
          </Link>

          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/products"
              style={{ color: "white", textDecoration: "none" }}
            >
              Products
            </Link>

            <Link
              to="/cart"
              style={{
                color: "white",
                textDecoration: "none",
                position: "relative",
              }}
            >
              Cart
              {getCartItemsCount() > 0 && (
                <span
                  style={{
                    background: "red",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                  }}
                >
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <span>Hello, {user.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
