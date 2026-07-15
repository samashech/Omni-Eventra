import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Plus, Megaphone, FileText, TrendingUp, Users, ArrowUpRight, AlertTriangle, Settings, ArrowLeft
} from 'lucide-react';
import ClubLeaderView from './ClubLeaderView';

const myClubs = [
  { id: 1, name: 'Tech & Code Society', category: 'Technology', followers: 840, icon: 'T', color: '#DBEAFE', textColor: '#1E40AF' }
];

export default function GlobalLeaderDashboard({ onSignOut }) {
  const [activeClub, setActiveClub] = useState(null);

  if (activeClub) {
    return <ClubLeaderView club={activeClub} onBack={() => setActiveClub(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      {/* Navigation */}
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <h2 style={{ margin: 0, letterSpacing: '-0.05em', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#EAB308' }}>●</span> CAMPUS<span style={{ fontWeight: 400 }}>hub</span>
              <span style={{ fontSize: '10px', background: '#111827', color: 'white', padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.1em', marginLeft: '4px' }}>LEADER</span>
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn btn-ghost btn-icon"><Bell size={20} /></button>
            <div onClick={onSignOut} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#111827', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
              JD
            </div>
          </div>
        </div>
      </nav>

      <main className="container" style={{ padding: '40px 0' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-serif" style={{ fontSize: '36px', color: '#111827', marginBottom: '8px' }}>Command Center</h1>
          <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>Welcome back, John. Here is what needs your attention today.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            
            {/* Left Column: Quick Actions & Managed Clubs */}
            <div>
              {/* Quick Create Dashboard */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
                <button className="glass-panel" style={{ padding: '24px', textAlign: 'left', cursor: 'pointer', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all 0.2s' }}>
                  <div style={{ width: '40px', height: '40px', background: '#DBEAFE', color: '#1E40AF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: '#111827', margin: 0 }}>Create Event</h4>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Schedule a new meetup</span>
                  </div>
                </button>

                <button className="glass-panel" style={{ padding: '24px', textAlign: 'left', cursor: 'pointer', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all 0.2s' }}>
                  <div style={{ width: '40px', height: '40px', background: '#FEF3C7', color: '#92400E', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: '#111827', margin: 0 }}>Broadcast</h4>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Send an announcement</span>
                  </div>
                </button>

                <button className="glass-panel" style={{ padding: '24px', textAlign: 'left', cursor: 'pointer', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all 0.2s' }}>
                  <div style={{ width: '40px', height: '40px', background: '#FCE7F3', color: '#9D174D', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: '#111827', margin: 0 }}>Launch Audition</h4>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Open recruitment form</span>
                  </div>
                </button>
              </div>

              {/* My Managed Clubs */}
              <h3 style={{ fontSize: '18px', color: '#111827', marginBottom: '16px' }}>My Managed Clubs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
                {myClubs.map(club => (
                  <motion.div 
                    key={club.id} 
                    whileHover={{ y: -4 }}
                    onClick={() => setActiveClub(club)}
                    className="glass-panel" 
                    style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', background: 'white' }}
                  >
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: club.color, color: club.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                      {club.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', color: '#111827', margin: '0 0 4px 0' }}>{club.name}</h4>
                      <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>{club.followers} followers</p>
                    </div>
                    <ArrowUpRight size={20} color="#9CA3AF" />
                  </motion.div>
                ))}
                
                <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #D1D5DB', background: 'transparent', cursor: 'pointer' }}>
                  <div style={{ textAlign: 'center', color: '#6B7280' }}>
                    <Plus size={24} style={{ margin: '0 auto 8px auto' }} />
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>Register New Club</span>
                  </div>
                </div>
              </div>

              {/* Audience Retention Graph */}
              <h3 style={{ fontSize: '18px', color: '#111827', marginBottom: '16px' }}>Audience Growth (30 Days)</h3>
              <div className="glass-panel" style={{ background: 'white', padding: '32px', height: '240px', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
                  <h2 style={{ fontSize: '32px', color: '#111827', margin: 0 }}>+124</h2>
                  <span style={{ fontSize: '13px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14}/> New followers</span>
                </div>
                {/* Mock Graph Bars */}
                {[2,3,4,3,5,6,8,7,9,11,10,13,15,16,14,18,20].map((val, i) => (
                  <div key={i} style={{ flex: 1, background: '#FDE047', height: `${val * 4}%`, borderRadius: '4px 4px 0 0', opacity: i === 16 ? 1 : 0.4 }}></div>
                ))}
              </div>
            </div>

            {/* Right Column: Action Center (Notifications) */}
            <div>
              <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', color: '#111827', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  Action Center
                  <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '11px', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>3 NEW</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#DBEAFE', color: '#1E40AF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Users size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#111827', margin: '0 0 4px 0', lineHeight: 1.4 }}><strong>5 new students</strong> applied to your Core Team Audition.</p>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>2 hours ago</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D1FAE5', color: '#065F46', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#111827', margin: '0 0 4px 0', lineHeight: 1.4 }}>Your upcoming event <strong>Intro Workshop</strong> just hit 150 RSVPs.</p>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>5 hours ago</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FEE2E2', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#111827', margin: '0 0 4px 0', lineHeight: 1.4 }}><strong>Conflict Alert:</strong> Debate Club just scheduled a large event on Oct 24.</p>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </main>
    </div>
  );
}
