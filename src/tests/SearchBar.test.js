import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
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

  const searchIcon = 'search icon';
  const searchBar = 'search-input';

  it('Verifica a busca de ingredientes na barra de pesquisa na rota drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIconBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchIconBtn);
    const searchBarInput = screen.getByPlaceholderText('Digite sua pesquisa');

    userEvent.type(searchBarInput, 'water');
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

    const searchIconBtn = screen.getByAltText(searchIcon);
    userEvent.click(searchIconBtn);
    const searchBarInput = screen.getByTestId(searchBar);
    userEvent.type(searchBarInput, 'water');
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

    const searchIconBtn = screen.getByAltText(searchIcon);
    userEvent.click(searchIconBtn);
    const searchBarInput = screen.getByTestId(searchBar);

    userEvent.type(searchBarInput, 'w');
    userEvent.click(screen.getByLabelText('First letter'));
    userEvent.click(screen.getByText('Search'));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=w');
  });

  it('Verifica exibição do alert na rota drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIconBtn = screen.getByAltText(searchIcon);
    userEvent.click(searchIconBtn);
    const searchBarInput = screen.getByTestId(searchBar);

    userEvent.type(searchBarInput, 'wa');
    userEvent.click(screen.getByLabelText('First letter'));
    userEvent.click(screen.getByText('Search'));
    setTimeout(() => {
      waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument);
    }, 2000);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=wa');
  });

  it('Verifica exibição da página de detalhes, quando encontra apena 1 item na pesquisa', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIconBtn = screen.getByAltText(searchIcon);
    userEvent.click(searchIconBtn);
    const searchBarInput = screen.getByTestId(searchBar);

    userEvent.type(searchBarInput, 'Aquamarine');
    userEvent.click(screen.getByLabelText('Name'));
    userEvent.click(screen.getByText('Search'));
    setTimeout(() => {
      waitFor(() => expect(screen.getByRole('heading', { level: 3, name: /Aquamarine/i })).toBeInTheDocument);
    }, 2000);
  });
});
