import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IngredientCard from './IngredientCard';
import type { Ingredient } from '../../types';

describe('IngredientCard', () => {
  const mockIngredient: Ingredient = {
    id: 1,
    name: 'Beef Patty',
    category: 'patties',
    price: 5.99,
    imageUrl: 'patty.jpg',
  };

  const mockOnAdd = vi.fn();

  it('should render ingredient name', () => {
    render(<IngredientCard ingredient={mockIngredient} onAdd={mockOnAdd} />);
    // Component displays the pizza display name via getPizzaName() — 'Beef Patty' → 'Marinara Base'
    expect(screen.getByText('Marinara Base')).toBeInTheDocument();
  });

  it('should render ingredient price with 2 decimal places', () => {
    render(<IngredientCard ingredient={mockIngredient} onAdd={mockOnAdd} />);
    // Price renders with a leading "+" sign in the new UI
    expect(screen.getByText('+$5.99')).toBeInTheDocument();
  });

  it('should render correct icon for patties category', () => {
    const { container } = render(<IngredientCard ingredient={mockIngredient} onAdd={mockOnAdd} />);
    // Patties icon is an SVG (water-drop flame shape — no rect, no circle)
    expect(container.querySelector('.ingredient-icon svg')).toBeInTheDocument();
    expect(container.querySelector('[data-category="patties"]')).toBeInTheDocument();
  });

  it('should render correct icon for buns category', () => {
    const bunsIngredient = { ...mockIngredient, category: 'buns' as const };
    const { container } = render(<IngredientCard ingredient={bunsIngredient} onAdd={mockOnAdd} />);
    // Buns icon SVG contains a rect element (the bun shelf/base shape)
    expect(container.querySelector('.ingredient-icon svg')).toBeInTheDocument();
    expect(container.querySelector('.ingredient-icon svg rect')).toBeInTheDocument();
    expect(container.querySelector('[data-category="buns"]')).toBeInTheDocument();
  });

  it('should render correct icon for toppings category', () => {
    const toppingsIngredient = { ...mockIngredient, category: 'toppings' as const };
    const { container } = render(<IngredientCard ingredient={toppingsIngredient} onAdd={mockOnAdd} />);
    // Toppings icon is an SVG (leaf/herb shape with two path elements)
    expect(container.querySelector('.ingredient-icon svg')).toBeInTheDocument();
    expect(container.querySelector('[data-category="toppings"]')).toBeInTheDocument();
  });

  it('should render correct icon for sauces category', () => {
    const saucesIngredient = { ...mockIngredient, category: 'sauces' as const };
    const { container } = render(<IngredientCard ingredient={saucesIngredient} onAdd={mockOnAdd} />);
    // Sauces icon SVG contains a circle element (radial sun/drizzle shape)
    expect(container.querySelector('.ingredient-icon svg')).toBeInTheDocument();
    expect(container.querySelector('.ingredient-icon svg circle')).toBeInTheDocument();
    expect(container.querySelector('[data-category="sauces"]')).toBeInTheDocument();
  });

  it('should call onAdd with ingredient id when card is clicked', async () => {
    const user = userEvent.setup();
    render(<IngredientCard ingredient={mockIngredient} onAdd={mockOnAdd} />);

    // Card is located by the pizza display name shown in the UI
    const card = screen.getByText('Marinara Base').closest('.ingredient-card');
    await user.click(card!);

    expect(mockOnAdd).toHaveBeenCalledWith(mockIngredient.id);
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it('should call onAdd when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<IngredientCard ingredient={mockIngredient} onAdd={mockOnAdd} />);

    const addButton = screen.getByText('Add +');
    await user.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledWith(mockIngredient.id);
  });

  it('should format price with whole numbers correctly', () => {
    const wholeNumberIngredient = { ...mockIngredient, price: 3 };
    render(<IngredientCard ingredient={wholeNumberIngredient} onAdd={mockOnAdd} />);
    // Price renders with "+" prefix in the new UI
    expect(screen.getByText('+$3.00')).toBeInTheDocument();
  });
});
