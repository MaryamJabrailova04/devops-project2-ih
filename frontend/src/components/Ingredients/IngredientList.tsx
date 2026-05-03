import React from 'react';
import type { Ingredient, IngredientCategory } from '../../types';
import { getPizzaCategory } from '../../utils/pizzaMapping';
import IngredientCard from './IngredientCard';
import './IngredientList.css';

interface IngredientListProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredientId: number) => void;
}

const CategoryIcons: Record<string, React.ReactElement> = {
  buns: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12a7 7 0 0 1 14 0"/>
      <rect x="3" y="12" width="18" height="4" rx="2"/>
    </svg>
  ),
  patties: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  toppings: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    </svg>
  ),
  sauces: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
    </svg>
  ),
};

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onAddIngredient }) => {
  const categorizedIngredients = ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<IngredientCategory, Ingredient[]>);

  const categoryOrder: IngredientCategory[] = ['buns', 'patties', 'toppings', 'sauces'];

  return (
    <div className="ingredient-list">
      {categoryOrder.map((category) => {
        const items = categorizedIngredients[category];
        if (!items || items.length === 0) return null;

        return (
          <div key={category} className="ingredient-category" data-category={category}>
            <div className="category-header">
              <span className="category-icon-wrap">
                {CategoryIcons[category]}
              </span>
              <h2 className="category-title">{getPizzaCategory(category)}</h2>
              <span className="category-count">{items.length} options</span>
            </div>
            <div className="ingredient-grid">
              {items.map((ingredient) => (
                <IngredientCard
                  key={ingredient.id}
                  ingredient={ingredient}
                  onAdd={onAddIngredient}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IngredientList;
