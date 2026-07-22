const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filepath = path.join(componentsDir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;

  const match = content.match(/const navigate = useNavigate\(\);/g);
  if (match && match.length > 1) {
    // Only keep the first one
    content = content.replace(/const navigate = useNavigate\(\);\s*/g, (m, offset, str) => {
      // If it's the first occurrence in the component
      return m;
    });
    // better way: Just replace two consecutive declarations
    content = content.replace(/const navigate = useNavigate\(\);\s*const navigate = useNavigate\(\);/g, 'const navigate = useNavigate();');
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Cleaned ${file}`);
  }
}
