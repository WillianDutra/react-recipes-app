import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa componente Footer', () => {
  test('Meals footer', () => {
    renderWithRouter(<RecipesProvider><Meals /></RecipesProvider>);
    const drink = screen.getByTestId(/drinks-bottom-btn/i);
    const meal = screen.getByTestId(/meals-bottom-btn/i);
    expect(drink).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
    userEvent.click(drink);
    const title = screen.getByRole('heading', { level: 1, name: /Drinks/i });
    expect(title).toBeInTheDocument();
  });
  test('Drinks footer', () => {
    renderWithRouter(<RecipesProvider><Drinks /></RecipesProvider>);
    const drink = screen.getByTestId(/drinks-bottom-btn/i);
    const meal = screen.getByTestId(/meals-bottom-btn/i);
    expect(drink).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
    userEvent.click(meal);
    const title = screen.getByRole('heading', { level: 1, name: /Meals/i });
    expect(title).toBeInTheDocument();
  });
});
