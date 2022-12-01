import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

import '../styles/card.css';

function Meals() {
  const { mealsRequest, mealsFilters } = useContext(RecipesContext);
  const recipes = 12;
  const filters = 5;

  return (
    <main>
      <div>
        { mealsFilters.slice(0, filters).map((ele) => (
          <button
            key={ ele.strCategory }
            data-testid={ `${ele.strCategory}-category-filter` }
            type="button"
          >
            {ele.strCategory}
          </button>
        ))}
      </div>
      { mealsRequest.slice(0, recipes).map((ele, index) => (
        <div
          key={ ele.idMeal }
          className="card"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ ele.strMealThumb }
            alt={ ele.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { ele.strMeal }
          </p>
        </div>
      ))}
    </main>
  );
}

export default Meals;
