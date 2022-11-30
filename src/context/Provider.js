import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados da pesquisa do Header
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');

  const value = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    isSearching,
    setIsSearching,
    searchInput,
    setSearchInput,
    radioInput,
    setRadioInput,
  }), [email, isSearching, password, radioInput, searchInput]);

  return (
    <recipesContext.Provider value={ value }>
      { children }
    </recipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
