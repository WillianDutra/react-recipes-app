import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneStorage, setDoneStorage] = useState([]);
  const [doneStorageInfo, setFixedStorageInfo] = useState([]);
  const [isTrue, setIsTrue] = useState(true);

  useEffect(() => {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneStorage(done);
    setFixedStorageInfo(done);
  }, []);

  const getRoute = (e) => {
    // 'Link copied!';
    copy(`http://localhost:3000/${e.type}s/${e.id}`);
    setIsTrue(false);
  };

  const filterMeal = () => {
    const filteredMeal = doneStorage.filter((e) => e.type === 'meal');
    setDoneStorage(filteredMeal);
  };
  const filterDrinks = () => {
    const filteredDrinks = doneStorage.filter((e) => e.type === 'drink');
    setDoneStorage(filteredDrinks);
  };
  const removeFilters = () => {
    setDoneStorage(doneStorageInfo);
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

      {doneStorage
        && doneStorage.map((el, index) => (
          <div key={ el.id } className="card">
            <Link to={ `/${el.type}s/${el.id}` }>
              <img
                src={ el.image }
                alt={ el.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
            </Link>

            <p data-testid={ `${index}-horizontal-done-date` }>
              {el.doneDate}
            </p>

            {el.type === 'meal' ? (
              <>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${el.nationality} - ${el.category}`}
                </span>
                <p data-testid={ `${index}-${el.tags[0]}-horizontal-tag` }>
                  {`${el.tags[0]}`}
                </p>

                <p data-testid={ `${index}-${el.tags[1]}-horizontal-tag` }>
                  {`${el.tags[1]}`}
                </p>
              </>
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
          </div>
        ))}
    </>
  );
}

export default DoneRecipes;
