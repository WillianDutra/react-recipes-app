import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import MealsDetails from '../components/MealsDetails';
import DrinksDetails from '../components/DrinksDetails';
import { getRecipeData } from '../services/requestAPI';



import '../styles/details.css';


export default function RecipeDetails() {
  const { recipeDetails, setRecipeDetails } = useContext(RecipesContext);
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

  return (
    <main>
      {recipeDetails.meals && <MealsDetails />}
      {recipeDetails.drinks && <DrinksDetails />}
    </main>
  );
}
