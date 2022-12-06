import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { getRecipeData } from '../services/requestAPI';
import '../styles/searchbar.css';

export default function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    radioInput,
    setRadioInput,
    searchRecipes,
    setSearchRecipes,
  } = useContext(RecipesContext);

  // const history = useHistory();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const route = usePathname();

  const oneCharacterAlert = () => {
    if (searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  // const redirectOneRecipeDrink = () => {
  //   if (searchRecipes.length === 1) {
  //     history.push(`/drinks/${searchRecipes[0].idDrink}`);
  //   }
  // };

  // const redirectOneRecipeMeal = () => {
  //   if (searchRecipes.length === 1) {
  //     history.push(`/meals/${searchRecipes[0].idMeal}`);
  //   }
  // };

  const haldleClick = async () => {
    switch (route) {
    case '/drinks':
      if (radioInput === 'Ingredient') {
        const drinksIngredient = await getRecipeData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
        setSearchRecipes(drinksIngredient.drinks);
        // redirectOneRecipeDrink();
      }
      if (radioInput === 'Name') {
        const drinksName = await getRecipeData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
        setSearchRecipes(drinksName.drinks);
        // redirectOneRecipeDrink();
      }
      if (radioInput === 'First letter') {
        oneCharacterAlert();
        const drinksFirstLetter = await getRecipeData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
        setSearchRecipes(drinksFirstLetter.drinks);
        // redirectOneRecipeDrink();
      }
      break;

    default:
      if (radioInput === 'Ingredient') {
        const mealsIngredient = await getRecipeData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
        setSearchRecipes(mealsIngredient.meals);
        // redirectOneRecipeMeal();
      }
      if (radioInput === 'Name') {
        const mealsName = await getRecipeData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        setSearchRecipes(mealsName.meals);
        // redirectOneRecipeMeal();
      }
      if (radioInput === 'First letter') {
        oneCharacterAlert();
        const mealsFirstLetter = await getRecipeData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
        setSearchRecipes(mealsFirstLetter.meals);
        // redirectOneRecipeMeal();
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
        onClick={ haldleClick }
      >
        Search
      </button>
      { searchRecipes.length > 1
      && searchRecipes.map((drink, index) => (
        <p key={ index }>
          {drink.strDrink}
        </p>))}
    </div>
  );
}
