import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './components/DoneRecipes';
import FavoritesRecipes from './components/FavoritesRecipes';
import Profile from './components/Profile';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Recipes } />
      {/* <Route path="/meals/:id-da-receita" component={} /> */ }
      {/* <Route path="/meals/:id-da-receita/in-progress" component={} /> */}
      <Route exact path="/drinks" component={ Recipes } />
      {/* <Route path="/drinks/:id-da-receita" component={ Drinks } /> */}
      {/* <Route path="/drinks/:id-da-receita/in-progress" component={ Drinks } /> */}
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
