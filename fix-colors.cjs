const fs = require('fs');
const path = require('path');

const files = [
  'Dashboard.jsx',
  'ClubProfile.jsx',
  'ClubLeaderView.jsx',
  'GlobalLeaderDashboard.jsx',
  'Landing.jsx',
  'Login.jsx',
  'OnboardingQuiz.jsx',
  'SearchModal.jsx'
].map(f => path.join(__dirname, 'src', f));

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace hex grays/blacks with CSS variables
  content = content.replace(/#111827/gi, "var(--text-primary)");
  content = content.replace(/#374151/gi, "var(--text-primary)");
  content = content.replace(/#4B5563/gi, "var(--text-secondary)");
  content = content.replace(/#6B7280/gi, "var(--text-secondary)");
  content = content.replace(/#9CA3AF/gi, "var(--text-tertiary)");
  
  // Replace background and border hardcodes
  content = content.replace(/background:\s*['"]white['"]/g, "background: 'var(--card-bg)'");
  content = content.replace(/background:\s*['"]#F9FAFB['"]/gi, "background: 'var(--card-bg-alt)'");
  content = content.replace(/background:\s*['"]#F3F4F6['"]/gi, "background: 'var(--bg-subtle)'");
  content = content.replace(/#E5E7EB/gi, "var(--border-color)");
  
  fs.writeFileSync(file, content);
});

console.log("Colors patched!");
