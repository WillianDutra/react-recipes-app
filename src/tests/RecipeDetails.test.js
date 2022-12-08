import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import copy from 'clipboard-copy';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

jest.mock('clipboard-copy');

const favoriteStorage = [
  { id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',

  }];

const address = '/meals/52977';
const favoriteID = 'favorite-btn';

describe('Página de receita detalhada', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteStorage));

  it('É renderizada corretamente', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    );
    act(() => {
      history.push(address);
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
      history.push(address);
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
      history.push(address);
    });

    const favoriteButton = screen.getByTestId(favoriteID);
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(favoriteButton);

    expect(screen.getByTestId(favoriteID)).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
