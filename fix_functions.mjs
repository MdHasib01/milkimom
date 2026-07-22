import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const targetFunctions = `  const triggerBackendNotifications = async (isPrepaid: boolean, currentTrxId: string = '') => {
    const orderDetails = {
      product: 'মিল্কিমম কমপ্লিট ডোজ',
      paymentMethod: isPrepaid ? 'bKash / Card' : 'Cash on Delivery',
      customerName: name,
      phone: phone,
      alternativePhone: altPhone,
      district: district,
      thana: thana,
      address: address,
      flavour: FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name,
      price: totalPrice,
      orderTime: new Date().toISOString(),
      pageUrl: window.location.href,
      ...(isPrepaid && { transactionId: currentTrxId, screenshotUploaded })
    };

    // Save to Supabase
    const result = await saveOrderToSupabase(orderDetails);
    if (!result.success && !result.mock) {
      alert(\`Supabase Error: \${result.error?.message || JSON.stringify(result.error)}\`);
    }

    // Placeholder: Send WhatsApp to Admin via WhatsApp Business API
    console.log("Mock API Call: Sending WhatsApp to Admin (01975917919)", orderDetails);
    
    // Placeholder: Send Email to milkimominfo@gmail.com
    console.log("Mock API Call: Sending Email to milkimominfo@gmail.com", orderDetails);

    return result;
  };

  const triggerCustomerConfirmation = async (isPrepaid: boolean) => {
    // Placeholder: Send Order Confirmation SMS to Customer
    console.log(\`Mock API Call: Sending Order Confirmation SMS to Customer (\${phone})\`);
    
    // Placeholder: Send Order Confirmation WhatsApp to Customer
    console.log(\`Mock API Call: Sending Order Confirmation WhatsApp to Customer (\${phone})\`);
  };`;

const replacementFunctions = `  const sendAdminOrderNotification = async (orderDetails: any) => {
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
  };

  const triggerBackendNotifications = async (isPrepaid: boolean, currentTrxId: string = '') => {
    const orderDetails = {
      product: 'Milkimom Complete Dose',
      paymentMethod: isPrepaid ? 'Paid' : 'COD',
      customerName: name,
      phone: phone,
      alternativePhone: altPhone,
      district: district,
      thana: thana,
      address: address,
      flavour: FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name,
      price: totalPrice,
      orderTime: new Date().toISOString(),
      pageUrl: window.location.href,
      ...(isPrepaid && { transactionId: currentTrxId, screenshotUploaded })
    };

    // Save to Supabase
    const result = await saveOrderToSupabase(orderDetails);
    if (!result.success && !result.mock) {
      alert(\`Supabase Error: \${result.error?.message || JSON.stringify(result.error)}\`);
    }

    await sendAdminOrderNotification(orderDetails);
    await sendCustomerConfirmation(orderDetails);

    return result;
  };

  const triggerCustomerConfirmation = async (isPrepaid: boolean) => {
    // Kept for compatibility if used elsewhere, but actual logic is inside triggerBackendNotifications now.
  };`;

if (code.includes(targetFunctions)) {
  code = code.replace(targetFunctions, replacementFunctions);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Functions replaced.');
} else {
  console.log('Target functions not found. Let me try a regex approach.');
}
