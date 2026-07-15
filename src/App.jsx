import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Login from './Login';
import GlobalLeaderDashboard from './GlobalLeaderDashboard';

export default function App() {
  // 'landing', 'login', 'student-dashboard', 'leader-dashboard'
  const [page, setPage] = useState('landing'); 

  if (page === 'landing') {
    return <Landing onSignIn={() => setPage('login')} />;
  }
  if (page === 'login') {
    return <Login onSignIn={(role) => setPage(role === 'leader' ? 'leader-dashboard' : 'student-dashboard')} />;
  }
  if (page === 'leader-dashboard') {
    return <GlobalLeaderDashboard onSignOut={() => setPage('landing')} />;
  }
  
  return <Dashboard onSignOut={() => setPage('landing')} />;
}
