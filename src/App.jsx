import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Login from './Login';

export default function App() {
  const [page, setPage] = useState('landing'); 
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session on initial load (e.g. returning from Google OAuth)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setPage('student-dashboard');
      } else {
        // Only reset to landing if we are currently on a protected route
        if (page === 'student-dashboard') {
          setPage('landing');
        }
      }
      setIsLoading(false);
    });

    // Listen for auth events (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setPage('student-dashboard');
      } else {
        setPage('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-gradient)' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--text-tertiary)', borderTopColor: 'var(--accent-text)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (page === 'landing') {
    return <Landing onSignIn={() => setPage('login')} />;
  }
  if (page === 'login') {
    return <Login onSignIn={() => setPage('student-dashboard')} />;
  }
  
  return <Dashboard onSignOut={() => supabase.auth.signOut()} />;
}
