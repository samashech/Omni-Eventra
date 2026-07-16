import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

const questions = [
  {
    id: 1,
    title: "How do you prefer to spend your weekends?",
    options: [
      { id: 'a', text: "Building and tinkering with tech", category: "Technology" },
      { id: 'b', text: "Exploring the outdoors and sports", category: "Sports" },
      { id: 'c', text: "Reading, debating, or writing", category: "Culture" },
      { id: 'd', text: "Attending art shows or movies", category: "Arts" }
    ]
  },
  {
    id: 2,
    title: "What's a new skill you want to master?",
    options: [
      { id: 'a', text: "Public Speaking & Leadership", category: "Culture" },
      { id: 'b', text: "Coding & Web Development", category: "Technology" },
      { id: 'c', text: "Investing & Market Analysis", category: "Business" },
      { id: 'd', text: "Photography & Videography", category: "Arts" }
    ]
  },
  {
    id: 3,
    title: "Pick an ideal campus event:",
    options: [
      { id: 'a', text: "A 24-hour hackathon", category: "Technology" },
      { id: 'b', text: "A startup pitch competition", category: "Business" },
      { id: 'c', text: "An open mic or poetry slam", category: "Culture" },
      { id: 'd', text: "A weekend trek or marathon", category: "Sports" }
    ]
  }
];

export default function OnboardingQuiz({ onComplete, allClubs }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelect = (category) => {
    const newAnswers = [...answers, category];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnalyzing(false);
      }, 1500); // Simulate analysis
    }
  };

  // Determine top 2 recommended clubs based on most frequent categories
  const getRecommendations = () => {
    const categoryCounts = answers.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    
    // Sort categories by frequency
    const topCategories = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]);
    
    // Find clubs matching top categories
    return allClubs.filter(club => topCategories.includes(club.category)).slice(0, 3);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        style={{
          background: 'var(--bg-gradient)',
          borderRadius: '32px', padding: '48px',
          width: '90%', maxWidth: '600px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.8)',
          position: 'relative', overflow: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          
          {step < questions.length && !isAnalyzing && (
            <motion.div 
              key={`question-${step}`}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#EAB308', letterSpacing: '0.1em' }}>
                  QUESTION {step + 1} OF {questions.length}
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {questions.map((_, i) => (
                    <div key={i} style={{ width: '32px', height: '4px', borderRadius: '2px', background: i <= step ? 'var(--text-primary)' : 'rgba(0,0,0,0.1)' }} />
                  ))}
                </div>
              </div>

              <h2 className="font-serif" style={{ fontSize: '36px', color: 'var(--text-primary)', marginBottom: '40px', lineHeight: 1.2 }}>
                {questions[step].title}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {questions[step].options.map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.category)}
                    style={{
                      padding: '20px 24px', background: 'rgba(255,255,255,0.8)',
                      border: '1px solid var(--border-color)', borderRadius: '16px',
                      textAlign: 'left', fontSize: '16px', color: 'var(--text-primary)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FACC15'; e.currentTarget.style.background = '#FEF3C7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; }}
                  >
                    {opt.text}
                    <ChevronRight size={18} color="var(--text-tertiary)" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '60px 0' }}
            >
              <motion.div 
                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                style={{ width: '48px', height: '48px', margin: '0 auto 24px auto', color: '#F59E0B' }}
              >
                <Sparkles size={48} />
              </motion.div>
              <h2 className="font-serif" style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px' }}>Curating your campus experience...</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Finding the perfect clubs for you.</p>
            </motion.div>
          )}

          {step === questions.length && !isAnalyzing && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ width: '64px', height: '64px', background: '#D1FAE5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                <CheckCircle2 size={32} />
              </div>
              <h2 className="font-serif" style={{ fontSize: '36px', color: 'var(--text-primary)', marginBottom: '16px' }}>Your Perfect Matches</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Based on your interests, we highly recommend following these clubs.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', textAlign: 'left' }}>
                {getRecommendations().map(club => (
                  <div key={club.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: club.color, color: club.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                      {club.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '2px' }}>{club.name}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{club.category} · {club.followers} followers</p>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>Follow</button>
                  </div>
                ))}
              </div>

              <button onClick={onComplete} className="btn btn-dark" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                Go to my Dashboard
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
