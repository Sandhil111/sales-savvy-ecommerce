
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Update_product() {
  const [product, setProduct] = useState({
  id: '',
  name: '',
  description: '',
  price: '',
  photo: '',
  category: ''
});

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/searchProduct?id=${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.error('Failed to load product:', error);
      alert('Unable to find product.');
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     await axios.post(
  'http://localhost:8080/updateProduct',
  {
    ...product,
    price: Number(product.price),
    photo: product.photo
  }
);

      alert('Product updated successfully!');
      navigate('/pm');
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Unable to update product.');
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
          <h1 className="page-title">Update Product</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="update-name">Product Name</label>
              <input
                id="update-name"
                name="name"
                value={product.name || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="update-description">Description</label>
              <textarea
                id="update-description"
                name="description"
                rows="3"
                value={product.description || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="update-price">Price (₹)</label>
              <input
                id="update-price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={product.price ?? ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
    <label htmlFor="product-photo">Image URL</label>
    <input
    id="product-photo"
    type="text"
    value={product.photo || ''}
    onChange={(e) =>
      setProduct({ ...product, photo: e.target.value })
    }
    placeholder="Enter product image URL"
  />
</div>

            <div className="page-actions">
              <button type="submit" className="primary-button">
                Save Changes
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
