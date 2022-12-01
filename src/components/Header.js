import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

import '../styles/header.css';

function Header() {
  // Referência Consultada: https://surajsharma.net/blog/current-url-in-react
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const useHandleHeader = () => {
    const locComponent = usePathname();
    switch (locComponent) {
    case '/meals':
      return (
        <>
          <h1 data-testid="page-title">Meals</h1>
          <img
            data-testid="search-top-btn"
            src={ search }
            alt="search icon"
          />
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
          <img
            data-testid="search-top-btn"
            src={ search }
            alt="search icon"
          />
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
      return (<h1>Not Found</h1>);
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
