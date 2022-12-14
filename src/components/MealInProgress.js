import { useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/recipeinprogress.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function MealInProgress() {
  const { recipeDetails, recipeInProgress } = useContext(RecipesContext);
  // const { recipeInProgress } = useContext(RecipesContext);
  const [isCopied, setIsCopied] = useState(true);
  const [isFavorited, setIsFavorite] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // const storeX = storage.filter((e) => e.meals === recipeInProgress.meals[0].idMeal);
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const id = recipeInProgress.meals[0].idMeal;
    // const oi = storage.some((el) => el === id);
    if (storage) {
      const newing = {
        drinks: { ...storage.drinks },
        meals: { ...storage.meals,
          [id]: checkedIngredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newing));
    } else {
      // setCheckedIngredients([...checkedIngredients]);

      const newrecipe = {
        drinks: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newrecipe));
    }
  }, [checkedIngredients]);

  const getRoute = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setIsCopied(false);
  };

  const handleClick = ({ target }) => {
    // const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // const id = recipeInProgress.meals[0].idMeal;
    if (target.checked) {
      target.parentElement.classList = 'checked';
      // if (!storage) {
      //   const newrecipe = {
      //     drinks: {},
      //     meals: { [id]: [target.id] },
      //   };
      //   localStorage.setItem('inProgressRecipes', JSON.stringify(newrecipe));
      // } {
      setCheckedIngredients([...checkedIngredients, target.id]);
      //   const newing = {
      //     drinks: { ...storage.drinks },
      //     meals: {
      //       ...storage.meals,
      //       [id]: [target.id],
      //     },
      //   };
      //   localStorage.setItem('inProgressRecipes', JSON.stringify(newing));
      // }
    } else {
      target.parentElement.classList = '';
    }
  };

  const getDataFromStorage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return storage;
  };

  const removeFavoriteRecipe = () => {
    if (recipeDetails.drinks) {
      const filter = getDataFromStorage()
        .filter((e) => e.id !== recipeDetails.drinks[0].idDrink);
      const newResult = JSON.stringify(filter);
      localStorage.setItem('favoriteRecipes', newResult);
    } if (recipeDetails.meals) {
      const filter = getDataFromStorage()
        .filter((e) => e.id !== recipeDetails.meals[0].idMeals);
      const newResult = JSON.stringify(filter);
      localStorage.setItem('favoriteRecipes', newResult);
    }
  };

  const getNewFavoriteData = () => {
    if (recipeDetails.drinks) {
      return {
        id: recipeDetails.drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: recipeDetails.drinks[0].strCategory,
        alcoholicOrNot: recipeDetails.drinks[0].strAlcoholic,
        name: recipeDetails.drinks[0].strDrink,
        image: recipeDetails.drinks[0].strDrinkThumb,
      };
    } if (recipeDetails.meals) {
      return {
        id: recipeDetails.meals[0].idMeal,
        type: 'meal',
        nationality: recipeDetails.meals[0].strArea,
        category: recipeDetails.meals[0].strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.meals[0].strMeal,
        image: recipeDetails.meals[0].strMealThumb,
      };
    }
  };

  const addFavoriteRecipe = () => {
    const oldFavorites = getDataFromStorage();
    const newFavorite = getNewFavoriteData();
    if (oldFavorites !== null) {
      oldFavorites.push(newFavorite);
      const newArray = JSON.stringify(oldFavorites);
      localStorage.setItem('favoriteRecipes', newArray);
    } if (oldFavorites === null) {
      const newArray = JSON.stringify([newFavorite]);
      localStorage.setItem('favoriteRecipes', newArray);
    }
  };

  const checkFavoriteRecipe = () => {
    if (isFavorited) {
      removeFavoriteRecipe();
      setIsFavorite(false);
    } if (!isFavorited) {
      addFavoriteRecipe();
      setIsFavorite(true);
    }
  };

  const getIngredientsList = () => {
    const { meals } = recipeInProgress;

    const names = Object.keys(recipeInProgress.meals[0]);
    const ingredient = names
      .filter((e) => e.includes('strIngredient') && meals[0][e] !== null);
    const measure = names
      .filter((e) => e.includes('strMeasure') && meals[0][e] !== ' ');
    const array = ingredient.map((_e, i) => {
      if (meals[0][measure[i]]) {
        return { ing: ingredient[i], mea: measure[i] };
      } if (meals[0][ingredient[i]]) {
        return { ing: ingredient[i] };
      }
      return '';
    });
    return array;
  };

  const formatIngredients = (obj, i) => {
    // const medida = recipeInProgress.meals[0][obj.mea];
    const medida = recipeInProgress.meals[0][obj.ing];
    if (recipeInProgress.meals[0][obj.mea]) {
      return (

        <label htmlFor={ obj } data-testid={ `${i}-ingredient-step` }>
          <input type="checkbox" name={ obj } id={ medida } onClick={ handleClick } />

          {' '}
          {recipeInProgress.meals[0][obj.ing]}
          {' - '}
          {recipeInProgress.meals[0][obj.mea]}
        </label>
      );
    } if (recipeInProgress.meals[0][obj.ing]) {
      return (
        <p>
          {recipeInProgress.meals[0][obj.ing]}
        </p>
      );
    }
  };

  return (
    <>
      {
        recipeInProgress.meals.map((ele) => (
          <div key={ ele.idMeal }>
            <img
              data-testid="recipe-photo"
              src={ ele.strMealThumb }
              alt={ ele.strMeal }
            />
            <h3 data-testid="recipe-title">
              { ele.strMeal }
            </h3>
            <p data-testid="recipe-category">
              { ele.strCategory }
            </p>
            <h3>Ingredientes</h3>
            {
              getIngredientsList().map((obj, i) => (
                <div key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  { formatIngredients(obj, i) }
                </div>
              ))
            }
            <h3>Instruções</h3>
            <p data-testid="instructions">
              {ele.strInstructions}
            </p>

          </div>
        ))
      }
      <div className="share-container">
        { isCopied ? (
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => getRoute() }
          >
            <img src={ shareIcon } alt="share-button" />
          </button>
        ) : (
          <p>Link copied!</p>
        )}
        <button
          type="button"
          onClick={ () => checkFavoriteRecipe() }
        >
          <img
            src={ isFavorited ? blackHeart : whiteHeart }
            alt="favorite-icon"
            data-testid="favorite-btn"
          />
        </button>
        <button type="button" data-testid="finish-recipe-btn">Concluído</button>
      </div>

    </>
  );
}
