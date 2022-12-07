import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Profile from './components/Profile';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
