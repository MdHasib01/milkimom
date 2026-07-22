const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

let content1 = fs.readFileSync(path.join(componentsDir, 'CountdownBar.tsx'), 'utf8');
content1 = content1.replace(/const handleScrollToForm = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\) \|\| document\.getElementById\('order-form'\);\s*el\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\};/g, 'const handleScrollToForm = () => { navigate("/checkout"); };');
fs.writeFileSync(path.join(componentsDir, 'CountdownBar.tsx'), content1, 'utf8');

let content2 = fs.readFileSync(path.join(componentsDir, 'SatisfactionGuarantee.tsx'), 'utf8');
content2 = content2.replace(/const scrollToFlavour = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\) \|\| document\.getElementById\('order-form'\);\s*el\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\};/g, 'const scrollToFlavour = () => { navigate("/checkout"); };');
fs.writeFileSync(path.join(componentsDir, 'SatisfactionGuarantee.tsx'), content2, 'utf8');
