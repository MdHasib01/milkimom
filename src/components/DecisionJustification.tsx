import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function DecisionJustification() {
  const navigate = useNavigate();
  const handleScrollToFlavour = () => { navigate("/checkout"); };

  const points = [
    "মাত্র ১ ডোজই যথেষ্ট",
    "মাত্র ৩ দিনের মধ্যেই পরিবর্তন শুরু হয়",
    "ব্রেস্টফিডিংয়ের শেষ পর্যন্ত বুকের দুধ বজায় রাখতে সাহায্য করে",
    "বিশ্বব্যাপী স্বীকৃত সার্টিফিকেশন",
    "১০০% ন্যাচারাল ও সাইডইফেক্ট মুক্ত",
    "ফর্মুলা দুধের বারবার খরচ থেকে মুক্তি"
  ];

  return (
    <section className="bg-brand-cream/40 py-12 lg:py-16 overflow-hidden relative border-t border-brand-peach/10">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-peach/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-balance text-3xl sm:text-4xl font-black text-gray-950 leading-tight tracking-tight"
          >
            কেন হাজারো মা শেষ পর্যন্ত <span className="text-brand-magenta">মিল্কিমমই</span> বেছে নেন?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-600 text-base sm:text-lg md:text-xl font-medium"
          >
            কারণ সিদ্ধান্ত নেওয়ার আগে তারা এই বিষয়গুলো বিবেচনা করেন—
          </motion.p>
        </div>

        {/* 6 Premium Checklist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mb-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-brand-peach/15 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex items-start gap-4 transition-all duration-300 "
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981] shadow-inner mt-0.5">
                <Check size={18} strokeWidth={3} />
              </div>
              <p className="text-gray-800 font-bold text-base sm:text-lg leading-snug pt-0.5">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Highlight & CTA */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-brand-magenta font-black text-lg sm:text-xl leading-relaxed"
          >
            আজকের এই সিদ্ধান্তের উপকারিতা <br className="sm:hidden" />
            আপনার বাবু অনেক দিন ধরে পাবে।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex justify-center"
          >
            <button 
              onClick={handleScrollToFlavour}
              className="group relative inline-flex gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-brand-magenta to-brand-peach text-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.35)] w-full sm:w-auto hover:shadow-[0_20px_45px_-12px_rgba(189,0,82,0.5)] cursor-pointer text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
              <span>আমিও এই সিদ্ধান্ত নিতে চাই</span>
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
