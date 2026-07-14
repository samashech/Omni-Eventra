import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Landing onSignIn={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard onSignOut={() => setIsAuthenticated(false)} />;
}
