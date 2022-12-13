import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import copy from 'clipboard-copy';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

jest.mock('clipboard-copy');

const favoriteStorageDrink = [
  { id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  }];

const favoriteID = 'favorite-btn';
const addressDrink = '/drinks/15997';

describe('Página de receita detalhada', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteStorageDrink));

  it('É renderizada corretamente', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push(addressDrink);
    });

    await waitFor(() => {
      expect(screen.getByTestId('recipe-photo')).toBeDefined();
      expect(screen.getByTestId('recipe-title')).toBeDefined();
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeDefined();
      expect(screen.getByTestId('instructions')).toBeDefined();
      expect(screen.getAllByRole('link')).toBeDefined();
      expect(screen.getByTestId('share-btn')).toBeDefined();
      expect(screen.getByTestId(favoriteID)).toBeDefined();
      expect(screen.getByTestId('start-recipe-btn')).toBeDefined();
    });
  });

  it('Botão de compartilhar copia o link e exibe a mensagem', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push(addressDrink);
    });

    const copyButton = screen.getByTestId(/share-btn/i);
    userEvent.click(copyButton);
    expect(copy).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Link copied!')).toBeDefined();
    });
  });

  it('Remover receita dos favoritos altera o botão', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );

    act(() => {
      history.push(addressDrink);
    });

    const favoriteButton = screen.getByTestId(favoriteID);
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(favoriteButton);

    expect(screen.getByTestId(favoriteID)).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
