import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

import '../styles/card.css';

function Drinks() {
  const { drinksRequest, drinksFilters } = useContext(RecipesContext);
  const recipes = 12;
  const filters = 5;

  return (
    <main>
      <div>
        { drinksFilters.slice(0, filters).map((ele) => (
          <button
            key={ ele.strCategory }
            data-testid={ `${ele.strCategory}-category-filter` }
            type="button"
          >
            {ele.strCategory}
          </button>
        ))}
      </div>
      { drinksRequest.slice(0, recipes).map((ele, index) => (
        <div
          key={ ele.idDrink }
          className="card"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ ele.strDrinkThumb }
            alt={ ele.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { ele.strDrink }
          </p>
        </div>
      ))}
    </main>
  );
}

export default Drinks;
