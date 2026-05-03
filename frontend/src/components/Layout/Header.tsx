import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <header className="header">

      {/* ── Logo ── */}
      <Link to="/" className="logo">
        <div className="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2 L12 22"/>
            <path d="M2 12 L22 12"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </div>
        <div className="logo-text">
          <span className="logo-title">Pizza Studio</span>
          <span className="logo-subtitle">Craft your slice</span>
        </div>
      </Link>

      {/* ── Navigation ── */}
      <nav className="nav">
        <span className="nav-section-label">Menu</span>

        <Link to="/" className="nav-link">
          <span className="nav-link-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
          </span>
          <span className="nav-link-label">Build</span>
        </Link>

        <Link to="/orders" className="nav-link">
          <span className="nav-link-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
              <line x1="9" y1="16" x2="13" y2="16"/>
            </svg>
          </span>
          <span className="nav-link-label">Orders</span>
        </Link>

        <Link to="/cart" className="nav-link cart-link">
          <span className="nav-link-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </span>
          <span className="nav-link-label">Cart</span>
          {itemCount > 0 && (
            <span className="cart-badge">{itemCount}</span>
          )}
        </Link>
      </nav>

      {/* ── Footer profile ── */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <div className="footer-avatar">PZ</div>
          <div className="footer-text">
            <div className="footer-name">Pizza Studio</div>
            <div className="footer-status">Guest session</div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
