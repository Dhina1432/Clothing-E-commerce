import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import API from "../services/api.js";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await API.get("/products?limit=6");
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container text-center">Loading...</div>;
  }

  return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Welcome to Our Clothing Store
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          Discover the latest fashion trends for Men, Women, and Kids
        </p>
        <Link to="/products" className="btn" style={{ marginTop: "1rem" }}>
          Shop Now
        </Link>
      </div>

      <section>
        <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
          Featured Products
        </h2>

        <div className="grid grid-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/products" className="btn btn-secondary">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
