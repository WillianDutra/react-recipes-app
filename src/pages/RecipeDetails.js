import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import MealsDetails from '../components/MealsDetails';
import DrinksDetails from '../components/DrinksDetails';
import RecipeButton from '../components/RecipeButton';
import { getRecipeData } from '../services/requestAPI';

import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import '../styles/details.css';

const copy = require('clipboard-copy');

export default function RecipeDetails() {
  const { recipeDetails, setRecipeDetails } = useContext(RecipesContext);
  const [isCopied, setIsCopied] = useState(true);
  const [isFavorited, setIsFavorite] = useState(false);
  const location = useLocation();

  const getDataFromStorage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return storage;
  };

  useEffect(() => {
    const recipeID = location.pathname.split('/');

    const getRecipeDetails = async () => {
      if (recipeID[1] === 'meals') {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID[2]}`;
        setRecipeDetails(await getRecipeData(url));
      } if (recipeID[1] === 'drinks') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID[2]}`;
        setRecipeDetails(await getRecipeData(url));
      }
    };

    const storage = getDataFromStorage();
    if (storage) {
      setIsFavorite(storage.some((e) => e.id === recipeID[2]));
    }

    getRecipeDetails();
  }, [location.pathname, setRecipeDetails]);

  const getRoute = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setIsCopied(false);
  };

  const removeFavoriteRecipe = () => {
    if (recipeDetails.drinks) {
      const filter = getDataFromStorage()
        .filter((e) => e.id !== recipeDetails.drinks[0].idDrink);
      const newResult = JSON.stringify(filter);
      localStorage.setItem('favoriteRecipes', newResult);
    } if (recipeDetails.meals) {
      const filter = getDataFromStorage()
        .filter((e) => e.id !== recipeDetails.meals[0].idMeals);
      const newResult = JSON.stringify(filter);
      localStorage.setItem('favoriteRecipes', newResult);
    }
  };

  const getNewFavoriteData = () => {
    if (recipeDetails.drinks) {
      return {
        id: recipeDetails.drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: recipeDetails.drinks[0].strCategory,
        alcoholicOrNot: recipeDetails.drinks[0].strAlcoholic,
        name: recipeDetails.drinks[0].strDrink,
        image: recipeDetails.drinks[0].strDrinkThumb,
      };
    } if (recipeDetails.meals) {
      return {
        id: recipeDetails.meals[0].idMeal,
        type: 'meal',
        nationality: recipeDetails.meals[0].strArea,
        category: recipeDetails.meals[0].strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.meals[0].strMeal,
        image: recipeDetails.meals[0].strMealThumb,
      };
    }
  };

  const addFavoriteRecipe = () => {
    const oldFavorites = getDataFromStorage();
    const newFavorite = getNewFavoriteData();
    if (oldFavorites !== null) {
      oldFavorites.push(newFavorite);
      const newArray = JSON.stringify(oldFavorites);
      localStorage.setItem('favoriteRecipes', newArray);
    } if (oldFavorites === null) {
      const newArray = JSON.stringify([newFavorite]);
      localStorage.setItem('favoriteRecipes', newArray);
    }
  };

  const checkFavoriteRecipe = () => {
    if (isFavorited) {
      removeFavoriteRecipe();
      setIsFavorite(false);
    } if (!isFavorited) {
      addFavoriteRecipe();
      setIsFavorite(true);
    }
  };

  return (
    <>
      <main>
        {recipeDetails.meals && <MealsDetails />}
        {recipeDetails.drinks && <DrinksDetails />}
      </main>
      <div className="share-container">
        { isCopied ? (
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => getRoute() }
          >
            <img src={ shareIcon } alt="share-button" />
          </button>
        ) : (
          <p>Link copied!</p>
        )}
        <button
          type="button"
          onClick={ () => checkFavoriteRecipe() }
        >
          <img
            src={ isFavorited ? blackHeart : whiteHeart }
            alt="favorite-icon"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <RecipeButton />
    </>
  );
}
