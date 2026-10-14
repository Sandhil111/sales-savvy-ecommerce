
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function Search_product() {
  const [id, setId] = useState('');
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setProduct(null);
    setMessage('');

    try {
      const response = await axios.get(
        `http://localhost:8080/searchProduct?id=${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      setMessage('Product not found. Please check the ID.');
    }
  };

  return (
    <div className="product-page">
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          🛍️ Sales <strong>Savvy</strong>
        </NavLink>
        <NavLink to="/pm" className="site-home-link">
          ← Product Management
        </NavLink>
      </header>

      <main className="form-page-content">
        <section className="form-card">
          <h1 className="page-title">Search Product</h1>
          <p className="dashboard-description">
            Enter a product ID to find its details.
          </p>

          <form onSubmit={handleSearch}>
            <div className="form-field">
              <label htmlFor="search-id">Product ID</label>
              <input
                id="search-id"
                type="number"
                min="1"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-button">
              Search
            </button>
          </form>

          {message && <p className="error-message">{message}</p>}

          {product && (
            <div className="search-result">
              <h2>Product Details</h2>

              {product.image && (
                <img
                  className="search-product-image"
                  src={product.image}
                  alt={product.name}
                />
              )}

              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
