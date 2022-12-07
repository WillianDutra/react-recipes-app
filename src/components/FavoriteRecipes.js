import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../styles/card.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  // const [alert, setAlert] = useState('');
  // favoriteRecipes no formato [{ id, type, nationality, category, alcoholicOrNot, name, image }].
  // https://www.npmjs.com/package/clipboard-copy
  const [isTrue, setIsTrue] = useState(true);

  const getRoute = (e) => {
    // 'Link copied!';
    copy(`http://localhost:3000/${e.type}s/${e.id}`);
    setIsTrue(false);
  };

  const [favoriteStorage, setFavoriteStorage] = useState([]);
  const [fixedStorageInfo, setFixedStorageInfo] = useState([]);

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteStorage(favorite);
    setFixedStorageInfo(favorite);
  }, []);

  const removeFavorite = (e) => {
    const filterStore = favoriteStorage.filter((el) => el !== e);

    localStorage.setItem('favoriteRecipes', JSON.stringify(filterStore));
    setFavoriteStorage(filterStore);
  };

  const filterMeal = () => {
    const filteredMeal = favoriteStorage.filter((e) => e.type === 'meal');
    setFavoriteStorage(filteredMeal);
  };
  const filterDrinks = () => {
    const filteredDrinks = favoriteStorage.filter((e) => e.type === 'drink');
    setFavoriteStorage(filteredDrinks);
  };
  const removeFilters = () => {
    setFavoriteStorage(fixedStorageInfo);
  };

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ removeFilters }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeal }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      {favoriteStorage
        && favoriteStorage.map((el, index) => (
          <div key={ el.id } className="card">
            <Link to={ `/${el.type}s/${el.id}` }>
              <img
                src={ el.image }
                alt={ el.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
            </Link>

            {el.type === 'meal' ? (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {`${el.nationality} - ${el.category}`}
              </span>
            ) : (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {el.alcoholicOrNot}
              </span>
            )}
            {isTrue ? (
              <button type="button" onClick={ () => getRoute(el) }>
                <img
                  src={ shareIcon }
                  alt="favorite Icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            ) : (
              <p>Link copied!</p>
            )}
            <button type="button" onClick={ () => removeFavorite(el) }>
              <img
                src={ blackHeartIcon }
                alt="favorite Icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        ))}
    </>
  );
}

export default FavoriteRecipes;
