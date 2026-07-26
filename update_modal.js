import fs from 'fs';

let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

code = code.replace(
  "const [checkoutStep, setCheckoutStep] = useState<'summary' | 'payment' | 'preparing' | 'success'>('summary');",
  "const [checkoutStep, setCheckoutStep] = useState<'summary' | 'otp' | 'payment' | 'preparing' | 'success'>('summary');"
);

const modalStart = '{/* Checkout Popup */}';
const modalEnd = '        )}\n      </AnimatePresence>\n    </section>\n  );\n}';

const startIndex = code.indexOf(modalStart);
const endIndex = code.lastIndexOf(modalEnd);

if (startIndex === -1 || endIndex === -1) {
  console.log('Modal markers not found', startIndex, endIndex);
  process.exit(1);
}

const newModal = `{/* Checkout Popup */}
      <AnimatePresence>
        {showCheckoutPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => {
                if (checkoutStep !== 'success' && checkoutStep !== 'preparing') {
                  setShowCheckoutPopup(false);
                }
              }}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={\`rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 max-h-[90vh] flex flex-col \${checkoutStep === 'success' ? 'bg-white/90 backdrop-blur-2xl border border-white/50' : 'bg-white'}\`}
            >
              {checkoutStep !== 'success' && checkoutStep !== 'preparing' && (
                <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col gap-3 sticky top-0 bg-white z-20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {checkoutStep === 'summary' && 'অর্ডার সামারি'}
                      {checkoutStep === 'otp' && 'মোবাইল ভেরিফিকেশন'}
                      {checkoutStep === 'payment' && (paymentMethod === 'prepaid' ? 'bKash Payment' : 'Confirm Order')}
                    </h3>
                    <button onClick={() => setShowCheckoutPopup(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-magenta transition-all duration-300"
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
              )}
              
              {checkoutStep === 'summary' && (
                <>
                  <div className="p-5 sm:p-6 overflow-y-auto">
                    <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">প্রোডাক্ট:</span>
                        <span className="font-bold text-gray-900">মিল্কিমম কমপ্লিট ডোজ</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">ফ্লেভার:</span>
                        <span className="font-bold text-gray-900">{FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">নাম:</span>
                        <span className="font-bold text-gray-900">{name}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">মোবাইল:</span>
                        <span className="font-bold text-gray-900">{phone}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">ঠিকানা:</span>
                        <span className="font-bold text-gray-900 text-right max-w-[200px]">{address}, {thana}, {district}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">পেমেন্ট মেথড:</span>
                        <span className="font-bold text-gray-900">{paymentMethod === 'prepaid' ? 'Pay Now (bKash)' : 'Cash on Delivery'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">ডেলিভারি চার্জ:</span>
                        <span className="font-bold text-gray-900">{isFreeDelivery ? 'FREE' : '১৫০/='}</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-900 font-bold">মোট বিল:</span>
                        <span className="font-bold text-brand-magenta bengali-num text-lg">{toBengaliNum(totalPrice)}/=</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20">
                    <button 
                      onClick={() => setCheckoutStep('otp')}
                      className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-brand-magenta to-brand-peach text-white hover:scale-[1.02] shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)]"
                    >
                      পরবর্তী ধাপ (Next) <ArrowRight size={20} />
                    </button>
                  </div>
                </>
              )}

              {checkoutStep === 'otp' && (
                <>
                  <div className="p-5 sm:p-6 overflow-y-auto">
                    <div className="bg-brand-lightpink/20 p-5 rounded-xl border border-brand-peach/30">
                      <h4 className="font-bold text-gray-900 mb-3 text-center">মোবাইল নাম্বার ভেরিফিকেশন</h4>
                      <div className="bg-yellow-100 text-yellow-800 text-xs text-center p-2 rounded mb-3 border border-yellow-200">
                        <strong>Development Mode</strong><br/>
                        OTP verification is temporarily disabled.
                      </div>
                      <p className="text-sm text-gray-600 text-center mb-4">আপনার <span className="font-bold text-gray-800">{phone}</span> নাম্বারে একটি ৪ ডিজিটের OTP কোড পাঠানো হবে।</p>
                      
                      {!showOtp && !otpVerified && (
                        <button type="button" onClick={handleSendOtp} className="w-full bg-brand-gold text-gray-900 py-3 rounded-xl font-bold shadow-sm hover:scale-[1.02] transition-all">
                          OTP পাঠান
                        </button>
                      )}

                      {showOtp && !otpVerified && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                          <input 
                            onChange={handleVerifyOtp} 
                            type="text" 
                            maxLength={4} 
                            placeholder="৪ ডিজিটের কোডটি লিখুন" 
                            className={\`w-full text-center tracking-[0.5em] text-xl font-mono py-3 border-2 rounded-xl outline-none transition-colors bg-white \${otpError ? 'border-red-500 focus:border-red-500 text-red-600' : 'border-brand-peach/50 focus:border-brand-magenta'}\`} 
                          />
                          {otpError && <p className="text-red-500 text-sm font-bold text-center mt-2">{otpError}</p>}
                          <div className="text-sm text-gray-500 flex items-center justify-between px-2">
                            {otpCount > 0 ? (
                              <span>০:{otpCount.toString().padStart(2, '0')} সেকেন্ড পর আবার পাঠাতে পারবেন</span>
                            ) : (
                              <button type="button" onClick={handleSendOtp} className="text-brand-magenta font-bold underline">আবার OTP পাঠান</button>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {otpVerified && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-bold mb-4">
                          ✅ OTP সফলভাবে ভেরিফাই হয়েছে।
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20 flex gap-3">
                    <button 
                      onClick={() => setCheckoutStep('summary')}
                      className="py-4 px-6 rounded-2xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      disabled={!otpVerified}
                      className={\`flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all \${
                        otpVerified 
                          ? 'bg-gradient-to-r from-brand-magenta to-brand-peach text-white hover:scale-[1.02] shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)] cursor-pointer' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }\`}
                    >
                      পরবর্তী ধাপ (Next) <ArrowRight size={20} />
                    </button>
                  </div>
                </>
              )}

              {checkoutStep === 'payment' && (
                <>
                  <div className="p-5 sm:p-6 overflow-y-auto">
                    {paymentMethod === 'prepaid' ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">bKash Payment</h4>
                          <p className="text-gray-600 text-sm">নিচের নাম্বারে {toBengaliNum(totalPrice)}/= সেন্ড মানি করুন</p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                          <p className="text-sm text-gray-500 mb-1">বিকাশ পার্সোনাল নাম্বার</p>
                          <p className="text-2xl font-mono font-bold text-brand-magenta tracking-wider">01712-345678</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2">যে নাম্বার থেকে টাকা পাঠিয়েছেন</label>
                            <input 
                              type="tel" 
                              placeholder="01XXX-XXXXXX"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2">Transaction ID (TrxID)</label>
                            <input 
                              type="text" 
                              placeholder="8A7B6C5D4E"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta outline-none font-mono uppercase"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center space-y-4">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Truck size={40} className="text-green-500" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Cash on Delivery</h4>
                        <p className="text-gray-600">
                          প্রোডাক্ট হাতে পেয়ে ডেলিভারি ম্যানকে {toBengaliNum(totalPrice)}/= পেমেন্ট করবেন।
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20 flex gap-3">
                    <button 
                      onClick={() => setCheckoutStep('otp')}
                      className="py-4 px-6 rounded-2xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={confirmOrder}
                      className="flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-brand-magenta to-brand-peach text-white hover:scale-[1.02] shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)]"
                    >
                      <ShieldCheck size={24} /> {paymentMethod === 'prepaid' ? 'পেমেন্ট কনফার্ম করুন' : 'অর্ডার কনফার্ম করুন'}
                    </button>
                  </div>
                </>
              )}

              {checkoutStep === 'preparing' && (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-brand-peach/30 border-t-brand-magenta rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="text-brand-magenta animate-pulse" size={32} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">অর্ডার প্রসেস হচ্ছে...</h3>
                  <p className="text-gray-500">আপনার তথ্যগুলো ভেরিফাই করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।</p>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="p-8 sm:p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50 via-transparent to-transparent -z-10"></div>
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">অর্ডার সফল হয়েছে!</h3>
                  
                  <div className="bg-white/80 p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-3">
                    <p className="text-lg text-gray-700 font-medium">
                      ধন্যবাদ <span className="font-bold text-gray-900">{name}</span>!
                    </p>
                    <p className="text-gray-600">
                      আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। 
                      আমাদের একজন প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 items-center justify-center text-sm font-medium mb-6">
                    <p className="flex items-center gap-2 justify-center text-gray-800 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                      <span className="text-red-500">❤️</span> 01517-102603 <span className="text-xs text-gray-400 font-normal">(Call / WhatsApp)</span>
                    </p>
                    <p className="flex items-center gap-2 justify-center text-gray-800 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                      <span className="text-red-500">❤️</span> milkimominfo@gmail.com
                    </p>
                  </div>
                  
                  <div className="w-full space-y-3">
                    <a href="https://wa.me/8801517102603" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all shadow-[0_10px_20px_-10px_rgba(37,211,102,0.5)] flex items-center justify-center gap-2">
                      WhatsApp এ যোগাযোগ করুন
                    </a>
                    <button onClick={() => { setShowCheckoutPopup(false); window.location.href = '/'; }} className="w-full bg-white text-gray-800 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
                      হোম পেজে ফিরে যান
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
`;

const newCode = code.slice(0, startIndex) + newModal + code.slice(endIndex);
fs.writeFileSync('src/components/OrderForm.tsx', newCode);
console.log('Successfully replaced modal');
