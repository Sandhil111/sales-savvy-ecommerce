
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Sign_up() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('CUSTOMER');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      dob,
      gender,
      role
    };

    try {
      await axios.post('http://localhost:8080/signUp', data);
      alert('Registration successful!');
      navigate('/sign_in');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Error registering user. Please check the console.');
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
          <h1>Create Account</h1>

          <p className="auth-subtitle">Join Sales Savvy</p>

          <p className="auth-description">
            Fill in your details to create your account.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="signup-dob">Date of Birth</label>
              <input
                id="signup-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="signup-role">Account Type</label>
              <select
                id="signup-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button type="submit" className="primary-button">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <NavLink to="/sign_in">Sign In</NavLink>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        © 2026 Sales Savvy. All rights reserved.
      </footer>
    </div>
  );
}
