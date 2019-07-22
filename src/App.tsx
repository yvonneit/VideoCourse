import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home';
import Group from './pages/Group';

const App = () => {
  return (
    <div>
      <Router>
        <Home path='/' />
        <Group path='/course/:id' />
      </Router>
    </div>
  );
};

export default App;
