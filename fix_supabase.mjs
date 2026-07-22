import fs from 'fs';
let code = fs.readFileSync('src/lib/supabase.ts', 'utf-8');

const target = `    const insertData: any = {
      product: orderDetails.product,
      customer_name: orderDetails.customerName,
      phone: orderDetails.phone,
      district: orderDetails.district,
      thana: orderDetails.thana,
      address: orderDetails.address,
      payment_method: orderDetails.paymentMethod,
      price: orderDetails.price,
      page_url: orderDetails.pageUrl,
      order_time: orderDetails.orderTime,
      status: 'pending'
    };`;

const replacement = `    const insertData: any = {
      product: orderDetails.product,
      customer_name: orderDetails.customerName,
      phone: orderDetails.phone,
      district: orderDetails.district,
      thana: orderDetails.thana,
      address: orderDetails.address,
      payment_method: orderDetails.paymentMethod,
      payment_status: orderDetails.paymentMethod === 'Cash on Delivery' || orderDetails.paymentMethod === 'COD' ? 'COD' : 'Paid',
      price: orderDetails.price,
      page_url: orderDetails.pageUrl,
      order_time: orderDetails.orderTime,
      status: 'Pending'
    };`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/lib/supabase.ts', code);
  console.log('Supabase file fixed');
} else {
  console.log('Could not find target in supabase.ts');
}
