const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, 'src', 'components', 'SatisfactionGuarantee.tsx');
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/const scrollToForm = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\) \|\| document\.getElementById\('order-form'\);\s*if \(el\) \{\s*el\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\}\s*\};/g, 'const scrollToForm = () => { navigate("/checkout"); };');

fs.writeFileSync(filepath, content, 'utf8');
