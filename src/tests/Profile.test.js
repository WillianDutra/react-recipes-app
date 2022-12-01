import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { testIds, VALID_EMAIL, VALID_PASSWORD } from '../utils/constants';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Testa página de Perfil', () => {
  it('Testa funcionalidade do Link Done Recipes', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/');
    });

    const email = screen.getByTestId(testIds.emailInput);
    const button = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
    const buttonProfile = screen.getByTestId(testIds.profileButton);
    expect(buttonProfile).toBeInTheDocument();
    userEvent.click(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
    const profileEmail = screen.getByTestId(testIds.profileEmail);
    const profileDoneRecipes = screen.getByTestId(testIds.profileDoneRecipes);
    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneRecipes).toBeInTheDocument();
    userEvent.click(profileDoneRecipes);
    const title = screen.getByRole('heading', { level: 1, name: /done recipes/i });
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa funcionalidade do Link Favorite Recipes', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/');
    });

    const email = screen.getByTestId(testIds.emailInput);
    const button = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
    const buttonProfile = screen.getByTestId(testIds.profileButton);
    expect(buttonProfile).toBeInTheDocument();
    userEvent.click(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
    const profileEmail = screen.getByTestId(testIds.profileEmail);
    const profileFavorites = screen.getByTestId(testIds.profileFavorites);
    expect(profileEmail).toBeInTheDocument();
    expect(profileFavorites).toBeInTheDocument();
    userEvent.click(profileFavorites);
    const title = screen.getByRole('heading', { level: 1, name: /favorite recipes/i });
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testa funcionalidade do Logout', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push('/');
    });

    const email = screen.getByTestId(testIds.emailInput);
    const button = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
    const buttonProfile = screen.getByTestId(testIds.profileButton);
    expect(buttonProfile).toBeInTheDocument();
    userEvent.click(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
    const profileEmail = screen.getByTestId(testIds.profileEmail);
    const profileLogout = screen.getByTestId(testIds.profileLogout);
    expect(profileEmail).toBeInTheDocument();
    expect(profileLogout).toBeInTheDocument();
    userEvent.click(profileLogout);
    expect(history.location.pathname).toBe('/');
    expect(localStorage.length).toBe(0);
  });
});
