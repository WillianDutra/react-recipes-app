import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { getDrinksByCategory } from '../services/requestAPI';

import '../styles/card.css';

function Drinks() {
  const {
    drinksRequest, drinksFilters,
    drinksByCategory, setDrinksByCategory,
    categoryActive, setCategoryActive,
  } = useContext(RecipesContext);

  const recipes = 12;
  const filters = 5;

  const getRecipes = async (filter) => {
    if (categoryActive.category === filter) {
      setCategoryActive({ active: false, category: '' });
    } if (categoryActive.category !== filter) {
      setDrinksByCategory(await getDrinksByCategory(filter));
      setCategoryActive({ active: true, category: filter });
    }
  };

  return (
    <main>
      <div className="filter-buttons">
        { drinksFilters.slice(0, filters).map((ele) => (
          <button
            key={ ele.strCategory }
            data-testid={ `${ele.strCategory}-category-filter` }
            type="button"
            onClick={ ({ target: { innerText } }) => getRecipes(innerText) }
          >
            {ele.strCategory}
          </button>
        ))}
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setCategoryActive({ active: false, category: '' }) }
        >
          All
        </button>
      </div>
      { (categoryActive.active ? drinksByCategory : drinksRequest)
        .slice(0, recipes).map((ele, index) => (
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
