import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import Meals from '../components/Meals';
import mealsRequestMock from '../utils/mealsRequestMock';

describe('Testa a renderização do componente SearchBar', () => {
  it('Verifica a busca de ingredientes na barra de pesquisa', () => {
    renderWithRouter(
      <RecipesProvider><Meals /></RecipesProvider>,
    );

    global.fetch = jest.fn(async () => ({
      json: async () => (mealsRequestMock),
    }));

    const searchIcon = screen.getByAltText('search icon');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    expect(searchIcon).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();

    userEvent.type(searchBar, 'fish');
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByText('Search'));
    expect(global.fetch).toHaveBeenCalled();
    const search = screen.findByTestId('0-card-name');
    expect(search).toBeInTheDocument();
  });
});
