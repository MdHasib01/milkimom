import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const targetJSX = `{checkoutStep === 'otp' && (
                <>
                  <div className="p-5 sm:p-6 overflow-y-auto">
                    <div className="bg-brand-lightpink/20 p-5 rounded-xl border border-brand-peach/30">
                      <h4 className="font-bold text-gray-900 mb-3 text-center">মোবাইল নাম্বার ভেরিফিকেশন</h4>
                      <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">আপনার দেওয়া মোবাইল নাম্বারটি ভেরিফাই করুন।<br/><span className="font-bold text-gray-800">{phone}</span></p>
                      
                      <div className="bg-yellow-100 text-yellow-800 text-xs text-center p-2 rounded mb-3 border border-yellow-200">
                        <strong>Development Mode</strong><br/>
                        OTP verification is temporarily bypassed.
                      </div>
                      
                      {!showOtp && !otpVerified && (
                        <button type="button" onClick={() => { setOtpVerified(true); setShowOtp(true); }} className="w-full bg-brand-gold text-gray-900 py-3 rounded-xl font-bold shadow-sm hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300">
                          OTP পাঠান
                        </button>
                      )}
                      
                      {otpVerified && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-bold mt-4">
                          ✅ মোবাইল নাম্বার সফলভাবে ভেরিফাই হয়েছে।
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20 flex gap-3">
                    <button 
                      onClick={() => setShowCheckoutPopup(false)}
                      className="py-4 px-6 rounded-2xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      disabled={!otpVerified}
                      className={\`flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 \${
                        otpVerified 
                          ? 'bg-gradient-to-r from-brand-magenta to-brand-peach text-white hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)] cursor-pointer' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }\`}
                    >
                      পরবর্তী ধাপ (Next) <ArrowRight size={20} />
                    </button>
                  </div>
                </>
              )}`;

const newJSX = `{checkoutStep === 'otp' && (
                <>
                  <div className="p-5 sm:p-6 overflow-y-auto">
                    <div className="bg-brand-lightpink/20 p-5 rounded-xl border border-brand-peach/30">
                      <h4 className="font-bold text-gray-900 mb-3 text-center">মোবাইল নাম্বার ভেরিফিকেশন</h4>
                      <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">আপনার দেওয়া মোবাইল নাম্বারে একটি OTP পাঠানো হবে।<br/><span className="font-bold text-gray-800">{phone}</span></p>
                      
                      {!showOtp && !otpVerified && (
                        <button type="button" onClick={handleSendOtp} className="w-full bg-brand-gold text-gray-900 py-3 rounded-xl font-bold shadow-sm hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300">
                          OTP পাঠান
                        </button>
                      )}
                      
                      {showOtp && !otpVerified && (
                        <div className="space-y-4">
                          <div>
                            <input 
                              id="otp-input"
                              type="text" 
                              placeholder="OTP লিখুন" 
                              maxLength={6}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta outline-none text-center text-xl font-mono tracking-widest"
                            />
                            {otpError && <p className="text-red-500 text-sm mt-2 text-center font-bold">{otpError}</p>}
                          </div>
                          <button type="button" onClick={submitOtp} className="w-full bg-brand-gold text-gray-900 py-3 rounded-xl font-bold shadow-sm hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300">
                            OTP যাচাই করুন
                          </button>
                        </div>
                      )}
                      
                      {otpVerified && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-bold mt-4">
                          ✅ মোবাইল নাম্বার সফলভাবে ভেরিফাই হয়েছে।
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20 flex gap-3">
                    <button 
                      onClick={() => setShowCheckoutPopup(false)}
                      className="py-4 px-6 rounded-2xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      disabled={!otpVerified}
                      className={\`flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 \${
                        otpVerified 
                          ? 'bg-gradient-to-r from-brand-magenta to-brand-peach text-white hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)] cursor-pointer' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }\`}
                    >
                      পরবর্তী ধাপ (Next) <ArrowRight size={20} />
                    </button>
                  </div>
                </>
              )}`;

if (code.includes(targetJSX)) {
  code = code.replace(targetJSX, newJSX);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log('OTP JSX fixed');
} else {
  console.log('Target JSX not found');
}
