import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

// 1. Change delivery timer to 120
code = code.replace(/useState\(300\); \/\/ 5 mins/, 'useState(120); // 2 mins');

// 2. Change checkoutStep definition
code = code.replace(/const \[checkoutStep, setCheckoutStep\] = useState<.*>\('summary'\);/, 
  "const [checkoutStep, setCheckoutStep] = useState<'otp' | 'cod_confirm' | 'payment' | 'preparing' | 'success'>('otp');");

// 3. Change handleSubmit to go to 'otp'
code = code.replace(/setCheckoutStep\('summary'\);/, "setCheckoutStep('otp');");

// 4. Update the popup modal steps logic
// We will replace the entire modal content from {showCheckoutPopup && ( to the end of AnimatePresence.
// Wait, that might be hard. Let's find the specific parts to replace.

