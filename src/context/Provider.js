import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const value = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [email, password]);
  return (
    <recipesContext.Provider value={ value }>

      { children }

    </recipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
