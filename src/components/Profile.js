import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import doneIcon from '../images/doneRecipeIcon.svg';
import favIcon from '../images/favoriteIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';
import '../styles/profile.css';

function Profile() {
  const e = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const redirectToPageDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const redirectToPageFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header />
      <h2
        data-testid="profile-email"
        className="email"
      >
        { e ? e.email : 'Email not found' }
      </h2>
      <div className="links-container">
        <button
          type="button"
          onClick={ redirectToPageDoneRecipes }
          data-testid="profile-done-btn"
        >
          <img src={ doneIcon } alt="done-icon" />
          Done Recipes
        </button>
        <hr />
        <button
          type="button"
          onClick={ redirectToPageFavoriteRecipes }
          data-testid="profile-favorite-btn"
        >
          <img src={ favIcon } alt="fav-icon" />

          Favorite Recipes
        </button>
        <hr />
        <button
          type="button"
          onClick={ logOut }
          data-testid="profile-logout-btn"
        >
          <img src={ logoutIcon } alt="logout-icon" />
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
