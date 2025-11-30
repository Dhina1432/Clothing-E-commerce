import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import API from "../services/api.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <div className="container text-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="container text-center">
        <h2>Product not found</h2>
        <Link to="/products" className="btn">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link
        to="/products"
        style={{ marginBottom: "1rem", display: "inline-block" }}
      >
        &larr; Back to Products
      </Link>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}
      >
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{ marginBottom: "1rem" }}>{product.name}</h1>
          <p
            style={{
              color: "#666",
              fontSize: "1.1rem",
              marginBottom: "1.5rem",
            }}
          >
            {product.description}
          </p>

          <div style={{ marginBottom: "1.5rem" }}>
            <strong style={{ fontSize: "1.5rem", color: "#333" }}>
              ${product.price}
            </strong>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Available Sizes:</strong> {product.sizes.join(", ")}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock} units
            </p>
          </div>

          {/* Size Selection */}
          <div className="form-group">
            <label>
              <strong>Select Size:</strong>
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              style={{ fontSize: "1rem", padding: "10px" }}
            >
              <option value="">Choose a size</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || !selectedSize}
            className="btn"
            style={{
              width: "100%",
              fontSize: "1.1rem",
              padding: "15px",
            }}
          >
            {addingToCart ? "Adding to Cart..." : "Add to Cart"}
          </button>

          <div style={{ marginTop: "2rem" }}>
            <Link to="/cart" className="btn btn-secondary">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
