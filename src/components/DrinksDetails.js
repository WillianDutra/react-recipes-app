import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function DrinksDetails() {
  const { recipeDetails } = useContext(RecipesContext);

  const getIngredientsList = () => {
    const { drinks } = recipeDetails;

    const names = Object.keys(recipeDetails.drinks[0]);
    const ingredient = names
      .filter((e) => e.includes('strIngredient') && drinks[0][e] !== null);
    const measure = names
      .filter((e) => e.includes('strMeasure') && drinks[0][e] !== ' ');
    const array = ingredient.map((_e, i) => {
      if (drinks[0][measure[i]]) {
        return { ing: ingredient[i], mea: measure[i] };
      } if (drinks[0][ingredient[i]]) {
        return { ing: ingredient[i] };
      }
      return '';
    });
    return array;
  };

  const formatIngredients = (obj, i) => {
    if (recipeDetails.drinks[0][obj.mea]) {
      return (
        <p data-testid={ `${i}-ingredient-name-and-measure` }>
          {recipeDetails.drinks[0][obj.ing]}
          {' - '}
          {recipeDetails.drinks[0][obj.mea]}
        </p>
      );
    } if (recipeDetails.drinks[0][obj.ing]) {
      return (
        <p data-testid={ `${i}-ingredient-name-and-measure` }>
          {recipeDetails.drinks[0][obj.ing]}
        </p>
      );
    }
  };

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
              {' - '}
              { ele.strAlcoholic }
            </p>
            {
              getIngredientsList().map((obj, i) => (
                <div key={ i }>
                  { formatIngredients(obj, i) }
                </div>
              ))
            }
            <p data-testid="instructions">
              {ele.strInstructions}
            </p>
          </div>
        ))
      }
    </>
  );
}
