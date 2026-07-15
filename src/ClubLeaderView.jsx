import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Users, BarChart3, List, Layout, Settings, 
  Search, Plus, Filter, MoreVertical, CheckCircle2, XCircle, Edit, Trash2, X
} from 'lucide-react';

const candidatesData = [
  { id: 1, name: 'Atharva', role: 'Creative Director', stage: 'Applied', source: 'Google Form', email: 'xyz@gmail.com', phone: '123456789' },
  { id: 2, name: 'Amey', role: 'Creative Director', stage: 'Applied', source: 'Google Form', email: 'amey@gmail.com', phone: '' },
  { id: 3, name: 'Aaditya Lobo', role: 'Creative Director', stage: 'Applied', source: 'Careers site', email: 'realaadityalobo@gmail.com', phone: '123456789' },
  { id: 4, name: 'Hannah Liu', role: 'Managing Editor', stage: 'Offer', source: 'Referral', email: 'hannah.liu@mail.com', phone: '+1-212-555-0119' },
  { id: 5, name: 'David Owens', role: 'Managing Editor', stage: 'Interview', source: 'Search firm', email: 'david.owens@mail.com', phone: '+1-212-555-0133' },
  { id: 6, name: 'Zoe Martin', role: 'Staff Writer, Culture', stage: 'Interview', source: 'Cold inbound', email: 'zoe.m@mail.com', phone: '+1-713-555' },
  { id: 7, name: 'Ibrahim Diallo', role: 'Staff Writer, Culture', stage: 'Screen', source: 'Referral', email: 'ibrahim@mail.com', phone: '+1-646-555' }
];

const pipelineStages = ['Applied', 'Screen', 'Interview', 'Offer', 'Hired', 'Rejected'];

export default function ClubLeaderView({ club, onBack }) {
  const [activeTab, setActiveTab] = useState('Pipeline');
  const [isAuditionOpen, setIsAuditionOpen] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  
  const primaryColor = club?.textColor || '#111827';

  const renderBadge = (stage) => {
    const colors = {
      Applied: { bg: '#F3F4F6', text: '#374151' },
      Screen: { bg: '#DBEAFE', text: '#1E40AF' },
      Interview: { bg: '#FEF3C7', text: '#92400E' },
      Offer: { bg: '#FCE7F3', text: '#9D174D' },
      Hired: { bg: '#D1FAE5', text: '#065F46' },
      Rejected: { bg: '#FEE2E2', text: '#991B1B' }
    };
    const color = colors[stage] || colors.Applied;
    return (
      <span style={{ background: color.bg, color: color.text, padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 500 }}>
        {stage}
      </span>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      
      {/* Top Navigation */}
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: club.color, color: club.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {club.icon}
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>{club.name} <span style={{ fontWeight: 400, color: '#6B7280' }}>HQ</span></h2>
            </div>

            <div className="glass-panel" style={{ display: 'flex', padding: '4px', borderRadius: '8px', gap: '4px' }}>
              {['Analytics', 'Candidates', 'Pipeline', 'Teams'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                    background: activeTab === tab ? 'white' : 'transparent',
                    color: activeTab === tab ? '#111827' : '#6B7280',
                    border: 'none', boxShadow: activeTab === tab ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={onBack} className="btn btn-ghost" style={{ fontSize: '13px' }}>
              <ArrowLeft size={16} /> Back to Directory
            </button>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={14} />
              <input type="text" className="search-input" placeholder="Search..." style={{ width: '200px', padding: '8px 12px 8px 36px' }} />
            </div>
          </div>
        </div>
      </nav>

      <main className="container" style={{ padding: '32px 24px' }}>
        <AnimatePresence mode="wait">
          
          {/* ANALYTICS TAB */}
          {activeTab === 'Analytics' && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h1 style={{ fontSize: '28px', color: '#111827', marginBottom: '4px' }}>Analytics</h1>
              <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '32px' }}>Pipeline health, members, and event throughput.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div className="glass-panel" style={{ padding: '24px', background: 'white' }}>
                  <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>ACTIVE CANDIDATES</p>
                  <h2 style={{ fontSize: '36px', color: '#111827', marginBottom: '4px' }}>30</h2>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>32 total applied</p>
                </div>
                <div className="glass-panel" style={{ padding: '24px', background: 'white' }}>
                  <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>UPCOMING INTERVIEWS</p>
                  <h2 style={{ fontSize: '36px', color: '#111827', marginBottom: '4px' }}>10</h2>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>20 all-time</p>
                </div>
                <div className="glass-panel" style={{ padding: '24px', background: 'white' }}>
                  <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>HIRED (THIS MONTH)</p>
                  <h2 style={{ fontSize: '36px', color: '#111827', marginBottom: '4px' }}>4</h2>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>16 open positions</p>
                </div>
                <div className="glass-panel" style={{ padding: '24px', background: 'white' }}>
                  <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>FOLLOWER GROWTH</p>
                  <h2 style={{ fontSize: '36px', color: '#111827', marginBottom: '4px' }}>+12%</h2>
                  <p style={{ fontSize: '12px', color: '#059669' }}>Trending up</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="glass-panel" style={{ padding: '24px', background: 'white' }}>
                  <h3 style={{ fontSize: '16px', color: '#111827', marginBottom: '32px' }}>Candidate pipeline</h3>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', height: '200px', paddingBottom: '24px', borderBottom: '1px solid #E5E7EB' }}>
                    {[10, 8, 10, 2, 1, 1].map((val, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '100%', background: club.color === '#FCE7F3' ? '#F472B6' : '#FDE047', height: `${val * 15}px`, borderRadius: '4px 4px 0 0', transition: 'height 1s ease-out' }}></div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '24px', paddingTop: '12px' }}>
                    {pipelineStages.map((stage, i) => (
                      <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: '#6B7280' }}>{stage}</div>
                    ))}
                  </div>
                </div>
                
                <div className="glass-panel" style={{ padding: '24px', background: 'white' }}>
                   <h3 style={{ fontSize: '16px', color: '#111827', marginBottom: '32px' }}>Requests by status</h3>
                   {/* Mock Pie Chart */}
                   <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: `conic-gradient(${club.color === '#FCE7F3' ? '#F472B6' : '#FDE047'} 0% 60%, #F97316 60% 80%, #A78BFA 80% 90%, #60A5FA 90% 100%)`, margin: '0 auto 32px auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%' }}></div>
                   </div>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6B7280' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: club.color === '#FCE7F3' ? '#F472B6' : '#FDE047'}}></div>Open</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6B7280' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: '#F97316'}}></div>In Progress</div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CANDIDATES TAB */}
          {activeTab === 'Candidates' && (
            <motion.div key="candidates" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', color: '#111827', marginBottom: '4px' }}>Candidates</h1>
                  <p style={{ color: '#6B7280', fontSize: '14px' }}>32 candidates across all open roles.</p>
                </div>
                <button className="btn" style={{ background: 'white', border: '1px solid #E5E7EB', padding: '8px 16px', fontSize: '13px' }}>
                  Sync Data
                </button>
              </div>

              <div className="glass-panel" style={{ background: 'white', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
                      <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>CANDIDATE</th>
                      <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>ROLE</th>
                      <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>STAGE</th>
                      <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>SOURCE</th>
                      <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>CONTACT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatesData.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td style={{ padding: '16px 24px' }}>
                          <h4 style={{ fontSize: '14px', color: '#111827', marginBottom: '2px' }}>{c.name}</h4>
                          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Experience: 1 yr</span>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: '#374151', fontWeight: 500 }}>{c.role}</td>
                        <td style={{ padding: '16px 24px' }}>{renderBadge(c.stage)}</td>
                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>{c.source}</td>
                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                          <div>{c.email}</div>
                          <div>{c.phone}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* PIPELINE KANBAN TAB */}
          {activeTab === 'Pipeline' && (
            <motion.div key="pipeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              
              <div className="glass-panel" style={{ background: 'white', padding: '32px', marginBottom: '32px' }}>
                <div className="flex-between" style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h1 style={{ fontSize: '28px', color: '#111827', margin: 0 }}>Core Team Fall Recruitment</h1>
                    
                    {/* Audition Open/Close Toggle */}
                    <div onClick={() => setIsAuditionOpen(!isAuditionOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isAuditionOpen ? '#D1FAE5' : '#FEE2E2', color: isAuditionOpen ? '#065F46' : '#991B1B', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isAuditionOpen ? '#10B981' : '#EF4444' }}></div>
                      {isAuditionOpen ? 'PUBLICLY OPEN' : 'CLOSED'}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveModal('edit_form')} className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><Edit size={16} /> Edit Form</motion.button>
                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', background: primaryColor }}>
                      <Plus size={16} /> Add Candidate
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '4px' }}>DEPARTMENT</p>
                    <p style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>Management</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '4px' }}>TARGET CLOSE</p>
                    <p style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>2026-10-30</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '4px' }}>HIRING MANAGER</p>
                    <p style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>John Doe</p>
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '18px', color: '#111827', marginBottom: '16px' }}>Candidate pipeline</h3>
              
              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '24px' }}>
                {pipelineStages.map(stage => {
                  const stageCandidates = candidatesData.filter(c => c.stage === stage);
                  return (
                    <div key={stage} className="glass-panel" style={{ background: '#F9FAFB', width: '280px', flexShrink: 0, padding: '16px', display: 'flex', flexDirection: 'column', height: '400px' }}>
                      <div className="flex-between" style={{ marginBottom: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stage}</span>
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{stageCandidates.length}</span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
                        {stageCandidates.map(c => (
                          <div key={c.id} style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', cursor: 'grab', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>{c.name}</h4>
                            <p style={{ fontSize: '12px', color: '#6B7280' }}>{c.role}</p>
                          </div>
                        ))}
                      </div>

                      <button className="btn" style={{ width: '100%', background: 'transparent', border: '1px dashed #D1D5DB', color: '#6B7280', marginTop: '16px', fontSize: '13px' }}>
                        + Add
                      </button>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          )}

          {/* TEAMS TAB */}
          {activeTab === 'Teams' && (
            <motion.div key="teams" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div>
                <h1 style={{ fontSize: '28px', color: '#111827', marginBottom: '4px' }}>Teams</h1>
                <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '32px' }}>Per-team breakdown of club members.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <input type="text" placeholder="New team name" className="search-input" style={{ width: '100%', borderRadius: '8px' }} />
                    <button className="btn" style={{ background: '#FDE047', color: '#92400E', padding: '10px 16px', borderRadius: '8px' }}>+ Add</button>
                  </div>

                  {['Core Management', 'Events & Outreach', 'Tech & Design', 'Content Creation'].map((team, i) => (
                    <div key={i} className="glass-panel" style={{ background: i === 0 ? '#FEF3C7' : 'white', border: i === 0 ? '1px solid #FDE047' : '1px solid #E5E7EB', padding: '16px', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <div className="flex-between">
                        <div>
                          <h4 style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>{team}</h4>
                          <p style={{ fontSize: '12px', color: '#6B7280' }}>{i === 0 ? '5' : '3'} members</p>
                        </div>
                        <Trash2 size={14} color="#9CA3AF" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-panel" style={{ background: 'white', padding: '32px' }}>
                  <div className="flex-between" style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', color: '#111827' }}>Core Management · Members</h3>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveModal('add_member')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', background: primaryColor }}>
                      <Plus size={16} /> Add Member
                    </motion.button>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {[
                        { name: 'John Doe', role: 'President', email: 'john@college.edu' },
                        { name: 'Jane Smith', role: 'Vice President', email: 'jane@college.edu' },
                        { name: 'Alex Johnson', role: 'Treasurer', email: 'alex@college.edu' },
                        { name: 'Sarah Lee', role: 'Secretary', email: 'sarah@college.edu' }
                      ].map((m, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                          <td style={{ padding: '16px 0' }}>
                            <h4 style={{ fontSize: '14px', color: '#111827' }}>{m.name}</h4>
                            <p style={{ fontSize: '13px', color: '#6B7280' }}>{m.email}</p>
                          </td>
                          <td style={{ padding: '16px 0', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
                            <span style={{ background: '#F3F4F6', color: '#374151', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 500 }}>
                              {m.role}
                            </span>
                            <motion.button whileTap={{ scale: 0.9 }} className="btn btn-ghost btn-icon" style={{ color: '#EF4444' }}><Trash2 size={16} /></motion.button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Leader View Modals */}
      <AnimatePresence>
        {activeModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ width: '90%', maxWidth: '500px', background: 'white', borderRadius: '24px', padding: '32px', position: 'relative' }}>
              <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><X size={20}/></button>
              
              {activeModal === 'edit_form' && (
                <div>
                  <h2 style={{ fontSize: '24px', color: '#111827', marginBottom: '8px' }}>Edit Application Form</h2>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>Customize the questions for your audition.</p>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px', display: 'block' }}>Question 1</label>
                      <input type="text" defaultValue="Why do you want to join?" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px', display: 'block' }}>Question 2</label>
                      <input type="text" defaultValue="Portfolio Link (Optional)" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    </div>
                    <motion.button whileTap={{ scale: 0.95 }} type="button" onClick={() => setActiveModal(null)} className="btn btn-primary" style={{ padding: '12px', background: primaryColor }}>Save Form</motion.button>
                  </form>
                </div>
              )}

              {activeModal === 'add_member' && (
                <div>
                  <h2 style={{ fontSize: '24px', color: '#111827', marginBottom: '8px' }}>Add Team Member</h2>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>Add a new member to the club roster.</p>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input type="text" placeholder="Full Name" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <input type="email" placeholder="University Email" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <input type="text" placeholder="Role (e.g., Tech Lead)" className="search-input" style={{ padding: '12px', borderRadius: '8px', width: '100%' }} />
                    <motion.button whileTap={{ scale: 0.95 }} type="button" onClick={() => setActiveModal(null)} className="btn btn-primary" style={{ padding: '12px', background: primaryColor }}>Send Invite</motion.button>
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
