import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { getRecipeData } from '../services/requestAPI';
import '../styles/searchbar.css';

export default function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    radioInput,
    setRadioInput,
    setRecipes,
  } = useContext(RecipesContext);

  const history = useHistory();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const route = usePathname();
  const RecipeNotFoundMessage = 'Sorry, we haven\'t found any recipes for these filters.';
  const updateRecipe = (newRecipes) => {
    setRecipes(newRecipes === null ? [] : newRecipes);
    console.log('newRecipe:', newRecipes);
  };

  const mealsCondition = (meals) => {
    console.log('meals', meals);
    if (meals.length === 1) {
      history.push(`/meals/${meals[0].idMeal}`);
    } else if (meals.length === 0) {
      global.alert(RecipeNotFoundMessage);
    }
  };
  const drinksCondition = (drinks) => {
    if (drinks.length === 1) {
      history.push(`/drinks/${drinks[0].idMeal}`);
    } else if (drinks.length === 0) {
      global.alert(RecipeNotFoundMessage);
    }
  };

  const searchDrinksByIngredient = async () => {
    await getRecipeData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`)
      .then((result) => {
        updateRecipe(result.drinks);
        return result.drinks;
      }).then((drinks) => {
        drinksCondition(drinks);
      });
  };
  const searchDrinksByName = async () => {
    await getRecipeData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then((result) => {
        updateRecipe(result.drinks);
        return result.drinks;
      }).then((drinks) => {
        drinksCondition(drinks);
      });
  };

  const searchDrinksByFirstLetter = async () => {
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    await getRecipeData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`)
      .then((result) => {
        updateRecipe(result.drinks);
        return result.drinks;
      }).then((drinks) => {
        drinksCondition(drinks);
      });
  };

  const searchMealsByIngredient = async () => {
    await getRecipeData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
      .then((result) => {
        updateRecipe(result.meals);
        return result.meals;
      }).then((meals) => {
        mealsCondition(meals);
      });
  };
  const searchMealsByName = async () => {
    await getRecipeData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then((result) => {
        updateRecipe(result.meals);
        return result.meals;
      }).then(({ meals } = result) => {
        mealsCondition(meals);
        // TODO: verificar renderização da lista após a pesquisa
      });
  };

  const searchMealsByFirstLetter = async () => {
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    await getRecipeData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
      .then((result) => {
        updateRecipe(result.meals);
        return result.meals;
      }).then((meals) => {
        mealsCondition(meals);
      });
  };

  const handleClick = () => {
    switch (route) {
    case '/drinks':
      if (radioInput === 'Ingredient') {
        searchDrinksByIngredient();
      }
      if (radioInput === 'Name') {
        searchDrinksByName();
      }
      if (radioInput === 'First letter') {
        searchDrinksByFirstLetter();
      }
      break;

    default:
      if (radioInput === 'Ingredient') {
        searchMealsByIngredient();
      }
      if (radioInput === 'Name') {
        searchMealsByName();
      }
      if (radioInput === 'First letter') {
        searchMealsByFirstLetter();
      }
      break;
    }
  };

  return (
    <div className="search-container">
      <label htmlFor="search-input">
        <input
          placeholder="Digite sua pesquisa"
          data-testid="search-input"
          type="text"
          name="search-input"
          id="search-input"
          onChange={ ({ target: { value } }) => setSearchInput(value) }
          value={ searchInput }
        />
      </label>
      <label
        htmlFor="ingrediente-radio"
      >
        <input
          data-testid="ingredient-search-radio"
          id="ingrediente-radio"
          name="radio-input"
          type="radio"
          value="Ingredient"
          onChange={ ({ target: { value } }) => setRadioInput(value) }
        />
        Ingredient
      </label>
      <label
        htmlFor="name-radio"
      >
        <input
          data-testid="name-search-radio"
          id="name-radio"
          name="radio-input"
          type="radio"
          value="Name"
          onChange={ ({ target: { value } }) => setRadioInput(value) }
        />
        Name
      </label>
      <label
        htmlFor="first-letter-radio"
      >
        <input
          data-testid="first-letter-search-radio"
          id="first-letter-radio"
          name="radio-input"
          type="radio"
          value="First letter"
          onChange={ ({ target: { value } }) => setRadioInput(value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
      {/* { recipes.length > 1
      && recipes.map((drink, index) => (
        <p key={ index }>
          {drink.strDrink}
        </p>))} */}
    </div>
  );
}
