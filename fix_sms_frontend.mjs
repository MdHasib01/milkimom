import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

// Replace handleSendOtp console.log with API call
const targetHandleSendOtp = `  const handleSendOtp = () => {
    if (phone.length === 11) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      console.log('Generated OTP:', otp);
      setShowOtp(true);
      setOtpError('');
    } else {
      alert('অনুগ্রহ করে সঠিক মোবাইল নাম্বার দিন');
    }
  };`;

const newHandleSendOtp = `  const handleSendOtp = async () => {
    if (phone.length === 11) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      
      try {
        const response = await fetch('/api/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: phone,
            message: \`আপনার Milkimom ভেরিফিকেশন কোড: \${otp}\`
          })
        });
        
        const data = await response.json();
        if (!data.success) {
          console.error('Failed to send OTP SMS:', data.error);
        } else {
          console.log('OTP SMS sent successfully');
        }
      } catch (err) {
        console.error('Error calling SMS API:', err);
      }
      
      setShowOtp(true);
      setOtpError('');
    } else {
      alert('অনুগ্রহ করে সঠিক মোবাইল নাম্বার দিন');
    }
  };`;

// Replace sendAdminOrderNotification console.log for SMS with API call
const targetAdminNotification = `  const sendAdminOrderNotification = async (orderDetails: any) => {
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
  };`;

const newAdminNotification = `  const sendAdminOrderNotification = async (orderDetails: any) => {
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
  };`;

// Replace sendCustomerConfirmation console.log with API call
const targetCustomerConfirmation = `  const sendCustomerConfirmation = async (orderDetails: any) => {
    const customerSms = \`🎉 অভিনন্দন Great মা!
আপনার Milkimom অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
ইনশাআল্লাহ ২–৩ কার্যদিবসের মধ্যে আপনার অর্ডারটি পৌঁছে যাবে।
যেকোনো প্রয়োজনে:
WhatsApp
01517-102603\`;

    console.log(\`Mock API Call: Sending SMS to Customer (\${orderDetails.phone}):\\n\`, customerSms);
  };`;

const newCustomerConfirmation = `  const sendCustomerConfirmation = async (orderDetails: any) => {
    const customerSms = \`🎉 অভিনন্দন Great মা!
আপনার Milkimom অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
ইনশাআল্লাহ ২–৩ কার্যদিবসের মধ্যে আপনার অর্ডারটি পৌঁছে যাবে।
যেকোনো প্রয়োজনে:
WhatsApp
01517-102603\`;

    try {
      await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: orderDetails.phone, message: customerSms })
      });
    } catch (err) {
      console.error('Error sending Customer SMS:', err);
    }
  };`;

code = code.replace(targetHandleSendOtp, newHandleSendOtp);
code = code.replace(targetAdminNotification, newAdminNotification);
code = code.replace(targetCustomerConfirmation, newCustomerConfirmation);

fs.writeFileSync('src/components/OrderForm.tsx', code);
console.log('Frontend SMS API integration complete.');
