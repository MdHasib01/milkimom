const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove components from JSX
code = code.replace(/<HeroSelfIdentification \/>\s*/, "");
code = code.replace(/<EmotionalSection \/>\s*/, "");

// Remove imports
code = code.replace(/import HeroSelfIdentification from '\.\/components\/HeroSelfIdentification';\s*/, "");
code = code.replace(/import EmotionalSection from '\.\/components\/EmotionalSection';\s*/, "");

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed App.tsx by removing HeroSelfIdentification and EmotionalSection');
