const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, 'src', 'components', 'DecisionJustification.tsx');
let content = fs.readFileSync(filepath, 'utf8');

if (!content.includes('useNavigate')) {
  content = `import { useNavigate } from 'react-router-dom';\n` + content;
  content = content.replace(/export default function (\w+)\(\s*\)\s*\{/g, (match, p1) => {
    return `export default function ${p1}() {\n  const navigate = useNavigate();`;
  });
  content = content.replace(/const navigate = useNavigate\(\);\s*const navigate = useNavigate\(\);/g, 'const navigate = useNavigate();');
}

content = content.replace(/const handleScrollToFlavour = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\);\s*if \(el\) \{\s*el\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\}\s*\};/g, 'const handleScrollToFlavour = () => { navigate("/checkout"); };');

fs.writeFileSync(filepath, content, 'utf8');
