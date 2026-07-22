import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function DecisionReinforcement() {
  const handleScrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: "🛡️",
      title: "শক্তিশালী রোগ প্রতিরোধ ক্ষমতা",
      bg: "from-blue-500/10 to-blue-600/5",
      border: "border-blue-500/10"
    },
    {
      icon: "🧠",
      title: "মস্তিষ্কের স্বাভাবিক বিকাশ",
      bg: "from-purple-500/10 to-purple-600/5",
      border: "border-purple-500/10"
    },
    {
      icon: "❤️",
      title: "মা ও বাবুর গভীর বন্ধন",
      bg: "from-pink-500/10 to-pink-600/5",
      border: "border-pink-500/10"
    },
    {
      icon: "🌱",
      title: "সুস্থ ও স্বাভাবিক বেড়ে ওঠা",
      bg: "from-green-500/10 to-green-600/5",
      border: "border-green-500/10"
    }
  ];

  return (
    <section className="bg-brand-cream/60 py-12 lg:py-16 overflow-hidden relative border-t border-brand-peach/10">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-peach/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Header Section */}
        <div className="space-y-4 mb-8 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-balance text-3xl sm:text-4xl font-black text-gray-950 leading-tight tracking-tight"
          >
            আজকের একটি ছোট সিদ্ধান্ত, <br className="hidden sm:inline" />
            <span className="text-brand-magenta">আপনার বাবুর আগামী দিনের বড় উপহার।</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-700 text-base sm:text-lg md:text-xl font-medium leading-relaxed"
          >
            বুকের দুধের সবচেয়ে বড় উপকারগুলো চোখে দেখা যায় না। <br className="hidden md:inline" />
            কিন্তু সেগুলোই একটি শিশুর ভবিষ্যৎ গড়ে দেয়।
          </motion.p>
        </div>

        {/* Benefit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`bg-white/75 backdrop-blur-md p-6 rounded-2xl border ${b.border} shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center text-center transition-all duration-300 group`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${b.bg} flex items-center justify-center text-3xl mb-4 shadow-inner transform group-hover:scale-110 transition-transform duration-300 `}>
                {b.icon}
              </div>
              <h3 className="text-gray-900 font-bold text-base sm:text-lg leading-snug">
                {b.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="space-y-6"
        >
          <p className="text-brand-magenta font-black text-lg sm:text-xl tracking-wide leading-relaxed">
            আপনার বাবু এই উপকারগুলো পাওয়ার যোগ্য।
          </p>

          <div className="flex justify-center">
            <button 
              onClick={handleScrollToReviews}
              className="group relative inline-flex gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-brand-magenta to-brand-peach text-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.35)] w-full sm:w-auto hover:shadow-[0_20px_45px_-12px_rgba(189,0,82,0.5)] cursor-pointer text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
              <span>আমিও চাই আমার বাবু এই উপকারগুলো পাক</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300 " />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
