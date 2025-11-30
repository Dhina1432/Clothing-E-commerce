import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    size: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "",
      size: "",
      minPrice: "",
      maxPrice: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: "1rem" }}>Filters</h3>

      <div className="form-group">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="form-group">
        <label>Size</label>
        <select
          value={filters.size}
          onChange={(e) => handleChange("size", e.target.value)}
        >
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      <div className="form-group">
        <label>Min Price</label>
        <input
          type="number"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={(e) => handleChange("minPrice", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Max Price</label>
        <input
          type="number"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(e) => handleChange("maxPrice", e.target.value)}
        />
      </div>

      <button onClick={clearFilters} className="btn btn-secondary">
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
