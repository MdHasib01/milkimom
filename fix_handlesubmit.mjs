import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

code = code.replace(/setCheckoutStep\('summary'\);/g, "setCheckoutStep('otp');");

fs.writeFileSync('src/components/OrderForm.tsx', code);
console.log('handleSubmit fixed');
