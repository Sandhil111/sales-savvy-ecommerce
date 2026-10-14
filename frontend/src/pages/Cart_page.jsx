
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const PAYMENT_URL = 'http://localhost:8081';
const BACKEND_URL = 'http://localhost:8080';

export default function Cart_page() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username || 'Customer';

  const [cartItems, setCartItems] = useState([]);
  const [paying, setPaying] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Load cart when the page opens.
  useEffect(() => {
    loadCart();
  }, [username]);

  // Fetch cart items from the Spring Boot backend.
  const loadCart = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/getCart?username=${encodeURIComponent(username)}`
      );

      setCartItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to load cart:', error);
      alert('Unable to load your cart.');
    }
  };

  // Get product details from a cart item.
  const getProduct = (item) => item.prod || item.product || item;

  // Get the quantity of a cart item.
  const getQuantity = (item) => item.quantity ?? item.qty ?? 1;

  // Calculate the total amount.
  const total = cartItems.reduce((sum, item) => {
    const product = getProduct(item);

    return (
      sum +
      Number(product.price || 0) * Number(getQuantity(item))
    );
  }, 0);

  // Increase product quantity.
  const increaseQuantity = async (item) => {
    if (updating) return;

    const product = getProduct(item);

    try {
      setUpdating(true);

      await axios.post(`${BACKEND_URL}/addToCart`, {
        username,
        prod: product,
        quantity: 1
      });

      await loadCart();
    } catch (error) {
      console.error('Failed to increase quantity:', error);
      alert('Unable to update quantity.');
    } finally {
      setUpdating(false);
    }
  };

  // Decrease product quantity.
  const decreaseQuantity = async (item) => {
    if (updating) return;

    const product = getProduct(item);

    try {
      setUpdating(true);

      await axios.post(
        `${BACKEND_URL}/decreaseQuantity`,
        null,
        {
          params: {
            username,
            productId: product.id
          }
        }
      );

      await loadCart();
    } catch (error) {
      console.error('Failed to decrease quantity:', error);
      alert('Unable to update quantity.');
    } finally {
      setUpdating(false);
    }
  };

  // Load Razorpay Checkout.
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');

      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });

  // Clear cart after payment has been verified.
  const clearCart = async () => {
    const response = await axios.delete(
      `${BACKEND_URL}/clearCart`,
      {
        params: { username }
      }
    );

    if (
      response.data !== 'success' &&
      response.data !== 'Cart is already empty'
    ) {
      throw new Error('Cart could not be cleared.');
    }
  };

  // Start Razorpay payment.
  const makePayment = async () => {
    if (cartItems.length === 0 || paying || updating) {
      return;
    }

    setPaying(true);

    try {
      // Load Razorpay Checkout script.
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert(
          'Unable to load Razorpay Checkout. Check your internet connection.'
        );
        return;
      }

      // Backend expects the amount in rupees and converts it to paise.
      const amount = Math.round(total);

      if (amount <= 0) {
        alert('Invalid payment amount.');
        return;
      }

      // Create Razorpay order.
      const orderResponse = await axios.post(
        `${PAYMENT_URL}/create-order`,
        null,
        {
          params: { amount }
        }
      );

      const order =
        typeof orderResponse.data === 'string'
          ? JSON.parse(orderResponse.data)
          : orderResponse.data;

      // Get Razorpay public key ID.
      const keyResponse = await axios.post(
        `${PAYMENT_URL}/get-key`
      );

      const key = String(keyResponse.data).replace(/^"|"$/g, '');

      if (!order.id || !key) {
        throw new Error('Invalid Razorpay order or key.');
      }

      // Configure Razorpay Checkout.
      const options = {
        key,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Sales Savvy',
        description: 'Order payment',
        order_id: order.id,

        // Runs after Razorpay returns payment details.
        handler: async (response) => {
          try {
            // Verify payment signature through the payment backend.
            const verification = await axios.post(
              `${PAYMENT_URL}/verify-payment`,
              null,
              {
                params: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                }
              }
            );

            if (verification.data === 'success') {
              // Payment verified: clear the customer's cart.
              try {
                await clearCart();

                // Update the cart displayed by this page.
                setCartItems([]);

                // Open payment success page.
                navigate('/payment_success', {
                  state: {
                    username,
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    items: cartItems,
                    total
                  }
                });
              } catch (clearError) {
                console.error(
                  'Payment verified, but cart clearing failed:',
                  clearError
                );

                alert(
                  'Payment was verified, but your cart could not be cleared. Please contact support.'
                );
              }
            } else {
              alert('Payment verification failed.');
            }
          } catch (error) {
            console.error('Payment verification failed:', error);

            alert(
              'Could not verify payment. Please contact support before retrying.'
            );
          }
        },

        // Runs if the customer closes Checkout.
        modal: {
          ondismiss: () => {
            console.log('Razorpay Checkout closed.');
          }
        },

        theme: {
          color: '#172554'
        }
      };

      // Open Razorpay Checkout.
      const checkout = new window.Razorpay(options);

      // Handle failed payments.
      checkout.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);

        alert('Payment failed. Please try again.');
      });

      checkout.open();
    } catch (error) {
      console.error('Unable to start payment:', error);

      alert(
        'Unable to start payment. Check that the Razorpay backend is running on port 8081.'
      );
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          🛍️ Sales <strong>Savvy</strong>
        </NavLink>

        <NavLink
          to="/customer_home"
          className="site-home-link"
          onClick={(e) => {
            e.preventDefault();

            navigate('/customer_home', {
              state: { username }
            });
          }}
        >
          ← Continue Shopping
        </NavLink>
      </header>

      {/* Main cart content */}
      <main className="management-content">
        <h1 className="page-title">Your Shopping Cart</h1>

        <p className="dashboard-description">
          Review the products you've selected.
        </p>

        {/* Empty cart */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your cart is empty</h2>

            <p>Add some products to get started.</p>

            <button
              type="button"
              className="page-button"
              onClick={() =>
                navigate('/customer_home', {
                  state: { username }
                })
              }
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart products table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => {
                    const product = getProduct(item);
                    const quantity = Number(getQuantity(item));

                    return (
                      <tr key={item.id ?? product.id ?? index}>
                        {/* Product name and image */}
                        <td>
                          <div className="cart-product">
                            {product.photo && (
                              <img
                                src={product.photo}
                                alt={product.name}
                                className="table-product-image"
                              />
                            )}

                            <span>{product.name}</span>
                          </div>
                        </td>

                        {/* Price */}
                        <td>
                          ₹{Number(product.price || 0).toFixed(2)}
                        </td>

                        {/* Quantity controls */}
                        <td>
                          <div className="quantity-control">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item)}
                              disabled={updating}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span>{quantity}</span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item)}
                              disabled={updating}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Subtotal */}
                        <td>
                          ₹
                          {(
                            Number(product.price || 0) * quantity
                          ).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="cart-total">
              <span>Total Amount</span>

              <strong>₹{total.toFixed(2)}</strong>
            </div>

            {/* Payment button */}
            <div className="page-actions">
              <button
                type="button"
                className="primary-button"
                onClick={makePayment}
                disabled={paying || updating}
              >
                {paying
                  ? 'Starting payment...'
                  : 'Pay with Razorpay'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
