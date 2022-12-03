import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function MealsDetails() {
  const { recipeDetails } = useContext(RecipesContext);



  const getIngredientsList = () => {
    const { meals } = recipeDetails;

    const names = Object.keys(recipeDetails.meals[0]);
    const ingredient = names
      .filter((e) => e.includes('strIngredient') && meals[0][e] !== null);
    const measure = names
      .filter((e) => e.includes('strMeasure') && meals[0][e] !== ' ');
    const array = ingredient.map((_e, i) => {
      if (meals[0][measure[i]]) {
        return { ing: ingredient[i], mea: measure[i] };
      } if (meals[0][ingredient[i]]) {
        return { ing: ingredient[i] };
      }
      return '';
    });
    return array;
  };

  const formatIngredients = (obj, i) => {
    if (recipeDetails.meals[0][obj.mea]) {
      return (
        <p data-testid={ `${i}-ingredient-name-and-measure` }>
          {recipeDetails.meals[0][obj.ing]}
          {' - '}
          {recipeDetails.meals[0][obj.mea]}
        </p>
      );
    } if (recipeDetails.meals[0][obj.ing]) {
      return (
        <p data-testid={ `${i}-ingredient-name-and-measure` }>
          {recipeDetails.meals[0][obj.ing]}
        </p>
      );
    }
  };

  const fixYoutubeLink = (url) => {
    const splitURL = url.split('watch?v=');
    const newLink = `${splitURL[0]}/embed/${splitURL[1]}`;
    return newLink;
  };


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
            <div>
              <iframe
                width="360"
                heigth="280"
                src={ fixYoutubeLink(ele.strYoutube) }
                title={ ele.strMeal }
                frameBorder="0"
                allowFullScreen
                data-testid="video"
              />
            </div>

          </div>
        ))
      }
    </>
  );
}
