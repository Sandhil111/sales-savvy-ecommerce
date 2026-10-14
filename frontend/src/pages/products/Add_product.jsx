
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Add_product() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
  name,
  description,
  price: Number(price),
  photo: image
};

    try {
      await axios.post(
        'http://localhost:8080/addProduct',
        product
      );

      alert('Product added successfully!');
      navigate('/pm');
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Unable to add product. Check the console.');
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
          <h1 className="page-title">Add New Product</h1>
          <p className="dashboard-description">
            Enter the product details below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="product-description">Description</label>
              <textarea
                id="product-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="product-price">Price (₹)</label>
              <input
                id="product-price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="product-image">Image URL</label>
              <input
                id="product-image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter product image URL"
              />
            </div>

            <div className="page-actions">
              <button type="submit" className="primary-button">
                Add Product
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate('/pm')}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
