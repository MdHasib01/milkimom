const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, 'src', 'components', 'DecisionCommitment.tsx');
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/const handleScrollToFlavour = \(\) => \{\s*const el = document\.getElementById\('flavour-selection'\);\s*if \(el\) \{\s*el\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\}\s*\};/g, 'const handleScrollToFlavour = () => { navigate("/checkout"); };');

fs.writeFileSync(filepath, content, 'utf8');
