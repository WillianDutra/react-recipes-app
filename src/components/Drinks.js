import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from './Header';
import Footer from './Footer';

import '../styles/card.css';

function Drinks() {
  const { drinksRequest } = useContext(RecipesContext);
  const num = 12;

  return (
    <main>
      <Header />
      { drinksRequest.slice(0, num).map((ele, index) => (
        <div
          key={ index }
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
      <Footer />
    </main>
  );
}

export default Drinks;
