import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const target = `{checkoutStep !== 'success' && checkoutStep !== 'preparing' && (
                <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col gap-3 sticky top-0 bg-white z-20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {checkoutStep === 'summary' && 'অর্ডার সামারি'}
                      {checkoutStep === 'otp' && 'মোবাইল ভেরিফিকেশন'}
                      {checkoutStep === 'payment' && (paymentMethod === 'prepaid' ? 'bKash Payment' : 'Confirm Order')}
                    </h3>
                    <button onClick={() => setShowCheckoutPopup(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 ">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-magenta transition-all duration-300 "
                      style={{ 
                        width: checkoutStep === 'summary' ? '33%' : 
                               checkoutStep === 'otp' ? '66%' : '100%' 
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase flex justify-between">
                    <span className={checkoutStep === 'summary' ? 'text-brand-magenta' : ''}>Step 1</span>
                    <span className={checkoutStep === 'otp' ? 'text-brand-magenta' : ''}>Step 2</span>
                    <span className={checkoutStep === 'payment' ? 'text-brand-magenta' : ''}>Step 3</span>
                  </div>
                </div>
              )}`;

const replacement = `{checkoutStep !== 'success' && checkoutStep !== 'preparing' && (
                <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col gap-3 sticky top-0 bg-white z-20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {checkoutStep === 'otp' && 'মোবাইল ভেরিফিকেশন'}
                      {checkoutStep === 'payment' && 'bKash Payment'}
                      {checkoutStep === 'cod_confirm' && 'অর্ডার কনফার্ম করুন'}
                    </h3>
                    <button onClick={() => setShowCheckoutPopup(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 ">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-magenta transition-all duration-300 "
                      style={{ 
                        width: checkoutStep === 'otp' ? '50%' : '100%' 
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase flex justify-between">
                    <span className={checkoutStep === 'otp' ? 'text-brand-magenta' : ''}>Verification</span>
                    <span className={checkoutStep !== 'otp' ? 'text-brand-magenta' : ''}>Confirmation</span>
                  </div>
                </div>
              )}`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('Header replaced.');
} else {
  console.log('Header target not found.');
}
