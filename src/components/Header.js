import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import RecipesContext from '../context/RecipesContext';

import '../styles/header.css';

function Header() {
  const { isSearching, setIsSearching } = useContext(RecipesContext);
  const handleHeader = () => {
    switch (window.location.pathname) {
    case '/meals':
      return (
        <>
          <h1 data-testid="page-title">Meals</h1>
          <button
            type="button"
            onClick={ () => setIsSearching(!isSearching) }
          >
            <img
              data-testid="search-top-btn"
              name="search-btn"
              src={ search }
              alt="search icon"
            />
          </button>
        </>
      );
    case '/drinks':
      return (
        <>
          <h1 data-testid="page-title">Drinks</h1>
          <button
            type="button"
            onClick={ () => setIsSearching(!isSearching) }
          >
            <img
              data-testid="search-top-btn"
              name="search-btn"
              src={ search }
              alt="search icon"
            />
          </button>
        </>
      );
    case '/profile':
      return (<h1 data-testid="page-title">Profile</h1>);
    case '/favorite-recipes':
      return (<h1 data-testid="page-title">Favorite Recipes</h1>);
    case '/done-recipes':
      return (<h1 data-testid="page-title">Done Recipes</h1>);
    default:
      return null;
    }
  };

  return (
    <>
      <header>
        { handleHeader() }
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profile }
            alt="Profile"
          />
        </Link>
      </header>
      { isSearching && <SearchBar />}
    </>
  );
}

export default Header;
