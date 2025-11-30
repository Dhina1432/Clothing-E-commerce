import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import Filters from "../components/Filters.jsx";
import API from "../services/api.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const currentFilters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    size: searchParams.get("size") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    page: searchParams.get("page") || "1",
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log("Current filters:", currentFilters);
      const response = await API.get("/products", {
        params: currentFilters,
      });

      console.log("API /products response:", response.data);

      setProducts(response.data.products);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: "2rem" }}>All Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "250px 1fr",
          gap: "2rem",
        }}
      >
        {/* Filters Sidebar */}
        <div>
          <Filters onFilterChange={handleFilterChange} />
        </div>

        {/* Products Grid */}
        <div>
          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p>
                  Showing {products.length} of {pagination.total} products
                </p>
              </div>

              <div className="grid grid-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    marginTop: "2rem",
                  }}
                >
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>

                  {[...Array(pagination.pages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`btn ${
                        pagination.page === index + 1 ? "" : "btn-secondary"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="btn btn-secondary"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
