import React from 'react';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header() {
  const handleHeader = () => {
    // const teste = location.pathname;
    switch (window.location.pathname) {
    case '/meals':
      return (
        <>
          <h1 data-testid="page-title">Meals</h1>
          <img
            data-testid="search-top-btn"
            src={ search }
            alt="search icon"
          />
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
  // const { location: { pathname } } = props;
  return (
    <div>
      <img
        data-testid="profile-top-btn"
        src={ profile }
        alt="Profile"
      />
      { handleHeader()}
    </div>
  );
}

export default Header;
