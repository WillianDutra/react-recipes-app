import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import validationInputs from '../utils/services';

export default function Login() {
  const {
    isDisabled,
    setIsDisabled,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(RecipesContext);

  useEffect(() => {
    const validationGeneral = validationInputs(email, password);

    if (validationGeneral) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, isDisabled, setIsDisabled]);

  const handleSubmit = () => localStorage.setItem('user', JSON.stringify({ email }));

  return (
    <>
      <h1>OI</h1>
      <form>
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            placeholder="Email"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            name="password"
            placeholder="Password"
            data-testid="password-input"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
      </form>
      <Link to="/meals">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleSubmit }
        >
          Enter

        </button>
      </Link>
    </>
  );
}
