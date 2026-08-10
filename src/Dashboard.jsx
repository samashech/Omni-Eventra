import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, MapPin, Calendar as CalendarIcon, Ticket, Users, 
  ArrowUpRight, Sparkles, Share2, ShieldCheck, Lock, CheckCircle2, Bookmark, BookmarkCheck,
  Music, Rocket, Bot, Guitar, Map, List, QrCode, CreditCard, Smartphone, Check, UserPlus,
  MessageSquare, X, Wallet, CalendarPlus, Share, TrendingDown, Clock, Medal, Zap, LogOut
} from 'lucide-react';

const mockEvents = [
  { id: 1, title: 'Oblivion Neon Night', category: 'Concert', date: 'Nov 12, 2026', time: '8:00 PM', location: 'Main Arena', price: 4500, icon: Music, banner: 'linear-gradient(135deg, rgba(30,58,138,0.2), rgba(59,130,246,0.1))', tag: 'Selling Fast', countdown: 'Starts in 2d 14h' },
  { id: 2, title: 'TechNova Fest 2026', category: 'College Fest', date: 'Nov 15, 2026', time: '10:00 AM', location: 'Campus Grounds', price: 0, icon: Rocket, banner: 'linear-gradient(135deg, rgba(6,95,70,0.2), rgba(16,185,129,0.1))', tag: 'Trending', countdown: 'Starts in 5d 2h' },
  { id: 3, title: 'AI & Future Workshop', category: 'Workshop', date: 'Nov 18, 2026', time: '2:00 PM', location: 'Innovation Lab', price: 1500, icon: Bot, banner: 'linear-gradient(135deg, rgba(112,26,117,0.2), rgba(217,70,239,0.1))', tag: 'Few Seats Left' },
  { id: 4, title: 'Indie Rock Local', category: 'Concert', date: 'Nov 20, 2026', time: '7:30 PM', location: 'Downtown Club', price: 2500, icon: Guitar, banner: 'linear-gradient(135deg, rgba(127,29,29,0.2), rgba(239,68,68,0.1))', tag: 'New' }
];

const categories = ['All', 'Concerts', 'College Fests', 'Workshops', 'Free Events'];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };
const pageVariants = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

export default function Dashboard({ onSignOut }) {
  const [activeTab, setActiveTab] = useState('Discover');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('List');
  const [savedEvents, setSavedEvents] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  
  // Checkout State
  const [checkoutStep, setCheckoutStep] = useState(null); // 'seats', 'payment', 'confirmation'
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [splitPayment, setSplitPayment] = useState(false);

  // Modals & Dropdowns
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileBadges, setShowProfileBadges] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');

  
  useEffect(() => {
    if (activeTab === 'My Tickets') {
      fetch('http://localhost:3001/api/tickets')
        .then(res => res.json())
        .then(data => setMyTickets(data))
        .catch(e => console.error('Error fetching tickets:', e));
    }
  }, [activeTab]);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedEvents(prev => prev.includes(id) ? prev.filter(eId => eId !== id) : [...prev, id]);
  };

  const filteredEvents = mockEvents.filter(evt => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Free Events') return evt.price === 0;
    return evt.category === activeCategory.slice(0, -1) || evt.category === activeCategory;
  });

  const handleSeatClick = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };
  
  const totalPrice = selectedSeats.length * (selectedEvent?.price || 0) + (selectedSeats.length > 0 ? 150 : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* Navigation */}
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <h2 className="font-serif" style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              EVENTRA
            </h2>
            
            <div className="glass-panel flex-center" style={{ padding: '6px 12px', borderRadius: '999px', gap: '8px' }}>
              {['Discover', 'Calendar', 'My Tickets', 'Saved Events', 'Friends'].map(tab => (
                <button 
                  key={tab}
                  className={`btn ₹{activeTab === tab ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ 
                    padding: '8px 16px',
                    boxShadow: activeTab === tab ? '0 4px 12px rgba(234, 179, 8, 0.2)' : 'none'
                  }}
                  onClick={() => { setActiveTab(tab); setSelectedEvent(null); setCheckoutStep(null); }}
                >
                  {tab === 'Discover' && <Sparkles size={16}/>}
                  {tab === 'Calendar' && <CalendarIcon size={16}/>}
                  {tab === 'My Tickets' && <Ticket size={16}/>}
                  {tab === 'Saved Events' && <Bookmark size={16}/>}
                  {tab === 'Friends' && <Users size={16}/>}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={16} />
              <input type="text" className="search-input" placeholder="Search events..." />
              <span className="cmd-k">⌘K</span>
            </div>
            
            <div style={{ position: 'relative' }}>
              <motion.button 
                whileTap={{ scale: 0.9 }} 
                className="btn btn-ghost btn-icon" 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ position: 'relative', background: showNotifications ? 'var(--bg-subtle)' : 'transparent' }}
              >
                <Bell size={20} />
                <span style={{ position: 'absolute', top: '2px', right: '4px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}></span>
              </motion.button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '320px', background: 'var(--card-bg)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', zIndex: 100, overflow: 'hidden' }}
                  >
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontWeight: 600, fontSize: '14px' }}>Notifications</h4>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Mark all read</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* Notif 1 */}
                      <div style={{ padding: '16px', display: 'flex', gap: '12px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FEF3C7', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={16}/></div>
                        <div>
                          <p style={{ fontSize: '13px', lineHeight: 1.4 }}><span style={{ fontWeight: 600 }}>Rahul</span> invited you to <span style={{ fontWeight: 600 }}>Oblivion Neon Night</span>.</p>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>2 mins ago</span>
                        </div>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', marginTop: '4px' }}></div>
                      </div>
                      {/* Notif 2 */}
                      <div style={{ padding: '16px', display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D1FAE5', color: '#065F46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingDown size={16}/></div>
                        <div>
                          <p style={{ fontSize: '13px', lineHeight: 1.4 }}>Price drop! <span style={{ fontWeight: 600 }}>TechNova Fest</span> is now Free.</p>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>1 hour ago</span>
                        </div>
                      </div>
                      {/* Notif 3 */}
                      <div style={{ padding: '16px', display: 'flex', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E0E7FF', color: '#3730A3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={16}/></div>
                        <div>
                          <p style={{ fontSize: '13px', lineHeight: 1.4 }}>Reminder: <span style={{ fontWeight: 600 }}>AI Workshop</span> starts tomorrow.</p>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>1 day ago</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div style={{ position: 'relative' }} onMouseEnter={() => setShowProfileBadges(true)} onMouseLeave={() => setShowProfileBadges(false)}>
              <motion.div whileTap={{ scale: 0.95 }} onClick={onSignOut} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--text-primary)', color: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                RD
              </motion.div>
              
              <AnimatePresence>
                {showProfileBadges && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', width: '220px', background: 'var(--card-bg)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', zIndex: 100, padding: '16px' }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      <p style={{ fontWeight: 600, fontSize: '16px' }}>Rahul Desai</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>rahul@example.com</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-subtle)', padding: '8px 12px', borderRadius: '8px' }}>
                        <Medal size={16} color="#EAB308" />
                        <div>
                          <p style={{ fontSize: '12px', fontWeight: 600 }}>Squad Leader</p>
                          <p style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Invited 5+ friends</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-subtle)', padding: '8px 12px', borderRadius: '8px' }}>
                        <Zap size={16} color="#3B82F6" />
                        <div>
                          <p style={{ fontSize: '12px', fontWeight: 600 }}>Early Bird</p>
                          <p style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Booked 3 events early</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={onSignOut} className="btn btn-ghost" style={{ width: '100%', border: '1px solid var(--border-color)', color: '#EF4444', display: 'flex', justifyContent: 'center' }}>
                      <LogOut size={16} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        
        {activeTab === 'Discover' && !selectedEvent && (
          <motion.main key="discover" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container" style={{ marginTop: '40px', flex: 1 }}>
            
            <motion.div variants={itemVariants} initial="hidden" animate="show" style={{ marginBottom: '40px' }}>
              <h1 className="font-serif" style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                LOCAL <span style={{ color: 'var(--accent-text)' }}>EVENTS.</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Find and book tickets with zero friction.</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '24px', color: '#1e3a8a', fontSize: '13px', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} /> Verified Organizers
                </div>
                <div style={{ width: '1px', height: '20px', background: 'rgba(30,58,138,0.2)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={18} /> Encrypted Checkout
                </div>
                <div style={{ width: '1px', height: '20px', background: 'rgba(30,58,138,0.2)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} /> Buyer Protection
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="btn"
                    style={{ 
                      padding: '8px 16px', fontSize: '13px', borderRadius: '999px',
                      background: activeCategory === cat ? 'var(--accent-text)' : 'transparent',
                      color: activeCategory === cat ? '#000' : 'var(--text-secondary)',
                      border: `1px solid ₹{activeCategory === cat ? 'var(--accent-text)' : 'var(--border-color)'}`
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div style={{ display: 'flex', background: 'var(--card-bg)', borderRadius: '999px', border: '1px solid var(--border-color)', padding: '4px' }}>
                <button onClick={() => setViewMode('List')} style={{ padding: '6px 12px', borderRadius: '999px', border: 'none', background: viewMode === 'List' ? 'var(--bg-subtle)' : 'transparent', color: viewMode === 'List' ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500 }}>
                  <List size={16} /> List
                </button>
                <button onClick={() => setViewMode('Map')} style={{ padding: '6px 12px', borderRadius: '999px', border: 'none', background: viewMode === 'Map' ? 'var(--bg-subtle)' : 'transparent', color: viewMode === 'Map' ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500 }}>
                  <Map size={16} /> Map
                </button>
              </div>
            </motion.div>

            {viewMode === 'List' ? (
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {filteredEvents.map(evt => {
                  const Icon = evt.icon;
                  return (
                  <motion.div 
                    key={evt.id} 
                    variants={itemVariants} 
                    className="glass-panel" 
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', background: 'var(--card-bg)', overflow: 'hidden' }}
                    onClick={() => { setSelectedEvent(evt); setCheckoutStep(null); }}
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  >
                    <div style={{ height: '80px', background: evt.banner, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                         {evt.countdown && (
                           <span className="badge badge-yellow" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{evt.countdown}</span>
                         )}
                         <span className={`badge ₹{evt.tag === 'Selling Fast' ? 'badge-red' : 'badge-yellow'}`} style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                           {evt.tag}
                         </span>
                      </div>
                      <div style={{ position: 'absolute', bottom: '-20px', left: '24px', width: '48px', height: '48px', borderRadius: '12px', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', color: 'var(--text-primary)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <Icon size={24} />
                      </div>
                      
                      <button onClick={(e) => toggleSave(e, evt.id)} style={{ position: 'absolute', bottom: '-16px', right: '24px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: savedEvents.includes(evt.id) ? 'var(--accent-text)' : 'var(--text-tertiary)', zIndex: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        {savedEvents.includes(evt.id) ? <BookmarkCheck size={18} fill="var(--accent-light)" /> : <Bookmark size={18} />}
                      </button>
                    </div>

                    <div style={{ padding: '32px 24px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ color: 'var(--accent-text)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{evt.category}</p>
                      <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '16px' }}>{evt.title}</h3>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CalendarIcon size={16} /> {evt.date} • {evt.time}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> {evt.location}</div>
                      </div>
                      
                      <div className="flex-between" style={{ paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{evt.price === 0 ? 'Free' : `₹${evt.price}`}</span>
                        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>Book Now</button>
                      </div>
                    </div>
                  </motion.div>
                )})}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', height: '500px', background: 'rgba(0,0,0,0.02)', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-secondary)' }}>
                <Map size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                <p>Map view requires Google Maps integration.</p>
                <p style={{ fontSize: '13px' }}>Stylized pins and popovers would appear here.</p>
              </motion.div>
            )}
          </motion.main>
        )}

        {selectedEvent && (
          <motion.main key="event-detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container" style={{ marginTop: '40px', position: 'relative' }}>
            <button className="btn btn-ghost" onClick={() => { setSelectedEvent(null); setCheckoutStep(null); setSelectedSeats([]); }} style={{ marginBottom: '24px' }}>← Back to Discover</button>
            
            {checkoutStep && (
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>1. Select Tickets</span>
                   <div style={{ width: '40px', height: '2px', background: checkoutStep === 'payment' || checkoutStep === 'confirmation' ? 'var(--text-primary)' : 'var(--border-color)' }} />
                   <span style={{ color: checkoutStep === 'payment' || checkoutStep === 'confirmation' ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: 600 }}>2. Payment</span>
                   <div style={{ width: '40px', height: '2px', background: checkoutStep === 'confirmation' ? 'var(--text-primary)' : 'var(--border-color)' }} />
                   <span style={{ color: checkoutStep === 'confirmation' ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: 600 }}>3. Confirmation</span>
                 </div>
               </div>
            )}

            {!checkoutStep && (
            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ flex: 2 }}>
                <div className="glass-panel" style={{ padding: '40px', marginBottom: '24px', background: 'var(--card-bg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '1px solid #FDE047', color: 'var(--text-primary)' }}>
                      <selectedEvent.icon size={40} />
                    </div>
                    <div>
                      <p style={{ color: 'var(--accent-text)', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{selectedEvent.category}</p>
                      <h1 className="font-serif" style={{ fontSize: '48px', color: 'var(--text-primary)' }}>{selectedEvent.title}</h1>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-subtle)', padding: '16px', borderRadius: '16px', flex: 1 }}>
                      <CalendarIcon size={24} color="var(--accent-text)" />
                      <div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase' }}>Date & Time</div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedEvent.date}, {selectedEvent.time}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-subtle)', padding: '16px', borderRadius: '16px', flex: 1 }}>
                      <MapPin size={24} color="#EF4444" />
                      <div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase' }}>Location</div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedEvent.location}</div>
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>About this event</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
                    Join us for an unforgettable experience at {selectedEvent.title}. Discover amazing performances, meet incredible people, and secure your spot easily. No ads, just pure event discovery.
                  </p>
                  
                  <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Plan with Friends</h3>
                  <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-subtle)', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                         <div style={{ display: 'flex' }}>
                           {['Rahul', 'Priya', 'Amit'].map((name, i) => (
                             <div key={name} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--card-bg)', border: '2px solid var(--accent-text)', marginLeft: i > 0 ? '-10px' : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{name[0]}</div>
                           ))}
                         </div>
                         <span style={{ fontWeight: 600 }}>3 friends going</span>
                       </div>
                       <button className="btn btn-primary" onClick={() => setShowInviteModal(true)} style={{ padding: '6px 12px', fontSize: '12px' }}><Share2 size={14}/> Invite</button>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                       <div style={{ flex: 1, background: 'var(--card-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                         <div style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12}/> Meetup Point</div>
                         <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '16px' }}>Gate 2 · 7:30 PM</div>
                         <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>Automatically visible to squad</div>
                       </div>
                       <div style={{ flex: 1.5, background: 'var(--card-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                         <div style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={12}/> Event Squad Chat</div>
                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                           <div style={{ display: 'flex', gap: '8px' }}>
                             <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>R</div>
                             <div style={{ background: 'var(--bg-subtle)', padding: '8px 12px', borderRadius: '0 12px 12px 12px', fontSize: '13px' }}>I got the VIP tickets!</div>
                           </div>
                           <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end', flexDirection: 'row-reverse' }}>
                             <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-text)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>Y</div>
                             <div style={{ background: 'var(--accent-text)', color: '#000', padding: '8px 12px', borderRadius: '12px 0 12px 12px', fontSize: '13px' }}>Awesome, see you at Gate 2!</div>
                           </div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div className="glass-panel" style={{ padding: '32px', position: 'sticky', top: '100px', background: 'var(--card-bg)' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#D1FAE5', color: '#065F46', padding: '8px 12px', borderRadius: '8px', marginBottom: '24px', fontSize: '12px', fontWeight: 600 }} title="Verified directly via Organizer CRM to prevent resale fraud.">
                     <QrCode size={16} /> Verified Ticket · No Resale Scams
                  </div>

                  <h3 style={{ fontSize: '24px', marginBottom: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '16px' }}>Book Tickets</h3>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', color: 'var(--text-secondary)' }}>
                    <span>Base Price</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '24px' }}>{selectedEvent.price === 0 ? 'Free' : `₹${selectedEvent.price}`}</span>
                  </div>

                  <button onClick={() => setCheckoutStep('seats')} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', display: 'flex', justifyContent: 'center' }}>
                    Select Seats <ArrowUpRight size={20} />
                  </button>
                </div>
              </div>
            </div>
            )}

            {checkoutStep === 'seats' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel" style={{ padding: '40px', background: 'var(--card-bg)', marginBottom: '100px' }}>
                 <div className="flex-between" style={{ marginBottom: '32px' }}>
                   <h2 style={{ fontSize: '28px' }}>Select your seats</h2>
                   <div style={{ display: 'flex', gap: '16px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)' }}></div> General (₹{selectedEvent.price})</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#FEF3C7', border: '1px solid #FDE047' }}></div> VIP (₹{selectedEvent.price + 2000})</div>
                   </div>
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.02)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                   <div style={{ width: '300px', height: '40px', background: 'var(--border-color)', borderRadius: '0 0 100px 100px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em' }}>STAGE</div>
                   
                   {[...Array(6)].map((_, rowIdx) => (
                     <div key={rowIdx} style={{ display: 'flex', gap: '8px' }}>
                       {[...Array(12)].map((_, colIdx) => {
                         const seatId = `R${rowIdx+1}-S${colIdx+1}`;
                         const isVIP = rowIdx < 2;
                         const isSelected = selectedSeats.includes(seatId);
                         return (
                           <motion.div 
                             key={seatId}
                             whileHover={{ scale: 1.2, zIndex: 10 }}
                             whileTap={{ scale: 0.9 }}
                             onClick={() => handleSeatClick(seatId)}
                             title={`${seatId} - ₹{isVIP ? 'VIP' : 'General'} - ₹${isVIP ? selectedEvent.price + 2000 : selectedEvent.price}`}
                             style={{ 
                               width: '24px', height: '24px', borderRadius: '6px', cursor: 'pointer',
                               background: isSelected ? 'var(--text-primary)' : (isVIP ? '#FEF3C7' : 'var(--bg-subtle)'),
                               border: `1px solid ₹{isSelected ? 'var(--text-primary)' : (isVIP ? '#FDE047' : 'var(--border-color)')}`,
                               boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                             }}
                           />
                         )
                       })}
                     </div>
                   ))}
                 </div>

                 <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', background: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', padding: '20px 40px', zIndex: 50, boxShadow: '0 -10px 40px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
                     <div>
                       <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>{selectedSeats.length} Seats Selected</p>
                       <p style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 600 }}>₹{totalPrice}</p>
                     </div>
                     <button className="btn btn-primary" disabled={selectedSeats.length === 0} onClick={() => setCheckoutStep('payment')} style={{ padding: '16px 32px', fontSize: '16px', opacity: selectedSeats.length === 0 ? 0.5 : 1 }}>
                       Continue to Payment <ArrowUpRight size={18} />
                     </button>
                   </div>
                 </div>
              </motion.div>
            )}

            {checkoutStep === 'payment' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                   <div className="glass-panel" style={{ padding: '32px', background: 'var(--card-bg)' }}>
                     <div className="flex-between" style={{ marginBottom: '24px' }}>
                       <div>
                         <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>Split with friends</h3>
                         <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Easily split the ₹{totalPrice} bill right now.</p>
                       </div>
                       <button className="btn" onClick={() => setSplitPayment(!splitPayment)} style={{ background: splitPayment ? 'var(--accent-text)' : 'var(--bg-subtle)', color: splitPayment ? '#000' : 'var(--text-primary)' }}>
                         {splitPayment ? 'Splitting' : 'Enable Split'}
                       </button>
                     </div>

                     {splitPayment && (
                       <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                              <span style={{ fontWeight: 500 }}>Rahul</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <input type="text" className="search-input" value={`₹${(totalPrice/2).toFixed(2)}`} style={{ width: '80px', padding: '8px', textAlign: 'center' }} readOnly />
                              <button className="btn btn-ghost" style={{ border: '1px solid var(--border-color)', fontSize: '12px' }}>Send Request</button>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                              <span style={{ fontWeight: 500 }}>You</span>
                            </div>
                            <span style={{ fontWeight: 600, paddingRight: '12px' }}>₹{(totalPrice/2).toFixed(2)}</span>
                          </div>
                       </motion.div>
                     )}
                   </div>

                   <div className="glass-panel" style={{ padding: '32px', background: 'var(--card-bg)' }}>
                     <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Payment Method</h3>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                       <div style={{ border: '2px solid var(--accent-text)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', background: '#FEF3C7' }}>
                         <CreditCard size={24} color="#92400E" />
                         <span style={{ fontWeight: 600, color: '#92400E' }}>Credit/Debit Card</span>
                       </div>
                       <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                         <Smartphone size={24} color="var(--text-secondary)" />
                         <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>UPI / Wallet</span>
                       </div>
                     </div>
                     <div style={{ marginTop: '24px' }}>
                       <input type="text" className="search-input" placeholder="Card Number" style={{ width: '100%', marginBottom: '16px', borderRadius: '8px' }} />
                       <div style={{ display: 'flex', gap: '16px' }}>
                         <input type="text" className="search-input" placeholder="MM/YY" style={{ width: '100%', borderRadius: '8px' }} />
                         <input type="text" className="search-input" placeholder="CVC" style={{ width: '100%', borderRadius: '8px' }} />
                       </div>
                     </div>
                   </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div className="glass-panel" style={{ padding: '32px', position: 'sticky', top: '100px', background: 'var(--card-bg)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '16px' }}>Order Summary</h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      <span>Seats ({selectedSeats.length})</span>
                      <span>₹{selectedSeats.length * selectedEvent.price}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                      <span>Processing Fee</span>
                      <span>₹2.00</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                      <span style={{ fontWeight: 600 }}>Total</span>
                      <span style={{ fontSize: '24px', fontWeight: 700 }}>₹{totalPrice}</span>
                    </div>

                    <button onClick={async () => {
                      try {
                        await fetch('http://localhost:3001/api/tickets', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            eventId: selectedEvent.id,
                            eventTitle: selectedEvent.title,
                            eventCategory: selectedEvent.category,
                            eventDate: selectedEvent.date,
                            eventTime: selectedEvent.time,
                            eventLocation: selectedEvent.location,
                            seats: selectedSeats,
                            totalPrice: totalPrice
                          })
                        });
                        setCheckoutStep('confirmation');
                      } catch (e) {
                        console.error(e);
                        setCheckoutStep('confirmation');
                      }
                    }} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                      Pay ₹{splitPayment ? (totalPrice/2).toFixed(2) : totalPrice} securely
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '11px' }}>
                      <Lock size={12} /> 256-bit encrypted checkout
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {checkoutStep === 'confirmation' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel" style={{ padding: '80px 40px', background: 'var(--card-bg)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                  style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#D1FAE5', border: '4px solid #34D399', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', color: '#065F46' }}
                >
                  <Check size={40} strokeWidth={3} />
                </motion.div>
                
                <h2 className="font-serif" style={{ fontSize: '32px', marginBottom: '8px' }}>Booking Confirmed!</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '40px' }}>Your seats for <strong>{selectedEvent.title}</strong> are secured. An email receipt has been sent to you.</p>
                
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button className="btn btn-ghost" onClick={() => { setCheckoutStep(null); setSelectedEvent(null); setSelectedSeats([]); }} style={{ border: '1px solid var(--border-color)' }}>Back to Discover</button>
                  <button className="btn btn-primary" onClick={() => { setActiveTab('My Tickets'); setCheckoutStep(null); setSelectedEvent(null); setSelectedSeats([]); }}>View in My Tickets</button>
                </div>
              </motion.div>
            )}
          </motion.main>
        )}

        {/* Phase 3: Friends Page */}
        {activeTab === 'Friends' && (
           <motion.main key="friends" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container" style={{ marginTop: '40px', flex: 1 }}>
             <h1 className="font-serif" style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '32px' }}>YOUR <span style={{ color: 'var(--accent-text)' }}>SQUAD.</span></h1>
             
             <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Your Squad</h3>
             <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '40px' }}>
               <button onClick={() => setShowAddFriendModal(true)} className="btn btn-ghost flex-center" style={{ minWidth: '64px', height: '64px', borderRadius: '50%', border: '1px dashed var(--border-color)', flexDirection: 'column', gap: '4px' }}>
                 <UserPlus size={20} />
               </button>
               {['Rahul', 'Priya', 'Amit', 'Neha', 'Vikram'].map(name => (
                 <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                   <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FEF3C7', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 600 }}>{name[0]}</div>
                   <span style={{ fontSize: '13px', fontWeight: 500 }}>{name}</span>
                 </div>
               ))}
             </div>

             <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Group Plans</h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
               <div className="glass-panel" style={{ padding: '24px', background: 'var(--card-bg)' }}>
                 <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                   <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#92400E' }}><Music size={24}/></div>
                   <div>
                     <h4 style={{ fontSize: '18px', fontWeight: 600 }}>Oblivion Neon Night</h4>
                     <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Nov 12 · Main Arena</p>
                   </div>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-subtle)', borderRadius: '12px' }}>
                   <div style={{ display: 'flex' }}>
                     {['R', 'P', 'A'].map((initial, i) => (
                       <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--card-bg)', border: '2px solid var(--border-color)', marginLeft: i > 0 ? '-8px' : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{initial}</div>
                     ))}
                   </div>
                   <span style={{ fontSize: '13px', fontWeight: 600 }}>3 friends going</span>
                 </div>
               </div>
             </div>
           </motion.main>
        )}

        
        {/* Phase 5.5: Calendar View */}
        {activeTab === 'Calendar' && (
           <motion.main key="calendar" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container" style={{ marginTop: '40px', flex: 1, paddingBottom: '80px' }}>
             <div className="flex-between" style={{ marginBottom: '32px' }}>
               <h1 className="font-serif" style={{ fontSize: '48px', color: 'var(--text-primary)' }}>YOUR <span style={{ color: 'var(--accent-text)' }}>CALENDAR.</span></h1>
               <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                 <button className="btn btn-ghost" style={{ border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px', padding: '6px 16px' }}>Today</button>
                 <div style={{ display: 'flex', gap: '16px', fontSize: '16px', fontWeight: 600, alignItems: 'center' }}>
                   <span style={{ cursor: 'pointer' }}>&lt;</span> <span style={{ width: '130px', textAlign: 'center' }}>November 2026</span> <span style={{ cursor: 'pointer' }}>&gt;</span>
                 </div>
                 <div style={{ display: 'flex', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                   <button style={{ padding: '6px 16px', background: 'var(--text-primary)', color: 'var(--card-bg)', border: 'none', fontWeight: 600, fontSize: '13px' }}>Month</button>
                   <button style={{ padding: '6px 16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '13px' }}>Week</button>
                 </div>
               </div>
             </div>

             <div className="glass-panel" style={{ background: 'var(--card-bg)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
               {/* Header */}
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-subtle)' }}>
                 {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                   <div key={day} style={{ padding: '12px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'left' }}>{day}</div>
                 ))}
               </div>
               {/* Grid */}
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: '120px' }}>
                 {[...Array(30)].map((_, i) => {
                   const date = i + 1;
                   const dateStr = `Nov ${date < 10 ? '0' + date : date}, 2026`; // Assuming format Nov 12, 2026
                   const simpleDateStr = `Nov ${date}, 2026`;
                   
                   // Find tickets and saved events for this date
                   const ticketsOnDay = myTickets.filter(t => t.eventDate === simpleDateStr || t.eventDate === dateStr);
                   const savedOnDay = mockEvents.filter(e => savedEvents.includes(e.id) && (e.date === simpleDateStr || e.date === dateStr));

                   return (
                     <div key={date} style={{ padding: '8px', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '4px', background: 'var(--card-bg)' }}>
                       <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px' }}>{date}</span>
                       {ticketsOnDay.map(t => (
                         <div key={t.id} style={{ background: '#10B981', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxShadow: '0 2px 4px rgba(16,185,129,0.2)' }}>
                           {t.eventTime} {t.eventTitle}
                         </div>
                       ))}
                       {savedOnDay.map(e => (
                         <div key={e.id} style={{ background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                           ⭐ {e.title}
                         </div>
                       ))}
                     </div>
                   );
                 })}
                 {/* Fill remainder of the grid (35 cells total for a 5-week block) */}
                 {[...Array(5)].map((_, i) => (
                   <div key={`empty-${i}`} style={{ padding: '8px', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-subtle)', opacity: 0.5 }}>
                     <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-tertiary)' }}>{i + 1}</span>
                   </div>
                 ))}
               </div>
             </div>
           </motion.main>
        )}

        {/* Saved Events */}
        {activeTab === 'Saved Events' && (
           <motion.main key="saved" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container" style={{ marginTop: '40px', flex: 1 }}>
             <h1 className="font-serif" style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '32px' }}>SAVED <span style={{ color: 'var(--accent-text)' }}>EVENTS.</span></h1>
             {savedEvents.length === 0 ? (
               <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: 'var(--card-bg)' }}>
                 <Bookmark size={48} color="var(--text-secondary)" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                 <h3 style={{ fontSize: '24px', color: 'var(--text-secondary)' }}>No saved events</h3>
                 <p style={{ color: 'var(--text-tertiary)', marginTop: '8px', marginBottom: '24px' }}>Events you bookmark will appear here.</p>
                 <button className="btn btn-primary" onClick={() => setActiveTab('Discover')}>Discover Events</button>
               </div>
             ) : (
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                 {mockEvents.filter(e => savedEvents.includes(e.id)).map(evt => (
                   <div key={evt.id} className="glass-panel" style={{ padding: '24px', background: 'var(--card-bg)' }}>
                     <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{evt.title}</h3>
                     <button className="btn btn-primary" onClick={() => { setSelectedEvent(evt); setActiveTab('Discover'); }}>View Details</button>
                   </div>
                 ))}
               </div>
             )}
           </motion.main>
        )}

        {/* Phase 4: My Tickets (Populated Ticket Card) */}
        {activeTab === 'My Tickets' && (
           <motion.main key="tickets" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container" style={{ marginTop: '40px', flex: 1, paddingBottom: '80px' }}>
             <h1 className="font-serif" style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '32px' }}>MY <span style={{ color: 'var(--accent-text)' }}>TICKETS.</span></h1>
             
             {myTickets.length === 0 ? (
               <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: 'var(--card-bg)' }}>
                 <Ticket size={48} color="var(--text-secondary)" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                 <h3 style={{ fontSize: '24px', color: 'var(--text-secondary)' }}>No active tickets</h3>
                 <p style={{ color: 'var(--text-tertiary)', marginTop: '8px', marginBottom: '24px' }}>Explore events and book your first secure ticket.</p>
                 <button className="btn btn-primary" onClick={() => setActiveTab('Discover')}>Discover Events</button>
               </div>
             ) : (
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                 {myTickets.map(ticket => {
                    const eventData = mockEvents.find(e => e.id === ticket.eventId) || mockEvents[0];
                    return (
                       <motion.div 
                         key={ticket.id}
                         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
                         style={{ 
                           width: '100%', 
                           background: 'var(--card-bg)', borderRadius: '24px', 
                           overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                           position: 'relative'
                         }}
                       >
                         {/* Green Verified Ribbon */}
                         <div style={{ position: 'absolute', top: '20px', right: '-30px', background: '#34D399', color: '#065F46', fontSize: '10px', fontWeight: 700, padding: '4px 30px', transform: 'rotate(45deg)', zIndex: 10, letterSpacing: '0.1em' }}>
                           VERIFIED
                         </div>

                         {/* Ticket Header Image */}
                         <div style={{ height: '120px', background: eventData.banner, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                           <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                             {React.createElement(eventData.icon, { size: 32, color: "var(--text-primary)" })}
                           </div>
                         </div>

                         {/* Ticket Info */}
                         <div style={{ padding: '32px 24px', borderBottom: '2px dashed var(--border-color)', position: 'relative' }}>
                           {/* Cutout notches */}
                           <div style={{ position: 'absolute', bottom: '-12px', left: '-12px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-gradient)', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)' }}></div>
                           <div style={{ position: 'absolute', bottom: '-12px', right: '-12px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-gradient)', boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.05)' }}></div>
                           
                           <p style={{ color: 'var(--accent-text)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', textAlign: 'center' }}>{ticket.eventCategory}</p>
                           <h2 className="font-serif" style={{ fontSize: '28px', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '16px' }}>{ticket.eventTitle}</h2>
                           
                           <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                             {ticket.seats.length} Seats • ₹{ticket.totalPrice}
                           </p>

                           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                             <div>
                               <p style={{ color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Date</p>
                               <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ticket.eventDate}</p>
                             </div>
                             <div>
                               <p style={{ color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Time</p>
                               <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ticket.eventTime}</p>
                             </div>
                             <div style={{ gridColumn: 'span 2' }}>
                               <p style={{ color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Venue</p>
                               <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ticket.eventLocation}</p>
                             </div>
                           </div>
                         </div>

                         {/* QR & Actions */}
                         <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                           <div style={{ padding: '16px', background: 'white', borderRadius: '16px', marginBottom: '24px', border: '1px solid #E5E7EB' }}>
                             <QrCode size={120} color="#000" strokeWidth={1} />
                           </div>
                           
                           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', marginBottom: '12px' }}>
                             <button className="btn btn-ghost flex-center" style={{ border: '1px solid var(--border-color)', fontSize: '12px', padding: '10px' }}>
                               <Wallet size={16} /> Add to Wallet
                             </button>
                             <button className="btn btn-ghost flex-center" style={{ border: '1px solid var(--border-color)', fontSize: '12px', padding: '10px' }}>
                               <CalendarPlus size={16} /> Add to Calendar
                             </button>
                           </div>
                           
                           <button onClick={() => setShowShareModal(true)} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px', fontSize: '14px' }}>
                             <Share size={16} /> Share with friend
                           </button>
                         </div>
                       </motion.div>
                    )
                 })}
               </div>
             )}
           </motion.main>
        )}

      </AnimatePresence>

      {/* Phase 3: Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '24px', width: '400px', maxWidth: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
               <div className="flex-between" style={{ marginBottom: '24px' }}>
                 <h3 style={{ fontSize: '20px' }}>Invite to Event</h3>
                 <button className="btn btn-ghost btn-icon" onClick={() => setShowInviteModal(false)}><X size={20}/></button>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {['Rahul', 'Priya', 'Amit', 'Neha'].map(name => (
                   <div key={name} className="flex-between">
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{name[0]}</div>
                       <span style={{ fontWeight: 500 }}>{name}</span>
                     </div>
                     <button className="btn btn-ghost" style={{ border: '1px solid var(--border-color)', fontSize: '12px', padding: '6px 12px' }}>Send Invite</button>
                   </div>
                 ))}
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Phase 4: Share Ticket Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '24px', width: '400px', maxWidth: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
               <div className="flex-between" style={{ marginBottom: '24px' }}>
                 <h3 style={{ fontSize: '20px' }}>Transfer Ticket Access</h3>
                 <button className="btn btn-ghost btn-icon" onClick={() => setShowShareModal(false)}><X size={20}/></button>
               </div>
               <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.5 }}>
                 Securely transfer or duplicate your ticket for a friend. This revokes screenshots and guarantees authentic access.
               </p>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {['Rahul', 'Priya', 'Amit'].map(name => (
                   <div key={name} className="flex-between">
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FEF3C7', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{name[0]}</div>
                       <span style={{ fontWeight: 500 }}>{name}</span>
                     </div>
                     <button className="btn btn-ghost" onClick={() => { alert('Ticket transferred successfully to ' + name + '!'); setShowShareModal(false); }} style={{ border: '1px solid var(--border-color)', fontSize: '12px', padding: '6px 12px' }}>Transfer</button>
                   </div>
                 ))}
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Add Friend Modal */}
      <AnimatePresence>
        {showAddFriendModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '24px', width: '400px', maxWidth: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
               <div className="flex-between" style={{ marginBottom: '24px' }}>
                 <h3 style={{ fontSize: '20px' }}>Add a Friend</h3>
                 <button className="btn btn-ghost btn-icon" onClick={() => setShowAddFriendModal(false)}><X size={20}/></button>
               </div>
               <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                 Enter your friend's Eventra username or email to add them to your squad.
               </p>
               <input 
                 type="text" 
                 className="search-input" 
                 placeholder="Username or email" 
                 value={newFriendName}
                 onChange={(e) => setNewFriendName(e.target.value)}
                 style={{ width: '100%', marginBottom: '24px', borderRadius: '8px' }} 
               />
               <button 
                 className="btn btn-primary" 
                 onClick={() => {
                   if(newFriendName) {
                     alert('Friend request sent to ' + newFriendName + '!');
                     setShowAddFriendModal(false);
                     setNewFriendName('');
                   }
                 }} 
                 style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px' }}
               >
                 Send Request
               </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
