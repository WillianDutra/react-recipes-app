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

// Requisições especificada
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

// Requisição de filtros
export const requestMealsFilters = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const results = await response.json();
  return results.meals;
};

export const requestDrinksFilters = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const results = await response.json();
  return results.drinks;
};

// Requisição por categoria
export const getMealsByCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await response.json();
  return result.meals;
};

export const getDrinksByCategory = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await response.json();
  return result.drinks;
};

// Requisição padrão
export const getRecipeData = async (url) => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};
