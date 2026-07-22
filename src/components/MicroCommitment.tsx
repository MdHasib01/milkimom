import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function MicroCommitment() {
  const handleScrollToAuthority = () => {
    const el = document.getElementById('authority-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-brand-cream/40 py-12 lg:py-16 overflow-hidden relative border-t border-brand-peach/10">
      {/* Soft atmospheric background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-peach/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Small Intro Text */}
          <div className="flex items-center justify-center gap-1.5 text-gray-500 text-xs sm:text-sm font-medium tracking-wide">
            <Sparkles size={14} className="text-brand-gold animate-pulse" />
            <span>আপনার বাবুর জন্য সঠিক সিদ্ধান্ত নেওয়ার আগে আরও একটি বিষয় দেখে নিন।</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-balance text-3xl sm:text-4xl font-black text-gray-950 leading-tight tracking-tight">
            আমি চাই, <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta to-brand-peach">আমার বাবুও বুকের দুধের পূর্ণ উপকারিতা পাক।</span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            হাজারো মায়ের মতো আপনিও একটি সঠিক সিদ্ধান্তের খুব কাছাকাছি।
          </p>

          {/* Primary CTA */}
          <div className="pt-4 flex justify-center">
            <button 
              onClick={handleScrollToAuthority}
              className="group relative inline-flex gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-brand-magenta to-brand-peach text-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.35)] w-full sm:w-auto hover:shadow-[0_20px_45px_-12px_rgba(189,0,82,0.5)] cursor-pointer text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
            >
              {/* Premium hover shine */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
              <span>হ্যাঁ, আমিও মিল্কিমম বেছে নিতে চাই</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
