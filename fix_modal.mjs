import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

// The replacement starts from `{checkoutStep === 'otp' && (` and ends before `{checkoutStep === 'preparing' && (`
const startPattern = "{checkoutStep === 'otp' && (";
const endPattern = "{checkoutStep === 'preparing' && (";

const startIndex = code.indexOf(startPattern);
const endIndex = code.indexOf(endPattern);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `{checkoutStep === 'otp' && (
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
              )}

              {checkoutStep === 'payment' && (
                <>
                  <div className="p-5 sm:p-6 overflow-y-auto">
                    {paymentMethod === 'prepaid' ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">bKash Payment</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">নিচের bKash নাম্বারে <strong>Send Money</strong> করুন।</p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                          <p className="text-sm text-gray-500 mb-1 leading-relaxed">বিকাশ পার্সোনাল নাম্বার</p>
                          <p className="text-2xl font-mono font-bold text-brand-magenta tracking-wider leading-relaxed">01926-344244</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-2 text-base font-semibold text-gray-900">Transaction ID (TrxID) <span className="text-red-500">*</span></label>
                            <input 
                              type="text"
                              value={trxId}
                              onChange={(e) => setTrxId(e.target.value)}
                              placeholder="যেমন: 9AB12CD34E"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta outline-none font-mono uppercase"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-base font-semibold text-gray-900">Screenshot Upload <span className="text-gray-500 font-normal text-sm">(Optional)</span></label>
                            <input 
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp,.pdf"
                              onChange={(e) => setScreenshotUploaded(e.target.files && e.target.files.length > 0)}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta outline-none text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-lightpink file:text-brand-magenta hover:file:bg-brand-peach/20"
                            />
                            <p className="text-xs text-gray-500 mt-2">Accepted: jpg, jpeg, png, webp, pdf</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-brand-lightpink/50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <ShieldCheck size={32} className="text-brand-magenta" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900">অর্ডার কনফার্ম করুন</h4>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Product:</span>
                            <span className="font-bold text-gray-900">Milkimom Complete Dose</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Selected Flavour:</span>
                            <span className="font-bold text-gray-900">{FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-bold text-gray-900">Cash on Delivery</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Product Price:</span>
                            <span className="font-bold text-gray-900 bengali-num">৳৪৯৯০</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Delivery:</span>
                            <span className="font-bold text-gray-900">{isFreeDelivery ? 'FREE' : '৳১৫০'}</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-gray-900 font-bold">Total:</span>
                            <span className="font-bold text-brand-magenta bengali-num text-lg">৳{toBengaliNum(totalPrice)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20 flex gap-3">
                    <button 
                      onClick={() => setCheckoutStep('otp')}
                      className="py-4 px-6 rounded-2xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button 
                      onClick={confirmOrder}
                      className="flex-1 py-4 rounded-2xl gap-2 transition-all duration-300 bg-gradient-to-r from-brand-magenta to-brand-peach text-white hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)] text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
                    >
                      <ShieldCheck size={24} /> {paymentMethod === 'prepaid' ? 'পেমেন্ট সাবমিট করুন' : 'আমার অর্ডার কনফার্ম করুন'}
                    </button>
                  </div>
                </>
              )}

              `;
  code = code.substring(0, startIndex) + replacement + code.substring(endIndex);
  fs.writeFileSync('src/components/OrderForm.tsx', code);
  console.log("Modal content updated successfully.");
} else {
  console.log("Could not find patterns.");
}
