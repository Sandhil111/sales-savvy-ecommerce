
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Payment_success() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    username,
    orderId,
    paymentId,
    items = [],
    total = 0
  } = location.state || {};

  return (
    <div className="cart-page">
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          🛍️ Sales <strong>Savvy</strong>
        </NavLink>
      </header>

      <main className="management-content">
        <div className="form-card">
          <h1 style={{ color: '#16803d' }}>
            ✅ Payment Successful!
          </h1>

          <p><strong>Order ID:</strong> {orderId || 'Not available'}</p>
          <p><strong>Payment ID:</strong> {paymentId || 'Not available'}</p>
          <p><strong>Status:</strong> PAID</p>

          <h2>Items Purchased</h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const product = item.prod || item.product || item;
                  const quantity = Number(item.quantity ?? item.qty ?? 1);

                  return (
                    <tr key={item.id ?? product.id ?? index}>
                      <td>{product.name}</td>
                      <td>{quantity}</td>
                      <td>₹{Number(product.price || 0).toFixed(2)}</td>
                      <td>
                        ₹{(Number(product.price || 0) * quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2 style={{ marginTop: '24px' }}>
            Total Paid: ₹{Number(total).toFixed(2)}
          </h2>

          <button
            className="primary-button"
            onClick={() =>
              navigate('/customer_home', { state: { username } })
            }
          >
            Continue Shopping
          </button>
        </div>
      </main>
    </div>
  );
}
