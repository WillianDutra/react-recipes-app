// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouter from '../utils/renderWithRouter';
import DoneRecipes from '../components/DoneRecipes';
import RecipesProvider from '../context/RecipesProvider';

// const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

const favoriteDrinkandMeals = [{
  id: '17256',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Martinez 2',
  image: 'https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg',
  doneDate: '27/02/2022',
  tags: [],
},
{ id: '52977',
  type: 'meal',
  nationality: 'Turkish',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  doneDate: '15/05/2022',
  tags: ['Soup'],

}];

describe('Testa a tela pricipal', () => {
  localStorage.setItem('doneRecipes', JSON.stringify(favoriteDrinkandMeals));

  it('Verifica se a comida feita aparece na tela', async () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    expect(screen.getByText(/Corba/i)).toBeInTheDocument();
  });

  it('Verifica se a bebida feita aparece na tela', async () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    expect(screen.getByText(/Martinez 2/i)).toBeInTheDocument();
  });

  it('Verifica se ao clicar no drink aparece só bebida, no meal só comida e all todos', async () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    const allButton = screen.getByTestId(/filter-by-all-btn/i);
    const drinkButton = screen.getByTestId(/filter-by-drink-btn/i);
    const mealButton = screen.getByTestId(/filter-by-meal-btn/i);

    userEvent.click(drinkButton);
    expect(screen.getByTestId(/0-horizontal-top-text/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/1-horizontal-top-text/i)).not.toBeInTheDocument();

    userEvent.click(allButton);
    expect(screen.getByText(/Martinez 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Corba/i)).toBeInTheDocument();

    userEvent.click(mealButton);
    expect(screen.getByText(/Corba/i)).toBeInTheDocument();
    expect(screen.queryByText(/Martinez 2/i)).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no meal aparece no meal só comida', async () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    const mealButton = screen.getByTestId(/filter-by-meal-btn/i);

    userEvent.click(mealButton);
    expect(screen.getByText(/Corba/i)).toBeInTheDocument();
    expect(screen.queryByText(/Martinez 2/i)).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no all aparece todas as receitas', async () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    const allButton = screen.getByTestId(/filter-by-all-btn/i);

    userEvent.click(allButton);
    expect(screen.getByText(/Corba/i)).toBeInTheDocument();
    expect(screen.queryByText(/Martinez 2/i)).toBeInTheDocument();
  });

  // it.skip('Verifica se ao clicar no all aparece todas as receitas', async () => {
  //   renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
  //   const allButton = screen.getByTestId(/0-horizontal-share-btn/i);

  //   userEvent.click(allButton);
  //   navigator.clipboard.writeText('http://localhost:3000/drinks/17256');
  // });

  // jest.mock('clipboard-copy', () => jest.fn());
  // const copy = require('clipboard-copy');

  it('Verifica se o botao de compartilhar copia o link da receita', async () => {
    // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteDrinkandMeals));
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    copy.mockImplementation(() => {});
    console.log(localStorage.getItem('doneRecipes'));

    const copyLink = screen.getByTestId(/0-horizontal-share-btn/i);

    userEvent.click(copyLink);

    expect(copy).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });
    // navigator.clipboard.writeText('http://localhost:3000/drinks/17256');
  });
});
