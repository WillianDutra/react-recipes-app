import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import SearchBar from './SearchBar';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import logoWithTitle from '../images/logoWithTitle.svg';
import '../styles/header.css';

export default function Header() {
  const [canSearch, setCanSearch] = useState(false);
  const { isSearching, setIsSearching } = useContext(RecipesContext);

  const { pathname } = useLocation();

  const useHandleHeader = () => {
    if (pathname === '/meals') {
      return 'Meals';
    } if (pathname === '/drinks') {
      return 'Drinks';
    } if (pathname === '/profile') {
      return 'Profile';
    } if (pathname === '/favorite-recipes') {
      return 'Favorite Recipes';
    } if (pathname === '/done-recipes') {
      return 'Done Recipes';
    }
  };

  useEffect(() => {
    if (pathname === '/meals') {
      setCanSearch(true);
    } if (pathname === '/drinks') {
      setCanSearch(true);
    } if (pathname === '/profile') {
      setCanSearch(false);
    } if (pathname === '/favorite-recipes') {
      return 'Favorite Recipes';
    } if (pathname === '/done-recipes') {
      return 'Done Recipes';
    }
  }, [pathname]);

  return (
    <>
      <header>
        <img src={ logoWithTitle } alt="logo-and-title" />
        {
          canSearch && (
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
          )
        }
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profile }
            alt="Profile"
          />
        </Link>
      </header>
      <div className="page-title">
        { pathname === '/meals' && <img src={ mealIcon } alt="meals-icon" />}
        { pathname === '/drinks' && <img src={ drinkIcon } alt="drinks-icon" />}
        <h1 data-testid="page-title">{ useHandleHeader() }</h1>
      </div>
      { isSearching && <SearchBar />}
    </>
  );
}
