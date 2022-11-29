import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';

export default function Login() {
  const { email, setEmail, password, setPassword } = useContext(recipesContext);
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
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter

      </button>
    </>
  );
}
