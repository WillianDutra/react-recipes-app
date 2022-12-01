import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

import { requestMealsAPI, requestDrinksAPI,
  requestMealsFilters, requestDrinksFilters } from '../services/requestAPI';

export default function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // Estados da pesquisa do Header
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');

  // Estado da primeira requisição
  const [mealsRequest, setMealsRequest] = useState([]);
  const [drinksRequest, setDrinksRequest] = useState([]);

  // Estado dos lista de filtros
  const [mealsFilters, setMealsFilters] = useState([]);
  const [drinksFilters, setDrinksFilters] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setMealsRequest(await requestMealsAPI());
      setDrinksRequest(await requestDrinksAPI());
      setMealsFilters(await requestMealsFilters());
      setDrinksFilters(await requestDrinksFilters());
    };

    getData();
  }, []);

  const value = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    isDisabled,
    setIsDisabled,
    isSearching,
    setIsSearching,
    searchInput,
    setSearchInput,
    radioInput,
    setRadioInput,
    mealsRequest,
    drinksRequest,
    mealsFilters,
    drinksFilters,
  }), [drinksFilters, drinksRequest, email, isDisabled,
    isSearching, mealsFilters, mealsRequest, password,
    radioInput, searchInput]);

  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
