import { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function RecipeButton() {
  const { recipeDetails, recipeDone, setRecipeDone } = useContext(RecipesContext);

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

  return (
    <>
      { !recipeDone && (
        <button
          type="button"
          className="start-btn"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      )}
      <div />
    </>
  );
}
