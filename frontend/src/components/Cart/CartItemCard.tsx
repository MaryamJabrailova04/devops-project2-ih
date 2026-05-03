import React from 'react';
import type { CartItem } from '../../types';
import './CartItemCard.css';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item-card">
      <div className="item-info">
        <div className="item-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2L12 22"/>
            <path d="M2 12L22 12"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </div>
        <div className="item-details">
          <h3 className="item-title">Custom Pizza</h3>
          <p className="item-layers">{item.layers.length} ingredients</p>
          <p className="item-price">${item.totalPrice.toFixed(2)} each</p>
        </div>
      </div>

      <div className="item-actions">
        <div className="quantity-controls">
          <button
            className="quantity-button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button
            className="quantity-button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="item-total">
          <span className="total-label">Total</span>
          <span className="total-value">${(item.totalPrice * item.quantity).toFixed(2)}</span>
        </div>

        <button
          className="remove-button"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
