import fs from 'fs';
let code = fs.readFileSync('src/components/SatisfactionGuarantee.tsx', 'utf-8');
code = code.replace(/const handleScrollToOrder = \(\) => { navigate\("\/checkout"\); }; \/\/     const el = document.getElementById\('flavour-selection'\) \|\| document.getElementById\('order-form'\);    if \(el\) {      el.scrollIntoView\({ behavior: 'smooth' }\);    } \*\/  };/, 'const handleScrollToOrder = () => { navigate("/checkout"); };');
fs.writeFileSync('src/components/SatisfactionGuarantee.tsx', code);
