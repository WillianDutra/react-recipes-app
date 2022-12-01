import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function MealsDetails() {
  const { recipeDetails } = useContext(RecipesContext);

  return (
    <>
      {
        recipeDetails.meals.map((ele) => (
          <div key={ ele.idMeal }>
            <img
              data-testid="recipe-photo"
              src={ ele.strMealThumb }
              alt={ ele.strMeal }
            />
            <h3 data-testid="recipe-title">
              { ele.strMeal }
            </h3>
            <p data-testid="recipe-category">
              { ele.strCategory }
            </p>
          </div>
        ))
      }
    </>
  );
}
