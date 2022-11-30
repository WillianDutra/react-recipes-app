import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const value = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    isDisabled,
    setIsDisabled,
  }), [isDisabled, email, password]);

  return (
    <RecipesContext.Provider value={ value }>

      { children }

    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
