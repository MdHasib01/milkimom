const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filepath = path.join(componentsDir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;

  // Add useNavigate import if not exists, but only if we make changes
  if (content.includes('scrollToForm') || content.includes('scrollToFlavour') || content.includes('handleOrderRedirect')) {
    if (!content.includes('useNavigate')) {
      content = `import { useNavigate } from 'react-router-dom';\n` + content;
    }
    
    // Replace component function signatures to include navigate
    content = content.replace(/export default function (\w+)\(\s*\)\s*\{/g, (match, p1) => {
      return `export default function ${p1}() {\n  const navigate = useNavigate();`;
    });
    
    // Replace the specific implementations
    content = content.replace(/const scrollToForm = \(\) => \{\s*document\.getElementById\('order-form'\)\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\};/g, 'const scrollToForm = () => { navigate("/checkout"); };');
    content = content.replace(/const scrollToFlavour = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\) \|\| document\.getElementById\('order-form'\);\s*el\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\};/g, 'const scrollToFlavour = () => { navigate("/checkout"); };');
    content = content.replace(/const handleOrderRedirect = \(\) => \{\s*document\.getElementById\('order-form'\)\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*handleClose\(\);\s*\};/g, 'const handleOrderRedirect = () => { handleClose(); navigate("/checkout"); };');
    content = content.replace(/const scrollToForm = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\) \|\| document\.getElementById\('order-form'\);\s*el\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\};/g, 'const scrollToForm = () => { navigate("/checkout"); };');
    
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
