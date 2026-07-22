import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useMotherCounter } from '../hooks/useMotherCounter';

export default function EligibilityCheck() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [babyAge, setBabyAge] = useState<string | null>(null);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const counts = useMotherCounter();

  useEffect(() => {
    const handleHeroSelect = (e: any) => {
      setSelectedProblems([e.detail]);
    };
    window.addEventListener('eligibilityOpenedWithHeroProblem', handleHeroSelect as EventListener);
    return () => window.removeEventListener('eligibilityOpenedWithHeroProblem', handleHeroSelect as EventListener);
  }, []);

  const handleOpen = () => {
    setShowModal(true);
    setStep(1);
    setBabyAge(null);
    setValidationError(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProblems([]);
  };

  const nextStep = () => {
    if (step === 1) {
      if (babyAge) {
        setValidationError(null);
        try {
          localStorage.setItem('milkimom_selectedBabyAge', babyAge);
          if (typeof (window as any).fbq === 'function') {
            (window as any).fbq('trackCustom', 'BabyAgeSelected', { age: babyAge });
          }
        } catch (e) {}
        setStep(2);
      } else {
        setValidationError("অনুগ্রহ করে একটি অপশন নির্বাচন করুন");
      }
    } else if (step === 2) {
      if (selectedProblems.length > 0) {
        setValidationError(null);
        try {
          localStorage.setItem('milkimom_selectedProblems', JSON.stringify(selectedProblems));
          if (typeof (window as any).fbq === 'function') {
            (window as any).fbq('trackCustom', 'ProblemSelected', { problems: selectedProblems });
            (window as any).fbq('trackCustom', 'EligibilityCompleted');
          }
        } catch (e) {}
        const date = new Date().toDateString();
        localStorage.setItem('milkimom_eligibility_completed_date', date);
        try {
          localStorage.setItem('greatMotherJourneyStep', '2');
          window.dispatchEvent(new CustomEvent('greatMotherJourneyStepUpdate', { detail: 2 }));
        } catch (e) {}
        setStep(3);
      } else {
        setValidationError("অনুগ্রহ করে একটি অপশন নির্বাচন করুন");
      }
    }
  };

  const handleCheckbox = (problem: string) => {
    setValidationError(null);
    setSelectedProblems(prev => 
      prev.includes(problem) ? prev.filter(p => p !== problem) : [...prev, problem]
    );
  };

  const handleOrderRedirect = () => {
    handleClose();
    navigate("/checkout");
  };

  const problemsList = [
    "বুকের দুধ কম",
    "ফর্মুলা দিতে হচ্ছে",
    "বুকের দুধ পাতলা",
    "পাম্প করলেও কম আসে",
    "বুকের দুধ প্রায় বন্ধ",
    "বাবু পেট ভরে খেতে পারে না",
    "বাবু বারবার কান্না করে",
    "পর্যাপ্ত পুষ্টি পাচ্ছে কিনা চিন্তায় আছি"
  ];

  return (
    <>
      <button id="eligibility-trigger" onClick={handleOpen} className="hidden" aria-hidden="true">Trigger</button>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white p-4 sm:p-8 max-w-lg w-full rounded-2xl shadow-2xl relative max-h-[85dvh] flex flex-col text-left border border-brand-peach/30"
            >
              <button 
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-3 bg-gray-100 rounded-full text-gray-400 hover:text-brand-magenta hover:bg-brand-lightpink transition-colors duration-300 shadow-sm z-10"
              >
                <X size={20} />
              </button>

              <div className="text-sm font-bold text-gray-400 mb-2 mt-4 text-center">Step {step} of 3</div>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 pt-2"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 drop-shadow-sm text-center">আপনার বাবুর বয়স কত?</h3>
                    <div className="space-y-3">
                      {["০–৩ মাস", "৪–৬ মাস", "৭–১২ মাস", "১৩–২৪ মাস"].map(age => (
                        <label 
                          key={age} 
                          onClick={() => {
                            setValidationError(null);
                            setBabyAge(age);
                          }}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${babyAge === age ? 'border-brand-magenta bg-brand-lightpink/30' : 'border-gray-100 hover:border-brand-peach/50'}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${babyAge === age ? 'border-brand-magenta' : 'border-gray-300'}`}>
                            {babyAge === age && <div className="w-2.5 h-2.5 bg-brand-magenta rounded-full"></div>}
                          </div>
                          <span className="text-lg font-medium text-gray-800">{age}</span>
                        </label>
                      ))}
                    </div>
                    {babyAge === null && (
                       <p className="text-center text-sm text-gray-400 mt-2 opacity-0 h-0 transition-all duration-300 leading-relaxed"></p>
                    )}
                    <button 
                      onClick={nextStep}
                      className={`w-full text-white py-4 rounded-xl font-bold font-bold shadow-md hover:shadow-lg transition-colors duration-300 text-lg mt-4 ${babyAge ? 'bg-brand-magenta hover:bg-[#bd0052]' : 'bg-gray-400'}`}
                    >
                      পরবর্তী ধাপ
                    </button>
                    {validationError && step === 1 && (
                      <p className="text-center text-sm text-red-500 font-bold mt-2 leading-relaxed">{validationError}</p>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 pt-2"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 drop-shadow-sm text-center">আপনার বর্তমান পরিস্থিতি কোনটির সাথে বেশি মিলে?</h3>
                    <p className="text-sm text-gray-500 mb-4 text-center leading-relaxed">(একাধিক সিলেক্ট করতে পারবেন)</p>
                    <div className="space-y-2.5 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                      {problemsList.map(problem => (
                        <label 
                          key={problem} 
                          onClick={(e) => {
                            e.preventDefault();
                            handleCheckbox(problem);
                          }}
                          className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedProblems.includes(problem) ? 'border-brand-magenta bg-brand-lightpink/30' : 'border-gray-100 hover:border-brand-peach/50'}`}
                        >
                          <div className={`w-5 h-5 flex-shrink-0 mt-0.5 rounded border-2 flex items-center justify-center ${selectedProblems.includes(problem) ? 'border-brand-magenta bg-brand-magenta' : 'border-gray-300'}`}>
                            {selectedProblems.includes(problem) && <Check size={14} className="text-white" />}
                          </div>
                          <span className="text-base sm:text-lg font-medium text-gray-800 leading-snug">{problem}</span>
                        </label>
                      ))}
                    </div>
                    <div className="pt-2">
                      <button 
                        onClick={nextStep}
                        className={`w-full text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-colors duration-300 text-lg ${selectedProblems.length > 0 ? 'bg-brand-magenta hover:bg-[#bd0052]' : 'bg-gray-400'}`}
                      >
                        ফলাফল দেখুন
                      </button>
                      {validationError && step === 2 && (
                        <p className="text-center text-sm text-red-500 font-bold mt-2 leading-relaxed">{validationError}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full pt-2"
                  >
                  <div className="text-center shrink-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 drop-shadow-sm">আপনার উত্তর অনুযায়ী—</h3>
                    
                    <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-gold/30 text-left mb-4 shadow-sm">
                      <div className="mb-3">
                        <span className="text-sm font-bold text-gray-600">আপনার বাবুর বয়স:</span>
                        <span className="ml-2 inline-block px-3 py-1 bg-white border border-brand-peach/30 text-brand-magenta rounded-full text-sm font-bold shadow-sm">{babyAge}</span>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-600 block mb-2">আপনার প্রধান পরিস্থিতি:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProblems.map(problem => (
                            <span key={problem} className="inline-block px-3 py-1 bg-white border border-brand-peach/30 text-brand-magenta rounded-full text-xs font-bold shadow-sm">{problem}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-balance text-2xl sm:text-3xl font-bold text-brand-magenta mb-1 sm:mb-2 drop-shadow-sm">আপনি একা নন।</h3>
                    <p className="text-sm sm:text-lg text-gray-700 font-medium pb-2 border-b border-gray-100 leading-relaxed">
                      এই একই ধরনের পরিস্থিতিতে <span className="font-bold text-base sm:text-xl text-brand-magenta bengali-num">{counts.total.toLocaleString('bn-BD')}+</span> মা মিল্কিমম বেছে নিয়েছেন।
                    </p>
                  </div>
                  
                  <div className="overflow-y-auto custom-scrollbar flex-1 py-1 sm:py-2 my-1 sm:my-2 pr-1 min-h-0">
                    <ul className="text-left space-y-2 sm:space-y-3 text-gray-800 font-medium text-[13px] sm:text-base">
                      {(() => {
                        const problemReasonsMap: Record<string, string> = {
                          "বুকের দুধ কম": "মিল্কিমম বুকের দুধ বৃদ্ধি করে",
                          "ফর্মুলা দিতে হচ্ছে": "বুকের দুধ বাড়লে ফর্মুলার উপর নির্ভরতা কমে",
                          "বুকের দুধ পাতলা": "বুকের দুধের প্রয়োজনীয় পুষ্টিগুণ বজায় রাখে",
                          "পাম্প করলেও কম আসে": "পাম্প ব্যবহার করলেও বুকের দুধের flow বাড়ায়",
                          "বুকের দুধ প্রায় বন্ধ": "বুকের দুধ কমে গেলে বা বন্ধ হয়ে গেলেও পুনরায় flow শুরু করে",
                          "বাবু পেট ভরে খেতে পারে না": "বুকের দুধ বৃদ্ধি পেলে বাবুর তৃপ্তি ফিরিয়ে আনে",
                          "বাবু বারবার কান্না করে": "বাবু পেট ভরে খেলে মায়ের মানসিক শান্তি বাড়ে",
                          "পর্যাপ্ত পুষ্টি পাচ্ছে কিনা চিন্তায় আছি": "বুকের দুধের পুষ্টিগুণ বজায় রাখে"
                        };
                        
                        const selectedReasons = selectedProblems.map(p => problemReasonsMap[p]).filter(Boolean).slice(0, 4);
                        
                        const defaultReasons = [
                          "১ ডোজেই বুকের দুধ পার্মানেন্টলি বৃদ্ধি করে",
                          "মাত্র ৩ দিনের মধ্যেই বুকের দুধ বৃদ্ধি পায়",
                          "১৫ দিনের কমপ্লিট ডোজ — বারবার খেতে হয় না",
                          "সারা বাংলাদেশে সম্পূর্ণ ফ্রি ডেলিভারি",
                          "ক্যাশ অন হোম ডেলিভারি সুবিধা"
                        ];

                        const reasonsToShow = [...selectedReasons, ...defaultReasons].slice(0, 7);

                        return reasonsToShow.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 sm:gap-2.5">
                            <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ));
                      })()}
                    </ul>
                  </div>

                  <div className="shrink-0 pt-2 sm:pt-4 border-t border-gray-100">
                    <button 
                      onClick={handleOrderRedirect}
                      className="w-full bg-gradient-to-r from-brand-magenta to-[#ff1c36] text-white py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-lg hover:-translate-y-0.5 whitespace-nowrap text-center flex items-center justify-center"
                    >
                      হ্যাঁ, আমিও বুকের দুধ নিশ্চিত করতে চাই
                    </button>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
