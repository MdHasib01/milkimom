import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, X } from 'lucide-react';

export default function ExitIntent() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const scrollToForm = () => { setShow(false); navigate("/checkout"); };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            className="bg-white/95 backdrop-blur-xl border border-white rounded-2xl p-8 sm:p-10 max-w-md w-full text-center shadow-[0_30px_60px_-15px_rgba(189,0,82,0.15)] relative overflow-hidden"
          >
             <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50/50 hover:bg-gray-100 p-3 rounded-full transition-colors duration-300 ">
               <X size={20} />
             </button>
             
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-magenta via-brand-peach to-brand-gold"></div>
             
             <div className="w-20 h-20 bg-gradient-to-br from-brand-peach/20 to-brand-magenta/5 border border-white shadow-inner rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="text-brand-magenta w-10 h-10 animate-bounce" />
             </div>

             <h2 className="text-balance text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">অফারটি <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta to-brand-peach">মিস করবেন?</span></h2>
             <p className="text-gray-600 mb-8 font-medium leading-relaxed">আপনার জন্য ১০০ টাকা ইনস্ট্যান্ট ক্যাশব্যাক আনলক করা হয়েছে।</p>
             
             <div className="space-y-4">
               <button onClick={scrollToForm} className="w-full bg-gradient-to-r from-brand-magenta to-brand-peach text-white py-4 rounded-xl hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.4)] text-lg font-bold whitespace-nowrap text-center flex items-center justify-center">
                 হ্যাঁ, এখনই অর্ডার করবো
               </button>
               <button onClick={() => setShow(false)} className="w-full text-gray-500 py-3 rounded-xl font-medium hover:bg-brand-peach/10 transition-colors duration-300 ">
                 না, পরে দেখবো
               </button>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
