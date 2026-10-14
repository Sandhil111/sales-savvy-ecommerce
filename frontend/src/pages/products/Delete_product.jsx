
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Delete_product() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert('Product ID is missing');
      navigate('/pm');
      return;
    }

    const fetchProduct = async () => {
      try {
        const resp = await axios.get(
          'http://localhost:8080/searchProduct',
          { params: { id } }
        );

        if (!resp.data || !resp.data.id) {
          alert('Product not found');
          navigate('/pm');
          return;
        }

        setProduct(resp.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!product) return;

    try {
      await axios.get('http://localhost:8080/deleteProduct', {
        params: { id: product.id }
      });

      alert('Product deleted successfully!');
      navigate('/pm');
    } catch (error) {
      console.error('Delete product failed:', error);
      alert('Failed to delete product');
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
          <h1 className="page-title">Delete Product</h1>

          {loading ? (
            <p>Loading product...</p>
          ) : product ? (
            <>
              <div className="search-result">
                <p><strong>Product ID:</strong> {product.id}</p>
                <p><strong>Product Name:</strong> {product.name}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
              </div>

              <p>Are you sure you want to delete this product?</p>

              <div className="page-actions">
                <button
                  type="button"
                  className="primary-button delete-confirm-button"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => navigate('/pm')}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="error-message">Product could not be loaded.</p>
          )}
        </section>
      </main>
    </div>
  );
}
