import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMotherCounter } from '../hooks/useMotherCounter';
import { Check, Square, Heart, ArrowRight } from 'lucide-react';

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

export default function ObjectionNormalization() {
  const navigate = useNavigate();
  const { total: masterMotherCount } = useMotherCounter();
  const [checkedCount, setCheckedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const objections = [
    "আমার ক্ষেত্রে কাজ হবে তো?",
    "আমার বুকের দুধ প্রায় বন্ধ...",
    "আমি তো Formula শুরু করে ফেলেছি...",
    "আমি Pump ব্যবহার করি...",
    "আমার Baby এখন অনেক বড়...",
    "এত দাম... যদি Result না পাই?"
  ];

  const handleViewportEnter = () => {
    if (hasStarted) return;
    setHasStarted(true);
    
    let currentCount = 0;
    timerRef.current = setInterval(() => {
      currentCount++;
      setCheckedCount(currentCount);
      if (currentCount >= objections.length) {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  const isAllChecked = checkedCount >= objections.length;

  return (
    <section className="bg-brand-cream py-12 lg:py-16 overflow-hidden relative border-t border-brand-peach/10">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-peach/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-balance text-3xl sm:text-4xl font-black text-gray-950 leading-tight tracking-tight"
          >
            আপনারও কি এই চিন্তাগুলো হচ্ছে?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-600 text-base sm:text-lg font-medium"
          >
            আপনি একা নন। প্রায় প্রত্যেক মা-ই মিল্কিমম নেওয়ার আগে এই প্রশ্নগুলো করেন।
          </motion.p>
        </div>

        {/* Objections Grid with Viewport Trigger */}
        <motion.div 
          onViewportEnter={handleViewportEnter}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8"
        >
          {objections.map((objection, index) => {
            const isChecked = index < checkedCount;
            return (
              <div
                key={index}
                className={`p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 bg-white/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.01)] ${
                  isChecked 
                    ? 'border-[#10b981]/30 bg-emerald-50/10' 
                    : 'border-gray-150'
                }`}
              >
                {/* Custom animated checkbox */}
                <div className="shrink-0 relative w-6 h-6">
                  <AnimatePresence mode="wait">
                    {!isChecked ? (
                      <motion.div
                        key="unchecked"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-gray-300 flex items-center justify-center"
                      >
                        <Square size={20} strokeWidth={1.5} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="checked"
                        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                        animate={{ opacity: [0, 1.2, 1], scale: 1, rotate: 0 }}
                        className="w-6 h-6 rounded-full bg-emerald-500/10 text-[#10b981] flex items-center justify-center"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <span className={`font-bold text-base transition-colors duration-300 ${isChecked ? 'text-gray-900' : 'text-gray-500'}`}>
                  {objection}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* After Last Check Area */}
        <div className="min-h-[160px] flex flex-col items-center justify-center text-center">
          <AnimatePresence>
            {isAllChecked && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-rose-500 text-2xl animate-pulse">
                    ❤️
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                    আপনি একা নন।
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
                    এই প্রশ্নগুলো প্রায় সব মায়েরই থাকে। তারপরও <span className="text-brand-magenta font-black bengali-num">{toBengaliNum(masterMotherCount)}+</span> মা মিল্কিমম বেছে নিয়েছেন।
                  </p>
                </div>

                <div className="pt-2 flex justify-center">
                  <button 
                    onClick={handleGoToCheckout}
                    className="group relative inline-flex gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-brand-magenta to-brand-peach text-white sm:text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.35)] w-full sm:w-auto hover:shadow-[0_20px_45px_-12px_rgba(189,0,82,0.5)] cursor-pointer text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
                    <span>আমিও নিশ্চিন্ত হতে চাই</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 " />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
