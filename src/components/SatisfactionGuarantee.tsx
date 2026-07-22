import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Truck, RefreshCcw, HandCoins } from 'lucide-react';
import { useMotherCounter } from '../hooks/useMotherCounter';

export default function SatisfactionGuarantee() {
  const navigate = useNavigate();
  const counts = useMotherCounter();
  const handleScrollToOrder = () => { navigate("/checkout"); };


  return (
    <section id="satisfaction-guarantee" className="py-12 lg:py-16 bg-[#fffdfa] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-4 bg-brand-gold/10 rounded-full mb-6">
            <ShieldCheck size={48} className="text-brand-gold" />
          </div>
          <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            100% স্যাটিসফিকেশন গ্যারান্টি
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-10 border border-brand-gold/20 shadow-[0_20px_50px_-20px_rgba(230,168,50,0.15)] relative overflow-hidden"
        >
          {/* Inner Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50"></div>

          <div className="text-center space-y-6">
            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              📌 মিল্কিমম খাওয়ার ১৪ দিনের মধ্যেও আপনি যদি স্যাটিসফাইড না হন, <br className="hidden sm:block" />
              তাহলে এই <a href="https://wa.me/8801517102603?text=আসসালামু%20আলাইকুম।%0Aআমি%20মিল্কিমম%20সম্পর্কে%20অভিযোগ%20করতে%20চাই।" target="_blank" rel="noopener noreferrer" className="text-brand-magenta font-bold hover:underline transition-all duration-300 ">01517102603</a> নাম্বারে জানালেই আপনার সম্পূর্ণ টাকা ফেরত দেওয়া হবে। ✅
            </p>

            <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed">
              এমনকি, আপনাকে একটি প্রশ্নও করা হবে না। 🥰
            </p>

            <div className="w-16 h-px bg-gray-200 mx-auto my-6"></div>

            <p className="text-lg sm:text-xl text-gray-800 font-bold leading-relaxed">
              তবে ম্যাম, মিল্কিমম খেয়ে বুকের দুধ আসবেই ইনশাআল্লাহ। ✅
            </p>

            <p className="text-lg sm:text-xl text-gray-800 font-bold bg-brand-lightpink/30 py-3 px-6 rounded-2xl inline-block leading-relaxed">
              🔴 <span className="bengali-num text-brand-magenta">{counts.total.toLocaleString('bn-BD')}</span>+ জন মা মিল্কিমম খেয়ে বুকের দুধের পূর্ণ সমাধান পেয়েছেন। 🥰
            </p>
          </div>

          <div className="mt-8 mb-8 flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-gray-700">
              <ShieldCheck size={18} className="text-[#10b981]" />
              100% Satisfaction Guarantee
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-gray-700">
              <ShieldCheck size={18} className="text-[#10b981]" />
              14-Day Satisfaction Promise
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-gray-700">
              <RefreshCcw size={18} className="text-[#10b981]" />
              No Question Asked Refund
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-gray-700">
              <Truck size={18} className="text-[#10b981]" />
              Free Home Delivery
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-gray-700">
              <HandCoins size={18} className="text-[#10b981]" />
              Cash On Home Delivery
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleScrollToOrder}
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#ff8f80] to-[#e87b6b] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold shadow-[0_10px_30px_-10px_rgba(232,123,107,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(232,123,107,0.6)] transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              <span>টাকা ফেরত নয়, বাবুর দুধ যাতে পায় এজন্য মিল্কিমম অর্ডার করছি</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300 " />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
