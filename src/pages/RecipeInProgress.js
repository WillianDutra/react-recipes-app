import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkInProgress from '../components/DrinkInProgress';
import MealInProgress from '../components/MealInProgress';
import RecipesContext from '../context/RecipesContext';
import { getRecipeData } from '../services/requestAPI';

export default function RecipeInProgress() {
  const { recipeInProgress, setRecipeInProgress } = useContext(RecipesContext);
  const location = useLocation();

  useEffect(() => {
    const route = location.pathname.split('/');

    const getRecipeInProgress = async () => {
      if (route[1] === 'meals') {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route[2]}`;
        setRecipeInProgress(await getRecipeData(url));
      } if (route[1] === 'drinks') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${route[2]}`;
        setRecipeInProgress(await getRecipeData(url));
      }
    };

    getRecipeInProgress();
  }, [location.pathname]);

  return (
    <>
      {recipeInProgress.meals && <MealInProgress />}
      {recipeInProgress.drinks && <DrinkInProgress />}
    </>
  );
}
