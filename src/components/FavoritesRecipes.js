import React from 'react';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  // favoriteRecipes no formato [{ id, type, nationality, category, alcoholicOrNot, name, image }].
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <>
      <Header />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-meal-btn">
        Meals
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {favorite.map((el, index) => (
        <div key={ el }>
          <img
            src={ el.image }
            alt={ el.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <h3 data-testid={ `${index}-horizontal-name` }>{el.name}</h3>
          {el.type === 'meal' ? (
            <span data-testid={ `${index}-horizontal-top-text` }>
              {`${el.nationality} - ${el.category}`}
            </span>
          ) : (
            <span data-testid={ `${index}-horizontal-top-text` }>
              {el.alcoholicOrNot}
            </span>
          )}
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            <img src={ shareIcon } alt="favorite Icon" />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeartIcon } alt="favorite Icon" />
          </button>
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipes;
