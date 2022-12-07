import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Página de receita detalhada', () => {
  it('É renderizada corretamente', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/meals/52977');
    });

    await waitFor(() => {
      expect(screen.getByTestId('recipe-photo')).toBeDefined();
      expect(screen.getByTestId('recipe-title')).toBeDefined();
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeDefined();
      expect(screen.getByTestId('instructions')).toBeDefined();
      expect(screen.getAllByRole('link')).toBeDefined();
    });
  });
});
