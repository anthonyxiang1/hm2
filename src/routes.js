import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Landing from './pages/Landing';
import Account from './pages/Account'

const routes = (
  <App>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/account" exact component={Account} />
    </Switch>
  </App>
)

export { routes };