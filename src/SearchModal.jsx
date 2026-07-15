import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Users, MessageSquare, ArrowRight, X } from 'lucide-react';

const mockResults = [
  { id: 1, type: 'club', title: 'Tech & Code Society', subtitle: 'Technology · 840 followers', icon: Users },
  { id: 2, type: 'club', title: 'Debating Society', subtitle: 'Culture · 420 followers', icon: Users },
  { id: 3, type: 'event', title: 'Intro to Web3 & Blockchain', subtitle: 'Tech & Code Society · Oct 24', icon: Calendar },
  { id: 4, type: 'event', title: 'Parliamentary debate night', subtitle: 'Debating Society · Thu 6pm', icon: Calendar },
  { id: 5, type: 'announcement', title: 'Call for Core Team Members', subtitle: 'Debate Club · Deadline Oct 25', icon: MessageSquare },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  // Handle Cmd+K to open (managed in parent, but good to close on Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query 
    ? mockResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.subtitle.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 9999,
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10vh'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.15 }}
        style={{
          width: '90%', maxWidth: '600px', background: 'white', borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #E5E7EB' }}>
          <Search size={20} color="#9CA3AF" />
          <input
            autoFocus
            type="text"
            placeholder="Search clubs, events, or people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              padding: '8px 16px', fontSize: '18px', color: '#111827'
            }}
          />
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 0' }}>
          {query.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>
              <p style={{ fontSize: '14px', marginBottom: '16px' }}>Try searching for a club, event, or announcement.</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {['Tech', 'Debate', 'Hackathon', 'E-Cell'].map(tag => (
                  <button key={tag} onClick={() => setQuery(tag)} style={{ background: '#F3F4F6', border: 'none', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', color: '#374151', cursor: 'pointer' }}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', padding: '0 24px', marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>Results</span>
              {results.map(res => {
                const Icon = res.icon;
                return (
                  <motion.div
                    key={res.id}
                    whileHover={{ background: '#F9FAFB' }}
                    style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', borderLeft: '3px solid transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = '#FACC15'}
                    onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = 'transparent'}
                    onClick={onClose}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4B5563' }}>
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{res.title}</h4>
                      <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>{res.subtitle}</p>
                    </div>
                    <ArrowRight size={16} color="#D1D5DB" />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
        
        <div style={{ background: '#F9FAFB', padding: '12px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Search powered by CampusHub</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '11px', background: 'white', border: '1px solid #E5E7EB', padding: '2px 6px', borderRadius: '4px', color: '#6B7280' }}>esc</span>
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>to close</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
