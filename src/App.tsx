import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import RemainingLife from './components/RemainingLife';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={RemainingLife} />
      </Switch>
    </Router>
  );
}
