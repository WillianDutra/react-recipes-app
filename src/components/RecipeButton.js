import { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function RecipeButton() {
  const { recipeDetails, recipeDone, setRecipeDone,
    inProgress, setInProgress } = useContext(RecipesContext);

  useEffect(() => {
    const checkDoneRecipes = () => {
      const storage = localStorage.getItem('doneRecipes');
      const recipes = JSON.stringify(storage);

      if (typeof recipes === 'object') {
        const isDone = recipes.some((e) => (
          e.id === recipeDetails.meals[0].idMeal
          || e.id === recipeDetails.drinks[0].idDrink));
        setRecipeDone(!(isDone.includes(true)));
      }
    };

    checkDoneRecipes();
  }, [recipeDetails, setRecipeDone]);

  useEffect(() => {
    const checkInProgress = () => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (typeof inProgressRecipes === 'object' && inProgressRecipes !== null) {
        if (recipeDetails.meals) {
          const id = recipeDetails.meals[0].idMeal;
          const isInProgress = inProgressRecipes.meals[id];
          return isInProgress && setInProgress(true);
        } if (recipeDetails.drinks) {
          const id = recipeDetails.drinks[0].idDrink;
          const isInProgress = inProgressRecipes.drinks[id];
          return isInProgress && setInProgress(true);
        }
        return setInProgress(false);
      }
    };

    if (typeof recipeDetails === 'object') {
      checkInProgress();
    }
  }, [recipeDetails, setInProgress]);

  const location = useLocation();

  return (
    <>
      { !recipeDone && (
        <Link
          className="start-btn"
          data-testid="start-recipe-btn"
          to={ `${location.pathname}/in-progress` }
        >
          { inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </Link>
      )}
      <div />
    </>
  );
}
