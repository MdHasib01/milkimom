import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { useCountdownTimer } from '../hooks/useCountdownTimer';

export default function FloatingActions() {
  const navigate = useNavigate();
  const [showSticky, setShowSticky] = useState(false);
  const timeLeft = useCountdownTimer();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        setShowSticky(window.scrollY > hero.offsetHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent("আমি Milkimom অর্ডার করতে চাই। দয়া করে আমাকে সাহায্য করুন।");
    window.open(`https://wa.me/8801517102603?text=${text}`, '_blank');
  };

  const scrollToFlavour = () => { navigate("/checkout"); };

  return (
    <>
      {/* Floating WhatsApp */}
      <button 
        onClick={openWhatsApp}
        className="fixed bottom-24 right-4 sm:bottom-24 sm:right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group flex items-center justify-center border-4 border-white"
      >
        <span className="absolute right-full mr-4 bg-white text-gray-900 text-sm font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 -opacity pointer-events-none border border-gray-100">
          WhatsApp এ অর্ডার করুন
        </span>
        <MessageCircle size={28} />
      </button>

      {/* Sticky Mobile CTA adapted from provided HTML theme */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full h-[72px] sm:h-[80px] bg-[#e87b6b] flex items-center px-4 sm:px-12 justify-between z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] rounded-t-xl"
          >
            <div className="hidden lg:flex items-center gap-8 opacity-80">
              <span className="text-[10px] font-black tracking-widest text-white">HALAL CERTIFIED</span>
              <span className="text-[10px] font-black tracking-widest text-white">ISO 22000</span>
              <span className="text-[10px] font-black tracking-widest text-white">BSTI REGISTERED</span>
            </div>
            
            <div className="flex items-center justify-between w-full lg:w-auto gap-3 sm:gap-6">
              {/* PRICE */}
              <div className="text-left sm:text-right shrink-0">
                <p className="text-[10px] sm:text-[11px] font-bold text-white/80 line-through leading-none bengali-num">৳৮৯৯০</p>
                <p className="text-lg sm:text-xl font-black text-white bengali-num leading-relaxed">৳৪৯৯০</p>
              </div>

              {/* TIMER */}
              {timeLeft && (
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/90 mb-0.5">শেষ হতে:</span>
                  <div className="flex items-center font-mono text-[12px] sm:text-[14px] font-bold text-brand-peach bg-white px-1.5 sm:px-2 py-0.5 rounded shadow-sm" dir="ltr">
                    <span>{timeLeft.h.toString().padStart(2, '0')}</span>
                    <span className="text-brand-peach mx-0.5 font-bold animate-pulse">:</span>
                    <span>{timeLeft.m.toString().padStart(2, '0')}</span>
                    <span className="text-brand-peach mx-0.5 font-bold animate-pulse">:</span>
                    <span>{timeLeft.s.toString().padStart(2, '0')}</span>
                  </div>
                </div>
              )}

              {/* CTA BUTTON */}
              <button onClick={scrollToFlavour} className="bg-white text-[#e87b6b] text-sm sm:text-base px-4 sm:px-8 py-3 rounded-lg min-h-[48px] flex items-center justify-center font-bold shadow transition-transform duration-300 group-hover:scale-105 whitespace-nowrap shrink-0">
                এখনই অর্ডার করুন
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
