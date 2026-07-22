import fs from 'fs';
let code = fs.readFileSync('src/components/OrderForm.tsx', 'utf-8');

const targetStart = `{checkoutStep === 'success' && (`;
const startIndex = code.indexOf(targetStart);
if (startIndex !== -1) {
  // Let's find the closing tag for the success div
  const newSuccess = `{checkoutStep === 'success' && (
                <div className="p-6 sm:p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50 via-transparent to-transparent -z-10"></div>
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/10 border border-green-100"
                  >
                    <span className="text-4xl">🎉</span>
                  </motion.div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Congratulations!</h3>
                  <p className="text-xl font-bold text-brand-magenta mb-6">Great Mother ❤️</p>
                  
                  <div className="bg-white/80 p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4">
                    <p className="text-lg text-gray-700 font-medium leading-relaxed">
                      Your Milkimom is on the way to you.<br/>
                      Get Ready to Receive.
                    </p>
                    <div className="h-px w-12 bg-gray-200 mx-auto"></div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      If Any Help Needed,<br/>
                      Please Contact Us<br/>
                      <span className="font-bold text-gray-900 block mt-1">WhatsApp: 01517-102603</span>
                      or Inbox the Milkimom Facebook Page directly.
                    </p>
                  </div>
                  
                  <div className="w-full space-y-3">
                    <a href="https://wa.me/8801517102603" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(37,211,102,0.5)] flex items-center justify-center gap-2">
                      WhatsApp এ যোগাযোগ করুন
                    </a>
                    <button onClick={() => { setShowCheckoutPopup(false); window.location.href = '/'; }} className="w-full bg-white text-gray-800 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
                      হোম পেজে ফিরে যান
                    </button>
                  </div>
                </div>
              )}`;
              
  // Let's replace everything from {checkoutStep === 'success' && ( to the end of the AnimatePresence.
  const endPattern = `</AnimatePresence>`;
  const endIndex = code.indexOf(endPattern, startIndex);
  
  if (endIndex !== -1) {
    code = code.substring(0, startIndex) + newSuccess + '\n            </motion.div>\n          </div>\n        </div>\n      )}' + code.substring(endIndex);
    fs.writeFileSync('src/components/OrderForm.tsx', code);
    console.log('Success step updated');
  } else {
    console.log('End pattern not found');
  }
} else {
  console.log('Start pattern not found');
}
