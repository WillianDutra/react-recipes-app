import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Testa a renderização do componente Header', () => {
  it('Verifica se o título correto aparece na tela da rota meals', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');
    const title = screen.getByRole('heading', { level: 1, name: /Meals/i });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se a barra de pesquisa aparece na tela da rota meals', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByAltText('search icon');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    expect(searchIcon).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
  });

  it('Verifica se o título correto aparece na tela da rota drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');
    const title = screen.getByRole('heading', { level: 1, name: /Drinks/i });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se a barra de pesquisa aparece na tela da rota drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByAltText('search icon');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    expect(searchIcon).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
  });

  it('Verifica se o título correto aparece na tela da rota profile', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/profile');
    });

    expect(history.location.pathname).toBe('/profile');
    const title = screen.getByRole('heading', { level: 1, name: /profile/i });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se o título correto aparece na tela da rota favorite-recipes', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/favorite-recipes');
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
    const title = screen.getByRole('heading', { level: 1, name: /favorite recipes/i });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se o título correto aparece na tela da rota done-recipes', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/done-recipes');
    });

    expect(history.location.pathname).toBe('/done-recipes');
    const title = screen.getByRole('heading', { level: 1, name: /done recipes/i });
    expect(title).toBeInTheDocument();
  });
});
