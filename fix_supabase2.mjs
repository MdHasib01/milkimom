import fs from 'fs';
let code = fs.readFileSync('src/lib/supabase.ts', 'utf-8');

const target2 = `        const minimalData = {
          customer_name: orderDetails.customerName,
          phone: orderDetails.phone,
          district: orderDetails.district,
          thana: orderDetails.thana,
          address: orderDetails.address,
          payment_method: orderDetails.paymentMethod,
          price: orderDetails.price
        };`;

const replacement2 = `        const minimalData = {
          customer_name: orderDetails.customerName,
          phone: orderDetails.phone,
          district: orderDetails.district,
          thana: orderDetails.thana,
          address: orderDetails.address,
          payment_method: orderDetails.paymentMethod,
          payment_status: orderDetails.paymentMethod === 'Cash on Delivery' || orderDetails.paymentMethod === 'COD' ? 'COD' : 'Paid',
          status: 'Pending',
          price: orderDetails.price
        };`;

if (code.includes(target2)) {
  code = code.replace(target2, replacement2);
  fs.writeFileSync('src/lib/supabase.ts', code);
  console.log('Supabase minimal data fixed');
} else {
  console.log('Could not find target in supabase.ts');
}
