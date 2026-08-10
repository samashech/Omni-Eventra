const fs = require('fs');
let code = fs.readFileSync('src/Dashboard.jsx', 'utf8');

// 1. Add useEffect import
code = code.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';");

// 2. Add myTickets state
code = code.replace("const [savedEvents, setSavedEvents] = useState([]);", "const [savedEvents, setSavedEvents] = useState([]);\n  const [myTickets, setMyTickets] = useState([]);");

// 3. Add useEffect hook
const useEffectHook = `
  useEffect(() => {
    if (activeTab === 'My Tickets') {
      fetch('http://localhost:3001/api/tickets')
        .then(res => res.json())
        .then(data => setMyTickets(data))
        .catch(e => console.error('Error fetching tickets:', e));
    }
  }, [activeTab]);
`;
code = code.replace("const toggleSave =", useEffectHook + "\n  const toggleSave =");

// 4. Update the "Pay securely" click handler to save ticket
const oldPayButton = "onClick={() => setCheckoutStep('confirmation')}";
const newPayButton = `onClick={async () => {
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
                    }}`;
code = code.replace(oldPayButton, newPayButton);

// 5. Replace the "My Tickets" rendering logic
const oldTicketsRenderStart = `{/* Phase 4: My Tickets (Populated Ticket Card) */}`;
const oldTicketsRenderEnd = `        {/* Phase 3: Invite Modal */}`;

const myTicketsRegex = /\{\/\* Phase 4: My Tickets \(Populated Ticket Card\) \*\/\}[\s\S]*?(?=\{\/\* Phase 3: Invite Modal \*\/)/;

const newTicketsRender = `{/* Phase 4: My Tickets (Populated Ticket Card) */}
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

        `;
code = code.replace(myTicketsRegex, newTicketsRender);

// 6. Update Currency and Math
code = code.replace(/price: 45/g, 'price: 4500');
code = code.replace(/price: 15/g, 'price: 1500');
code = code.replace(/price: 25/g, 'price: 2500');
code = code.replace(/\+ 20/g, '+ 2000');
code = code.replace(/2 : 0/g, '150 : 0');

code = code.replace(/\$\$\{/g, '₹${'); // Covers \`$${evt.price}\` etc.
code = code.replace(/\$30/g, '₹2500'); 
code = code.replace(/>\$/g, '>₹');
code = code.replace(/ \$/g, ' ₹');
code = code.replace(/\(\$/g, '(₹');
code = code.replace(/-\$/g, '-₹');
code = code.replace(/"\$"/g, '"₹"');
code = code.replace(/>\$2\.00</g, '>₹150<');

fs.writeFileSync('src/Dashboard.jsx', code);
