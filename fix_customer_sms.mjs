import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const target = `  const sendCustomerConfirmation = async (orderDetails: any) => {
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

const replacement = `  const sendCustomerConfirmation = async (orderDetails: any) => {
    const customerSms = \`🎉 অভিনন্দন Great মা!

আপনার Milkimom অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।

ইনশাআল্লাহ ২–৩ কার্যদিবসের মধ্যে আপনার অর্ডারটি আপনার ঠিকানায় পৌঁছে যাবে।

যেকোনো প্রয়োজনে যোগাযোগ করুন:

WhatsApp:
01517-102603

Milkimom
Make Mother Great Again.\`;

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

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Customer SMS updated.');
} else {
  console.log('Target not found.');
}
