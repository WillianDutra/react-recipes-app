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

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route path="/meals/:id" component={ RecipeDetails } />
      {/* <Route path="/meals/:id-da-receita/in-progress" component={} /> */}
      <Route exact path="/drinks" component={ Recipes } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      {/* <Route path="/drinks/:id-da-receita/in-progress" component={ Drinks } /> */}
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
