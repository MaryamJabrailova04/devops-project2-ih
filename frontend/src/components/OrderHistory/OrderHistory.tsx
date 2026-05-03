import React, { useState, useEffect } from 'react';
import { getOrderHistory, getOrdersByCustomerEmail } from '../../services/api';
import type { Order } from '../../types';
import './OrderHistory.css';

/** Backend may return a plain array or a wrapped object — normalise either shape. */
const toOrderArray = (raw: unknown): Order[] => {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    for (const key of ['orders', 'data', 'items', 'results', 'content']) {
      if (Array.isArray(obj[key])) return obj[key] as Order[];
    }
  }
  return [];
};

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterEmail, setFilterEmail] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    loadOrderHistory();
  }, []);

  const loadOrderHistory = async (email?: string) => {
    try {
      setLoading(true);
      setError(null);

      let raw: unknown;
      if (email && email.trim()) {
        raw = await getOrdersByCustomerEmail(email.trim());
      } else {
        raw = await getOrderHistory();
      }

      setOrders(toOrderArray(raw));
    } catch (err) {
      console.error('Failed to load order history:', err);
      setError('Failed to load order history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadOrderHistory(filterEmail);
  };

  const clearFilter = () => {
    setFilterEmail('');
    setShowFilter(false);
    loadOrderHistory();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status: string): React.CSSProperties => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { background: 'rgba(245,158,11,0.1)', color: '#92400e', border: '1px solid rgba(245,158,11,0.25)' };
      case 'confirmed':
        return { background: 'rgba(6,182,212,0.08)', color: '#0e6a7a', border: '1px solid rgba(6,182,212,0.2)' };
      case 'preparing':
        return { background: 'rgba(249,115,22,0.1)', color: '#9a3412', border: '1px solid rgba(249,115,22,0.25)' };
      case 'ready':
        return { background: 'rgba(16,185,129,0.1)', color: '#065f46', border: '1px solid rgba(16,185,129,0.25)' };
      case 'delivered':
        return { background: 'rgba(139,92,246,0.1)', color: '#5b21b6', border: '1px solid rgba(139,92,246,0.25)' };
      case 'cancelled':
        return { background: 'rgba(239,68,68,0.08)', color: '#991b1b', border: '1px solid rgba(239,68,68,0.2)' };
      default:
        return { background: 'rgba(100,116,139,0.08)', color: '#475569', border: '1px solid rgba(100,116,139,0.2)' };
    }
  };

  const getStatusIcon = (status: string): React.ReactElement => {
    switch (status.toLowerCase()) {
      case 'pending':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        );
      case 'confirmed':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        );
      case 'preparing':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        );
      case 'ready':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"/>
            <path d="M3 10h18v11H3z"/>
          </svg>
        );
      case 'delivered':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"/>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        );
      case 'cancelled':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      default:
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="order-history">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history">
        <div className="error-container">
          <div className="error-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <p>{error}</p>
          <button className="retry-button" onClick={() => loadOrderHistory()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history">
      <div className="order-history-header">
        <h1>Order History</h1>
        <div className="header-actions">
          <button
            className="filter-button"
            onClick={() => setShowFilter(!showFilter)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Filter
          </button>
          <button
            className="refresh-button"
            onClick={() => loadOrderHistory(filterEmail)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="filter-section">
          <form onSubmit={handleFilterSubmit}>
            <div className="filter-input-group">
              <input
                type="email"
                placeholder="Filter by customer email..."
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
                className="filter-input"
              />
              <button type="submit" className="filter-submit-button">
                Filter
              </button>
              <button
                type="button"
                onClick={clearFilter}
                className="clear-filter-button"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
              <line x1="9" y1="16" x2="13" y2="16"/>
            </svg>
          </div>
          <h2>No orders found</h2>
          <p>
            {filterEmail
              ? `No orders found for: ${filterEmail}`
              : 'No orders have been placed yet.'
            }
          </p>
          {filterEmail && (
            <button className="clear-filter-button" onClick={clearFilter}>
              Show All Orders
            </button>
          )}
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3 className="order-number">#{order.orderNumber}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div
                  className="order-status"
                  style={getStatusStyle(order.status)}
                >
                  <span className="status-icon">{getStatusIcon(order.status)}</span>
                  <span className="status-text">{order.status}</span>
                </div>
              </div>

              <div className="order-details">
                <div className="customer-info">
                  <p><strong>Customer:</strong> {order.customerName}</p>
                  <p><strong>Email:</strong> {order.customerEmail}</p>
                  {order.customerPhone && (
                    <p><strong>Phone:</strong> {order.customerPhone}</p>
                  )}
                </div>

                <div className="order-summary">
                  <p className="total-amount">
                    <strong>${order.totalAmount.toFixed(2)}</strong>
                  </p>
                  {order.orderItems && order.orderItems.length > 0 && (
                    <div className="order-items-count">
                      {order.orderItems.length} item(s)
                    </div>
                  )}
                </div>
              </div>

              {order.updatedAt && order.updatedAt !== order.createdAt && (
                <div className="order-updated">
                  <small>Updated: {formatDate(order.updatedAt)}</small>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
