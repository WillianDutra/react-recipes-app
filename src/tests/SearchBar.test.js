import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import drinksRequestMock from '../utils/drinksRequestMock';

describe('Testa a renderização do componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => (drinksRequestMock),
    }));
  });

  it('Verifica a busca de ingredientes na barra de pesquisa na rota drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByPlaceholderText('Digite sua pesquisa');

    userEvent.type(searchBar, 'water');
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByText('Search'));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=water');
  });

  it('Verifica a busca de nomes na barra de pesquisa na rota drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByAltText('search icon');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    userEvent.type(searchBar, 'water');
    userEvent.click(screen.getByLabelText('Name'));
    userEvent.click(screen.getByText('Search'));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=water');
  });

  it('Verifica a busca de primeira letra na barra de pesquisa na rota drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByAltText('search icon');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    userEvent.type(searchBar, 'w');
    userEvent.click(screen.getByLabelText('First letter'));
    userEvent.click(screen.getByText('Search'));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=w');
  });
});
