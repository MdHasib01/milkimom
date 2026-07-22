const fs = require('fs');
let code = fs.readFileSync('src/components/TrustBadges.tsx', 'utf8');
code = code.replace(/py-8 lg:py-12 lg:py-16/g, 'py-8 lg:py-12');
fs.writeFileSync('src/components/TrustBadges.tsx', code);
console.log('Fixed TrustBadges padding');
