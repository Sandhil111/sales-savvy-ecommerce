
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Admin_home() {
  return (
    <div className="admin-page">
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          🛍️ Sales <strong>Savvy</strong>
        </NavLink>

        <NavLink to="/" className="site-home-link">
          Logout
        </NavLink>
      </header>

      <main className="dashboard-content">
        <p className="dashboard-label">ADMINISTRATION</p>
        <h1 className="page-title">Welcome to Admin Home</h1>
        <p className="dashboard-description">
          Manage your products from one place.
        </p>

        <div className="dashboard-grid">
          <NavLink to="/pm" className="dashboard-card">
            <div className="dashboard-icon">📦</div>
            <h2>Product Management</h2>
            <p>Add, update, search and delete products.</p>
            <span className="dashboard-link">
              Manage Products →
            </span>
          </NavLink>
        </div>
      </main>

      <footer className="site-footer">
        © 2026 Sales Savvy. All rights reserved.
      </footer>
    </div>
  );
}
