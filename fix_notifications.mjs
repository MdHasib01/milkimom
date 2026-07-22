import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const targetFunctions = `  const sendAdminOrderNotification = async (orderDetails: any) => {
    console.log(\`
New Milkimom Order
Product: \${orderDetails.product}
Flavour: \${orderDetails.flavour}
Payment: \${orderDetails.paymentMethod}
Total: \${orderDetails.price}
Customer: \${orderDetails.customerName}
Phone: \${orderDetails.phone}
Alternative Phone: \${orderDetails.alternativePhone || 'N/A'}
District: \${orderDetails.district}
Thana: \${orderDetails.thana}
Address: \${orderDetails.address}
Transaction ID: \${orderDetails.transactionId || 'N/A'}
Screenshot: \${orderDetails.screenshotUploaded ? 'Yes' : 'No'}
Order Time: \${orderDetails.orderTime}
\`.trim());
  };

  const sendCustomerConfirmation = async (orderDetails: any) => {
    console.log(\`
Congratulations!
Great Mother ❤️
Your Milkimom is on the way to you.
Get Ready to Receive.
If Any Help Needed,
Please Contact Us on
01517-102603 (WhatsApp)
or inbox the Milkimom Facebook Page directly.
\`.trim());
  };`;

const replacementFunctions = `  const sendAdminOrderNotification = async (orderDetails: any) => {
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
    
    console.log("Mock API Call: Sending SMS to Admin (01975917919):\\n", adminSms);

    // Admin Email
    const adminEmail = \`
New Milkimom Order
Product: \${orderDetails.product}
Flavour: \${orderDetails.flavour}
Payment: \${orderDetails.paymentMethod}
Total: ৳\${orderDetails.price}
Customer: \${orderDetails.customerName}
Phone: \${orderDetails.phone}
Alternative Phone: \${orderDetails.alternativePhone || 'N/A'}
District: \${orderDetails.district}
Thana: \${orderDetails.thana}
Address: \${orderDetails.address}
Transaction ID: \${orderDetails.transactionId || 'N/A'}
Screenshot: \${orderDetails.screenshotUploaded ? 'Yes' : 'No'}
Order Time: \${orderDetails.orderTime}
\`.trim();

    console.log("Mock API Call: Sending Email to milkimominfo@gmail.com:\\n", adminEmail);
  };

  const sendCustomerConfirmation = async (orderDetails: any) => {
    const customerSms = \`🎉 অভিনন্দন Great মা!
আপনার Milkimom অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
ইনশাআল্লাহ ২–৩ কার্যদিবসের মধ্যে আপনার অর্ডারটি পৌঁছে যাবে।
যেকোনো প্রয়োজনে:
WhatsApp
01517-102603\`;

    console.log(\`Mock API Call: Sending SMS to Customer (\${orderDetails.phone}):\\n\`, customerSms);
  };`;

if (code.includes(targetFunctions)) {
  code = code.replace(targetFunctions, replacementFunctions);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Notification functions updated.');
} else {
  console.log('Target functions not found.');
}
