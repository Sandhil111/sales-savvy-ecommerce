
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <NavLink to="/" className="brand">
          <span className="brand-icon">🛍️</span>
          <span>Sales <strong>Savvy</strong></span>
        </NavLink>

        <nav className="welcome-nav">
          <a href="#home">Home</a>
          <a href="#benefits">About</a>
          <a href="#footer">Contact</a>
        </nav>

        <NavLink to="/sign_in" className="header-signin">
          Sign In
        </NavLink>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">YOUR ONE-STOP SHOP</p>

            <h1>
              Welcome to
              <span>Sales Savvy</span>
            </h1>

            <p className="hero-description">
              Great products. Better prices. A smarter shopping
              experience for you.
            </p>

            <div className="hero-buttons">
              <NavLink to="/sign_up" className="btn btn-primary">
                <span className="button-icon">✚</span>
                <span className="button-text">
                  <strong>Sign Up</strong>
                  <small>Create your account</small>
                </span>
              </NavLink>

              <NavLink to="/sign_in" className="btn btn-secondary">
                <span className="button-icon">➜</span>
                <span className="button-text">
                  <strong>Sign In</strong>
                  <small>Already a member?</small>
                </span>
              </NavLink>
            </div>
          </div>

          <div className="hero-visual" aria-label="Shopping products">
            <div className="visual-circle"></div>

            <div className="visual-card card-laptop">💻</div>
            <div className="visual-card card-phone">📱</div>
            <div className="visual-card card-headphones">🎧</div>
            <div className="visual-card card-package">📦</div>

            <div className="visual-caption">
              <span>✦</span> Your next favourite find awaits
            </div>
          </div>
        </section>

        <section className="benefits" id="benefits">
          <div className="benefit-card">
            <div className="benefit-icon">🛍️</div>
            <h3>Wide Selection</h3>
            <p>Explore products for every need.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3>Trusted Shopping</h3>
            <p>Enjoy a simple shopping experience.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🛒</div>
            <h3>Easy Shopping</h3>
            <p>Find your products and manage your cart with ease.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🎧</div>
            <h3>Customer Support</h3>
            <p>A convenient shopping experience, all in one place.</p>
          </div>
        </section>
      </main>

      <footer className="welcome-footer" id="footer">
        <NavLink to="/" className="footer-brand">
          Sales <strong>Savvy</strong>
        </NavLink>
        <p>Shop smarter. Shop with Sales Savvy.</p>
        <p>© 2026 Sales Savvy. All rights reserved.</p>
      </footer>
    </div>
  );
}
