import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Clock, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCountdownTimer } from '../hooks/useCountdownTimer';

export default function CountdownBar() {
  const navigate = useNavigate();
  const timeLeft = useCountdownTimer();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Keep track of previous second for tick sound
  const prevSecRef = useRef<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Helper to get current Date object in Dhaka Time
  const getDhakaTime = () => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
    });
    
    const parts = formatter.formatToParts(new Date());
    const val = (type: string) => parseInt(parts.find(p => p.type === type)!.value);
    
    return new Date(val('year'), val('month') - 1, val('day'), val('hour'), val('minute'), val('second'));
  };

  useEffect(() => {
    setMounted(true);
    
    const savedSound = localStorage.getItem('milkimom_sound');
    if (savedSound === 'true') setSoundEnabled(true);

    const nowDhaka = getDhakaTime();
    const todayStr = `${nowDhaka.getFullYear()}-${nowDhaka.getMonth() + 1}-${nowDhaka.getDate()}`;
    
    let firstVisit = localStorage.getItem('milkimom_first_visit');
    
    if (!firstVisit) {
      firstVisit = todayStr;
      localStorage.setItem('milkimom_first_visit', todayStr);
    }

    const sdParts = firstVisit.split('-').map(Number);
    const startDate = new Date(sdParts[0], sdParts[1] - 1, sdParts[2]);
    const todayDate = new Date(nowDhaka.getFullYear(), nowDhaka.getMonth(), nowDhaka.getDate());
    
    const diffDays = Math.floor((todayDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const popupShownDate = localStorage.getItem('milkimom_popup_date');
    if (popupShownDate !== todayStr) {
      if (diffDays === 1) { // Day 2
        setPopupContent("অফারটি আরও ১ দিন বাড়ানো হয়েছে।");
        setShowPopup(true);
        localStorage.setItem('milkimom_popup_date', todayStr);
      } else if (diffDays >= 2) { // Day 3+
        setPopupContent("অফারটি শুধুমাত্র আপনার জন্য আজ রাত ১২টা পর্যন্ত থাকবে।\n\nএর পর প্রাইস ৮৯৯০ টাকা হয়ে যাবে।");
        setShowPopup(true);
        localStorage.setItem('milkimom_popup_date', todayStr);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft && soundEnabled) {
      if (prevSecRef.current !== null && prevSecRef.current !== timeLeft.s) {
        playTick();
      }
      prevSecRef.current = timeLeft.s;
    }
  }, [timeLeft, soundEnabled]);


  const initAudio = () => {
    if (!audioContextRef.current) {
       audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  useEffect(() => {
    const handleInteraction = () => {
      if (soundEnabled) initAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [soundEnabled]);

  const playTick = () => {
    if (!audioContextRef.current) return;
    try {
      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioContextRef.current.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, audioContextRef.current.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.015, audioContextRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);
      
      osc.start();
      osc.stop(audioContextRef.current.currentTime + 0.05);
    } catch(e) {}
  };

  const handleSoundToggle = () => {
    initAudio();
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    localStorage.setItem('milkimom_sound', String(newVal));
  };
  
  const handleScrollToForm = () => { navigate("/checkout"); };

  if (!mounted) return null;

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <>
      <div className="bg-gradient-to-r from-[#ffe3df] to-[#f6f0ec] border-b-2 border-[#e6a832] text-black h-[42px] sm:h-[46px] w-full fixed top-0 left-0 right-0 z-[9999] shadow-md flex items-center shadow-[#e6a832]/20">
        <div className="max-w-7xl mx-auto w-full px-2.5 sm:px-4 flex items-center justify-between xl:justify-center gap-1.5 sm:gap-6">
          
          <div className="flex flex-1 xl:flex-none items-center justify-center gap-1 sm:gap-2">
            <Clock size={15} className="text-[#e6a832] shrink-0" />
            <span className="text-[11px] sm:text-[14px] font-bold tracking-tight whitespace-nowrap flex items-center text-black">
              <span className="hidden sm:inline">অফারটি শেষ হতে আর বাকি মাত্র</span>
              <span className="sm:hidden">অফার শেষ হতে:</span>
            </span>
            
            {timeLeft && (
              <div className="flex items-center font-mono text-[13px] sm:text-[16px] font-bold text-[#ff1c36] bg-white/70 px-1.5 sm:px-2 py-0.5 rounded shadow-inner ml-0.5 sm:ml-1 shrink-0" dir="ltr">
                <span>{format(timeLeft.h)}</span>
                <span className="opacity-80 animate-pulse mx-0.5">:</span>
                <span>{format(timeLeft.m)}</span>
                <span className="opacity-80 animate-pulse mx-0.5">:</span>
                <motion.span
                   key={timeLeft.s}
                   initial={{ opacity: 0.5 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 0.1 }}
                >{format(timeLeft.s)}</motion.span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button 
              onClick={handleScrollToForm}
              className="hidden sm:inline-flex bg-[#e87b6b] text-white text-[11px] sm:text-[13px] px-3 sm:px-5 py-1 sm:py-1.5 rounded-full font-bold shadow-md hover:bg-[#d86a5b] transition-colors duration-300 whitespace-nowrap border border-[#e87b6b]/50"
            >
              অর্ডার করুন
            </button>
            <button 
              onClick={handleSoundToggle}
              className="p-1 sm:p-2 rounded-full hover:bg-black/5 transition-colors duration-300 shrink-0"
              aria-label={soundEnabled ? "Mute timer ticking" : "Enable timer ticking"}
            >
              {soundEnabled ? <Volume2 size={15} className="sm:w-4 sm:h-4 text-black/70" /> : <VolumeX size={15} className="sm:w-4 sm:h-4 text-black/40" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && popupContent && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/95 backdrop-blur-md border border-white p-6 max-w-sm w-full rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-magenta to-brand-rose"></div>
              
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-brand-magenta transition-colors duration-300 "
              >
                <X size={18} />
              </button>
              
              <div className="text-center space-y-4 pt-4">
                <div className="w-12 h-12 mx-auto bg-brand-lightpink rounded-full flex items-center justify-center text-brand-magenta mb-2">
                  <Clock size={24} />
                </div>
                
                {popupContent.split('\n\n').map((para, i) => (
                  <p key={i} className={`text-gray-800 leading-snug flex-1 ${i === 0 ? 'text-base font-bold' : 'text-sm font-medium text-brand-magenta'}`}>
                    {para}
                  </p>
                ))}
                
                <button 
                  onClick={() => setShowPopup(false)}
                  className="w-full mt-4 bg-brand-magenta text-white py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-brand-rose transition-colors duration-300 "
                >
                  এক্টিভ করুন
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
