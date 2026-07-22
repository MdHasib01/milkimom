import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMotherCounter } from '../hooks/useMotherCounter';
import { Check, Heart, HelpCircle, ArrowRight } from 'lucide-react';

function toBengaliNum(num: number | string): string {
  const englishToBengaliMap: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯'
  };
  return num.toString().split('').map(char => englishToBengaliMap[char] || char).join('');
}

export default function DecisionCommitment() {
  const navigate = useNavigate();
  const { total: masterMotherCount } = useMotherCounter();
  const [selectedOption, setSelectedOption] = useState<1 | 2 | null>(null);

  // Placeholder tracking function
  const trackEvent = (eventName: string) => {
    console.log(`[Analytics] Tracked: ${eventName}`);
  };

  const handleSelectOption1 = () => {
    setSelectedOption(1);
    trackEvent('DecisionCommitmentAccepted');
  };

  const handleSelectOption2 = () => {
    setSelectedOption(2);
    trackEvent('DecisionCommitmentDeferred');
  };

  const handleScrollToFlavour = () => { navigate("/checkout"); };

  const handleScrollToFAQ = () => {
    const el = document.getElementById('faq');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-brand-cream/40 py-12 lg:py-16 overflow-hidden relative border-t border-brand-peach/10">
      {/* Soft elegant background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-peach/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-balance text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 leading-tight tracking-tight"
          >
            আপনার সিদ্ধান্ত এখন শুধু একটি প্রশ্নের উপর নির্ভর করছে...
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg font-medium"
          >
            একজন মা হিসেবে, আপনি আপনার বাবুর জন্য কোন পথটি বেছে নিতে চান?
          </motion.p>
        </div>

        {/* Option Cards Area */}
        <div className="max-w-2xl mx-auto relative min-h-[220px]">
          <AnimatePresence mode="wait">
            {selectedOption !== 1 ? (
              <motion.div
                key="options-container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* Option Card 1 (Primary) */}
                <motion.div
                  onClick={handleSelectOption1}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[180px] ${
                    selectedOption === 1
                      ? 'border-brand-magenta bg-brand-lightpink/10 shadow-[0_8px_30px_rgba(189,0,82,0.08)]'
                      : 'border-brand-peach/30 bg-brand-cream/30 hover:border-brand-magenta/40 hover:bg-brand-lightpink/5'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <p className="text-gray-900 font-bold text-base sm:text-lg leading-relaxed mb-2">
                    আমি চাই, <br />আমার বাবু বুকের দুধের পূর্ণ উপকারিতা পাক।
                  </p>
                  <div className="text-xs font-semibold text-brand-magenta tracking-wide uppercase mt-auto">
                    বেছে নিন 🟢
                  </div>
                </motion.div>

                {/* Option Card 2 */}
                <motion.div
                  onClick={handleSelectOption2}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[180px] ${
                    selectedOption === 2
                      ? 'border-gray-400 bg-gray-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-4">
                    <HelpCircle size={20} />
                  </div>
                  <p className="text-gray-800 font-bold text-base sm:text-lg leading-relaxed mb-2">
                    আমি আরও তথ্য দেখে <br />তারপর সিদ্ধান্ত নেব।
                  </p>
                  <div className="text-xs font-semibold text-gray-400 tracking-wide uppercase mt-auto">
                    বেছে নিন ⚪
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* Success Statement (If Option 1 is selected) */
              <motion.div
                key="success-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-white border-2 border-emerald-500/20 p-8 rounded-2xl shadow-[0_15px_35px_-10px_rgba(16,185,129,0.1)] text-center space-y-6 max-w-lg mx-auto"
              >
                <div className="flex justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-4xl"
                  >
                    ❤️
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950">
                    আপনি আপনার বাবুর জন্য একটি সুন্দর সিদ্ধান্ত নিয়েছেন।
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg font-bold leading-relaxed">
                    আপনার মতো <span className="text-brand-magenta font-black bengali-num">{toBengaliNum(masterMotherCount)}+</span> মা মিল্কিমম বেছে নিয়েছেন।
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleScrollToFlavour}
                    className="group relative inline-flex gap-3 px-8 sm:px-10 py-4 bg-gradient-to-r from-brand-magenta to-brand-peach text-white sm:text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.35)] w-full hover:shadow-[0_20px_45px_-12px_rgba(189,0,82,0.5)] cursor-pointer text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
                    <span>এখন আমার পছন্দের ফ্লেভারটি নির্বাচন করছি</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 " />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Deferred Expanded Message (If Option 2 is selected) */}
        <AnimatePresence>
          {selectedOption === 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 max-w-lg mx-auto bg-gray-50 border border-gray-100 p-6 rounded-2xl text-center space-y-4 overflow-hidden"
            >
              <p className="text-gray-700 font-bold text-sm sm:text-base leading-relaxed">
                আমরা আপনার সিদ্ধান্তকে সম্মান করি। <br />
                আরও নিচে মিল্কিমম সম্পর্কে বিস্তারিত তথ্য দেখতে পারেন। <br />
                যখন প্রস্তুত মনে হবে, তখন আপনার পছন্দের ফ্লেভারটি নির্বাচন করুন।
              </p>
              
              <div>
                <button
                  onClick={handleScrollToFAQ}
                  className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 font-bold text-sm rounded-xl shadow-sm transition-all duration-300 inline-flex items-center gap-1.5 cursor-pointer hover:-translate-y-1 hover:shadow-lg active:scale-95 "
                >
                  <span>আরও তথ্য দেখুন</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
