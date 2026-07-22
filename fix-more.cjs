const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const filesToFix = [
  'FutureLetter.tsx',
  'SatisfactionGuarantee.tsx',
  'CountdownBar.tsx',
  'ExitIntent.tsx'
];

for (const file of filesToFix) {
  const filepath = path.join(componentsDir, file);
  let content = fs.readFileSync(filepath, 'utf8');

  if (!content.includes('useNavigate')) {
    content = `import { useNavigate } from 'react-router-dom';\n` + content;
  }
  
  content = content.replace(/export default function (\w+)\(\s*\)\s*\{/g, (match, p1) => {
    return `export default function ${p1}() {\n  const navigate = useNavigate();`;
  });

  content = content.replace(/const navigate = useNavigate\(\);\s*const navigate = useNavigate\(\);/g, 'const navigate = useNavigate();');

  // specific fixes
  content = content.replace(/const scrollToFlavour = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\) \|\| document\.getElementById\('order-form'\);\s*el\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\};/g, 'const scrollToFlavour = () => { navigate("/checkout"); };');
  
  content = content.replace(/const scrollToForm = \(\) => \{\s*setShow\(false\);\s*document\.getElementById\('order-form'\)\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\};/g, 'const scrollToForm = () => { setShow(false); navigate("/checkout"); };');
  
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Fixed ${file}`);
}
