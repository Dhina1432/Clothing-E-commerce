import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../services/api.js";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    setProcessing(true);
    try {
      const response = await API.post("/orders");

      if (response.data.success) {
        clearCart();
        navigate(`/order/${response.data.order._id}`);
      }
    } catch (error) {
      alert(
        "Failed to place order: " +
          (error.response?.data?.message || "Unknown error")
      );
    } finally {
      setProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <div className="card text-center">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out</p>
          <Link to="/products" className="btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Checkout</h1>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}
      >
        {/* Order Details */}
        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>Order Details</h3>

          <div style={{ marginBottom: "2rem" }}>
            <h4>Shipping Information</h4>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              * This is a demo checkout. No real payment processing.
            </p>
          </div>

          <div>
            <h4>Items in Your Order</h4>
            {cart.items.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginRight: "1rem",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {item.product.name}
                  </p>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                    Size: {item.size} × {item.quantity}
                  </p>
                </div>

                <div style={{ fontWeight: "bold" }}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>Tax:</span>
              <span>$0.00</span>
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
            onClick={handlePlaceOrder}
            disabled={processing}
            className="btn"
            style={{ width: "100%" }}
          >
            {processing ? "Processing..." : "Place Order"}
          </button>

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#e7f3ff",
              border: "1px solid #b3d9ff",
              borderRadius: "5px",
              fontSize: "0.9rem",
            }}
          >
            <strong>Demo Notice:</strong> This is a mock checkout. No real
            payment will be processed. An order confirmation email will be sent
            to {user?.email}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
