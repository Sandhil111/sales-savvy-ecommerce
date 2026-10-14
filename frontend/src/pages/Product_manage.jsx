
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Product_manage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/getAllProducts'
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
      alert('Unable to load products.');
    }
  };

  return (
    <div className="product-page">
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          🛍️ Sales <strong>Savvy</strong>
        </NavLink>

        <NavLink to="/admin_home" className="site-home-link">
          ← Admin Home
        </NavLink>
      </header>

      <main className="management-content">
        <h1 className="page-title">Product Management</h1>

        <p className="dashboard-description">
          Manage your store's products here.
        </p>

        <div className="page-actions">
          <button
            className="page-button"
            onClick={() => navigate('/addProd')}
          >
            + Add Product
          </button>

          <button
            className="page-button"
            onClick={() => navigate('/SearchProd')}
          >
            Search Product
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>

                  <td>
                    {product.photo ? (
                      <img
                        className="table-product-image"
                        src={product.photo}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      '📦'
                    )}
                  </td>

                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>₹{product.price}</td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="small-button"
                        onClick={() =>
                          navigate(`/updateProd?id=${product.id}`)
                        }
                      >
                        Update
                      </button>

                      <button
                        className="small-button danger-button"
                        onClick={() =>
                          navigate(`/deleteProd?id=${product.id}`)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <p className="empty-message">No products found.</p>
        )}
      </main>
    </div>
  );
}
