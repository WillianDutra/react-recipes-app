import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from './Header';
import Footer from './Footer';

function Meals() {
  const { mealsRequest } = useContext(RecipesContext);
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
      <Footer />
    </main>
  );
}

export default Meals;
