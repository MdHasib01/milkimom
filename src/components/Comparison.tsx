import { motion } from 'motion/react';
import { Check, X, ArrowRight } from 'lucide-react';
import formulaMountainImg from '../assets/images/formula_mountain_1782105493500.jpg';
import carousel1 from '../assets/carousel1.png';

const TABLE_DATA = [
  { m: 'পার্মানেন্ট সলিউশন', o: 'সাময়িক সমাধান' },
  { m: '১ ডোজই যথেষ্ট', o: 'বারবার খেতে হয়' },
  { m: 'ব্রেস্টফিডিং এর শেষ পর্যন্ত বুকের দুধ থাকে', o: 'বুকের দুধ স্থায়ীভাবে বজায় নাও থাকতে পারে' },
  { m: 'খেতে হালকা মিষ্টি ও ৪টি ফ্লেভারে পাওয়া যায়', o: 'স্বাদ ভালো নাও হতে পারে' },
  { m: 'বিশ্বব্যাপী স্বীকৃত', o: 'সবার জন্য একই রকম কার্যকর নাও হতে পারে' },
  { m: '৬+ বছরের গবেষণার মাধ্যমে ক্লিনিক্যালি প্রুভড', o: 'সাইডইফেক্ট থাকতে পারে' },
  { m: '১০০% ইম্পোর্টেড, রেয়ার ও ন্যাচারাল উপাদানে তৈরি', o: 'সীমিত উপাদান' },
  { m: 'সম্পূর্ণ সাইডইফেক্ট মুক্ত', o: 'লং-টার্ম সাপোর্ট কম' },
  { m: 'বাবু সাক না করলেও বা পাম্প ব্যবহার করলেও বুকের দুধ বৃদ্ধি করতে সাহায্য করে', o: 'পাম্প ব্যবহারকারীদের জন্য পর্যাপ্ত সাপোর্ট নাও থাকতে পারে' },
];

export default function Comparison() {
  return (
    <section id="comparison" className="py-8 sm:py-12 lg:py-16 bg-[#fcfaf9] relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-lightpink/15 rounded-full blur-[100px] translate-x-1/3"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-peach/10 rounded-full blur-[100px] -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Mountain Visual Section */}
        <div className="mb-24">
          <div className="text-center mb-8">
            <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              ১ মাসের ফর্মুলা দুধের খরচের তুলনায়,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta to-brand-peach text-[105%] font-[800]">মিল্কিমম খুবই সামান্য।</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              যেখানে ফর্মুলা দুধে বারবার খরচ বাড়তেই থাকে, সেখানে মিল্কিমম একবারের কমপ্লিট ডোজেই বুকের দুধের flow ফিরিয়ে আনতে সাহায্য করে।
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-center max-w-5xl mx-auto">
            {/* Formula Mountain */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] aspect-[16/9] border border-white"
            >
              <img src={formulaMountainImg} alt="Expensive Formula Milk Mountain" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0" onLoad={(e) => e.currentTarget.classList.remove('opacity-0')} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                 <div className="inline-flex items-center gap-2 mb-2 bg-red-500/20 backdrop-blur-md text-red-50 px-4 py-2 rounded-full w-fit border border-red-500/30">
                   <X size={18} className="text-red-400" /> <span className="font-bold text-sm tracking-wide">অন্তহীন খরচ</span>
                 </div>
                 <h3 className="text-white text-2xl font-bold drop-shadow-md">ফর্মুলার পাহাড়</h3>
              </div>
            </motion.div>

            {/* Milkimom Jar */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(189,0,82,0.15)] aspect-[16/9] border border-white group"
            >
              <img src={carousel1} alt="Milkimom Supplement Jar" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 transition-opacity duration-300 opacity-0" onLoad={(e) => e.currentTarget.classList.remove('opacity-0')} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 z-10">
                 <div className="inline-flex items-center gap-2 mb-2 bg-green-500/20 backdrop-blur-md text-green-50 px-4 py-2 rounded-full w-fit border border-green-500/30">
                   <Check size={18} className="text-green-400" /> <span className="font-bold text-sm tracking-wide">একবারের ইনভেস্টমেন্ট</span>
                 </div>
                 <h3 className="text-white text-2xl font-bold drop-shadow-md">মিল্কিমম ১ ডোজ</h3>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })} className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-lg font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] w-full sm:w-auto">
               <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
               <span>ফর্মুলার খরচ কমিয়ে বুকের দুধ নিশ্চিত করতে চাই</span>
               <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-300 " />
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div>
           <div className="text-center mb-8">
            <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              কেন অন্যান্য মেডিসিন এবং “মিল্কিমম” <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta to-brand-peach">সম্পূর্ণ আলাদা?</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md border border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-2 bg-white/80 border-b border-brand-peach/20">
              <div className="p-3 sm:p-4 text-center sm:text-left bg-gradient-to-br from-brand-peach/10 to-brand-lightpink/20 relative border-r border-brand-peach/30 shadow-[inset_0_0_20px_rgba(241,194,125,0.1)]">
                 <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-magenta to-brand-peach"></div>
                 <h3 className="text-lg sm:text-xl font-bold text-brand-magenta drop-shadow-sm flex items-center justify-center sm:justify-start gap-2">
                   <span>👑</span> মিল্কিমম
                 </h3>
              </div>
              <div className="p-3 sm:p-4 text-center sm:text-left bg-gray-50/50">
                <h3 className="text-lg sm:text-xl font-bold text-gray-600">অন্যান্য</h3>
              </div>
            </div>

            {TABLE_DATA.map((row, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.05 }}
                 className="grid grid-cols-2 border-b border-gray-100 hover:bg-white/40 transition-colors duration-300 "
               >
                <div className="p-3 sm:p-4 flex items-start sm:items-center gap-4 bg-brand-lightpink/5 lg:pl-10 group hover:bg-brand-peach/10 transition-colors duration-300 border-r border-brand-peach/20 relative">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-peach to-brand-lightpink flex items-center justify-center shrink-0 border border-white shadow-inner mt-0.5 sm:mt-0 group-hover:scale-110 transition-transform duration-300 ">
                    <Check className="text-brand-magenta" size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900">{row.m}</span>
                </div>
                <div className="p-3 sm:p-4 flex items-start sm:items-center gap-4 bg-gray-50/30 lg:pl-10 opacity-80">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100 mt-0.5 sm:mt-0">
                    <X className="text-red-400" size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600">{row.o}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })} className="group relative inline-flex gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-brand-magenta to-brand-peach text-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.4)] w-full sm:w-auto text-lg font-bold whitespace-nowrap text-center flex items-center justify-center">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
               <span>মিল্কিমম কেন আলাদা বুঝেছি</span>
               <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-300 " />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
