import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, Percent } from 'lucide-react';
import { useCountdownTimer } from '../hooks/useCountdownTimer';

export default function Pricing() {
  const navigate = useNavigate();
  const timeLeft = useCountdownTimer();

  const scrollToForm = () => { navigate("/checkout"); };

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <section id="pricing-section" className="py-12 lg:py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lightpink/50 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            মিল্কিমমের প্রাইস ১ মাসের ফর্মুলা দুধের দামের তুলনায় <span className="text-brand-magenta">খুবই সামান্য</span>
          </h2>
        </div>

        <div 
           className="flex justify-center w-full mt-4" 
           style={{ zIndex: 20, position: 'relative', marginBottom: '16px' }}
        >
           <div className="bg-gradient-to-r from-brand-gold to-yellow-400 text-gray-900 font-bold px-8 py-2.5 rounded-full shadow-[0_4px_20px_rgba(230,168,50,0.6)] flex items-center gap-2">
             <Percent size={18} /> <span className="text-lg">মেগা অফার</span>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-brand-magenta to-brand-red rounded-2xl p-1 shadow-2xl relative mt-8"
        >
          {/* Badge */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white font-bold px-4 md:px-6 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap z-20">
            <ShieldCheck size={18} className="text-brand-gold" />
            ১৫ দিনের কমপ্লিট ডোজ — একবারই খেতে হয়
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-8 h-full flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col gap-5 sm:gap-6 mb-8 w-full max-w-sm mx-auto mt-4 text-center">
              
              {/* Previous Price - Subtle */}
              <div className="flex flex-col items-center">
                <span className="text-gray-400 font-medium text-sm">আগের মূল্য</span>
                <span className="text-lg sm:text-xl text-gray-400 line-through font-medium mt-1">৳<span className="bengali-num">৮৯৯০</span></span>
                <span className="text-xs text-gray-400 mt-1">(আট হাজার নয়শত নব্বই টাকা)</span>
              </div>
              
              <hr className="border-dashed border-gray-200 w-4/5 mx-auto" />
              
              {/* Current Offer - Highest Emphasis */}
              <div className="flex flex-col items-center py-2">
                <span className="text-gray-900 font-bold text-lg mb-2 uppercase tracking-wide">বর্তমান অফার</span>
                <span className="text-6xl sm:text-7xl text-brand-magenta font-bold tracking-tight drop-shadow-sm">৳<span className="bengali-num">৪৯৯০</span></span>
                <span className="text-sm font-medium text-gray-500 mt-3">(চার হাজার নয়শত নব্বই টাকা)</span>
              </div>
              
              <hr className="border-dashed border-gray-200 w-4/5 mx-auto" />
              
              {/* Savings - Moderate Emphasis */}
              <div className="flex flex-col items-center bg-green-50/50 py-3 px-5 rounded-xl">
                <span className="text-green-700 font-medium text-sm">বাঁচলো টাকা</span>
                <span className="text-xl sm:text-2xl font-bold text-green-700 mt-0.5">৳<span className="bengali-num">৪০০০</span></span>
              </div>
            </div>

            {timeLeft && (
               <div className="bg-brand-cream border border-brand-peach/30 rounded-xl p-4 w-full max-w-sm mx-auto mb-8">
                 <div className="flex items-center justify-center gap-2 text-brand-red font-bold mb-3">
                   <Clock size={16} className="animate-pulse" />
                   অফারটি শেষ হতে:
                 </div>
                 <div className="flex items-center justify-center gap-3 font-mono text-2xl text-gray-900">
                    <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 min-w-[3.5rem]">
                      {format(timeLeft.h)}<span className="text-xs block font-sans text-gray-500">ঘন্টা</span>
                    </div>
                    <span className="font-bold pb-4">:</span>
                    <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 min-w-[3.5rem]">
                       {format(timeLeft.m)}<span className="text-xs block font-sans text-gray-500">মিনিট</span>
                    </div>
                    <span className="font-bold pb-4">:</span>
                    <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 min-w-[3.5rem]">
                       {format(timeLeft.s)}<span className="text-xs block font-sans text-gray-500">সেকেন্ড</span>
                    </div>
                 </div>
               </div>
            )}

            <button style={{ marginTop: timeLeft ? 0 : "2rem" }} onClick={() => navigate("/checkout")} className="w-full max-w-sm mx-auto uppercase bg-gradient-to-r from-brand-magenta to-brand-peach text-white py-4 rounded-xl hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.4)] text-lg font-bold whitespace-nowrap text-center flex items-center justify-center">
               অফার প্রাইসে নিতে চাই
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
