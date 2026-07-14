import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, Moon, Plus, 
  Calendar as CalendarIcon, Users, ChevronRight,
  TrendingUp, Star, CalendarDays,
  MessageSquare, AlertCircle, Clock, MapPin, ArrowUpRight
} from 'lucide-react';

const stats = [
  { label: 'SUBSCRIBED CLUBS', value: '12', subtext: '3 new this week' },
  { label: 'UPCOMING EVENTS', value: '4', subtext: 'Next one in 2 days', highlight: true },
  { label: 'UNREAD ANNOUNCEMENTS', value: '7', subtext: 'From 3 clubs' },
  { label: 'TOTAL RSVPS', value: '18', subtext: 'All time' },
];

const feed = [
  { id: 1, type: 'Event', title: 'Intro to Web3 & Blockchain', club: 'Tech & Code Society', date: 'Oct 24, 2026', status: 'RSVP Open', badge: 'badge-yellow' },
  { id: 2, type: 'Announcement', title: 'Call for Core Team Members', club: 'Debate Club', date: 'Oct 25, 2026', status: 'Deadline', badge: 'badge-red' },
  { id: 3, type: 'Event', title: 'Annual Photography Walk', club: 'Shutterbugs', date: 'Oct 28, 2026', status: 'Upcoming', badge: 'badge-green' },
];

const calendarEvents = [
  { id: 101, title: 'Web3 & Blockchain', club: 'Tech Club', date: 24, time: '14:00 - 16:00', type: 'tech' },
  { id: 102, title: 'Photography Walk', club: 'Shutterbugs', date: 24, time: '15:00 - 17:00', type: 'art', conflict: true },
  { id: 103, title: 'Startup Pitch', club: 'E-Cell', date: 26, time: '10:00 - 12:00', type: 'business' },
  { id: 104, title: 'Debate Finals', club: 'Debate Club', date: 28, time: '18:00 - 20:00', type: 'culture' },
];

const allClubs = [
  { id: 1, name: 'Tech & Code Society', category: 'Technology', followers: 840, icon: 'T', color: '#DBEAFE', textColor: '#1E40AF', desc: 'Building the future of software, one hackathon at a time.' },
  { id: 2, name: 'Debating Society', category: 'Culture', followers: 420, icon: 'D', color: '#FCE7F3', textColor: '#9D174D', desc: 'Fostering critical thinking and eloquent speech.' },
  { id: 3, name: 'Entrepreneurship Cell', category: 'Business', followers: 1200, icon: 'E', color: '#FEF3C7', textColor: '#92400E', desc: 'Empowering student founders and startup enthusiasts.' },
  { id: 4, name: 'Photography Circle', category: 'Arts', followers: 650, icon: 'P', color: '#E0E7FF', textColor: '#3730A3', desc: 'Capturing campus life through a creative lens.' },
  { id: 5, name: 'Robotics Club', category: 'Technology', followers: 310, icon: 'R', color: '#F3F4F6', textColor: '#374151', desc: 'Designing and programming autonomous machines.' },
  { id: 6, name: 'Film Society', category: 'Arts', followers: 890, icon: 'F', color: '#FFEDD5', textColor: '#9A3412', desc: 'Weekly screenings and discussions of world cinema.' },
  { id: 7, name: 'Mountaineering Club', category: 'Sports', followers: 230, icon: 'M', color: '#D1FAE5', textColor: '#065F46', desc: 'Weekend treks, climbing, and outdoor adventures.' },
  { id: 8, name: 'Finance & Trading', category: 'Business', followers: 580, icon: 'F', color: '#E0F2FE', textColor: '#0369A1', desc: 'Learn investing, equity research, and market analysis.' },
];

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '40px' }}>
      
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
            <div className="search-input-wrapper">
              <Search className="search-icon" size={16} />
              <input type="text" className="search-input" placeholder="Search clubs, events..." />
              <span className="cmd-k">⌘K</span>
            </div>
            
            <button className="btn btn-ghost btn-icon"><Bell size={20} /></button>
            <div onClick={onSignOut} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FDE68A', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '14px', marginLeft: '8px', cursor: 'pointer' }}>
              JD
            </div>
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
                    { title: 'Parliamentary debate night', club: 'Debating Society', time: 'Thu · 6pm', icon: 'D' },
                    { title: 'Line-follower workshop', club: 'Robotics Club', time: 'Fri · 4pm', icon: 'R' },
                    { title: 'Screening: In the Mood for Love', club: 'Film Society', time: 'Sat · 8pm', icon: 'F' }
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
                    { title: 'Photography Circle', tag: 'Arts · 412 followers', icon: 'P' },
                    { title: 'Entrepreneurship Cell', tag: 'Business · 1.2k followers', icon: 'E' },
                    { title: 'Astronomy Society', tag: 'Science · 289 followers', icon: 'A' }
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
                <motion.div key={club.id} variants={itemVariants} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
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
