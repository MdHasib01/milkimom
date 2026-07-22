import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

// fix useState definition
code = code.replace(
  "const [checkoutStep, setCheckoutStep] = useState<'summary' | 'otp' | 'payment' | 'preparing' | 'success'>('summary');",
  "const [checkoutStep, setCheckoutStep] = useState<'otp' | 'payment' | 'preparing' | 'success'>('otp');"
);

// remove the summary step block
const startSummary = "{checkoutStep === 'summary' && (";
const startOtp = "{checkoutStep === 'otp' && (";

const startIdx = code.indexOf(startSummary);
const endIdx = code.indexOf(startOtp);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + code.substring(endIdx);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Removed unused summary block.');
} else {
  console.log('Could not find summary block.');
}
