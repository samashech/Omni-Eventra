import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, Moon, Plus, 
  Calendar as CalendarIcon, Users, ChevronRight,
  TrendingUp, Star, CalendarDays,
  MessageSquare, AlertCircle, Clock, MapPin, ArrowUpRight, Sparkles,
  Cpu, Lightbulb, Zap, PartyPopper
} from 'lucide-react';
import OnboardingQuiz from './OnboardingQuiz';
import ClubProfile from './ClubProfile';
import ClubLeaderView from './ClubLeaderView';
import SearchModal from './SearchModal';

const stats = [
  { label: 'SUBSCRIBED CLUBS', value: '12', subtext: '3 new this week' },
  { label: 'UPCOMING EVENTS', value: '4', subtext: 'Next one in 2 days', highlight: true },
  { label: 'UNREAD ANNOUNCEMENTS', value: '7', subtext: 'From 3 clubs' },
  { label: 'TOTAL RSVPS', value: '18', subtext: 'All time' },
];

const feed = [
  { id: 1, type: 'Event', title: 'Intro to NodeMCU & IoT', club: 'RAIoT', date: 'Oct 24, 2026', status: 'RSVP Open', badge: 'badge-yellow' },
  { id: 2, type: 'Announcement', title: 'Incubation Cohort Applications', club: 'E-Cell', date: 'Oct 25, 2026', status: 'Deadline', badge: 'badge-red' },
  { id: 3, type: 'Event', title: 'Fest Headliner Announcement', club: 'Cultural Fest Committee', date: 'Oct 28, 2026', status: 'Upcoming', badge: 'badge-green' },
];

const calendarEvents = [
  { id: 101, title: 'Intro to NodeMCU', club: 'RAIoT', date: 24, time: '14:00 - 16:00', type: 'tech' },
  { id: 102, title: 'Startup Pitch Deck', club: 'E-Cell', date: 24, time: '15:00 - 17:00', type: 'business', conflict: true },
  { id: 103, title: 'IEEE Research Meet', club: 'IEEE', date: 26, time: '10:00 - 12:00', type: 'tech' },
  { id: 104, title: 'Concert Setup', club: 'Cultural Fest', date: 28, time: '18:00 - 20:00', type: 'culture' },
];

const fallbackClubs = [
  { id: 1, name: 'RAIoT', category: 'Technology', followers: 840, icon: <Cpu size={24}/>, color: '#CFFAFE', textColor: '#0891B2', desc: 'IoT based robotics club focused on autonomous machines and hardware innovation.' },
  { id: 2, name: 'E-Cell', category: 'Business', followers: 1200, icon: <Lightbulb size={24}/>, color: '#FEF3C7', textColor: '#92400E', desc: 'Innovation incubation center for student founders and breakthrough startup ideas.' },
  { id: 3, name: 'IEEE Student Branch', category: 'Technology', followers: 650, icon: <Zap size={24}/>, color: '#E0E7FF', textColor: '#3730A3', desc: 'Advancing technology for humanity through hardware, software, and research.' },
  { id: 4, name: 'Cultural Fest Committee', category: 'Culture', followers: 1890, icon: <PartyPopper size={24}/>, color: '#FCE7F3', textColor: '#9D174D', desc: "Managing the university's biggest cultural fests, concerts, and celebrity events." }
];

const iconMap = {
  'Cpu': <Cpu size={24}/>,
  'Lightbulb': <Lightbulb size={24}/>,
  'Zap': <Zap size={24}/>,
  'PartyPopper': <PartyPopper size={24}/>
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

export default function Dashboard({ onSignOut }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [clubCategory, setClubCategory] = useState('All');
  const [showQuiz, setShowQuiz] = useState(true);
  const [activeClub, setActiveClub] = useState(null);
  const [isLeaderView, setIsLeaderView] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  
  const [allClubs, setAllClubs] = useState(fallbackClubs);

  useEffect(() => {
    async function fetchLiveClubs() {
      const { data, error } = await supabase.from('clubs').select('*');
      if (data && data.length > 0) {
        setAllClubs(data.map(c => ({
          id: c.id,
          name: c.name,
          category: c.category,
          followers: c.followers,
          icon: iconMap[c.icon] || <Zap size={24}/>,
          color: c.color,
          textColor: c.text_color,
          desc: c.description
        })));
      }
    }
    fetchLiveClubs();
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (activeClub && isLeaderView) {
    return <ClubLeaderView club={activeClub} onBack={() => setIsLeaderView(false)} />;
  }

  if (activeClub) {
    return <ClubProfile club={activeClub} onBack={() => setActiveClub(null)} onLeaderView={() => setIsLeaderView(true)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {showQuiz && (
        <OnboardingQuiz onComplete={() => setShowQuiz(false)} allClubs={allClubs} />
      )}
      
      <AnimatePresence>
        {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav style={{ padding: '20px 0' }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <h2 style={{ margin: 0, letterSpacing: '-0.05em', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#F59E0B' }}>●</span> CAMPUS<span style={{ fontWeight: 400 }}>hub</span>
            </h2>
            
            <div className="glass-panel flex-center" style={{ padding: '4px 8px', borderRadius: '999px', gap: '4px' }}>
              {['Dashboard', 'Clubs', 'Calendar', 'Analytics'].map(tab => (
                <button 
                  key={tab}
                  className={`btn ${activeTab === tab ? 'btn-ghost' : 'btn-ghost'}`}
                  style={{ 
                    background: activeTab === tab ? 'rgba(255,255,255,0.7)' : 'transparent',
                    color: activeTab === tab ? '#111827' : '#6B7280',
                    boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="search-input-wrapper" onClick={() => setIsSearchOpen(true)} style={{ cursor: 'pointer' }}>
              <Search className="search-icon" size={16} />
              <div className="search-input" style={{ width: '200px', display: 'flex', alignItems: 'center', color: '#9CA3AF' }}>Search clubs, events...</div>
              <span className="cmd-k">⌘K</span>
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowQuiz(true)} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="#EAB308" /> For You
            </motion.button>

            <div style={{ position: 'relative' }}>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowNotifs(!showNotifs)} className="btn btn-ghost btn-icon" style={{ position: 'relative' }}>
                <Bell size={20} />
                <span style={{ position: 'absolute', top: '6px', right: '8px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}></span>
              </motion.button>

              <AnimatePresence>
                {showNotifs && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} style={{ position: 'absolute', top: '100%', right: 0, width: '320px', background: 'white', borderRadius: '16px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)', border: '1px solid #E5E7EB', zIndex: 100, overflow: 'hidden', marginTop: '8px' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6', fontWeight: 600, fontSize: '14px' }}>Notifications</div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }} className="hover-bg">
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>Event Reminder</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>Tech & Code's Web3 Workshop starts in 2 hours!</div>
                        <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px' }}>2 hrs ago</div>
                      </div>
                      <div style={{ padding: '16px', cursor: 'pointer' }} className="hover-bg">
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>New Announcement</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>Debating Society just posted a new update.</div>
                        <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px' }}>1 day ago</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div whileTap={{ scale: 0.95 }} onClick={onSignOut} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#111827', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
              JD
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {activeTab === 'Dashboard' && (
          <motion.main key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container" style={{ marginTop: '24px', flex: 1 }}>
            
            <motion.div variants={itemVariants} initial="hidden" animate="show" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h1 style={{ fontSize: '36px', marginBottom: '8px', color: '#111827' }}>Freshers' week, 2026</h1>
                <p style={{ color: '#6B7280', fontSize: '15px' }}>12 clubs you follow · 4 events this week</p>
              </div>
              <button className="btn btn-primary"><Plus size={18} /> Post event</button>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {stats.map((stat, i) => (
                <motion.div variants={itemVariants} key={i} className="glass-panel" style={{ padding: '24px', background: stat.highlight ? '#FEF3C7' : undefined, borderColor: stat.highlight ? '#FDE68A' : undefined }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.05em', marginBottom: '16px' }}>{stat.label}</p>
                  <h2 style={{ fontSize: '32px', color: '#111827', marginBottom: '8px' }}>{stat.value}</h2>
                  <p style={{ fontSize: '13px', color: '#6B7280' }}>{stat.subtext}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '32px' }}>
              <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '24px' }}>
                <div className="flex-between" style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', color: '#111827' }}>Upcoming from your clubs</h3>
                  <span style={{ fontSize: '13px', color: '#6B7280' }}>this week</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { title: 'Intro to NodeMCU', club: 'RAIoT', time: 'Thu · 6pm', icon: <Cpu size={20}/> },
                    { title: 'Startup Pitch Deck', club: 'E-Cell', time: 'Fri · 4pm', icon: <Lightbulb size={20}/> },
                    { title: 'Concert Setup', club: 'Cultural Fest', time: 'Sat · 8pm', icon: <PartyPopper size={20}/> }
                  ].map((evt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: i === 2 ? 'none' : '1px solid rgba(0,0,0,0.05)' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#374151' }}>
                        {evt.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '15px', color: '#111827', marginBottom: '2px' }}>{evt.title}</h4>
                        <p style={{ fontSize: '13px', color: '#6B7280' }}>{evt.club}</p>
                      </div>
                      <span className="badge badge-yellow">{evt.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', color: '#111827' }}>Recommended for you</h3>
                  <p style={{ fontSize: '13px', color: '#6B7280' }}>based on your interests</p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { title: 'IEEE Student Branch', tag: 'Technology · 650 followers', icon: <Zap size={20}/> },
                    { title: 'RAIoT', tag: 'Technology · 840 followers', icon: <Cpu size={20}/> },
                    { title: 'Cultural Fest Committee', tag: 'Culture · 1.8k followers', icon: <PartyPopper size={20}/> }
                  ].map((club, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FDF4E3', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                        {club.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', color: '#111827', marginBottom: '2px' }}>{club.title}</h4>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>{club.tag}</p>
                      </div>
                      <button className="btn" style={{ padding: '6px 12px', fontSize: '12px', border: '1px solid #E5E7EB', background: 'transparent' }}>Follow</button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.main>
        )}

        {activeTab === 'Clubs' && (
          <motion.main key="clubs" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container" style={{ marginTop: '24px', flex: 1 }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h1 style={{ fontSize: '36px', marginBottom: '8px', color: '#111827' }}>Discover Clubs</h1>
                <p style={{ color: '#6B7280', fontSize: '15px' }}>Find your community on campus</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'Technology', 'Arts', 'Business', 'Culture', 'Sports'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setClubCategory(cat)}
                    className="btn" 
                    style={{ 
                      padding: '8px 16px', 
                      background: clubCategory === cat ? '#111827' : 'white', 
                      color: clubCategory === cat ? 'white' : '#6B7280',
                      border: `1px solid ${clubCategory === cat ? '#111827' : '#E5E7EB'}`,
                      borderRadius: '999px',
                      fontSize: '13px'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {allClubs.filter(c => clubCategory === 'All' || c.category === clubCategory).map(club => (
                <motion.div 
                  key={club.id} 
                  variants={itemVariants} 
                  className="glass-panel" 
                  style={{ padding: '24px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => setActiveClub(club)}
                  whileHover={{ y: -5 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: club.color, color: club.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                      {club.icon}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280', background: '#F3F4F6', padding: '4px 10px', borderRadius: '999px' }}>
                      {club.category}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '18px', color: '#111827', marginBottom: '8px' }}>{club.name}</h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5, marginBottom: '24px', flex: 1 }}>{club.desc}</p>
                  
                  <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '13px' }}>
                      <Users size={14} />
                      {club.followers}
                    </div>
                    <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '13px' }}>Follow</button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </motion.main>
        )}

        {activeTab === 'Calendar' && (
           <motion.main key="calendar" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container" style={{ marginTop: '24px', flex: 1 }}>
           
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
             <div>
               <h1 style={{ fontSize: '36px', marginBottom: '8px', color: '#111827' }}>Campus Calendar</h1>
               <p style={{ color: '#6B7280', fontSize: '15px' }}>October 2026 · 1 Schedule Conflict Detected</p>
             </div>
             <div style={{ display: 'flex', gap: '12px' }}>
               <button className="btn btn-ghost" style={{ background: 'white', border: '1px solid #E5E7EB' }}>This Week</button>
               <button className="btn btn-primary"><Plus size={18} /> Add Event</button>
             </div>
           </div>

           <div className="glass-panel" style={{ overflow: 'hidden' }}>
             {/* Calendar Header Row */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.3)' }}>
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                 <div key={day} style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>
                   {day}
                 </div>
               ))}
             </div>
             
             {/* Calendar Grid */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: '120px' }}>
               {[...Array(35)].map((_, i) => {
                 const date = i - 3;
                 const isCurrentMonth = date > 0 && date <= 31;
                 const dayEvents = calendarEvents.filter(e => e.date === date);
                 const hasConflict = dayEvents.length > 1;

                 return (
                   <div key={i} style={{ 
                     padding: '8px', 
                     borderRight: '1px solid rgba(0,0,0,0.05)', 
                     borderBottom: '1px solid rgba(0,0,0,0.05)',
                     background: hasConflict ? 'rgba(254, 226, 226, 0.3)' : 'transparent',
                     position: 'relative',
                     opacity: isCurrentMonth ? 1 : 0.4
                   }}>
                     <span style={{ 
                       display: 'inline-block', width: '28px', height: '28px', lineHeight: '28px', 
                       textAlign: 'center', borderRadius: '50%', fontSize: '14px', fontWeight: 500,
                       background: date === 24 ? '#111827' : 'transparent',
                       color: date === 24 ? 'white' : '#374151',
                       marginBottom: '4px'
                     }}>
                       {date > 0 && date <= 31 ? date : (date <= 0 ? 30 + date : date - 31)}
                     </span>

                     <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                       {dayEvents.map(evt => (
                         <motion.div 
                           key={evt.id} 
                           initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                           style={{ 
                             padding: '6px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 500, cursor: 'pointer',
                             background: evt.conflict ? '#FEE2E2' : '#FEF3C7',
                             color: evt.conflict ? '#991B1B' : '#92400E',
                             border: `1px solid ${evt.conflict ? '#FCA5A5' : '#FDE68A'}`,
                             display: 'flex', flexDirection: 'column', gap: '2px'
                           }}
                         >
                           <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{evt.title}</span>
                           <span style={{ fontSize: '10px', opacity: 0.7 }}>{evt.time}</span>
                         </motion.div>
                       ))}
                     </div>

                     {hasConflict && (
                       <div style={{ position: 'absolute', top: '8px', right: '8px', color: '#EF4444' }}>
                         <AlertCircle size={16} />
                       </div>
                     )}
                   </div>
                 );
               })}
             </div>
           </div>
         </motion.main>
        )}

      </AnimatePresence>
    </div>
  );
}
