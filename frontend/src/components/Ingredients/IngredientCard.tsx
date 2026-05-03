import React from 'react';
import type { Ingredient } from '../../types';
import { getPizzaName } from '../../utils/pizzaMapping';
import './IngredientCard.css';

interface IngredientCardProps {
  ingredient: Ingredient;
  onAdd: (ingredientId: number) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onAdd }) => {
  return (
    <div
      className="ingredient-card"
      data-category={ingredient.category}
      onClick={() => onAdd(ingredient.id)}
    >
      <div className="ingredient-icon">{getCategoryIcon(ingredient.category)}</div>
      <h3 className="ingredient-name">{getPizzaName(ingredient.name)}</h3>
      <p className="ingredient-price">+${ingredient.price.toFixed(2)}</p>
      <button className="add-button">Add +</button>
    </div>
  );
};

const getCategoryIcon = (category: string): React.ReactElement => {
  const icons: Record<string, React.ReactElement> = {
    buns: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12a7 7 0 0 1 14 0"/>
        <rect x="3" y="12" width="18" height="4" rx="2"/>
      </svg>
    ),
    patties: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    toppings: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    sauces: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>
      </svg>
    ),
  };
  return icons[category] ?? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
};

export default IngredientCard;
