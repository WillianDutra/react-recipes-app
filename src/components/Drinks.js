import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import Header from './Header';

function Drinks() {
  const { drinksRequest } = useContext(recipesContext);
  const num = 12;

  return (
    <main>
      <Header />
      { drinksRequest.slice(0, num).map((ele, index) => (
        <div
          key={ index }
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
