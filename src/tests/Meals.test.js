import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Testa a renderização do componente Meals', () => {
  it('Verifica a rota meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    expect(history.location.pathname).toBe('/');
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');
    const title = screen.getByText('Meals');
    expect(title).toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument);
  });
});
