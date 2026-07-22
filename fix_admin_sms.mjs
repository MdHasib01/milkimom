import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const target = `  const sendAdminOrderNotification = async (orderDetails: any) => {
    // Admin SMS
    let adminSms = \`নতুন Milkimom অর্ডার
নাম: \${orderDetails.customerName}
ফোন: \${orderDetails.phone}
জেলা: \${orderDetails.district}
থানা: \${orderDetails.thana}
ফ্লেভার: \${orderDetails.flavour}
পেমেন্ট: \${orderDetails.paymentMethod}
মোট: ৳\${orderDetails.price}\`;
    
    if (orderDetails.transactionId) {
      adminSms += \`\\nTransaction ID: \${orderDetails.transactionId}\`;
    }
    
    try {
      await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: '01975917919', message: adminSms })
      });
    } catch (err) {
      console.error('Error sending Admin SMS:', err);
    }
`;

const replacement = `  const sendAdminOrderNotification = async (orderDetails: any) => {
    // Admin SMS
    const paymentText = orderDetails.transactionId ? 'bKash' : 'Cash on Delivery';
    
    let adminSms = \`নতুন Milkimom অর্ডার\\n\\n\`;
    adminSms += \`নাম: \${orderDetails.customerName}\\n\\n\`;
    adminSms += \`ফোন: \${orderDetails.phone}\\n\\n\`;
    adminSms += \`জেলা: \${orderDetails.district}\\n\\n\`;
    adminSms += \`থানা: \${orderDetails.thana}\\n\\n\`;
    adminSms += \`ফ্লেভার: \${orderDetails.flavour}\\n\\n\`;
    adminSms += \`পেমেন্ট: \${paymentText}\\n\\n\`;
    
    if (orderDetails.transactionId) {
      adminSms += \`Trx ID:\\n\${orderDetails.transactionId}\\n\\n\`;
    }
    
    adminSms += \`মোট: ৳\${orderDetails.price}\`;
    
    try {
      await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: '01975917919', message: adminSms })
      });
    } catch (err) {
      console.error('Error sending Admin SMS:', err);
    }
`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Admin SMS updated.');
} else {
  console.log('Target not found. Doing a fallback replace...');
}
