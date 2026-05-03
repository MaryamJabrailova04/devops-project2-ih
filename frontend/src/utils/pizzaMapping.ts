/**
 * Pizza UI → Burger API translation layer.
 * The frontend displays pizza terminology; API communication uses burger data unchanged.
 * Mapping is display-only — ingredient IDs passed to the backend are never modified.
 */

const INGREDIENT_NAME_MAP: Record<string, string> = {
  // Buns → Crust
  'Sesame Bun': 'Thin Crust',
  'Whole Wheat Bun': 'Thick Crust',
  // Patties → Sauce Base
  'Beef Patty': 'Marinara Base',
  'Chicken Patty': 'White Cream Sauce',
  'Veggie Patty': 'Pesto Base',
  // Toppings
  'Lettuce': 'Fresh Arugula',
  'Tomato': 'Roma Tomatoes',
  'Onion': 'Red Onion',
  'Cheese': 'Mozzarella',
  'Pickles': 'Jalapeños',
  'Bacon': 'Pepperoni',
  // Sauces → Finishing Touches
  'Ketchup': 'Tomato Drizzle',
  'Mayo': 'Garlic Aioli',
  'Mustard': 'Honey Mustard',
  'BBQ Sauce': 'Truffle Glaze',
};

const CATEGORY_NAME_MAP: Record<string, string> = {
  buns: 'Crust',
  patties: 'Sauce Base',
  toppings: 'Toppings',
  sauces: 'Finishing Touches',
};

/** Returns the pizza display name for a given burger ingredient name. */
export const getPizzaName = (burgerName: string): string =>
  INGREDIENT_NAME_MAP[burgerName] ?? burgerName;

/** Returns the pizza section label for a given burger ingredient category. */
export const getPizzaCategory = (burgerCategory: string): string =>
  CATEGORY_NAME_MAP[burgerCategory] ?? burgerCategory;
