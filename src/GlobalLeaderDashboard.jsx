import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Plus, Megaphone, FileText, TrendingUp, Users, ArrowUpRight, AlertTriangle, Settings, ArrowLeft, X,
  Cpu, Lightbulb, Zap, PartyPopper
} from 'lucide-react';
import ClubLeaderView from './ClubLeaderView';

const iconMap = {
  Cpu: <Cpu size={24}/>, Lightbulb: <Lightbulb size={24}/>, Zap: <Zap size={24}/>, PartyPopper: <PartyPopper size={24}/>
};

const fallbackClubs = [
  { id: 1, name: 'RAIoT', category: 'Technology', followers: 840, icon: <Cpu size={24}/>, color: '#CFFAFE', textColor: '#0891B2' }
];

export default function GlobalLeaderDashboard({ onSignOut }) {
  const [activeClub, setActiveClub] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [showNotifs, setShowNotifs] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => { document.body.classList.toggle('dark', isDarkMode); }, [isDarkMode]);
  const [myClubs, setMyClubs] = useState(fallbackClubs);

  useEffect(() => {
    async function fetchClubs() {
      const { data } = await supabase.from('clubs').select('*');
      if (data && data.length > 0) {
        setMyClubs(data.map(c => ({
          id: c.id, name: c.name, category: c.category, followers: c.followers,
          icon: iconMap[c.icon] || <Cpu size={24}/>, color: c.color, textColor: c.text_color
        })));
      }
    }
    fetchClubs();
  }, []);

  const handleRegisterClub = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newClub = { name: formData.get('name'), category: formData.get('category'), description: formData.get('description'), color: '#F3F4F6', text_color: 'var(--text-primary)', icon: 'Cpu', followers: 0 };
    await supabase.from('clubs').insert(newClub);
    setActiveModal(null);
    setMyClubs([...myClubs, { ...newClub, id: Date.now(), icon: <Cpu size={24}/>, textColor: newClub.text_color }]);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!myClubs[0]) return;
    const newEvent = { club_id: myClubs[0].id, title: formData.get('title'), event_date: formData.get('date'), time_range: formData.get('time'), event_type: 'General' };
    await supabase.from('events').insert(newEvent);
    setActiveModal(null);
  };

  if (activeClub) {
    return <ClubLeaderView club={activeClub} onBack={() => setActiveClub(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      {/* Navigation */}
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <h2 style={{ margin: 0, letterSpacing: '-0.05em', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#EAB308' }}>●</span> CAMPUS<span style={{ fontWeight: 400 }}>hub</span>
              <span style={{ fontSize: '10px', background: 'var(--text-primary)', color: 'var(--card-bg)', padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.1em', marginLeft: '4px' }}>LEADER</span>
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowNotifs(!showNotifs)} className="btn btn-ghost btn-icon" style={{ position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '6px', right: '8px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}></span>
            </motion.button>
            
            {showNotifs && (
              <div style={{ position: 'absolute', top: '100%', right: '50px', width: '320px', background: 'var(--card-bg)', borderRadius: '16px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', zIndex: 100, overflow: 'hidden' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6', fontWeight: 600, fontSize: '14px' }}>Notifications</div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }} className="hover-bg">
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>System Update</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>CampusHub v2.0 is live! Check out the new features.</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '4px' }}>2 hrs ago</div>
                  </div>
                  <div style={{ padding: '16px', cursor: 'pointer' }} className="hover-bg">
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>Club Registration</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Your new club application is under review.</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '4px' }}>1 day ago</div>
                  </div>
                </div>
              </div>
            )}

            <motion.div whileTap={{ scale: 0.95 }} onClick={onSignOut} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--text-primary)', color: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
              JD
            </motion.div>
          </div>
        </div>
      </nav>

      <main className="container" style={{ padding: '40px 0' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-serif" style={{ fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px' }}>Command Center</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '40px' }}>Welcome back, John. Here is what needs your attention today.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            
            {/* Left Column: Quick Actions & Managed Clubs */}
            <div>
              {/* Quick Create Dashboard */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveModal('event')} className="glass-panel" style={{ padding: '24px', textAlign: 'left', cursor: 'pointer', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all 0.2s', background: 'var(--card-bg)' }}>
                  <div style={{ width: '40px', height: '40px', background: '#DBEAFE', color: '#1E40AF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>Create Event</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Schedule a new meetup</span>
                  </div>
                </motion.button>

                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveModal('broadcast')} className="glass-panel" style={{ padding: '24px', textAlign: 'left', cursor: 'pointer', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all 0.2s', background: 'var(--card-bg)' }}>
                  <div style={{ width: '40px', height: '40px', background: '#FEF3C7', color: '#92400E', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>Broadcast</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Send an announcement</span>
                  </div>
                </motion.button>

                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveModal('audition')} className="glass-panel" style={{ padding: '24px', textAlign: 'left', cursor: 'pointer', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all 0.2s', background: 'var(--card-bg)' }}>
                  <div style={{ width: '40px', height: '40px', background: '#FCE7F3', color: '#9D174D', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>Launch Audition</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Open recruitment form</span>
                  </div>
                </motion.button>
              </div>

              {/* My Managed Clubs */}
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '16px' }}>My Managed Clubs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
                {myClubs.map(club => (
                  <motion.div 
                    key={club.id} 
                    whileHover={{ y: -4 }}
                    onClick={() => setActiveClub(club)}
                    className="glass-panel" 
                    style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', background: 'var(--card-bg)' }}
                  >
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: club.color, color: club.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                      {club.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>{club.name}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{club.followers} followers</p>
                    </div>
                    <ArrowUpRight size={20} color="var(--text-tertiary)" />
                  </motion.div>
                ))}
                
                <motion.div whileTap={{ scale: 0.98 }} onClick={() => setActiveModal('new_club')} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #D1D5DB', background: 'transparent', cursor: 'pointer' }}>
                  <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <Plus size={24} style={{ margin: '0 auto 8px auto' }} />
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>Register New Club</span>
                  </div>
                </motion.div>
              </div>

              {/* Audience Retention Graph */}
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '16px' }}>Audience Growth (30 Days)</h3>
              <div className="glass-panel" style={{ background: 'var(--card-bg)', padding: '32px', height: '240px', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
                  <h2 style={{ fontSize: '32px', color: 'var(--text-primary)', margin: 0 }}>+124</h2>
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
              <div className="glass-panel" style={{ background: 'var(--card-bg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  Action Center
                  <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '11px', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>3 NEW</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#DBEAFE', color: '#1E40AF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Users size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: 1.4 }}><strong>5 new students</strong> applied to your Core Team Audition.</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>2 hours ago</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D1FAE5', color: '#065F46', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: 1.4 }}>Your upcoming event <strong>Intro Workshop</strong> just hit 150 RSVPs.</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>5 hours ago</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FEE2E2', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: 1.4 }}><strong>Conflict Alert:</strong> Debate Club just scheduled a large event on Oct 24.</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      {/* Global Modals */}
      <AnimatePresence>
        {activeModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ width: '90%', maxWidth: '500px', background: 'var(--card-bg)', borderRadius: '24px', padding: '32px', position: 'relative' }}>
              <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}><X size={20}/></button>
              
              {activeModal === 'new_club' && (
                <div>
                  <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>Register New Club</h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Submit your society for student union approval.</p>
                  <form onSubmit={handleRegisterClub} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input name="name" type="text" placeholder="Club Name" required className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <input name="category" type="text" placeholder="Category (e.g., Tech, Arts)" required className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <textarea name="description" placeholder="Description" required rows="4" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%', resize: 'none' }}></textarea>
                    <motion.button whileTap={{ scale: 0.95 }} type="submit" className="btn btn-primary" style={{ padding: '12px' }}>Submit Application</motion.button>
                  </form>
                </div>
              )}

              {activeModal === 'event' && (
                <div>
                  <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>Create Event</h2>
                  <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                    <input name="title" type="text" placeholder="Event Title" required className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <input name="date" type="date" required className="search-input" style={{ padding: '12px', borderRadius: '8px', flex: 1 }} />
                      <input name="time" type="time" required className="search-input" style={{ padding: '12px', borderRadius: '8px', flex: 1 }} />
                    </div>
                    <input name="location" type="text" placeholder="Location" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <motion.button whileTap={{ scale: 0.95 }} type="submit" className="btn btn-primary" style={{ padding: '12px' }}>Publish Event</motion.button>
                  </form>
                </div>
              )}

              {activeModal === 'broadcast' && (
                <div>
                  <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>Broadcast Message</h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Notify all your followers.</p>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input type="text" placeholder="Subject" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <textarea placeholder="Message content..." rows="5" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%', resize: 'none' }}></textarea>
                    <motion.button whileTap={{ scale: 0.95 }} type="button" onClick={() => setActiveModal(null)} className="btn btn-primary" style={{ padding: '12px' }}>Send Broadcast</motion.button>
                  </form>
                </div>
              )}

              {activeModal === 'audition' && (
                <div>
                  <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>Launch Audition</h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Open a new recruitment pipeline.</p>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input type="text" placeholder="Role Title (e.g., Core Member)" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <input type="date" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <textarea placeholder="Requirements..." rows="4" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%', resize: 'none' }}></textarea>
                    <motion.button whileTap={{ scale: 0.95 }} type="button" onClick={() => setActiveModal(null)} className="btn btn-primary" style={{ padding: '12px' }}>Open Auditions</motion.button>
                  </form>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
