import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Star, ShieldCheck, Heart, Truck, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import jarImage from '../assets/images/milkimom_jar_1782105456829.jpg';
import carousel1 from '../assets/carousel1.png';
import carousel2 from '../assets/carousel2.png';
import carousel3 from '../assets/carousel3.png';
import { useMotherCounter } from '../hooks/useMotherCounter';

const productImages = [
  carousel1,
  carousel2,
  carousel3
];

export default function Hero() {
  const navigate = useNavigate();
  const counts = useMotherCounter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % productImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length);

  const scrollToForm = () => { navigate("/checkout"); };

  return (
    <section id="hero" className="relative pt-12 pb-8 lg:pt-16 lg:pb-12 overflow-hidden bg-brand-cream">
      {/* Background with glowing ray effect */}
      <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, #ffe3df 0%, transparent 70%)' }}></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[120px] mix-blend-multiply opacity-50" style={{ background: 'radial-gradient(circle, #e6a832 0%, transparent 70%)' }}></div>
      
      {/* Milk particles wrapper */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="milk-particle bg-white shadow-[0_0_15px_rgba(255,255,255,1)] rounded-full"
            style={{
              width: `${Math.random() * 15 + 10}px`,
              height: `${Math.random() * 15 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center lg:text-left space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lightpink text-xs font-bold text-brand-peach uppercase tracking-tighter">
              <Star size={14} fill="currentColor" />
              <span>Verified Motherhood Support</span>
            </div>
            
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              ১ ডোজেই, পার্মানেন্টলি<br />
              <span className="text-brand-magenta">বুকের দুধ বাড়াতে</span><br />
              মিল্কিমম খান <span className="font-[800] text-[#e87b6b] drop-shadow-[0_0_6px_rgba(232,123,107,0.3)]">নিশ্চিন্তে!</span>
            </h1>
            
            <div className="flex flex-col text-center items-center max-w-md mx-auto lg:mx-0 text-[15px] sm:text-[15.5px] text-gray-700 font-medium leading-[1.75] space-y-1.5">
              <span>মিল্কিমম খেলে মাত্র <span className="font-bold text-[#ff1c36]">৩ দিনের মধ্যেই</span> বুকের দুধ বাড়ে,</span>
              <span>এবং ব্রেস্ট ফিডিং এর শেষ পর্যন্ত স্থায়ী হয়।</span>
              <span className="text-[13px] sm:text-[13.5px] text-gray-500 pt-0.5">এটি সম্পূর্ণ সাইডইফেক্ট মুক্ত ও ন্যাচারাল।</span>
            </div>

            <div className="flex flex-col items-center text-center py-5 max-w-xl mx-auto lg:mx-0">
              <div className="flex text-[#e6a832] drop-shadow-[0_0_8px_rgba(230,168,50,0.4)] mb-1.5 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="sm:w-[22px] sm:h-[22px]" />)}
              </div>
              <div className={`text-3xl sm:text-4xl lg:text-[54px] font-[800] text-[#ff1c36] leading-none mb-2 drop-shadow-[0_2px_10px_rgba(255,28,54,0.2)] bengali-num transition-all duration-300 duration-300 ${counts.animatePrefix ? 'scale-105' : 'scale-100'}`}>
                {counts.total.toLocaleString('bn-BD')}+
              </div>
              <div className="text-[15px] sm:text-[17px] font-bold text-gray-800">
                জন মা ইতিমধ্যেই মিল্কিমম খেয়ে উপকৃত হয়েছেন।
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3 bg-white/40 p-3 rounded-xl border border-white/60">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold">✓</div>
                <span className="text-sm font-bold text-gray-700">BSTI সার্টিফাইড</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 p-3 rounded-xl border border-white/60">
                <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold">✓</div>
                <span className="text-sm font-bold text-gray-700">ডক্টর সাজেস্টেড</span>
              </div>
            </div>

            <div className="pt-6 max-w-lg mx-auto lg:mx-0">
              <div className="text-left mb-4">
                <h3 className="text-[17px] sm:text-lg font-bold text-gray-900 mb-3 drop-shadow-sm">আপনার বর্তমান পরিস্থিতি কোনটি?</h3>
                <div className="flex flex-col gap-2.5">
                  {["বুকের দুধ কম", "ফর্মুলা দিতে হচ্ছে", "বাবু পেট ভরে খেতে পারে না"].map(problem => (
                    <div 
                      key={problem}
                      onClick={() => setSelectedProblem(problem)}
                      className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedProblem === problem ? 'border-brand-magenta bg-brand-lightpink/30' : 'border-white/60 bg-white/40 hover:border-brand-peach/50'}`}
                    >
                      <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${selectedProblem === problem ? 'border-brand-magenta' : 'border-gray-300'}`}>
                        {selectedProblem === problem && <div className="w-2.5 h-2.5 bg-brand-magenta rounded-full"></div>}
                      </div>
                      <span className="font-bold text-gray-800 text-[15px] sm:text-[16px]">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <AnimatePresence>
                {selectedProblem && (
                  <motion.div
                    key="eligibility-cta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center lg:items-start mt-4"
                  >
                    <p className="text-brand-magenta font-bold flex items-center gap-2 mb-4 text-[15px] sm:text-[16px]">
                      ❤️ হাজারো মা ঠিক এই পরিস্থিতি থেকেই শুরু করেছিলেন।
                    </p>
                    <button 
                      onClick={() => {
                        const evt = new CustomEvent('eligibilityOpenedWithHeroProblem', { detail: selectedProblem });
                        window.dispatchEvent(evt);
                        document.getElementById('eligibility-trigger')?.click();
                      }}
                      className="bg-gradient-to-r from-brand-magenta to-brand-peach text-white px-2 sm:px-8 py-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(189,0,82,0.4)] gap-3 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 w-full hover:shadow-[0_25px_50px_-12px_rgba(189,0,82,0.5)] text-[11px] min-[375px]:text-[13px] sm:text-base md:text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
                    >
                      <span>10 সেকেন্ডে দেখে নিন মিল্কিমম আপনার জন্য উপযুক্ত কিনা</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Image/Jar Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center"
          >
            {/* Outline rings */}
            <div className="absolute w-[400px] h-[400px] border-2 border-brand-gold/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
               <div className="absolute top-0 w-4 h-4 bg-brand-gold rounded-full blur-[2px]"></div>
               <div className="absolute bottom-10 right-10 w-3 h-3 bg-white rounded-full shadow-sm"></div>
            </div>

            {/* Jar card background style */}
            <div className="relative w-[320px] h-[400px] sm:w-[340px] sm:h-[420px] bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] rounded-2xl shadow-[0_50px_100px_-20px_rgba(189,0,82,0.2)] border-4 border-white flex flex-col items-center justify-center overflow-hidden z-10 group touch-pan-y">
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-peach/5 to-transparent mix-blend-multiply"></div>
              
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={productImages[currentSlide]}
                    alt="Milkimom Supplement Jar"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset }) => {
                      if (offset.x < -40) nextSlide();
                      else if (offset.x > 40) prevSlide();
                    }}
                    className="absolute inset-0 z-20 w-full h-full object-cover filter drop-shadow-xl cursor-grab active:cursor-grabbing transition-transform duration-300 group-hover:scale-105"
                  />
                </AnimatePresence>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-brand-magenta w-6' : 'bg-gray-300 w-2 hover:bg-brand-gold'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Optional Navigation Arrows (Desktop) */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md text-brand-magenta z-30 hidden sm:flex opacity-0 group-hover:opacity-100 transition-all duration-300 -opacity"
              >
                <ChevronLeft size={24} className="mr-0.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md text-brand-magenta z-30 hidden sm:flex opacity-0 group-hover:opacity-100 transition-all duration-300 -opacity"
              >
                <ChevronRight size={24} className="ml-0.5" />
              </button>
            </div>

          </motion.div>

        </div>
      </div>
      <style>{`
        @keyframes yoyo {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

function FloatingBadge({ top, right, bottom, left, delay, text, icon }: any) {
  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{ repeat: Infinity, duration: 4, delay: parseFloat(delay) || 0, ease: "easeInOut" }}
      className="absolute glass-dark px-3 py-2 rounded-full flex items-center gap-2 text-sm font-bold text-gray-800 soft-shadow whitespace-nowrap"
      style={{ top, right, bottom, left }}
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
