import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

// 1. Change timer to 120 (2 mins)
code = code.replace(
  "const [deliveryTimer, setDeliveryTimer] = useState(300); // 5 mins",
  "const [deliveryTimer, setDeliveryTimer] = useState(120); // 2 mins"
);

// 2. Update confirmOrder function
const targetConfirmOrder = `  const confirmOrder = async () => {
    if (!otpVerified) {
      alert('অনুগ্রহ করে মোবাইল নাম্বার ভেরিফাই করুন');
      return;
    }
    
    if (paymentMethod === 'prepaid') {
      if (!trxId) {
        alert('Transaction ID দিন');
        return;
      }
      const result = await triggerBackendNotifications(true, trxId);
      if (result.success) {
        await triggerCustomerConfirmation(true);
        setCheckoutStep('preparing');
        setTimeout(() => {
          setCheckoutStep('success');
        }, 1000);
      }
    } else {
      const result = await triggerBackendNotifications(false);
      if (result.success) {
        await triggerCustomerConfirmation(false);
        setCheckoutStep('preparing');
        setTimeout(() => {
          setCheckoutStep('success');
        }, 1000);
      }
    }
  };`;

const replacementConfirmOrder = `  const confirmOrder = async () => {
    if (!otpVerified) {
      alert('অনুগ্রহ করে মোবাইল নাম্বার ভেরিফাই করুন');
      return;
    }
    
    if (paymentMethod === 'prepaid') {
      if (!trxId) {
        alert('Transaction ID দিন');
        return;
      }
      setCheckoutStep('preparing');
      const result = await triggerBackendNotifications(true, trxId);
      if (result.success) {
        setCheckoutStep('success');
      } else {
        alert('Order could not be saved. Please try again.');
        setCheckoutStep('payment');
      }
    } else {
      setCheckoutStep('preparing');
      const result = await triggerBackendNotifications(false);
      if (result.success) {
        setCheckoutStep('success');
      } else {
        alert('Order could not be saved. Please try again.');
        setCheckoutStep('payment');
      }
    }
  };`;

if (code.includes(targetConfirmOrder)) {
  code = code.replace(targetConfirmOrder, replacementConfirmOrder);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Fixed confirmOrder and timer.');
} else {
  console.log('Target confirmOrder not found.');
}
