import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    setAddingToCart(true);
    const result = await addToCart(product, selectedSize, 1);
    setAddingToCart(false);

    if (result.success) {
      alert("Product added to cart!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "5px",
          marginBottom: "1rem",
        }}
      />

      <h3 style={{ marginBottom: "0.5rem" }}>{product.name}</h3>
      <p
        style={{
          color: "#666",
          fontSize: "0.9rem",
          marginBottom: "1rem",
        }}
      >
        {product.description}
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <strong style={{ fontSize: "1.2rem", color: "#333" }}>
          ${product.price}
        </strong>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          Size:
        </label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          style={{
            width: "100%",
            padding: "5px",
            border: "1px solid #ddd",
            borderRadius: "3px",
          }}
        >
          <option value="">Select Size</option>
          {product.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleAddToCart}
          disabled={addingToCart}
          className="btn"
          style={{ flex: 1 }}
        >
          {addingToCart ? "Adding..." : "Add to Cart"}
        </button>

        <Link to={`/product/${product._id}`} className="btn btn-secondary">
          View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
