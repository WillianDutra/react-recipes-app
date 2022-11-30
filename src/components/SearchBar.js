import { useContext } from 'react';
import recipesContext from '../context/recipesContext';

export default function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    // radioInput,
    // setRadioInput,
  } = useContext(recipesContext);

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
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}
