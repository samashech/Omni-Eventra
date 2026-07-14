import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Compass, Bell, Calendar as CalIcon, Users } from 'lucide-react';

export default function Landing({ onSignIn }) {
  const { scrollY } = useScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading time before rising the curtain
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // As the user scrolls down, the hero section shrinks slightly
  // but continues to scroll up naturally without fading away completely.
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.85]);
  
  // Reusable feature section component
  const FeatureSection = ({ num, title, desc, icon: Icon, reverse }) => (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ 
        display: 'flex', 
        flexDirection: reverse ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: '120px',
        margin: '160px 0'
      }}
    >
      <div style={{ flex: 1, paddingRight: reverse ? 0 : '40px', paddingLeft: reverse ? '40px' : 0 }}>
        <p style={{ color: '#EAB308', letterSpacing: '0.1em', fontSize: '13px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
          {num} · {title.split(' ')[0]}
        </p>
        <h2 className="font-serif" style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '24px', color: '#111827' }}>
          {title}
        </h2>
        <p style={{ fontSize: '18px', color: '#4B5563', lineHeight: 1.6 }}>
          {desc}
        </p>
      </div>
      
      <div style={{ flex: 1 }}>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{ 
            background: 'linear-gradient(135deg, #FFFDF8 0%, #FDF4E3 100%)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
            borderRadius: '32px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '64px', height: '64px', 
              background: '#FDE047', 
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 12px rgba(234, 179, 8, 0.2)'
            }}>
              <Icon size={28} color="#92400E" />
            </div>
            <h3 className="font-serif" style={{ fontSize: '28px', color: '#111827' }}>{title.split(' ')[0]}</h3>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div style={{ background: 'var(--bg-gradient)', overflowX: 'hidden' }}>
      
      {/* Poetic.com Style Opening Transition / Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: '-100vh' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Cinematic curtain rise easing
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: '#0B0F19', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '50%', color: '#0B0F19', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }} className="font-serif">C</div>
              <span style={{ fontSize: '20px', fontWeight: 600, color: 'white', letterSpacing: '-0.02em' }}>
                Club<span style={{ color: '#EAB308', fontStyle: 'italic' }}>hub</span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav style={{ padding: '24px 0', position: 'fixed', width: '100%', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: '#111827', borderRadius: '50%', color: '#FDE047', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }} className="font-serif">C</div>
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827', letterSpacing: '-0.02em' }}>
              Club<span style={{ color: '#EAB308', fontStyle: 'italic' }}>hub</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '32px' }}>
            {['Discover', 'Follow', 'Events', 'Recruit'].map(link => (
              <a key={link} href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>{link}</a>
            ))}
          </div>

          <button onClick={onSignIn} className="btn btn-dark" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Sign in <ArrowUpRight size={16} />
          </button>
        </div>
      </nav>

      {/* Normal Document Flow Hero Section (Shrinks on Scroll) */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="container" 
          style={{ textAlign: 'center', scale: heroScale }}
        >
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}>
            <span style={{ 
              display: 'inline-block', padding: '6px 16px', borderRadius: '999px',
              border: '1px solid rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.1em', color: '#4B5563', marginBottom: '40px',
              background: 'rgba(255,255,255,0.5)'
            }}>
              <span style={{ color: '#EAB308', marginRight: '6px' }}>●</span> CAMPUS CLUBS, UNIFIED
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif" style={{ fontSize: 'clamp(60px, 10vw, 130px)', lineHeight: 1.05, color: '#111827', marginBottom: '40px' }}
          >
            every <span style={{ color: '#EAB308', fontStyle: 'italic' }}>society.</span><br/>
            one <span style={{ color: '#EAB308', fontStyle: 'italic' }}>campus.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6 }}
            style={{ fontSize: '20px', color: '#4B5563', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: 1.6 }}
          >
            Discover every club at your college, follow the ones you love, 
            register for events, and apply to join — all in one place.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.7 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
          >
            <button onClick={onSignIn} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
              Get started <ArrowUpRight size={18} />
            </button>
            <button className="btn" style={{ padding: '16px 32px', fontSize: '16px', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', color: '#111827' }}>
              See how it works
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Dashboard Mockup (Normal Flow) */}
      <div style={{ position: 'relative', zIndex: 10, paddingBottom: '80px', marginTop: '-15vh' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              width: '100%',
              maxWidth: '1000px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '40px',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 -20px 80px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.5) inset',
              padding: '48px',
            }}
          >
            {/* Dashboard Internal Mockup */}
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
                <h3 className="font-serif" style={{ fontSize: '32px', color: '#111827' }}>Freshers' week, 2026</h3>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>12 clubs you follow · 4 events this week</p>
              </div>
              <div style={{ background: '#FDE047', padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 500 }}>+ Post event</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
               <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #E5E7EB' }}>
                 <p style={{ fontSize: '10px', color: '#6B7280', letterSpacing: '0.1em' }}>FOLLOWING</p>
                 <p className="font-serif" style={{ fontSize: '32px', color: '#111827', margin: '8px 0' }}>12</p>
                 <p style={{ fontSize: '12px', color: '#6B7280' }}>active clubs</p>
               </div>
               <div style={{ background: '#FDE047', borderRadius: '20px', padding: '20px', border: '1px solid #FACC15' }}>
                 <p style={{ fontSize: '10px', color: '#92400E', letterSpacing: '0.1em' }}>EVENTS THIS WEEK</p>
                 <p className="font-serif" style={{ fontSize: '32px', color: '#111827', margin: '8px 0' }}>4</p>
                 <p style={{ fontSize: '12px', color: '#92400E' }}>registered for 2</p>
               </div>
               <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #E5E7EB' }}>
                 <p style={{ fontSize: '10px', color: '#6B7280', letterSpacing: '0.1em' }}>APPLICATIONS</p>
                 <p className="font-serif" style={{ fontSize: '32px', color: '#111827', margin: '8px 0' }}>3</p>
                 <p style={{ fontSize: '12px', color: '#6B7280' }}>awaiting review</p>
               </div>
               <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #E5E7EB' }}>
                 <p style={{ fontSize: '10px', color: '#6B7280', letterSpacing: '0.1em' }}>NOTIFICATIONS</p>
                 <p className="font-serif" style={{ fontSize: '32px', color: '#111827', margin: '8px 0' }}>7</p>
                 <p style={{ fontSize: '12px', color: '#6B7280' }}>from your clubs</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container" style={{ padding: '80px 24px' }}>
        <FeatureSection 
          num="01"
          title="Every club, in one place."
          desc="A single directory for every society on campus. Filter by category, search by name, browse profiles with leadership, past events, and gallery. No more hunting on WhatsApp."
          icon={Compass}
        />
        <FeatureSection 
          num="02"
          title="Subscribe like it's your feed."
          desc="Hit follow on the clubs you care about. Your home feed shows only what matters — new events, announcements, and recruitment windows from the clubs you actually love."
          icon={Bell}
          reverse
        />
        <FeatureSection 
          num="03"
          title="One tap to attend."
          desc="RSVP or register for events in a single click. Track everything from your dashboard. Leaders see the attendee list live, with capacity and waitlist handled automatically."
          icon={CalIcon}
        />
        <FeatureSection 
          num="04"
          title="Open the doors."
          desc="Club leaders launch recruitment windows with custom application forms. Review applicants in a clean kanban — Shortlist, Interview, Accept. New members join automatically."
          icon={Users}
          reverse
        />
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '0 24px 40px 24px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            background: '#0B0F19',
            borderRadius: '40px',
            padding: '100px 40px',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <p style={{ color: '#EAB308', letterSpacing: '0.2em', fontSize: '11px', fontWeight: 600, marginBottom: '24px' }}>JOIN CLUBHUB</p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: 1.1, marginBottom: '32px' }}>
            Your campus, <span style={{ color: '#EAB308', fontStyle: 'italic' }}>finally</span><br/>
            in one place.
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '18px', maxWidth: '500px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
            Sign in with your college email to see clubs, follow the ones you love, and never miss another event.
          </p>
          <button onClick={onSignIn} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
            Sign in with Google <ArrowUpRight size={18} />
          </button>
        </motion.div>
      </section>
      
    </div>
  );
}
