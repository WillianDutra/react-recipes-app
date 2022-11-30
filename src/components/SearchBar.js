import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { requestIngredient, requestFirstLetter,
  requestName } from '../services/requestAPI';

export default function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    radioInput,
    setRadioInput,
  } = useContext(recipesContext);

  const haldleClick = () => {
    if (radioInput === 'Ingredient') {
      requestIngredient(searchInput);
    }
    if (radioInput === 'Name') {
      requestName(searchInput);
    }
    if (radioInput === 'First letter') {
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      requestFirstLetter(searchInput);
    }
  };

  return (
    <div>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          type="text"
          name="search-input"
          onChange={ ({ target: { value } }) => setSearchInput(value) }
          value={ searchInput }
        />
      </label>
      <label
        htmlFor="ingrediente-radio"
      >
        <input
          type="radio"
          id="ingrediente-radio"
          name="radio-input"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          onChange={ ({ target: { value } }) => setRadioInput(value) }
        />
        Ingredient
      </label>
      <label
        htmlFor="name-radio"
      >
        <input
          type="radio"
          id="name-radio"
          name="radio-input"
          data-testid="name-search-radio"
          value="Name"
          onChange={ ({ target: { value } }) => setRadioInput(value) }
        />
        Name
      </label>
      <label
        htmlFor="first-letter-radio"
      >
        <input
          type="radio"
          id="first-letter-radio"
          name="radio-input"
          data-testid="first-letter-search-radio"
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
    </div>
  );
}
