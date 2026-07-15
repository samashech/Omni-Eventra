const fs = require('fs');

const files = ['src/Dashboard.jsx', 'src/ClubLeaderView.jsx', 'src/GlobalLeaderDashboard.jsx'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace colors with CSS variables
  content = content.replace(/'white'/g, "'var(--card-bg)'");
  content = content.replace(/"white"/g, "'var(--card-bg)'");
  content = content.replace(/'#111827'/g, "'var(--text-primary)'");
  content = content.replace(/"#111827"/g, "'var(--text-primary)'");
  content = content.replace(/'#6B7280'/g, "'var(--text-secondary)'");
  content = content.replace(/"#6B7280"/g, "'var(--text-secondary)'");
  content = content.replace(/'#F9FAFB'/g, "'var(--card-bg-alt)'");
  content = content.replace(/"#F9FAFB"/g, "'var(--card-bg-alt)'");
  content = content.replace(/'#E5E7EB'/g, "'var(--border-color)'");
  content = content.replace(/"#E5E7EB"/g, "'var(--border-color)'");
  
  // Add dark mode toggle to Dashboard.jsx
  if (file.includes('Dashboard.jsx')) {
    if (!content.includes('const [isDarkMode')) {
       content = content.replace(
         "const [showNotifs, setShowNotifs] = useState(false);",
         "const [showNotifs, setShowNotifs] = useState(false);\n  const [isDarkMode, setIsDarkMode] = useState(false);\n  useEffect(() => { document.body.classList.toggle('dark', isDarkMode); }, [isDarkMode]);"
       );
       
       content = content.replace(
         /<motion\.button whileTap=\{\{ scale: 0\.9 \}\} className="btn btn-ghost btn-icon">\s*<Moon size=\{20\} \/>\s*<\/motion\.button>/g,
         '<motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsDarkMode(!isDarkMode)} className="btn btn-ghost btn-icon"><Moon size={20} /></motion.button>'
       );
    }
  }
  
  fs.writeFileSync(file, content);
});

// Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('--card-bg')) {
  css = css.replace(
    "--accent-text: #EAB308;",
    "--accent-text: #EAB308;\n  --card-bg: white;\n  --card-bg-alt: #F9FAFB;\n  --border-color: #E5E7EB;\n"
  );
  css += `
body.dark {
  --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  --surface: rgba(30, 41, 59, 0.65);
  --surface-hover: rgba(30, 41, 59, 0.85);
  --border: rgba(51, 65, 85, 0.7);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  --card-bg: #1e293b;
  --card-bg-alt: #0f172a;
  --border-color: #334155;
}

body.dark .search-input {
  background: var(--card-bg);
  color: var(--text-primary);
  border-color: var(--border-color);
}
`;
  fs.writeFileSync('src/index.css', css);
}

console.log("Dark mode patched successfully.");
