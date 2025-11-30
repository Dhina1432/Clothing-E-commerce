import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import CartItem from "../components/CartItem.jsx";

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="card text-center">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <Link to="/products" className="btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to proceed to checkout");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Shopping Cart</h1>
        <button onClick={clearCart} className="btn btn-danger">
          Clear Cart
        </button>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}
      >
        {/* Cart Items */}
        <div className="card">
          {cart.items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>Order Summary</h3>

          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <hr style={{ margin: "1rem 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="btn"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="btn btn-secondary"
            style={{ width: "100%" }}
          >
            Continue Shopping
          </Link>

          {!user && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#fff3cd",
                border: "1px solid #ffeaa7",
                borderRadius: "5px",
                fontSize: "0.9rem",
              }}
            >
              <strong>Note:</strong> Please login to save your cart and proceed
              with checkout.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
