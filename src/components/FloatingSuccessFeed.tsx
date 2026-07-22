import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { bdLocations, flavours, paymentTypes } from '../data/bdLocations';

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function FloatingSuccessFeed() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHiddenByUse, setIsHiddenByUse] = useState(false);
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [isPopupActive, setIsPopupActive] = useState(false);
  
  const lastDistrictRef = useRef<string>('');
  const lastFlavourRef = useRef<string>('');

  useEffect(() => {
    const handleToggle = (e: any) => setIsPopupActive(e.detail);
    window.addEventListener("toggleCheckoutModal", handleToggle);
    return () => window.removeEventListener("toggleCheckoutModal", handleToggle);
  }, []);

  useEffect(() => {
    const hiddenTimestamp = localStorage.getItem('milkimom_feed_hidden');
    if (hiddenTimestamp) {
        const timePassed = Date.now() - parseInt(hiddenTimestamp, 10);
        if (timePassed < 2 * 60 * 1000) { 
           setIsHiddenByUse(true);
           const timer = setTimeout(() => {
               setIsHiddenByUse(false);
               localStorage.removeItem('milkimom_feed_hidden');
           }, (2 * 60 * 1000) - timePassed);
           return () => clearTimeout(timer);
        } else {
            localStorage.removeItem('milkimom_feed_hidden');
        }
    }
  }, []);

  useEffect(() => {
    const orderForm = document.getElementById('order-form');
    if (!orderForm) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsCheckoutActive(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(orderForm);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHiddenByUse || isCheckoutActive || isPopupActive) {
      setIsVisible(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const showNextNotification = () => {
      const districts = Object.keys(bdLocations);
      
      let randomDistrict = getRandomItem(districts);
      while (randomDistrict === lastDistrictRef.current && districts.length > 1) {
        randomDistrict = getRandomItem(districts);
      }
      lastDistrictRef.current = randomDistrict;

      const randomThana = getRandomItem(bdLocations[randomDistrict]);
      
      let randomFlavour = getRandomItem(flavours);
      while (randomFlavour === lastFlavourRef.current && flavours.length > 1) {
        randomFlavour = getRandomItem(flavours);
      }
      lastFlavourRef.current = randomFlavour;

      const randomPayment = getRandomItem(paymentTypes);

      const message = `${randomThana}, ${randomDistrict} থেকে একজন মা ${randomFlavour} ফ্লেভারে ${randomPayment.text}`;
      
      setNotification(message);
      setIsVisible(true);

      timeoutId = setTimeout(() => {
        setIsVisible(false);
        timeoutId = setTimeout(showNextNotification, getRandomInt(8000, 12000));
      }, 5000);
    };

    timeoutId = setTimeout(showNextNotification, getRandomInt(3000, 5000));
    return () => clearTimeout(timeoutId);
  }, [isHiddenByUse, isCheckoutActive, isPopupActive]);

  const handleClose = () => {
    setIsVisible(false);
    setIsHiddenByUse(true);
    localStorage.setItem('milkimom_feed_hidden', Date.now().toString());
    setTimeout(() => {
        setIsHiddenByUse(false);
        localStorage.removeItem('milkimom_feed_hidden');
    }, 2 * 60 * 1000);
  };

  if (isHiddenByUse) return null;

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-[88px] left-4 sm:bottom-6 sm:left-6 z-[90] pointer-events-auto max-w-[calc(100vw-32px)] sm:w-[380px]"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-white p-4 sm:p-5 rounded-2xl shadow-[0_20px_50px_-15px_rgba(189,0,82,0.2)] flex gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-peach to-brand-magenta opacity-80"></div>
            <div className="absolute top-1/2 right-0 w-24 h-24 bg-brand-gold/20 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <button onClick={handleClose} className="absolute top-2 right-2 text-gray-400 hover:text-brand-magenta bg-white/50 hover:bg-brand-lightpink/30 p-3 rounded-full transition-colors duration-300 z-10" aria-label="Close notification">
              <X size={14} strokeWidth={2.5} />
            </button>

            <div className="shrink-0 mt-0.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-magenta to-brand-peach rounded-full flex items-center justify-center border-2 border-white shadow-md relative">
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                <CheckCircle2 className="text-white w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm" />
              </div>
            </div>
            
            <div className="pr-6 flex-1 flex flex-col justify-center">
              <p className="text-gray-900 text-sm font-medium leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                {notification}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
