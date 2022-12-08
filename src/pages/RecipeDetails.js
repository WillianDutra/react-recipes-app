import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import MealsDetails from '../components/MealsDetails';
import DrinksDetails from '../components/DrinksDetails';
import RecipeButton from '../components/RecipeButton';
import { getRecipeData } from '../services/requestAPI';

import shareIcon from '../images/shareIcon.svg';
import '../styles/details.css';

const copy = require('clipboard-copy');

export default function RecipeDetails() {
  const { recipeDetails, setRecipeDetails } = useContext(RecipesContext);
  const [isCopied, setIsCopied] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getRecipeDetails = async () => {
      const recipeID = location.pathname.split('/');
      if (recipeID[1] === 'meals') {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID[2]}`;
        setRecipeDetails(await getRecipeData(url));
      } if (recipeID[1] === 'drinks') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID[2]}`;
        setRecipeDetails(await getRecipeData(url));
      }
    };

    getRecipeDetails();
  }, [location.pathname, setRecipeDetails]);

  const getRoute = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setIsCopied(false);
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
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>
      <RecipeButton />
    </>
  );
}
