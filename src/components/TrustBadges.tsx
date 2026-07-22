import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, FlaskConical, Award, Leaf, Stethoscope, Droplet, Microscope, X, ChevronLeft, ChevronRight } from 'lucide-react';

const BADGES = [
  { icon: FlaskConical, label: 'Lab Tested' },
  { icon: Award, label: 'BSTI' },
  { icon: Shield, label: 'ISO 22000' },
  { icon: Award, label: 'GMP' },
  { icon: Shield, label: 'H.A.C.C.P' },
  { icon: Droplet, label: 'Halal' },
  { icon: Leaf, label: 'Vegan' },
  { icon: Stethoscope, label: 'Doctor Suggested' },
  { icon: Microscope, label: 'Clinical Research' },
  { icon: Leaf, label: 'Imported Ingredients' },
];

export default function TrustBadges() {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  useEffect(() => {
    if (selectedBadge !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBadge(null);
      }
    };

    if (selectedBadge !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBadge]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedBadge !== null) {
      setSelectedBadge((selectedBadge + 1) % BADGES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedBadge !== null) {
      setSelectedBadge((selectedBadge - 1 + BADGES.length) % BADGES.length);
    }
  };

  return (
    <section className="py-8 lg:py-12 bg-white relative">
      <div className="absolute inset-0 bg-brand-gold/5 opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-balance text-2xl sm:text-3xl font-bold text-gray-900 inline-block relative leading-tight">
            বিশ্বাসের জায়গায় কোনো কম্প্রোমাইজ নয়
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-gold rounded-full"></div>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {BADGES.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              className="flex flex-col items-center gap-2 w-28 sm:w-32 group cursor-pointer"
              onClick={() => setSelectedBadge(i)}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cream to-white border border-brand-gold/20 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-brand-gold/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-10 transition-all duration-300 -opacity"></div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                <badge.icon className="text-brand-magenta group-hover:scale-110 transition-transform duration-300 " size={28} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 max-w-lg mx-auto pb-4">
          <hr className="border-t border-gray-200 mb-6" />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center text-[#ff1c36] text-[13px] sm:text-[14px] font-[600] drop-shadow-[0_0_5px_rgba(255,28,54,0.3)] italic cursor-pointer"
            onClick={() => setSelectedBadge(0)}
          >
            🔴 (সার্টিফিকেটগুলো দেখতে আইকনে ট্যাপ করুন)
          </motion.p>
          <hr className="border-t border-gray-200 mt-6" />
        </div>
      </div>

      <AnimatePresence>
        {selectedBadge !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setSelectedBadge(null)}
          >
            {/* Background-level navigation buttons on desktop (hidden on small/medium mobile for clean space) */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-lightpink transition-colors duration-300 z-50 bg-black/40 rounded-full p-3 sm:p-4 hidden md:flex"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-lightpink transition-colors duration-300 z-50 bg-black/40 rounded-full p-3 sm:p-4 hidden md:flex"
              onClick={handleNext}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[94vw] min-[380px]:w-[90vw] sm:w-full sm:max-w-3xl flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) handleNext(e as any);
                else if (swipe > 50) handlePrev(e as any);
              }}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[80vh] sm:max-h-[85dvh] overflow-y-auto flex flex-col">
                {/* Header with inside close button */}
                <div className="bg-brand-cream/30 p-4 border-b border-gray-100 flex items-center justify-center relative">
                  <div className="flex items-center justify-center gap-2 px-8">
                    {BADGES[selectedBadge].icon && (() => {
                      const Icon = BADGES[selectedBadge].icon;
                      return <Icon className="text-brand-magenta shrink-0" size={24} />;
                    })()}
                    <h3 className="text-base sm:text-2xl font-bold text-gray-900 text-center leading-tight">
                      {BADGES[selectedBadge].label}
                    </h3>
                  </div>
                  
                  {/* Inside-the-modal close button (40x40px minimum touch area) */}
                  <button 
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-magenta transition-colors duration-300 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBadge(null);
                    }}
                    aria-label="Close"
                    id="modal-close-btn"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Certificate Image Container */}
                <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden w-full aspect-auto sm:aspect-[4/3] p-[10px] min-[380px]:p-4 sm:p-8">
                  <img
                    src={`https://placehold.co/800x1000/fdfbfb/bd0052?text=${BADGES[selectedBadge].label.replace(/ /g, '+')}`}
                    alt={BADGES[selectedBadge].label}
                    className="w-full h-auto max-h-[68vh] min-[380px]:max-h-[70vh] sm:h-full sm:max-h-none object-contain rounded-lg transition-opacity duration-300 opacity-0" 
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  />
                  <div className="absolute inset-0 border-[10px] min-[380px]:border-[16px] sm:border-[16px] border-white/50 pointer-events-none rounded-lg"></div>
                </div>
              </div>

              {/* Counter / Page Indicator */}
              <div className="text-white text-center mt-6 text-sm sm:text-base font-medium opacity-70">
                {selectedBadge + 1} / {BADGES.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
