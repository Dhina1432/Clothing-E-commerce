import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api.js";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await API.get(`/orders/${id}`);
      setOrder(response.data.order);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center">Loading order details...</div>
    );
  }

  if (!order) {
    return (
      <div className="container text-center">
        <h2>Order not found</h2>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: "2rem",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            🎉 Order Confirmed!
          </h1>
          <p style={{ fontSize: "1.2rem" }}>
            Thank you for your purchase! Your order has been successfully
            placed.
          </p>
        </div>

        <div style={{ textAlign: "left", marginBottom: "2rem" }}>
          <h3>Order Details</h3>
          <p>
            <strong>Order ID:</strong> #{order._id}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total Amount:</strong> ${order.totalPrice.toFixed(2)}
          </p>
        </div>

        <div style={{ textAlign: "left", marginBottom: "2rem" }}>
          <h3>Items Ordered</h3>
          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1rem",
                border: "1px solid #eee",
                borderRadius: "5px",
                marginBottom: "0.5rem",
              }}
            >
              <img
                src={item.product?.image}
                alt={item.name}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginRight: "1rem",
                }}
              />

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>{item.name}</p>
                <p style={{ margin: 0, color: "#666" }}>
                  Size: {item.size} × {item.quantity}
                </p>
              </div>

              <div style={{ fontWeight: "bold" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "1rem",
            background: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "5px",
            marginBottom: "2rem",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Note:</strong> A confirmation email has been sent to your
            email address with all the order details.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/" className="btn">
            Continue Shopping
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Browse More Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
