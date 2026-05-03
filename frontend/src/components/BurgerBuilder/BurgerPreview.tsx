import React from 'react';
import type { BurgerLayer, Ingredient } from '../../types';
import { getPizzaName } from '../../utils/pizzaMapping';
import './BurgerPreview.css';

interface BurgerPreviewProps {
  layers: BurgerLayer[];
  getIngredientById: (id: number) => Ingredient | undefined;
  onRemoveLayer: (index: number) => void;
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

const UnknownIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

const BurgerPreview: React.FC<BurgerPreviewProps> = ({ layers, getIngredientById, onRemoveLayer }) => {
  const getDisplay = (ingredient: Ingredient | undefined) => {
    if (!ingredient) return { icon: UnknownIcon, className: 'unknown', name: 'Unknown' };
    return {
      icon: CategoryIcons[ingredient.category] ?? UnknownIcon,
      className: ingredient.category === 'buns' ? 'bun'
        : ingredient.category === 'patties' ? 'patty'
        : ingredient.category === 'toppings' ? 'topping'
        : ingredient.category === 'sauces' ? 'sauce'
        : 'unknown',
      name: getPizzaName(ingredient.name),
    };
  };

  // Group layers by category for the preview label
  const layerCount = layers.length;

  return (
    <div className="burger-preview">
      {/* Pizza visual header */}
      <div className="preview-pizza-visual">
        <div className="pizza-circle" />
        <p className="preview-title">Your Pizza</p>
        {layerCount > 0 && (
          <span className="preview-badge">{layerCount} ingredient{layerCount !== 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Layer stack */}
      <div className="burger-stack">
        <p className="stack-label">Layers — tap to remove</p>
        {layers.length === 0 ? (
          <div className="empty-burger">
            <p>Your pizza is empty</p>
            <p className="hint">Tap an ingredient to add it</p>
          </div>
        ) : (
          layers.map((layer, index) => {
            const ingredient = getIngredientById(layer.ingredientId);
            const display = getDisplay(ingredient);

            return (
              <div
                key={index}
                className={`burger-layer ${display.className}`}
                onClick={() => onRemoveLayer(index)}
                title="Click to remove"
              >
                <span className="layer-icon">{display.icon}</span>
                <span className="layer-name">{display.name}</span>
                {layer.quantity > 1 && (
                  <span className="layer-quantity">×{layer.quantity}</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BurgerPreview;
