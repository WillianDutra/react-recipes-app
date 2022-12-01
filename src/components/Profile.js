import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Profile() {
  const e = JSON.parse(localStorage.getItem('user')).email;
  return (
    <>
      <Header />
      <h2 data-testid="profile-email">{ e }</h2>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </>
  );
}

export default Profile;
