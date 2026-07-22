const fs = require('fs');
let code = fs.readFileSync('src/components/SatisfactionGuarantee.tsx', 'utf-8');
code = code.replace(/const handleScrollToOrder = \(\) => {[\s\S]*?};/, 'const handleScrollToOrder = () => { navigate("/checkout"); };');
fs.writeFileSync('src/components/SatisfactionGuarantee.tsx', code);
