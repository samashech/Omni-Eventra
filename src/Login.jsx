import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Shield } from 'lucide-react';

export default function Login({ onSignIn }) {
  const [isOn, setIsOn] = useState(false);
  const [role, setRole] = useState('student'); // 'student' or 'leader'

  const handleGoogleSignIn = async () => {
    // Bypassing Auth for prototyping
    onSignIn('student');
  };

  const handleLeaderSignIn = async (e) => {
    e.preventDefault();
    onSignIn('leader'); // Bypassing Auth for prototyping
  };

  return (
    <div style={{
      width: '100vw', minHeight: '100vh',
      background: isOn ? 'var(--bg-gradient)' : '#050505',
      transition: 'background 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      
      {/* Improved Hanging Lamp Animation */}
      <motion.div 
        style={{ 
          position: 'absolute', top: 0, left: '50%', x: '-50%', 
          transformOrigin: 'top center', zIndex: 100, 
          display: 'flex', flexDirection: 'column', alignItems: 'center' 
        }}
        animate={{ rotate: isOn ? [0, 4, -3, 2, -1, 0] : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        {/* Wire */}
        <div style={{ width: '3px', height: '100px', background: isOn ? 'var(--text-secondary)' : 'var(--text-primary)', transition: 'background 1s' }} />
        
        {/* Lampshade */}
        <div style={{ 
          width: '140px', height: '70px', 
          background: isOn ? '#1F2937' : '#0a0a0a', 
          borderTopLeftRadius: '70px', borderTopRightRadius: '70px',
          borderBottom: isOn ? '3px solid #FBBF24' : '3px solid var(--text-primary)',
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
          position: 'relative', zIndex: 3, transition: 'all 1s'
        }}>
           {/* The glowing bulb */}
           <div style={{ 
            width: '44px', height: '44px', borderRadius: '50%', marginBottom: '-22px',
            background: isOn ? '#FEF08A' : 'var(--text-primary)',
            boxShadow: isOn ? '0 30px 100px 50px rgba(253, 224, 71, 0.4), 0 0 30px 10px rgba(255, 255, 255, 0.6)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }} />
        </div>
        
        {/* The Pull Cord */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 80 }}
          dragElastic={0.4}
          onDragEnd={(e, info) => {
            if (info.offset.y > 40) {
              setIsOn(!isOn);
            }
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'grab', position: 'absolute', top: '140px', right: '30px', zIndex: 1 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <div style={{ width: '2px', height: '80px', background: isOn ? 'var(--text-tertiary)' : '#1F2937', transition: 'background 1s' }} />
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: isOn ? '#F59E0B' : 'var(--text-primary)', marginTop: '-2px', transition: 'background 1s' }} />
        </motion.div>
      </motion.div>

      {/* Helper text when off */}
      {!isOn && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ position: 'absolute', top: '350px', color: 'var(--text-secondary)', fontSize: '13px', letterSpacing: '0.1em', fontWeight: 500 }}
        >
          PULL CORD TO POWER ON
        </motion.div>
      )}

      {/* Login Form Reveal */}
      <AnimatePresence mode="wait">
        {isOn && (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
            style={{
              width: '90%', maxWidth: '420px', marginTop: '160px',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(24px)', borderRadius: '24px',
              padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.5)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
                <span style={{ color: '#EAB308' }}>●</span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.1em' }} className="font-serif">
                  EVENTRA
                </span>
              </div>
              <h1 className="font-serif" style={{ fontSize: '28px', color: 'var(--text-primary)' }}>Welcome back.</h1>
            </div>

            {/* Role Toggle */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', padding: '6px', borderRadius: '16px', marginBottom: '32px' }}>
              <button 
                type="button"
                onClick={() => setRole('student')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: role === 'student' ? 'white' : 'transparent', color: role === 'student' ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 600, boxShadow: role === 'student' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
              >
                <User size={18} /> Student
              </button>
              <button 
                type="button" 
                onClick={() => setRole('leader')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: role === 'leader' ? 'var(--text-primary)' : 'transparent', color: role === 'leader' ? 'white' : 'var(--text-secondary)', fontWeight: 600, boxShadow: role === 'leader' ? '0 4px 6px rgba(0,0,0,0.2)' : 'none', transition: 'all 0.2s' }}
              >
                <Shield size={18} /> Leader
              </button>
            </div>

            <AnimatePresence mode="wait">
              {role === 'student' ? (
                <motion.div key="student-form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '8px 0' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '8px', lineHeight: 1.5 }}>
                    Sign in with your Google account to discover events and book tickets securely.
                  </p>
                  <motion.button 
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGoogleSignIn}
                    type="button" 
                    style={{ 
                      width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 500,
                      background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid #D1D5DB', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form key="leader-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} onSubmit={handleLeaderSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Leader ID</label>
                    <input name="leaderId" type="text" placeholder="e.g., john@raiot" className="search-input" style={{ width: '100%', borderRadius: '12px', padding: '14px 16px', background: 'var(--card-bg-alt)', border: '1px solid var(--border-color)' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Access Token <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(Issued by Union)</span>
                    </label>
                    <input name="token" type="password" placeholder="••••••••" className="search-input" style={{ width: '100%', borderRadius: '12px', padding: '14px 16px', background: 'var(--card-bg-alt)', border: '1px solid var(--border-color)' }} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    Authenticate <ArrowRight size={18} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Having trouble logging in?</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
