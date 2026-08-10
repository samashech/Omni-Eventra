import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Login from './Login';

export default function App() {
  const [page, setPage] = useState('landing'); 

  if (page === 'landing') {
    return <Landing onSignIn={() => setPage('login')} />;
  }
  
  if (page === 'login') {
    return <Login onSignIn={() => setPage('student-dashboard')} />;
  }
  
  return <Dashboard onSignOut={() => setPage('landing')} />;
}
