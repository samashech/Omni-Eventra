import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Shield } from 'lucide-react';

export default function Login({ onSignIn }) {
  const [isOn, setIsOn] = useState(false);
  const [role, setRole] = useState('student'); // 'student' or 'leader'

  return (
    <div style={{
      width: '100vw', minHeight: '100vh',
      background: isOn ? 'var(--bg-gradient)' : '#0B0F19',
      transition: 'background 1s ease-in-out',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      
      {/* Hanging Lamp Cord */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 100 }}>
        {/* The fixture */}
        <div style={{ width: '40px', height: '10px', background: isOn ? '#374151' : '#1F2937', borderRadius: '0 0 4px 4px' }} />
        {/* The bulb */}
        <div style={{ 
          width: '60px', height: '60px', borderRadius: '50%', marginTop: '-5px',
          background: isOn ? '#FEF08A' : '#1F2937',
          boxShadow: isOn ? '0 0 100px 40px rgba(253, 224, 71, 0.6)' : 'none',
          transition: 'all 0.5s ease-in-out', zIndex: 2
        }} />
        
        {/* The Pull Cord */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 80 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.offset.y > 40) {
              setIsOn(!isOn);
            }
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'grab', marginTop: '-30px', zIndex: 1 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <div style={{ width: '2px', height: '100px', background: isOn ? '#9CA3AF' : '#374151' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isOn ? '#EAB308' : '#4B5563', marginTop: '-2px' }} />
        </motion.div>
        
        {!isOn && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            style={{ marginTop: '16px', color: '#6B7280', fontSize: '13px', letterSpacing: '0.05em' }}
          >
            PULL TO TURN ON
          </motion.div>
        )}
      </div>

      {/* Login Form (Only visible when light is ON) */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              width: '90%', maxWidth: '400px', marginTop: '120px',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(16px)', borderRadius: '24px',
              padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
                <span style={{ color: '#EAB308' }}>●</span>
                <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827', letterSpacing: '-0.02em' }}>
                  CAMPUS<span style={{ fontWeight: 400 }}>hub</span>
                </span>
              </div>
              <h1 className="font-serif" style={{ fontSize: '28px', color: '#111827' }}>Welcome back.</h1>
            </div>

            {/* Role Toggle */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
              <button 
                type="button"
                onClick={() => setRole('student')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: role === 'student' ? 'white' : 'transparent', color: role === 'student' ? '#111827' : '#6B7280', fontWeight: 500, boxShadow: role === 'student' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
              >
                <User size={16} /> Student
              </button>
              <button 
                type="button" 
                onClick={() => setRole('leader')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: role === 'leader' ? '#111827' : 'transparent', color: role === 'leader' ? 'white' : '#6B7280', fontWeight: 500, boxShadow: role === 'leader' ? '0 4px 6px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
              >
                <Shield size={16} /> Leader
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onSignIn(role); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>University Email</label>
                <input type="email" placeholder="student@college.edu" className="search-input" style={{ width: '100%', borderRadius: '12px', padding: '12px 16px' }} required />
              </div>

              {role === 'leader' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                    Club Admin Token 
                    <span style={{ fontSize: '10px', color: '#9CA3AF', marginLeft: '6px', fontWeight: 400 }}>(Issued by Union)</span>
                  </label>
                  <input type="password" placeholder="••••••••" className="search-input" style={{ width: '100%', borderRadius: '12px', padding: '12px 16px' }} required />
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Password</label>
                  <input type="password" placeholder="••••••••" className="search-input" style={{ width: '100%', borderRadius: '12px', padding: '12px 16px' }} required />
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Sign In <ArrowRight size={18} />
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <a href="#" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Forgot your password?</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
