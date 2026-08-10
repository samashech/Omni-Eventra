const fs = require('fs');
let code = fs.readFileSync('src/Dashboard.jsx', 'utf8');

// 1. Update Navigation Tabs
code = code.replace(
  "{['Discover', 'My Tickets', 'Saved Events', 'Friends'].map(tab => (",
  "{['Discover', 'Calendar', 'My Tickets', 'Saved Events', 'Friends'].map(tab => ("
);
code = code.replace(
  "{tab === 'Discover' && <Sparkles size={16}/>}",
  "{tab === 'Discover' && <Sparkles size={16}/>}\n                  {tab === 'Calendar' && <CalendarIcon size={16}/>}"
);

// 2. Add showAddFriendModal state
code = code.replace(
  "const [showProfileBadges, setShowProfileBadges] = useState(false);",
  "const [showProfileBadges, setShowProfileBadges] = useState(false);\n  const [showAddFriendModal, setShowAddFriendModal] = useState(false);\n  const [newFriendName, setNewFriendName] = useState('');"
);

// 3. Indian Names Replacement
code = code.replace(/\['Alex', 'Sam', 'Jordan', 'Casey', 'Taylor'\]/g, "['Rahul', 'Priya', 'Amit', 'Neha', 'Vikram']");
code = code.replace(/\['Alex', 'Sam', 'Jordan', 'Casey'\]/g, "['Rahul', 'Priya', 'Amit', 'Neha']");
code = code.replace(/\['Alex', 'Sam', 'Jordan'\]/g, "['Rahul', 'Priya', 'Amit']");
code = code.replace(/\['A', 'S', 'J'\]/g, "['R', 'P', 'A']");
code = code.replace(/Alex/g, "Rahul");
code = code.replace(/JD/g, "RD");
code = code.replace(/Jordan Doe/g, "Rahul Desai");
code = code.replace(/jordan@example\.com/g, "rahul@example.com");

// Specific chat initials
code = code.replace(/>A</g, ">R<"); // Avatar for Rahul (was Alex)

// 4. Calendar View
const calendarView = `
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
                   const dateStr = \`Nov \${date < 10 ? '0' + date : date}, 2026\`; // Assuming format Nov 12, 2026
                   const simpleDateStr = \`Nov \${date}, 2026\`;
                   
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
                   <div key={\`empty-\${i}\`} style={{ padding: '8px', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-subtle)', opacity: 0.5 }}>
                     <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-tertiary)' }}>{i + 1}</span>
                   </div>
                 ))}
               </div>
             </div>
           </motion.main>
        )}
`;
code = code.replace("{/* Saved Events */}", calendarView + "\n        {/* Saved Events */}");

// 5. Transfer to Friend Logic
const oldTransferBtn = `<button className="btn btn-ghost" style={{ border: '1px solid var(--border-color)', fontSize: '12px', padding: '6px 12px' }}>Transfer</button>`;
const newTransferBtn = `<button className="btn btn-ghost" onClick={() => { alert('Ticket transferred successfully to ' + name + '!'); setShowShareModal(false); }} style={{ border: '1px solid var(--border-color)', fontSize: '12px', padding: '6px 12px' }}>Transfer</button>`;
code = code.replace(oldTransferBtn, newTransferBtn);

// 6. Add Friend Logic
const oldUserPlusBtn = `<button className="btn btn-ghost flex-center" style={{ minWidth: '64px', height: '64px', borderRadius: '50%', border: '1px dashed var(--border-color)', flexDirection: 'column', gap: '4px' }}>`;
const newUserPlusBtn = `<button onClick={() => setShowAddFriendModal(true)} className="btn btn-ghost flex-center" style={{ minWidth: '64px', height: '64px', borderRadius: '50%', border: '1px dashed var(--border-color)', flexDirection: 'column', gap: '4px' }}>`;
code = code.replace(oldUserPlusBtn, newUserPlusBtn);

const addFriendModal = `
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
`;
code = code.replace("    </div>\n  );\n}", addFriendModal + "\n    </div>\n  );\n}");

fs.writeFileSync('src/Dashboard.jsx', code);
