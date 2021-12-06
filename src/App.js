import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Layout from './components/Layout';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/settings" component={ Settings } />
        <Layout>
          <Route path="/game" component={ Game } />
          <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
          <Route path="/ranking" render={ (props) => <Ranking { ...props } /> } />
        </Layout>
      </Switch>
    </>
  );
}
