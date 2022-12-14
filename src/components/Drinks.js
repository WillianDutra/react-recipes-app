import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { getDrinksByCategory } from '../services/requestAPI';
import { drinkIconList } from '../services/getIconsList';

import allIcon from '../images/filterIcons/allDrinksFilter.svg';
import '../styles/card.css';

function Drinks() {
  const {
    drinksRequest, drinksFilters,
    drinksByCategory, setDrinksByCategory,
    categoryActive, setCategoryActive, recipes,
  } = useContext(RecipesContext);

  const maxRecipes = 12;
  const filters = 5;
  const icons = drinkIconList();

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
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setCategoryActive({ active: false, category: '' }) }
        >
          <img src={ allIcon } alt="all-icon" className="icon-filters" />
          All
        </button>
        { drinksFilters.slice(0, filters).map((ele, i) => (
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
          key={ ele.idDrink }
          className="card"
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ `/drinks/${ele.idDrink}` }>
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
          </Link>
        </div>
      ))}
      { (categoryActive.active ? drinksByCategory : drinksRequest)
        .slice(0, maxRecipes).map((ele, index) => (
          <div
            key={ ele.idDrink }
            className="card"
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/drinks/${ele.idDrink}` }>
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
            </Link>
          </div>
        ))}
    </main>
  );
}

export default Drinks;
