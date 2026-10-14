
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post('http://localhost:8080/signIn', {
        username,
        password
      });

      const role = resp.data;

      if (role === 'Admin') {
        navigate('/admin_home');
      } else if (role === 'Customer') {
        navigate('/customer_home', {
          state: { username }
        });
      } else if (role === 'invalid') {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Signin failed:', error);
      alert('Error signing in – check console');
    }
  };

  return (
    <div className="auth-page">
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          🛍️ Sales <strong>Savvy</strong>
        </NavLink>
        <NavLink to="/" className="site-home-link">
          Back to Home
        </NavLink>
      </header>

      <main className="auth-main">
        <section className="auth-card">
          <h1>Welcome Back!</h1>
          <p className="auth-subtitle">Sign in to Sales Savvy</p>
          <p className="auth-description">
            Enter your account details to continue shopping.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-button">
              Sign In
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <NavLink to="/sign_up">Sign Up</NavLink>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        © 2026 Sales Savvy. All rights reserved.
      </footer>
    </div>
  );
}
