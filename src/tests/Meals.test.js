import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import mealsRequestMock from '../utils/mealsRequestMock';

describe('Testa a renderização do componente Meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mealsRequestMock),
    }));
  });
  const searchIcon = 'search icon';
  const searchBar = 'search-input';

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

  it('Verifica exibição do alert na rota meals, quando a busca tem mais de uma letra', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
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
  });

  it('Verifica a busca de primeira letra na barra de pesquisa na rota meals', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const searchIconBtn = screen.getByAltText(searchIcon);
    userEvent.click(searchIconBtn);
    const searchBarInput = screen.getByTestId(searchBar);

    userEvent.type(searchBarInput, 'r');
    userEvent.click(screen.getByLabelText('First letter'));
    userEvent.click(screen.getByText('Search'));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=r');
  });

  it('Verifica a busca de ingredientes na barra de pesquisa na rota meals', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const searchIconBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchIconBtn);
    const searchBarInput = screen.getByPlaceholderText('Digite sua pesquisa');

    userEvent.type(searchBarInput, 'xablau');
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByText('Search'));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=xablau');
    setTimeout(() => {
      waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument);
    }, 2000);
  });

  it('Verifica a busca de nomes na barra de pesquisa na rota meals', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const searchIconBtn = screen.getByAltText(searchIcon);
    userEvent.click(searchIconBtn);
    const searchBarInput = screen.getByTestId(searchBar);
    userEvent.type(searchBarInput, 'arrabiata');
    userEvent.click(screen.getByLabelText('Name'));
    userEvent.click(screen.getByText('Search'));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata');

    setTimeout(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    }, 2000);
  });
});
