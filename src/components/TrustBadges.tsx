import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, FileCheck, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import bcsirImg from '../assets/BCSIR.png';
import gmpImg from '../assets/GMP.png';
import haccpImg from '../assets/HACCP.png';

const CERTIFICATES = [
  {
    id: 'bcsir',
    title: 'BCSIR ল্যাব সার্টিফাইড',
    subtitle: 'বাংলাদেশ বিজ্ঞান ও শিল্প গবেষণা পরিষদ (BCSIR)',
    image: bcsirImg,
    badge: 'সরকারি ল্যাব টেস্টে ১০০% নিরাপদ',
    icon: FileCheck
  },
  {
    id: 'gmp',
    title: 'GMP সার্টিফিকেট',
    subtitle: 'আন্তর্জাতিক প্রস্তুতকরণ মানদণ্ড (Intertek Verified)',
    image: gmpImg,
    badge: 'গুড ম্যানুফ্যাকচারিং প্র্যাকটিস',
    icon: Award
  },
  {
    id: 'haccp',
    title: 'HACCP ফুড সেফটি',
    subtitle: 'আন্তর্জাতিক খাদ্য নিরাপত্তা ব্যবস্থাপনা',
    image: haccpImg,
    badge: 'ফুড সেফটি ও কোয়ালিটি নিশ্চিত',
    icon: ShieldCheck
  }
];

export default function TrustBadges() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  useEffect(() => {
    if (selectedCert !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };

    if (selectedCert !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCert !== null) {
      setSelectedCert((selectedCert + 1) % CERTIFICATES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCert !== null) {
      setSelectedCert((selectedCert - 1 + CERTIFICATES.length) % CERTIFICATES.length);
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#fffdfa] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 via-brand-peach/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Title Header */}
        <div className="text-center mb-10">
          <span className="text-brand-magenta font-bold text-xs sm:text-sm tracking-wider uppercase bg-brand-lightpink/40 px-3 py-1 rounded-full border border-brand-peach/30 inline-block mb-3">
            অফিশিয়াল সার্টিফিকেট ও স্বীকৃতি
          </span>
          <h2 className="text-balance text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
            বিশ্বাসের জায়গায় কোনো কম্প্রোমাইজ নয়
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-magenta to-brand-peach mx-auto rounded-full mt-3 mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
            মিল্কিমম শতভাগ নিরাপদ ও আন্তর্জাতিক মানসম্পন্ন। নিচে আমাদের বিসিএসআইআর (BCSIR), GMP এবং HACCP অরিজিনাল সার্টিফিকেটসমূহ দেখে নিন।
          </p>
        </div>

        {/* 3 Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {CERTIFICATES.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => setSelectedCert(index)}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-gold/20 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-15px_rgba(189,0,82,0.15)] hover:border-brand-magenta/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Certificate Image Frame */}
                  <div className="w-full aspect-[4/3] bg-gradient-to-b from-gray-50 to-white rounded-xl overflow-hidden relative flex items-center justify-center p-2 border border-gray-100 group-hover:border-brand-peach/30 transition-colors">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white/95 text-gray-900 font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Maximize2 size={14} className="text-brand-magenta" /> বড় করে দেখুন
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-1.5 text-brand-magenta text-xs font-bold bg-brand-lightpink/30 px-2.5 py-0.5 rounded-full mb-2 border border-brand-peach/20">
                      <Icon size={14} />
                      <span>{cert.badge}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-brand-magenta transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                      {cert.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Prompt */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center text-brand-magenta text-xs font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>সার্টিফিকেট দেখতে ক্লিক করুন 🔍</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedCert !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setSelectedCert(null)}
          >
            {/* Desktop Nav Controls */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-peach transition-colors z-50 bg-black/50 hover:bg-black/80 rounded-full p-3 hidden md:flex items-center justify-center border border-white/20"
              onClick={handlePrev}
            >
              <ChevronLeft size={28} />
            </button>

            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-peach transition-colors z-50 bg-black/50 hover:bg-black/80 rounded-full p-3 hidden md:flex items-center justify-center border border-white/20"
              onClick={handleNext}
            >
              <ChevronRight size={28} />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[85vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-white/20">
                {/* Modal Header */}
                <div className="bg-gray-900 text-white p-3.5 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-magenta text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {selectedCert + 1} / {CERTIFICATES.length}
                    </span>
                    <h3 className="text-sm sm:text-lg font-bold text-white leading-tight">
                      {CERTIFICATES[selectedCert].title}
                    </h3>
                  </div>
                  
                  <button 
                    className="text-gray-300 hover:text-white transition-colors w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full shrink-0"
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Image Frame */}
                <div className="relative bg-gray-950 flex items-center justify-center overflow-auto p-2 sm:p-6 min-h-[280px] sm:min-h-[480px]">
                  <img
                    src={CERTIFICATES[selectedCert].image}
                    alt={CERTIFICATES[selectedCert].title}
                    className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] object-contain rounded shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
