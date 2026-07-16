import React, { useState } from 'react';
import { supabase } from './supabase';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Image, MessageCircle, Mail, Calendar, Info, FileText, QrCode, Trophy, Award, X, Users, CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function ClubProfile({ club, onBack, onLeaderView }) {
  // Extract custom color for "vibe" customization
  const primaryColor = club.textColor || 'var(--text-primary)';
  const lightBg = club.color || '#F3F4F6';
  const [showTicket, setShowTicket] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (isFollowing) return;
    setIsFollowing(true);
    setShowFollowModal(true);
    await supabase.from('clubs').update({ followers: club.followers + 1 }).eq('id', club.id);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      {/* Dynamic Header */}
      <div style={{ height: '240px', background: primaryColor, position: 'relative', overflow: 'hidden' }}>
        {/* Abstract pattern to make it look premium */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 150%, white 0%, transparent 50%)' }} />
        
        <button 
          onClick={onBack}
          style={{ position: 'absolute', top: '24px', left: '24px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button 
          onClick={onLeaderView}
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
        >
          Leader View
        </button>
      </div>

      <main className="container" style={{ marginTop: '-64px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>
          
          {/* Main Column */}
          <div>
            <div className="glass-panel" style={{ background: 'var(--card-bg)', padding: '40px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '32px' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '24px', background: lightBg, color: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold', border: '4px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  {club.icon}
                </div>
                <div style={{ flex: 1, paddingBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{club.category}</span>
                  <h1 className="font-serif" style={{ fontSize: '48px', color: 'var(--text-primary)', lineHeight: 1.1, margin: '8px 0' }}>{club.name}</h1>
                  <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>{club.followers} students following</p>
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleFollow} className="btn" style={{ background: isFollowing ? 'white' : primaryColor, color: isFollowing ? primaryColor : 'white', border: isFollowing ? `1px solid ${primaryColor}` : 'none', padding: '12px 32px', fontSize: '16px' }}>
                  {isFollowing ? 'Following' : 'Follow Club'}
                </motion.button>
              </div>

              <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '32px', marginBottom: '32px' }}>
                <div style={{ flex: 2 }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={20} color={primaryColor} /> About Us</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
                    {club.desc} We are a community of passionate students dedicated to learning, building, and growing together. Join us for weekly workshops, guest speaker events, and our flagship annual symposium.
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '16px' }}>Links</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}><ExternalLink size={16} /> officialwebsite.com</a>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}><Image size={16} /> @{club.name.replace(/\s+/g, '').toLowerCase()}</a>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}><MessageCircle size={16} /> Contact Page</a>
                  </div>
                </div>
              </div>

              {/* Achievements Archive */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Trophy size={20} color={primaryColor} /> Achievements Archive</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {[
                    { title: 'Best Campus Society 2025', desc: 'Awarded by Student Union', icon: Trophy },
                    { title: 'Hackathon Champions', desc: 'National Tech Fest', icon: Award },
                    { title: '1000+ Members Milestone', desc: 'Largest club on campus', icon: Users }
                  ].map((ach, i) => {
                    const AchIcon = ach.icon;
                    return (
                      <div key={i} style={{ background: 'var(--card-bg-alt)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: lightBg, color: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                          <AchIcon size={16} />
                        </div>
                        <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>{ach.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{ach.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recruitment / Audition Form Preview */}
              <div style={{ background: lightBg, borderRadius: '24px', padding: '32px', border: `1px solid ${primaryColor}30` }}>
                <div className="flex-between" style={{ marginBottom: '24px' }}>
                  <div>
                    <span style={{ background: primaryColor, color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>WE ARE RECRUITING</span>
                    <h3 className="font-serif" style={{ fontSize: '28px', color: 'var(--text-primary)', marginTop: '16px' }}>Core Team Auditions</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>Applications close Oct 30, 2026. Open to all years.</p>
                  </div>
                  <FileText size={48} color={primaryColor} style={{ opacity: 0.5 }} />
                </div>
                
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--card-bg)', padding: '24px', borderRadius: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>Why do you want to join?</label>
                    <textarea rows="3" className="search-input" style={{ width: '100%', borderRadius: '8px', resize: 'none' }} placeholder="Tell us about your passion..."></textarea>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>Portfolio Link (Optional)</label>
                    <input type="text" className="search-input" style={{ width: '100%', borderRadius: '8px' }} placeholder="https://" />
                  </div>
                  <button type="button" className="btn" style={{ background: primaryColor, color: 'white', marginTop: '8px' }}>Submit Application</button>
                </form>
              </div>

            </div>
          </div>

          {/* Right Sidebar */}
          <div>
            <div className="glass-panel" style={{ background: 'var(--card-bg)', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={18} color={primaryColor} /> Upcoming Events</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '11px', color: primaryColor, fontWeight: 600 }}>OCT 24 · 4:00 PM</span>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', margin: '4px 0' }}>Intro Workshop</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Room 304, Main Block</p>
                  <button onClick={() => setShowTicket(true)} className="btn" style={{ width: '100%', marginTop: '12px', padding: '6px', fontSize: '12px', background: lightBg, color: primaryColor, border: `1px solid ${primaryColor}30` }}>RSVP</button>
                </div>
              </div>
            </div>
            
            <div className="glass-panel" style={{ background: 'var(--card-bg)', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '20px' }}>Recent Announcements</h3>
              <div style={{ paddingLeft: '16px', borderLeft: `2px solid ${lightBg}` }}>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '8px' }}>
                  "Welcome freshers! Make sure to drop by our booth during the club fair tomorrow!"
                </p>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>2 days ago</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* QR Ticket Modal */}
      <AnimatePresence>
        {showTicket && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{ background: 'var(--card-bg)', padding: '0', borderRadius: '24px', width: '90%', maxWidth: '340px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            >
              <div style={{ background: primaryColor, padding: '24px', color: 'white', position: 'relative' }}>
                <button onClick={() => setShowTicket(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', opacity: 0.8, marginBottom: '8px' }}>ENTRY TICKET</div>
                <h3 className="font-serif" style={{ fontSize: '24px', margin: 0, lineHeight: 1.1 }}>Intro Workshop</h3>
                <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>{club.name}</p>
              </div>
              
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FAFAFA' }}>
                <div style={{ width: '180px', height: '180px', background: 'var(--card-bg)', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Simplified mock of a QR code icon */}
                  <QrCode size={148} color={primaryColor} />
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '24px', textAlign: 'center' }}>Show this QR code at the entrance to check in.</p>
              </div>
              
              <div style={{ padding: '16px 24px', background: 'var(--card-bg)', borderTop: '2px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Date</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>Oct 24, 2026</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Time</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>4:00 PM</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Social Follow Modal */}
      <AnimatePresence>
        {showFollowModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '380px', textAlign: 'center', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            >
              <button onClick={() => setShowFollowModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}><X size={20}/></button>
              
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                <CheckCircle2 size={32} />
              </div>
              <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>Awesome! You're in.</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.5 }}>
                You'll now receive updates for <strong>{club.name}</strong> on your dashboard.<br/><br/>
                Don't miss out on real-time updates—be sure to follow our socials too!
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <motion.button whileTap={{ scale: 0.95 }} className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--card-bg-alt)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                  <Image size={18} /> Instagram
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--card-bg-alt)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                  <MessageCircle size={18} /> LinkedIn
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
