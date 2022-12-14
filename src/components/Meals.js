import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { getMealsByCategory } from '../services/requestAPI';
import { mealIconList } from '../services/getIconsList';

import allIcon from '../images/filterIcons/allMealsFilter.svg';
import '../styles/card.css';

function Meals() {
  const {
    mealsRequest, mealsFilters,
    mealsByCategory, setMealsByCategory,
    categoryActive, setCategoryActive, recipes,
  } = useContext(RecipesContext);

  const maxRecipes = 12;
  const filters = 5;
  const icons = mealIconList();

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
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setCategoryActive({ active: false, category: '' }) }
        >
          <img src={ allIcon } alt="all-icon" className="icon-filters" />
          All
        </button>
        { mealsFilters.slice(0, filters).map((ele, i) => (
          <button
            key={ ele.strCategory }
            data-testid={ `${ele.strCategory}-category-filter` }
            type="button"
            className={ ele.strCategory }
            onClick={ ({ target: { className } }) => getRecipes(className) }
          >
            <img
              src={ icons[i] }
              alt="filter-icon"
              className={ ele.strCategory }
            />
            {ele.strCategory}
          </button>
        ))}
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
