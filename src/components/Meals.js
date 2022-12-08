import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { getMealsByCategory } from '../services/requestAPI';

import '../styles/card.css';

function Meals() {
  const {
    mealsRequest, mealsFilters,
    mealsByCategory, setMealsByCategory,
    categoryActive, setCategoryActive, recipes,
  } = useContext(RecipesContext);

  const maxRecipes = 12;
  const filters = 5;

  const getRecipes = async (filter) => {
    if (categoryActive.category === filter) {
      setCategoryActive({ active: false, category: '' });
    } if (categoryActive.category !== filter) {
      setMealsByCategory(await getMealsByCategory(filter));
      setCategoryActive({ active: true, category: filter });
    }
  };

  return (
    <main>
      <div className="filter-buttons">
        { mealsFilters.slice(0, filters).map((ele) => (
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
      { recipes.length > 1
      && recipes.slice(0, maxRecipes).map((ele, index) => (
        <div
          key={ ele.idMeal }
          className="card"
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ `/meals/${ele.idMeal}` }>
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
          </Link>
        </div>
      ))}
      { (categoryActive.active ? mealsByCategory : mealsRequest)
        .slice(0, maxRecipes).map((ele, index) => (
          <div
            key={ ele.idMeal }
            className="card"
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/meals/${ele.idMeal}` }>
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
            </Link>
          </div>
        ))}
    </main>
  );
}

export default Meals;
