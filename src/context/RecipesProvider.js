import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

import { requestMealsAPI, requestDrinksAPI } from '../services/requestAPI';

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

  useEffect(() => {
    setMealsRequest(requestMealsAPI());
    setDrinksRequest(requestDrinksAPI());
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
  }), [drinksRequest, email, isDisabled,
    isSearching, mealsRequest, password, radioInput, searchInput]);

  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
