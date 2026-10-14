
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Customer_home() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Customer';

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

  const changeQuantity = (productId, amount) => {
    setQuantities((previous) => ({
      ...previous,
      [productId]: Math.max(
        1,
        (previous[productId] || 1) + amount
      )
    }));
  };

  const addToCart = async (product) => {
    const quantity = quantities[product.id] || 1;

    try {
      await axios.post('http://localhost:8080/addToCart', {
        username,
        prod: product,
        quantity
      });

      alert('Product added to cart!');
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Unable to add product to cart.');
    }
  };

  return (
    <div className="customer-page">
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          🛍️ Sales <strong>Savvy</strong>
        </NavLink>

        <div className="customer-header-actions">
          <span className="customer-greeting">
            Hello, {username}
          </span>

          <button
            className="page-button"
            onClick={() =>
              navigate('/cart_page', { state: { username } })
            }
          >
            🛒 View Cart
          </button>

          <NavLink to="/" className="site-home-link">
            Logout
          </NavLink>
        </div>
      </header>

      <main className="customer-content">
        <p className="dashboard-label">OUR COLLECTION</p>

        <h1 className="page-title">Explore Products</h1>

        <p className="dashboard-description">
          Find something you love and add it to your cart.
        </p>

        <div className="customer-product-grid">
          {products.map((product) => (
            <article
              className="customer-product-card"
              key={product.id}
            >
              <div className="customer-product-image">
                {product.photo ? (
                  <img
                    src={product.photo}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span>📦</span>
                )}
              </div>

              <div className="customer-product-details">
                <h2>{product.name}</h2>

                <p className="product-description">
                  {product.description}
                </p>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <div className="product-card-actions">
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => changeQuantity(product.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{quantities[product.id] || 1}</span>

                    <button
                      type="button"
                      onClick={() => changeQuantity(product.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="page-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {products.length === 0 && (
          <p className="empty-message">No products available.</p>
        )}
      </main>

      <footer className="site-footer">
        © 2026 Sales Savvy. All rights reserved.
      </footer>
    </div>
  );
}
