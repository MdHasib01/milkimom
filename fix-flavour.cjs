const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filepath = path.join(componentsDir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;

  if (content.includes('flavour-selection') || content.includes('order-form')) {
    if (!content.includes('useNavigate') && !content.includes('OrderForm.tsx') && !content.includes('FloatingActions.tsx')) {
      content = `import { useNavigate } from 'react-router-dom';\n` + content;
      content = content.replace(/export default function (\w+)\(\s*\)\s*\{/g, (match, p1) => {
        return `export default function ${p1}() {\n  const navigate = useNavigate();`;
      });
      content = content.replace(/const navigate = useNavigate\(\);\s*const navigate = useNavigate\(\);/g, 'const navigate = useNavigate();');
    }

    content = content.replace(/document\.getElementById\('flavour-selection'\)\?\.scrollIntoView\(\{ behavior: 'smooth' \}\)/g, 'navigate("/checkout")');
    content = content.replace(/document\.getElementById\('order-form'\)\?\.scrollIntoView\(\{ behavior: 'smooth' \}\)/g, 'navigate("/checkout")');
    
    // specifically for functions that do if (el) { el.scrollIntoView }
    content = content.replace(/const scrollToForm = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\) \|\| document\.getElementById\('order-form'\);\s*if \(el\) \{\s*el\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\}\s*\};/g, 'const scrollToForm = () => { navigate("/checkout"); };');

    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
