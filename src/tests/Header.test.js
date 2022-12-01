import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Testa a renderização do componente Header', () => {
  it('Verifica se o título correto aparece na tela da rota meals', () => {
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
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

  it('Verifica se o ícone de pesquisa aparece na tela da rota meals', () => {
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByAltText('search icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('Verifica se o título correto aparece na tela da rota drinks', () => {
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');
    const title = screen.getByRole('heading', { level: 1, name: /drinks/i });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se o título correto aparece na tela da rota profile', () => {
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
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
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
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
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
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
