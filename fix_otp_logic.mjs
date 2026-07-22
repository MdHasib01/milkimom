import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const targetLogic = `  const handleSendOtp = () => {
    if (phone.length === 11) {
      // DEV MODE BYPASS: Immediately verify OTP
      setShowOtp(true);
      setOtpVerified(true);
      setOtpError('');
    } else {
      alert('অনুগ্রহ করে সঠিক মোবাইল নাম্বার দিন');
    }
  };

  const handleVerifyOtp = (e: any) => {
    const value = e.target.value;
    setOtpError('');
    if (value.length === 4) {
      if (value === generatedOtp) {
        setOtpVerified(true);
        setOtpError('');
      } else {
        setOtpError('ভুল OTP। আবার চেষ্টা করুন।');
      }
    } else if (value.length > 4) {
      setOtpError('ভুল OTP। আবার চেষ্টা করুন।');
    }
  };`;

const newLogic = `  const handleSendOtp = () => {
    if (phone.length === 11) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      console.log('Generated OTP:', otp);
      setShowOtp(true);
      setOtpError('');
    } else {
      alert('অনুগ্রহ করে সঠিক মোবাইল নাম্বার দিন');
    }
  };

  const handleVerifyOtp = (e: any) => {
    const value = e.target.value;
    // Store the entered value. We need an enteredOtp state if we don't have one, but let's just use the DOM value.
  };

  const submitOtp = () => {
    const input = document.getElementById('otp-input') as HTMLInputElement;
    if (input) {
      const value = input.value;
      if (value === generatedOtp) {
        setOtpVerified(true);
        setOtpError('');
      } else {
        setOtpError('ভুল OTP। আবার চেষ্টা করুন।');
      }
    }
  };`;

if (code.includes(targetLogic)) {
  code = code.replace(targetLogic, newLogic);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('OTP Logic fixed');
} else {
  console.log('Target logic not found');
}
