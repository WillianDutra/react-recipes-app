import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

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
      <h2 data-testid="profile-email">{ e ? e.email : 'Email not found' }</h2>
      <button
        type="button"
        onClick={ redirectToPageDoneRecipes }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        onClick={ redirectToPageFavoriteRecipes }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        onClick={ logOut }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
