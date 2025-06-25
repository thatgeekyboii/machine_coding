import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import './Pagination.css'
const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/?limit=500");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json.products);
      setProducts(json.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const PAGE_SIZE = 10;
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  return !products.length ? (
    <h1>No products found</h1>
  ) : (
    <div className="pagination-main">
      <h1 className="pagination-title">Pagination</h1>
      <div className="pagination-controls">
        <button disabled={currentPage === 0} onClick={() => goToPrevPage()}>
          Prev
        </button>
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            className={`page-number ${currentPage === n ? "active" : ""}`}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages + 1}
          onClick={() => goToNextPage()}
        >
          Next
        </button>
      </div>

      <div className="pagination-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.images} title={p.title} />
        ))}
      </div>
    </div>
  );
};

export default Pagination;
