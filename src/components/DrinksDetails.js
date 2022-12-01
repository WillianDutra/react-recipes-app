import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function DrinksDetails() {
  const { recipeDetails } = useContext(RecipesContext);

  // const getIngredientsList = () => {
  // };

  return (
    <>
      {
        recipeDetails.drinks.map((ele) => (
          <div key={ ele.idDrink }>
            <img
              data-testid="recipe-photo"
              src={ ele.strDrinkThumb }
              alt={ ele.strDrink }
            />
            <h3 data-testid="recipe-title">
              { ele.strDrink }
            </h3>
            <p data-testid="recipe-category">
              { ele.strCategory }
            </p>
            {/* { getIngredientsList() } */}
          </div>
        ))
      }
    </>
  );
}
