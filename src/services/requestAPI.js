// Requisições iniciais
export const requestMealsAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await response.json();
  return result.meals;
};

export const requestDrinksAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await response.json();
  return result.drinks;
};

// Requisições de filtro
export const requestIngredient = async (ingrediente) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const results = await response.json();
  console.log(results);
  return results;
};

export const requestName = async (nome) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const results = await response.json();
  console.log(results);
  return results;
};

export const requestFirstLetter = async (primeiraLetra) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const results = await response.json();
  console.log(results);
  return results;
};
