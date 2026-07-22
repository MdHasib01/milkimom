import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const target = `{checkoutStep === 'payment' && 'bKash Payment'}
                      {checkoutStep === 'cod_confirm' && 'অর্ডার কনফার্ম করুন'}`;
const replacement = `{checkoutStep === 'payment' && (paymentMethod === 'prepaid' ? 'bKash Payment' : 'অর্ডার কনফার্ম করুন')}`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Header text fixed.');
} else {
  console.log('Target not found.');
}
