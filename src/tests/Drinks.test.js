import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import drinksRequestMock from '../utils/drinksRequestMock';
import App from '../App';

describe('Testa a renderização do componente Drinks', () => {
  it('Verifica se as receitas dos drinks aparecem na tela', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    global.fetch = jest.fn(async () => ({
      json: async () => (drinksRequestMock),
    }));

    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');
    expect(global.fetch).toHaveBeenCalled();

    const drink = screen.getByTestId('0-recipe-card');
    expect(drink).toBeInTheDocument();
  });
});
