import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import Header from './Header';

function Meals() {
  const { mealsRequest } = useContext(recipesContext);
  const num = 12;

  return (
    <main>
      <Header />
      { mealsRequest.slice(0, num).map((ele, index) => (
        <div
          key={ index }
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
