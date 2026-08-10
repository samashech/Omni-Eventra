import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Compass, ShieldCheck, MapPin, Users } from 'lucide-react';

export default function Landing({ onSignIn }) {
  const { scrollY } = useScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const heroScale = useTransform(scrollY, [0, 600], [1, 0.85]);
  
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
        <h2 className="font-serif" style={{ fontSize: '56px', lineHeight: 1.1, marginBottom: '24px', color: 'var(--text-primary)' }}>
          {title}
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
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
            <h3 className="font-serif" style={{ fontSize: '28px', color: 'var(--text-primary)' }}>{title.split(' ')[0]}</h3>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div style={{ background: 'var(--bg-gradient)', overflowX: 'hidden' }}>
      
      <AnimatePresence>
        {loading && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
            <motion.div
              key="preloader-3"
              initial={{ x: 0 }} exit={{ x: '100vw' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#FACC15', zIndex: 9997 }}
            />
            <motion.div
              key="preloader-2"
              initial={{ x: 0 }} exit={{ x: '100vw' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#FFFFFF', zIndex: 9998 }}
            />
            <motion.div
              key="preloader-1"
              initial={{ x: 0 }} exit={{ x: '100vw' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#0B0F19', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-serif" style={{ fontSize: '32px', fontWeight: 600, color: 'white', letterSpacing: '0.1em' }}>
                  OBLIVION <span style={{ color: '#EAB308' }}>EVENTRA</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <nav style={{ padding: '24px 0', position: 'fixed', width: '100%', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-serif" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.1em' }}>
              EVENTRA
            </span>
          </div>

          <div style={{ display: 'flex', gap: '32px' }}>
            {['Discover', 'Concerts', 'Fests', 'Workshops'].map(link => (
              <a key={link} href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{link}</a>
            ))}
          </div>

          <button onClick={onSignIn} className="btn btn-dark" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Sign in <ArrowUpRight size={16} />
          </button>
        </div>
      </nav>

      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div className="container" style={{ textAlign: 'center', scale: heroScale }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}>
            <span style={{ 
              display: 'inline-block', padding: '6px 16px', borderRadius: '999px',
              border: '1px solid rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '40px',
              background: 'rgba(255,255,255,0.5)', textTransform: 'uppercase'
            }}>
              <span style={{ color: '#EAB308', marginRight: '6px' }}>●</span> OBLIVION TRACK 4
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif" style={{ fontSize: 'clamp(50px, 8vw, 100px)', lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '40px' }}
          >
            DISCOVER <span style={{ color: '#EAB308', fontStyle: 'italic' }}>EVENTS.</span><br/>
            PLAN WITH <span style={{ color: '#EAB308', fontStyle: 'italic' }}>FRIENDS.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6 }}
            style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 48px auto', lineHeight: 1.6 }}
          >
            The ultimate event discovery and ticketing platform. 
            Find local concerts, college fests, and workshops. Book securely, pick your seats easily, and coordinate outings without the friction.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.7 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
          >
            <button onClick={onSignIn} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
              Explore Events <ArrowUpRight size={18} />
            </button>
          </motion.div>
        </motion.div>
      </section>

      <section className="container" style={{ padding: '80px 24px' }}>
        <FeatureSection 
          num="01"
          title="Discover Local Events Easily"
          desc="Stop jumping between apps to find out what's happening. From college fests to local concerts and workshops, Eventra brings all local happenings into one beautifully designed, ad-free feed. The focus is entirely on the event details."
          icon={Compass}
        />
        <FeatureSection 
          num="02"
          title="Secure & Authentic Tickets"
          desc="Say goodbye to the fear of buying fake tickets or dealing with sketchy payment gateways. Eventra ensures every ticket is verified, and transactions are securely processed, so you can book with confidence."
          icon={ShieldCheck}
          reverse
        />
        <FeatureSection 
          num="03"
          title="Intuitive Seat Selection"
          desc="Booking should not be confusing. Our modern, interactive seat-selection screens make it perfectly clear where you'll be sitting, giving you the best view without the headache."
          icon={MapPin}
        />
        <FeatureSection 
          num="04"
          title="Plan with Friends Seamlessly"
          desc="Stop the hassle of sending screenshots and figuring out where to meet. Share event details natively, invite friends, and coordinate meeting spots right within the app. Planning an outing is finally fun again."
          icon={Users}
          reverse
        />
      </section>

      <section style={{ padding: '0 24px 80px 24px' }}>
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
          <p style={{ color: '#EAB308', letterSpacing: '0.2em', fontSize: '12px', fontWeight: 600, marginBottom: '24px', textTransform: 'uppercase' }}>Ready for the next event?</p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(40px, 6vw, 70px)', lineHeight: 1.1, marginBottom: '32px' }}>
            Frictionless <span style={{ color: '#EAB308', fontStyle: 'italic' }}>Booking</span><br/>
            Unforgettable <span style={{ color: '#EAB308', fontStyle: 'italic' }}>Experiences</span>
          </h2>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
            Sign in to start discovering events around you, book tickets, and invite your crew.
          </p>
          <button onClick={onSignIn} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
            Get Started Now <ArrowUpRight size={18} />
          </button>
        </motion.div>
      </section>
      
    </div>
  );
}
