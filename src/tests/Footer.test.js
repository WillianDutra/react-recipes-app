import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testa componente Footer', () => {
  test('Meals footer', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const drink = screen.getByTestId(/drinks-bottom-btn/i);
    const meal = screen.getByTestId(/meals-bottom-btn/i);
    expect(drink).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
    userEvent.click(drink);
    const title = screen.getByRole('heading', { level: 1, name: /Drinks/i });
    expect(title).toBeInTheDocument();
  });

  test('Drinks footer', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const drink = screen.getByTestId(/drinks-bottom-btn/i);
    const meal = screen.getByTestId(/meals-bottom-btn/i);
    expect(drink).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
    userEvent.click(meal);
    const title = screen.getByRole('heading', { level: 1, name: /Meals/i });
    expect(title).toBeInTheDocument();
  });
});
