import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Landing from './pages/Landing';
import Account from './pages/Account';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Hackathon from './pages/Hackathon'
import Profile from './pages/Profile';
import Create from './pages/Create';
import Add from './pages/Add';
import TeamPage from './pages/TeamPage';
import NotFound from './pages/NotFound';

const routes = (
  <App>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path="/account" exact component={Account} />
      <Route path="/register" exact component={Registration} />
      <Route path="/home" exact component={Home} />
      <Route path="/hackathon/:name" exact component={Hackathon}/>
      <Route path="/profile/:id" exact component={Profile}/>
      <Route path="/create" exact component={Create}/>
      <Route path="/add" exact component={Add}/>
      <Route path="/teampage" exact component={TeamPage}/>
      <Route component={NotFound} />
    </Switch>
  </App>
)

export { routes };