import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Testa a renderização do componente Drinks', () => {
  it('Verifica a rota drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    expect(history.location.pathname).toBe('/');
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');
    const title = screen.getByText('Drinks');
    expect(title).toBeInTheDocument();

    setTimeout(() => {
      const buttonCategory = screen.getByTestId('Cocktail-category-filter');
      expect(buttonCategory).toHaveTextContent('Cocktail');
    }, 2000);
  });
});
