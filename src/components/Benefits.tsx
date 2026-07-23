import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpCircle, RefreshCcw, ShieldPlus, Droplet, PiggyBank, ArrowRight } from 'lucide-react';

const BENEFITS = [
  { icon: ArrowUpCircle, text: 'বুকের দুধ পার্মানেন্টলি বাড়াতে' },
  { icon: RefreshCcw, text: 'বন্ধ হয়ে যাওয়া বুকের দুধ পুনরায় তৈরি করতে' },
  { icon: ShieldPlus, text: 'বুকের দুধের সব পুষ্টিগুণ বজায় রাখতে' },
  { icon: Droplet, text: 'বুকের দুধ অতিরিক্ত পাতলা হলে তা ঘন করতে' },
  { icon: PiggyBank, text: 'ফর্মুলা কেনার বিশাল খরচ বাঁচাতে' },
];

export default function Benefits() {
  const navigate = useNavigate();
  const scrollToForm = () => { navigate("/checkout"); };

  return (
    <section className="py-12 lg:py-16 bg-[#fdfbfb] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-peach/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">কেন মিল্কিমম খাবেন?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">মা ও শিশুর সুস্থতায় 100% ন্যাচারাল এবং কার্যকরী সমাধান</p>
        </div>

        <div className="space-y-4">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-white flex items-center gap-4 sm:gap-6 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-brand-peach to-brand-lightpink flex items-center justify-center shrink-0 shadow-inner">
                <benefit.icon className="text-white w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
              </div>
              <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed">
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={scrollToForm}
            className="inline-flex gap-3 px-8 py-4 bg-gradient-to-r from-brand-magenta to-brand-peach text-white rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.4)] text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
          >
            আমি বুকের দুধ বাড়াতে চাই
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
