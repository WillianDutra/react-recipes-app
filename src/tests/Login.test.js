import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testIds, VALID_EMAIL, VALID_PASSWORD } from '../utils/constants';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Testa a tela de login', () => {
  it('Verifica se os campos de input e o botão de entrar aparecem na tela', () => {
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    const email = screen.getByTestId(testIds.emailInput);
    const button = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('Verifica se após os valores serem passados aos inputs o botão habilita', () => {
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    const email = screen.getByTestId(testIds.emailInput);
    const button = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(button).toBeDisabled();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(email).toHaveValue(VALID_EMAIL);
    expect(password).toHaveValue(VALID_PASSWORD);
    expect(button).not.toBeDisabled();
  });

  it('Verifica se o titúlo "Meals" aparece na tela da rota Meals', () => {
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    const email = screen.getByTestId(testIds.emailInput);
    const button = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(button).toBeDisabled();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(email).toHaveValue(VALID_EMAIL);
    expect(password).toHaveValue(VALID_PASSWORD);
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    const title = screen.getByRole('heading', { level: 1, name: /Meals/i });
    expect(title).toBeInTheDocument();
  });
});
