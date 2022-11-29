import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      {/* <Provider> */}
      <Switch>
        <Route exact path="/" component={ Login } />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
