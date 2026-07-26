import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CheckCircle, CheckCircle2, ArrowRight, Heart, Package, Truck, ShieldCheck, MapPin, Smartphone, User, Gift, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useMotherCounter } from '../hooks/useMotherCounter';
import SearchableSelect from './SearchableSelect';
import { bdLocations } from '../data/bdLocations';
import { saveOrder, sendSms } from '../lib/api';
import { useJourneyProgress } from '../hooks/useJourneyProgress';
import bkashImg from '../assets/bkash.png';

const ChocolateIcon = () => (
  <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-sm">
    <rect x="25" y="25" width="50" height="50" rx="8" fill="url(#chocGrad)" transform="rotate(15, 50, 50)" />
    <path d="M40 25 L40 75" stroke="#3E2723" strokeWidth="3" transform="rotate(15, 50, 50)" opacity="0.6"/>
    <path d="M60 25 L60 75" stroke="#3E2723" strokeWidth="3" transform="rotate(15, 50, 50)" opacity="0.6"/>
    <path d="M25 40 L75 40" stroke="#3E2723" strokeWidth="3" transform="rotate(15, 50, 50)" opacity="0.6"/>
    <path d="M25 60 L75 60" stroke="#3E2723" strokeWidth="3" transform="rotate(15, 50, 50)" opacity="0.6"/>
    <path d="M50 25 L50 40 M60 25 L60 40" stroke="#795548" strokeWidth="2" transform="rotate(15, 50, 50)" opacity="0.5"/>
    <defs>
      <linearGradient id="chocGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5D4037" />
        <stop offset="1" stopColor="#3E2723" />
      </linearGradient>
    </defs>
  </svg>
);

const VanillaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-sm">
    <path d="M 30 80 Q 50 40, 80 25" stroke="#4E342E" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M 40 85 Q 60 45, 85 35" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="40" cy="45" r="15" fill="url(#vanillaGrad)" />
    <path d="M 40 30 C 55 15, 65 30, 40 45 Z" fill="#FFFDE7" />
    <path d="M 40 30 C 25 15, 15 30, 40 45 Z" fill="#FFFDE7" />
    <path d="M 40 45 C 60 45, 60 65, 40 45 Z" fill="#FFFDE7" />
    <path d="M 40 45 C 20 45, 20 65, 40 45 Z" fill="#FFFDE7" />
    <path d="M 40 45 C 50 75, 30 75, 40 45 Z" fill="#FFF59D" />
    <circle cx="40" cy="45" r="5" fill="#FBC02D" />
    <defs>
      <radialGradient id="vanillaGrad" cx="0.5" cy="0.5" r="0.5">
        <stop stopColor="#FFF9C4" />
        <stop offset="1" stopColor="#FFFDE7" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const CardamomIcon = () => (
  <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-sm">
    <path d="M30 75 C 15 60, 40 25, 75 30 C 85 35, 75 80, 30 75 Z" fill="url(#cardamomGrad)" />
    <path d="M35 70 Q 45 40, 70 35" stroke="#33691E" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M45 75 Q 55 45, 75 45" stroke="#33691E" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M75 30 Q 82 22, 85 25" stroke="#558B2F" strokeWidth="3" strokeLinecap="round" fill="none" />
    <defs>
      <linearGradient id="cardamomGrad" x1="25" y1="75" x2="75" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8BC34A" />
        <stop offset="1" stopColor="#33691E" />
      </linearGradient>
    </defs>
  </svg>
);

const CinnamonIcon = () => (
  <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-sm">
    <path d="M25 65 L 60 25 C 65 20, 75 20, 80 25 L 45 65 C 40 70, 30 70, 25 65 Z" fill="url(#cinGrad1)" />
    <path d="M25 65 C 30 60, 40 60, 45 65" stroke="#4E342E" strokeWidth="2.5" fill="none" />
    <path d="M40 80 L 75 40 C 80 35, 90 35, 95 40 L 60 80 C 55 85, 45 85, 40 80 Z" fill="url(#cinGrad2)" />
    <path d="M40 80 C 45 75, 55 75, 60 80" stroke="#3E2723" strokeWidth="2.5" fill="none" />
    <defs>
      <linearGradient id="cinGrad1" x1="25" y1="65" x2="75" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A1887F" />
        <stop offset="0.5" stopColor="#8D6E63" />
        <stop offset="1" stopColor="#5D4037" />
      </linearGradient>
      <linearGradient id="cinGrad2" x1="40" y1="80" x2="90" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8D6E63" />
        <stop offset="0.5" stopColor="#795548" />
        <stop offset="1" stopColor="#4E342E" />
      </linearGradient>
    </defs>
  </svg>
);

const FLAVOURS_DATA = [
  { 
    id: 'dark-chocolate', 
    name: 'Dark Chocolate', 
    IconComponent: ChocolateIcon, 
    key: 'chocolate', 
    badge: '🔥 Most Loved'
  },
  { 
    id: 'vanilla', 
    name: 'Vanilla', 
    IconComponent: VanillaIcon, 
    key: 'vanilla', 
    badge: null
  },
  { 
    id: 'cardamom', 
    name: 'Cardamom', 
    IconComponent: CardamomIcon, 
    key: 'cardamom', 
    badge: null
  },
  { 
    id: 'cinnamon', 
    name: 'Cinnamon', 
    IconComponent: CinnamonIcon, 
    key: 'cinnamon', 
    badge: null
  },
];

// --- Live "purchasing now" counter (fake social proof) ---
// A random number between 50-100 is stored in sessionStorage with a 30 min TTL.
// It survives page reloads within the window, and regenerates once expired.
const LIVE_ORDER_STORAGE_KEY = 'milkimom_live_order_count';
const LIVE_ORDER_TTL_MS = 30 * 60 * 1000; // 30 minutes
const LIVE_ORDER_MIN = 50;
const LIVE_ORDER_MAX = 100;

const randomLiveOrderValue = () =>
  Math.floor(Math.random() * (LIVE_ORDER_MAX - LIVE_ORDER_MIN + 1)) + LIVE_ORDER_MIN; // 50-100 inclusive

// Persist a value to sessionStorage, preserving the existing 30 min expiry window.
const persistLiveOrderCount = (value: number) => {
  try {
    let expiresAt = Date.now() + LIVE_ORDER_TTL_MS;
    const raw = sessionStorage.getItem(LIVE_ORDER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { expiresAt?: number };
      if (parsed && typeof parsed.expiresAt === 'number') expiresAt = parsed.expiresAt;
    }
    sessionStorage.setItem(LIVE_ORDER_STORAGE_KEY, JSON.stringify({ value, expiresAt }));
  } catch (e) {
    // Ignore storage errors (e.g. private mode).
  }
};

const getLiveOrderCount = (): number => {
  try {
    const raw = sessionStorage.getItem(LIVE_ORDER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { value: number; expiresAt: number };
      // Always check the 30 min expiration before trusting the stored value.
      if (parsed && typeof parsed.value === 'number' && Date.now() < parsed.expiresAt) {
        return parsed.value;
      }
    }
  } catch (e) {
    // Ignore malformed/blocked storage and fall through to regenerate.
  }
  const value = randomLiveOrderValue();
  try {
    sessionStorage.setItem(
      LIVE_ORDER_STORAGE_KEY,
      JSON.stringify({ value, expiresAt: Date.now() + LIVE_ORDER_TTL_MS })
    );
  } catch (e) {
    // Ignore storage errors (e.g. private mode) — value is still shown for this render.
  }
  return value;
};

export default function OrderForm() {
  const navigate = useNavigate();
  const counts = useMotherCounter();
  const { step, updateStep } = useJourneyProgress();
  const [selectedFlavour, setSelectedFlavour] = useState('dark-chocolate');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'prepaid'>('cod');

  // Live "purchasing now" count — seeded from sessionStorage (30 min TTL).
  const [liveOrderCount, setLiveOrderCount] = useState<number>(() => getLiveOrderCount());

  // Keep checking the 30 min expiration so a stale number refreshes even without a reload.
  useEffect(() => {
    const refresh = () => setLiveOrderCount(getLiveOrderCount());
    const interval = setInterval(refresh, 60 * 1000); // re-check every minute
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  // Randomly tick the count down by 1 every 10-20 seconds, persisting to sessionStorage.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delayMs = (Math.floor(Math.random() * 11) + 10) * 1000; // 10-20s
      timeout = setTimeout(() => {
        setLiveOrderCount((prev) => {
          // Regenerate a fresh higher number once we hit the floor, keeps it lively.
          const next = prev > LIVE_ORDER_MIN ? prev - 1 : randomLiveOrderValue();
          persistLiveOrderCount(next);
          return next;
        });
        schedule();
      }, delayMs);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  const [name, setName] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("toggleCheckoutModal", { detail: showCheckoutPopup }));
  }, [showCheckoutPopup]);
  const [checkoutStep, setCheckoutStep] = useState<'otp' | 'payment' | 'preparing' | 'success'>('otp');
  const [trxId, setTrxId] = useState('');
  const [screenshotUploaded, setScreenshotUploaded] = useState(false);

  useEffect(() => {
    if (checkoutStep === 'success') {
      updateStep(8);
    }
  }, [checkoutStep, updateStep]);
  
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCount, setOtpCount] = useState(30);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const [district, setDistrict] = useState('');
  const [thana, setThana] = useState('');
  const [showLocationError, setShowLocationError] = useState(false);
  const [isOuterProcessing, setIsOuterProcessing] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
    location?: string;
    trxId?: string;
  }>({});

  // Delivery Timer Logic (5-minute free delivery countdown)
  const [deliveryTimer, setDeliveryTimer] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem('milkimom_free_delivery_expiry');
      if (stored) {
        const expiry = parseInt(stored, 10);
        if (!isNaN(expiry)) {
          const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
          return remaining;
        }
      }
      // Set new expiry for 5 minutes (300 seconds)
      const newExpiry = Date.now() + 5 * 60 * 1000;
      sessionStorage.setItem('milkimom_free_delivery_expiry', newExpiry.toString());
      return 300;
    } catch (e) {
      return 300;
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDeliveryTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const districtOptions = Object.keys(bdLocations).sort();
  const thanaOptions = district ? (bdLocations[district] || []).sort() : [];

  useEffect(() => {
    setThana('');
  }, [district]);

  useEffect(() => {
    let timer: any;
    if (showOtp && otpCount > 0 && !otpVerified) {
      timer = setInterval(() => setOtpCount(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showOtp, otpCount, otpVerified]);

  const handleSendOtp = async () => {
    if (phone.length === 11) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      
      const data = await sendSms(phone, `আপনার Milkimom ভেরিফিকেশন কোড: ${otp}`, 'otp');
      if (!data.success) {
        console.error('Failed to send OTP SMS:', data.error);
      } else {
        console.log('OTP SMS sent successfully');
      }
      
      setShowOtp(true);
      setOtpError('');
    } else {
      alert('অনুগ্রহ করে সঠিক মোবাইল নাম্বার দিন');
    }
  };

  const handleVerifyOtp = (e: any) => {
    const value = e.target.value;
    // Store the entered value. We need an enteredOtp state if we don't have one, but let's just use the DOM value.
  };

  const submitOtp = () => {
    const input = document.getElementById('otp-input') as HTMLInputElement;
    if (input) {
      const value = input.value;
      if (value === generatedOtp) {
        setOtpVerified(true);
        setOtpError('');
      } else {
        setOtpError('ভুল OTP। আবার চেষ্টা করুন।');
      }
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = "ম্যাম, আপনার নামটি লিখে দিন।";
    }
    if (!phone.trim()) {
      newErrors.phone = "ম্যাম, একটি সঠিক মোবাইল নাম্বার দিন।";
    } else if (phone.trim().length !== 11 || !/^\d+$/.test(phone.trim())) {
      newErrors.phone = "ম্যাম, একটি সঠিক মোবাইল নাম্বার দিন।";
    }
    if (!address.trim()) {
      newErrors.address = "ম্যাম, সম্পূর্ণ ঠিকানাটি লিখে দিন।";
    }
    if (!district || !thana) {
      newErrors.location = "ম্যাম, জেলা ও থানা নির্বাচন করুন।";
    }
    if (paymentMethod === 'prepaid' && !trxId.trim()) {
      newErrors.trxId = "ম্যাম, বিকাশ ট্রানজেকশন আইডি (TrxID) প্রদান করুন।";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOuterProcessing) return;

    if (!validateForm()) {
      return;
    }
    
    setIsOuterProcessing(true);
    setTimeout(() => {
      setIsOuterProcessing(false);
      setCheckoutStep('otp');
      setShowCheckoutPopup(true);
    }, 1000);
  };

  const sendCustomerConfirmation = async (orderDetails: any, orderId?: string) => {
    const trackingLine = orderId
      ? `\n\nঅর্ডার ট্র্যাক করুন:\n${window.location.origin}/track/${orderId}`
      : '';

    const customerSms = `অভিনন্দন Great মা!

আপনার Milkimom অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।

ইনশাআল্লাহ ২–৩ কার্যদিবসের মধ্যে আপনার অর্ডারটি আপনার ঠিকানায় পৌঁছে যাবে।${trackingLine}

যেকোনো প্রয়োজনে যোগাযোগ করুন:

WhatsApp:
01517-102603

Milkimom
Make Mother Great Again.`;

    const customerSmsResult = await sendSms(orderDetails.phone, customerSms, 'customer_confirmation');
    if (!customerSmsResult.success) {
      console.error('Error sending Customer SMS:', customerSmsResult.error);
    }
  };

  const triggerBackendNotifications = async (isPrepaid: boolean, currentTrxId: string = '') => {
    // Validate the expiry timestamp dynamically in the order submission logic
    let isSmsFreeDelivery = false;
    try {
      const stored = sessionStorage.getItem('milkimom_free_delivery_expiry');
      if (stored) {
        const expiry = parseInt(stored, 10);
        if (!isNaN(expiry) && expiry > Date.now()) {
          isSmsFreeDelivery = true;
        }
      }
    } catch (e) {
      isSmsFreeDelivery = deliveryTimer > 0;
    }

    const finalDeliveryCharge = isSmsFreeDelivery ? 0 : 150;
    const finalPrice = 4990 + finalDeliveryCharge;

    const orderDetails = {
      product: 'Milkimom Complete Dose',
      paymentMethod: isPrepaid ? 'Paid' : 'COD',
      customerName: name,
      phone: phone,
      alternativePhone: altPhone,
      district: district,
      thana: thana,
      address: address,
      flavour: FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name,
      price: finalPrice,
      orderTime: new Date().toISOString(),
      pageUrl: window.location.href,
      ...(isPrepaid && { transactionId: currentTrxId, screenshotUploaded })
    };

    // Save to backend (MongoDB)
    const result = await saveOrder(orderDetails);
    if (!result.success) {
      alert(`Order Error: ${typeof result.error === 'string' ? result.error : JSON.stringify(result.error)}`);
    }

    // Admin email + SMS are sent by the backend on order creation
    // (configurable via the admin dashboard settings).
    await sendCustomerConfirmation(orderDetails, result.data?._id);

    return result;
  };

  const triggerCustomerConfirmation = async (isPrepaid: boolean) => {
    // Kept for compatibility if used elsewhere, but actual logic is inside triggerBackendNotifications now.
  };

  const confirmOrder = async () => {
    if (!otpVerified) {
      alert('অনুগ্রহ করে মোবাইল নাম্বার ভেরিফাই করুন');
      return;
    }
    
    if (paymentMethod === 'prepaid' && !trxId) {
      alert('Transaction ID দিন');
      return;
    }

    setCheckoutStep('preparing');
    const result = await triggerBackendNotifications(paymentMethod === 'prepaid', trxId);
    if (result.success) {
      const orderId = result.data?._id;
      if (orderId) {
        navigate(`/order-placed/${orderId}`);
      } else {
        setCheckoutStep('success');
      }
    } else {
      alert('Order could not be saved. Please try again.');
      setCheckoutStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId) {
      alert('Transaction ID দিন');
      return;
    }
    setCheckoutStep('preparing');
    const result = await triggerBackendNotifications(true, trxId);
    if (result.success) {
      const orderId = result.data?._id;
      if (orderId) {
        navigate(`/order-placed/${orderId}`);
      } else {
        setCheckoutStep('success');
      }
    } else {
      alert('Order could not be saved. Please try again.');
      setCheckoutStep('payment');
    }
  };

  const isFreeDelivery = deliveryTimer > 0;
  const basePrice = 4990;
  const deliveryCharge = isFreeDelivery ? 0 : 150;
  const totalPrice = basePrice + deliveryCharge;

  const toBengaliNum = (num: number) => {
    const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return num.toString().split('').map(d => bnDigits[parseInt(d)] || d).join('');
  };

  const formatDeliveryTime = (timeInSeconds: number) => {
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="order-form" className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Live purchasing social proof */}
        <div className="flex justify-center mb-8 sm:mb-10 px-2" id="live-purchasing">
          <div className="inline-flex items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-full bg-brand-magenta/10 border border-brand-magenta/20 px-5 py-4 sm:px-10 sm:py-5 shadow-sm max-w-full">
            <span className="relative flex h-4 w-4 sm:h-5 sm:w-5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-brand-magenta"></span>
            </span>
            <p className="text-lg sm:text-2xl font-bold text-brand-magenta text-balance leading-snug">
              আপনি এবং <span className="bengali-num">{toBengaliNum(liveOrderCount)}</span> জন এই মুহূর্তে অর্ডার প্লেস করছেন
            </p>
          </div>
        </div>

        <div className="text-center mb-8" id="flavour-selection">
          <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">আপনার পছন্দের ফ্লেভারটি সিলেক্ট করুন</h2>
        </div>

        {/* Flavour Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16 max-w-4xl mx-auto">
          {FLAVOURS_DATA.map((f) => {
             const count = counts[f.key as keyof typeof counts] as number;
             const isSelected = selectedFlavour === f.id;
             return (
               <div 
                 key={f.id}
                 onClick={() => {
                   setSelectedFlavour(f.id);
                   updateStep(7);
                 }}
                 className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all duration-300 relative flex flex-col items-center text-center bg-white ${isSelected ? 'border-brand-gold bg-gradient-to-b from-brand-gold/10 to-white shadow-[0_8px_20px_-5px_rgba(230,168,50,0.3)] scale-[1.02]' : 'border-gray-100 hover:border-brand-gold/30 hover:shadow-md'}`}
               >
                 {f.badge && (
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-10">
                     {f.badge}
                   </div>
                 )}
                 <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                   {isSelected && <CheckCircle2 size={16} className="text-brand-gold bg-white rounded-full" />}
                 </div>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 mb-1.5 mt-1">
                   <div className="shrink-0 flex items-center justify-center">
                     <f.IconComponent />
                   </div>
                   <h4 className={`font-bold text-sm sm:text-base leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                     {f.name}
                   </h4>
                 </div>
                 
                 <p className="bengali-num text-[10px] sm:text-xs font-bold text-gray-500 leading-relaxed">
                   {count.toLocaleString('bn-BD')} জন <span className="font-sans font-normal text-gray-400">পছন্দ করেছেন</span>
                 </p>
               </div>
             );
          })}
        </div>

        {step >= 7 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-16 bg-[#FFFDF9] border border-brand-peach/20 rounded-2xl p-5 sm:p-6 text-center shadow-[0_10px_30px_rgba(189,0,82,0.04)]"
          >
            <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-3 flex items-center justify-center gap-2 tracking-tight">
              <span className="text-rose-500 animate-pulse">❤️</span>
              আপনার যাত্রা প্রায় সম্পন্ন।
            </h3>
            <p className="text-[13px] sm:text-[15px] font-bold text-gray-700 leading-relaxed max-w-[280px] mx-auto">
              শুধু আপনার তথ্য দিলেই<br/>
              আপনার Milkimom সংরক্ষণ করা হবে।
            </p>
          </motion.div>
        )}

        {/* Form Area */}
        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          
          <div className="lg:col-span-3">
             <div className="mb-8 text-center sm:text-left">
               <h3 className="text-balance text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">আপনার Milkimom কোথায় পাঠাবো?</h3>
               <p className="text-base text-gray-600 font-medium leading-relaxed">
                 মাত্র ১ মিনিটে অর্ডার কনফার্ম করুন। <br className="sm:hidden" /> সারা বাংলাদেশে ফ্রি হোম ডেলিভারি।
               </p>
             </div>
             
             <form onSubmit={handleSubmit} noValidate className="space-y-8">
               {/* STEP 1: আপনার তথ্য */}
               <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 -shadow relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-peach"></div>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-brand-peach text-white flex items-center justify-center font-bold text-base shadow-sm">
                     ১
                   </div>
                   <h4 className="text-lg font-bold text-gray-950">আপনার তথ্য</h4>
                 </div>
                 
                 <div className="space-y-5">
                   {/* নাম */}
                   <div>
                     <label className="block mb-2 flex items-center gap-1 text-base font-semibold text-gray-900">
                       আপনার নাম <span className="text-red-500">*</span>
                     </label>
                     <div className="relative">
                       <User className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                       <input 
                         value={name} 
                         onFocus={() => updateStep(7)}
                         onChange={(e) => {
                           setName(e.target.value);
                           if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                         }} 
                         type="text" 
                         placeholder="উদাহরনঃ ফাতেমা আক্তার" 
                         className={`w-full pl-11 pr-4 py-3.5 border ${errors.name ? 'border-red-300 focus:ring-4 focus:ring-red-200 focus:border-red-400 bg-red-50/10 transition-all duration-300 ' : 'border-gray-200 hover:border-brand-peach/50 focus:ring-4 focus:ring-brand-peach/20 focus:border-brand-magenta bg-white transition-all duration-300 '} rounded-xl focus:ring-4 outline-none transition-all duration-300 text-sm font-medium`} 
                       />
                     </div>
                     {errors.name && (
                       <div className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-1.5">
                         <AlertCircle size={14} className="shrink-0" />
                         <span>{errors.name}</span>
                       </div>
                     )}
                   </div>

                   {/* মোবাইল নাম্বার */}
                   <div>
                     <label className="block mb-2 flex items-center gap-1 text-base font-semibold text-gray-900">
                       মোবাইল নাম্বার <span className="text-red-500">*</span>
                     </label>
                     <div className="relative">
                       <Smartphone className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                       <input 
                         value={phone} 
                         onChange={(e) => {
                           setPhone(e.target.value);
                           if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                         }} 
                         type="tel" 
                         maxLength={11} 
                         placeholder="01XXX-XXXXXX" 
                         className={`w-full pl-11 pr-4 py-3.5 border ${errors.phone ? 'border-red-300 focus:ring-4 focus:ring-red-200 focus:border-red-400 bg-red-50/10 transition-all duration-300 ' : 'border-gray-200 hover:border-brand-peach/50 focus:ring-4 focus:ring-brand-peach/20 focus:border-brand-magenta bg-white transition-all duration-300 '} rounded-xl focus:ring-4 outline-none transition-all duration-300 text-sm font-medium`} 
                       />
                     </div>
                     {errors.phone && (
                       <div className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-1.5">
                         <AlertCircle size={14} className="shrink-0" />
                         <span>{errors.phone}</span>
                       </div>
                     )}
                   </div>

                   {/* বিকল্প মোবাইল নাম্বার */}
                   <div>
                     <label className="block mb-2 text-base font-semibold text-gray-900">
                       বিকল্প মোবাইল নাম্বার (Optional)
                     </label>
                     <div className="relative">
                       <Smartphone className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                       <input 
                         value={altPhone} 
                         onChange={(e) => setAltPhone(e.target.value)} 
                         type="tel" 
                         maxLength={11} 
                         placeholder="01XXX-XXXXXX" 
                         className="w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:ring-4 focus:ring-brand-peach/30 rounded-xl outline-none transition-all duration-300 text-sm bg-gray-50/30 font-medium" 
                       />
                     </div>
                   </div>
                 </div>
               </div>

               {/* STEP 2: ডেলিভারি ঠিকানা */}
               <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 -shadow relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-gold"></div>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold text-base shadow-sm">
                     ২
                   </div>
                   <h4 className="text-lg font-bold text-gray-950">ডেলিভারি ঠিকানা</h4>
                 </div>

                 <div className="space-y-5">
                   {/* জেলা */}
                   <div>
                     <SearchableSelect
                       label="জেলা *"
                       placeholder="জেলা নির্বাচন করুন"
                       options={districtOptions}
                       value={district}
                       onChange={(val) => {
                         setDistrict(val);
                         if (errors.location) setErrors(prev => ({ ...prev, location: undefined }));
                       }}
                     />
                   </div>

                   {/* থানা/উপজেলা */}
                   <div>
                     <SearchableSelect
                       label="থানা/উপজেলা *"
                       placeholder={district ? "থানা/উপজেলা নির্বাচন করুন" : "প্রথমে জেলা নির্বাচন করুন"}
                       options={thanaOptions}
                       value={thana}
                       onChange={(val) => {
                         setThana(val);
                         if (errors.location) setErrors(prev => ({ ...prev, location: undefined }));
                       }}
                       disabled={!district}
                     />
                     {errors.location && (
                       <div className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-1.5">
                         <AlertCircle size={14} className="shrink-0" />
                         <span>{errors.location}</span>
                       </div>
                     )}
                   </div>

                   {/* সম্পূর্ণ ঠিকানা */}
                   <div>
                     <label className="block mb-2 flex items-center gap-1 text-base font-semibold text-gray-900">
                       সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                     </label>
                     <div className="relative">
                       <MapPin className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                       <input 
                         value={address} 
                         onChange={(e) => {
                           setAddress(e.target.value);
                           if (errors.address) setErrors(prev => ({ ...prev, address: undefined }));
                         }} 
                         type="text" 
                         placeholder="গ্রাম/বাসা, রাস্তা, এলাকা" 
                         className={`w-full pl-11 pr-4 py-3.5 border ${errors.address ? 'border-red-300 focus:ring-4 focus:ring-red-200 focus:border-red-400 bg-red-50/10 transition-all duration-300 ' : 'border-gray-200 hover:border-brand-peach/50 focus:ring-4 focus:ring-brand-peach/20 focus:border-brand-magenta bg-white transition-all duration-300 '} rounded-xl focus:ring-4 outline-none transition-all duration-300 text-sm font-medium`} 
                       />
                     </div>
                     {errors.address && (
                       <div className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-1.5">
                         <AlertCircle size={14} className="shrink-0" />
                         <span>{errors.address}</span>
                       </div>
                     )}
                   </div>
                 </div>
               </div>

               {/* STEP 3: অর্ডার কনফার্ম */}
               <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 -shadow relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-magenta"></div>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-brand-magenta text-white flex items-center justify-center font-bold text-base shadow-sm">
                     ৩
                   </div>
                   <h4 className="text-lg font-bold text-gray-950">অর্ডার কনফার্ম</h4>
                 </div>

                 <div className="space-y-6">
                   {/* Selected Flavour Display */}
                   <div>
                     <label className="block mb-3 text-base font-semibold text-gray-900">
                       Selected Flavour
                     </label>
                     <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                       {(() => {
                         const flavour = FLAVOURS_DATA.find(f => f.id === selectedFlavour);
                         return flavour ? (
                           <>
                             <div className="scale-75 origin-center shrink-0">
                               <flavour.IconComponent />
                             </div>
                             <div className="flex-1">
                               <span className="font-bold text-gray-900 text-sm">
                                 {flavour.name}
                               </span>
                               <p className="text-xs text-gray-500 mt-0.5">
                                 ফ্লেভার পরিবর্তন করতে উপরের ফ্লেভার সেকশন থেকে নির্বাচন করুন।
                               </p>
                             </div>
                           </>
                         ) : null;
                       })()}
                     </div>
                   </div>

                   {/* পেমেন্ট অপশন */}
                   <div>
                     <label className="block mb-3 text-base font-semibold text-gray-900">
                       পেমেন্ট অপশন <span className="text-red-500">*</span>
                     </label>
                     <div className="space-y-3">
                       <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'cod' ? 'border-brand-magenta bg-brand-lightpink/10' : 'border-gray-200 hover:border-gray-300'}`}>
                         <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 accent-brand-magenta text-brand-magenta focus:ring-brand-magenta hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer" />
                         <div>
                           <span className="font-bold text-gray-900 block text-sm">Cash on Delivery</span>
                           <span className="text-xs text-gray-500">প্রোডাক্ট হাতে পেয়ে টাকা দিন</span>
                         </div>
                       </label>
                       
                       <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'prepaid' ? 'border-brand-magenta bg-brand-lightpink/10' : 'border-gray-200 hover:border-gray-300'}`}>
                         <input type="radio" name="payment" checked={paymentMethod === 'prepaid'} onChange={() => setPaymentMethod('prepaid')} className="w-5 h-5 accent-brand-magenta text-brand-magenta focus:ring-brand-magenta hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer" />
                         <div className="flex-1">
                           <div className="flex items-center justify-between">
                             <span className="font-bold text-gray-900 block text-sm">Pay Now (bKash)</span>
                             <span className="bg-brand-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-0.5 bengali-num"><Gift size={10}/> ১০০/= ক্যাশব্যাক</span>
                           </div>
                           <span className="text-xs text-gray-500">অনলাইনে পেমেন্ট করে <span className="bengali-num">১০০</span> টাকা ক্যাশব্যাক নিন</span>
                         </div>
                        </label>

                        {/* bKash Details & Trx ID field when Pay Now (bKash) is selected */}
                        {paymentMethod === 'prepaid' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 sm:p-5 bg-gradient-to-br from-pink-50/80 to-white rounded-2xl border border-brand-peach/40 space-y-4 shadow-sm mt-3"
                          >
                            {/* Large Cover bKash Image Header */}
                            <div className="w-full rounded-2xl overflow-hidden border-2 border-brand-peach/30 shadow-md bg-white p-2">
                              <img 
                                src={bkashImg} 
                                alt="bKash Payment" 
                                className="w-full h-auto max-h-64 sm:max-h-72 object-contain object-center rounded-xl"
                              />
                            </div>
                            <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-sm text-center">
                              <span className="text-xs text-gray-500 block font-medium">বিকাশ পার্সোনাল নম্বর (Send Money)</span>
                              <span className="text-xl font-mono font-bold text-brand-magenta tracking-wider select-all">01926-344244</span>
                            </div>

                            {/* Bangla Instructions */}
                            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/60 text-xs sm:text-sm text-gray-800 space-y-2">
                              <p className="font-bold text-amber-900 flex items-center gap-1.5 text-sm">
                                <span>📌</span> বিকাশ পেমেন্ট করার নির্দেশাবলী:
                              </p>
                              <ol className="list-decimal list-inside space-y-1.5 text-gray-700 leading-relaxed font-medium pl-1">
                                <li>আপনার বিকাশ মোবাইল অ্যাপ অথবা <span className="font-mono font-bold">*247#</span> ডায়াল করুন।</li>
                                <li><strong className="text-gray-900">Send Money</strong> অপশনটি সিলেক্ট করুন।</li>
                                <li>প্রাপক নম্বর লিখুন: <strong className="font-mono text-brand-magenta text-sm">01926-344244</strong></li>
                                <li>মোট পরিমাণ: <strong className="bengali-num text-brand-magenta font-bold">{toBengaliNum(totalPrice)}/=</strong> টাকা দিয়ে পিন দিন।</li>
                                <li>সেন্ড মানি সফল হওয়ার পর প্রাপ্ত <strong className="text-gray-900">Transaction ID (TrxID)</strong> নিচের ইনপুট বক্সে লিখুন।</li>
                              </ol>
                            </div>

                            {/* TrxID Input Field */}
                            <div>
                              <label className="block mb-1.5 text-sm font-bold text-gray-900 flex items-center justify-between">
                                <span>বিকাশ ট্রানজেকশন আইডি (TrxID) <span className="text-red-500">*</span></span>
                                <span className="text-[11px] font-normal text-gray-500">উদাহরণ: 9AB12CD34E</span>
                              </label>
                              <input 
                                type="text"
                                value={trxId}
                                onChange={(e) => {
                                  setTrxId(e.target.value);
                                  if (errors.trxId) setErrors(prev => ({ ...prev, trxId: undefined }));
                                }}
                                placeholder="bKash TrxID এখানে লিখুন (যেমন: 9AB12CD34E)"
                                className={`w-full px-4 py-3 rounded-xl border font-mono uppercase text-sm ${errors.trxId ? 'border-red-300 focus:ring-4 focus:ring-red-200 bg-red-50/10' : 'border-gray-200 focus:border-brand-magenta focus:ring-4 focus:ring-brand-peach/20 bg-white'} outline-none transition-all duration-300`}
                              />
                              {errors.trxId && (
                                <div className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-1.5">
                                  <AlertCircle size={14} className="shrink-0" />
                                  <span>{errors.trxId}</span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                   </div>
                 </div>
               </div>

               {/* Submit Button & Trust Line */}
               <div className="pt-4 space-y-4">
                 <button 
                   type="submit" 
                   disabled={isOuterProcessing}
                   className="w-full bg-gradient-to-r from-brand-magenta to-brand-peach text-white py-4 rounded-2xl hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.4)] gap-2 disabled:opacity-80 disabled:cursor-not-allowed text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
                 >
                   {isOuterProcessing ? (
                     <>
                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75 leading-relaxed" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       <span>অর্ডার প্রসেস হচ্ছে...</span>
                     </>
                   ) : (
                     <>
                       <ShieldCheck size={24} />
                       <span>আমার Milkimom নিশ্চিত করছি</span>
                     </>
                   )}
                 </button>

                 {/* Micro Trust Copy */}
                 <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <div className="flex items-center gap-2">
                     <span className="text-base">🔒</span>
                     <span>আপনার তথ্য নিরাপদ থাকবে</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-base">🚚</span>
                     <span>ফ্রি হোম ডেলিভারি</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-base">💳</span>
                     <span>ক্যাশ অন ডেলিভারি সুবিধা</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-base">📞</span>
                     <span>প্রয়োজনে <a href="tel:01517102603" className="hover:underline font-bold text-gray-950">01517-102603</a></span>
                   </div>
                 </div>
               </div>
             </form>
          </div>

          <div className="lg:col-span-2">
             <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 sticky top-24 border border-gray-200">
               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-200 pb-4">
                 <Package className="text-brand-magenta" /> অর্ডার সামারি
               </h3>
               
               <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-start text-sm">
                   <div>
                     <span className="block font-bold text-gray-800">মিল্কিমম কমপ্লিট ডোজ</span>
                     <span className="text-gray-500 text-xs">Flavour: {FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name}</span>
                   </div>
                   <span className="font-bold text-gray-900 bengali-num">৪৯৯০/=</span>
                 </div>
                 
                 {/* Delivery Charge Card */}
                 <div className={`p-4 rounded-xl border transition-all duration-300 ${isFreeDelivery ? 'bg-gradient-to-br from-green-50/50 to-emerald-50/30 border-green-100/50 backdrop-blur-sm shadow-sm' : 'bg-gray-50 border-gray-200'}`}>
                   <div className="flex justify-between items-center mb-2">
                     <div className="flex items-center gap-2">
                       <div className={`p-1.5 rounded-lg ${isFreeDelivery ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                         <Truck size={16} />
                       </div>
                       <span className="font-bold text-gray-800 text-sm">ডেলিভারি চার্জ</span>
                     </div>
                     
                     <div className="text-right flex flex-col items-end">
                       {isFreeDelivery ? (
                         <div className="flex items-center gap-1.5">
                           <span className="text-xs font-bold text-gray-400 line-through">১৫০/=</span>
                           <span className="font-bold text-[#2E7D32] text-xs bg-green-100/50 px-2 py-0.5 rounded-md border border-green-200/50">
                             ফ্রি
                           </span>
                         </div>
                       ) : (
                         <span className="font-bold text-gray-900 bengali-num text-sm">১৫০/=</span>
                       )}
                     </div>
                   </div>
                   
                   {isFreeDelivery ? (
                     <div className="mt-3 pt-3 border-t border-green-100/50 text-center">
                       <div className="flex flex-col items-center justify-center gap-2">
                         <span className="font-bold text-gray-800 text-xs sm:text-sm flex items-center gap-1.5 justify-center leading-normal">
                           🚚 ফ্রি ডেলিভারি পেতে অর্ডার সম্পন্ন করুন
                         </span>
                         <span className="font-mono text-lg sm:text-xl font-bold text-brand-magenta tracking-wider px-3 py-1 bg-brand-lightpink/30 rounded-md border border-brand-peach/20 select-none shadow-[0_2px_10px_rgba(189,0,82,0.05)]">
                           [{formatDeliveryTime(deliveryTimer)}]
                         </span>
                       </div>
                       <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">সময় শেষ হওয়ার আগেই অর্ডার কনফার্ম করুন।</p>
                     </div>
                   ) : (
                     <div className="mt-3 pt-3 border-t border-gray-200 text-center">
                       <p className="text-xs font-bold text-red-500 leading-relaxed">ফ্রি ডেলিভারি সময় শেষ হয়েছে।</p>
                     </div>
                   )}
                 </div>


               </div>

               <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                 <span className="font-bold text-gray-900 uppercase">Total:</span>
                 <span className="font-bold text-2xl text-brand-magenta bengali-num">
                   {toBengaliNum(totalPrice)}/=
                 </span>
               </div>
               
               <div className="mt-8 bg-white p-4 rounded-xl border border-blue-100 flex gap-3 text-sm text-gray-600">
                 <ShieldCheck className="text-blue-500 shrink-0" />
                 <p>আপনার সকল তথ্য আমাদের কাছে 100% নিরাপদ। আমরা কোন স্প্যাম করি না।</p>
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* Checkout Popup */}
      <AnimatePresence>
        {showCheckoutPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => {
                if (checkoutStep !== 'success' && checkoutStep !== 'preparing') {
                  setShowCheckoutPopup(false);
                }
              }}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 max-h-[85dvh] flex flex-col ${checkoutStep === 'success' ? 'bg-white/90 backdrop-blur-2xl border border-white/50' : 'bg-white'}`}
            >
              {checkoutStep !== 'success' && checkoutStep !== 'preparing' && (
                <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col gap-3 sticky top-0 bg-white z-20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {checkoutStep === 'otp' && 'মোবাইল ভেরিফিকেশন'}
                      {checkoutStep === 'payment' && (paymentMethod === 'prepaid' ? 'bKash Payment' : 'অর্ডার কনফার্ম করুন')}
                    </h3>
                    <button onClick={() => setShowCheckoutPopup(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 ">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-magenta transition-all duration-300 "
                      style={{ 
                        width: checkoutStep === 'otp' ? '50%' : '100%' 
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase flex justify-between">
                    <span className={checkoutStep === 'otp' ? 'text-brand-magenta' : ''}>Verification</span>
                    <span className={checkoutStep !== 'otp' ? 'text-brand-magenta' : ''}>Confirmation</span>
                  </div>
                </div>
              )}
              
              {checkoutStep === 'otp' && (
                <>
                  <div className="p-5 sm:p-6 overflow-y-auto">
                    <div className="bg-brand-lightpink/20 p-5 rounded-xl border border-brand-peach/30">
                      <h4 className="font-bold text-gray-900 mb-3 text-center">মোবাইল নাম্বার ভেরিফিকেশন</h4>
                      <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">আপনার দেওয়া মোবাইল নাম্বারে একটি OTP পাঠানো হবে।<br/><span className="font-bold text-gray-800">{phone}</span></p>
                      
                      {!showOtp && !otpVerified && (
                        <button type="button" onClick={handleSendOtp} className="w-full bg-brand-gold text-gray-900 py-3 rounded-xl font-bold shadow-sm hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300">
                          OTP পাঠান
                        </button>
                      )}
                      
                      {showOtp && !otpVerified && (
                        <div className="space-y-4">
                          <div>
                            <input 
                              id="otp-input"
                              type="text" 
                              placeholder="OTP লিখুন" 
                              maxLength={6}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta outline-none text-center text-xl font-mono tracking-widest"
                            />
                            {otpError && <p className="text-red-500 text-sm mt-2 text-center font-bold">{otpError}</p>}
                          </div>
                          <button type="button" onClick={submitOtp} className="w-full bg-brand-gold text-gray-900 py-3 rounded-xl font-bold shadow-sm hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300">
                            OTP যাচাই করুন
                          </button>
                        </div>
                      )}
                      
                      {otpVerified && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-bold mt-4">
                          ✅ মোবাইল নাম্বার সফলভাবে ভেরিফাই হয়েছে।
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20 flex gap-3">
                    <button 
                      onClick={() => setShowCheckoutPopup(false)}
                      className="py-4 px-6 rounded-2xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      disabled={!otpVerified}
                      className={`flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                        otpVerified 
                          ? 'bg-gradient-to-r from-brand-magenta to-brand-peach text-white hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)] cursor-pointer' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      পরবর্তী ধাপ (Next) <ArrowRight size={20} />
                    </button>
                  </div>
                </>
              )}

              {checkoutStep === 'payment' && (
                <>
                  <div className="p-5 sm:p-6 overflow-y-auto">
                    {paymentMethod === 'prepaid' ? (
                      <div className="space-y-5">
                        <div className="text-center">
                          <div className="w-full rounded-2xl overflow-hidden border-2 border-brand-peach/30 shadow-md bg-white p-2 mb-3">
                            <img 
                              src={bkashImg} 
                              alt="bKash Payment" 
                              className="w-full h-auto max-h-56 sm:max-h-64 object-contain object-center rounded-xl"
                            />
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">bKash Payment (বিকাশ পেমেন্ট)</h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">নিচের bKash নাম্বারে <strong>Send Money</strong> করে TrxID দিন।</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 sm:p-5 rounded-2xl border border-pink-100 text-center shadow-sm">
                          <p className="text-xs text-gray-500 mb-1 font-medium">বিকাশ পার্সোনাল নাম্বার (Send Money)</p>
                          <p className="text-2xl sm:text-3xl font-mono font-bold text-brand-magenta tracking-wider select-all">01926-344244</p>
                        </div>

                        {/* Bangla Instructions */}
                        <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60 text-xs text-gray-800 space-y-1.5">
                          <p className="font-bold text-amber-900 flex items-center gap-1">
                            <span>📌</span> পেমেন্ট করার নির্দেশাবলী:
                          </p>
                          <ol className="list-decimal list-inside space-y-1 text-gray-700 leading-relaxed font-medium">
                            <li>bKash অ্যাপ বা <span className="font-mono font-bold">*247#</span> ডায়াল করে <strong>Send Money</strong> সিলেক্ট করুন।</li>
                            <li>নম্বর: <strong className="font-mono text-brand-magenta">01926-344244</strong> | পরিমাণ: <strong className="bengali-num text-brand-magenta">{toBengaliNum(totalPrice)}/=</strong></li>
                            <li>পেমেন্ট সম্পূর্ণ হলে প্রাপ্ত <strong>Transaction ID (TrxID)</strong> নিচে বসান।</li>
                          </ol>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-900">Transaction ID (TrxID) <span className="text-red-500">*</span></label>
                            <input 
                              type="text"
                              value={trxId}
                              onChange={(e) => setTrxId(e.target.value)}
                              placeholder="যেমন: 9AB12CD34E"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-4 focus:ring-brand-peach/20 outline-none font-mono uppercase text-sm"
                            />
                          </div>
                          <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-900">Screenshot Upload <span className="text-gray-500 font-normal text-xs">(Optional)</span></label>
                            <input 
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp,.pdf"
                              onChange={(e) => setScreenshotUploaded(e.target.files && e.target.files.length > 0)}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-4 focus:ring-brand-peach/20 outline-none text-xs text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-lightpink file:text-brand-magenta hover:file:bg-brand-peach/20"
                            />
                            <p className="text-[11px] text-gray-400 mt-1">Accepted: jpg, jpeg, png, webp, pdf</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-brand-lightpink/50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <ShieldCheck size={32} className="text-brand-magenta" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900">অর্ডার কনফার্ম করুন</h4>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Product:</span>
                            <span className="font-bold text-gray-900">Milkimom Complete Dose</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Flavour:</span>
                            <span className="font-bold text-gray-900">{FLAVOURS_DATA.find(f => f.id === selectedFlavour)?.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Payment:</span>
                            <span className="font-bold text-gray-900">Cash on Delivery</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-gray-900 font-bold">Total:</span>
                            <span className="font-bold text-brand-magenta bengali-num text-lg">{toBengaliNum(totalPrice)}/=</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20 flex gap-3">
                    <button 
                      onClick={() => setCheckoutStep('otp')}
                      className="py-4 px-6 rounded-2xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button 
                      onClick={confirmOrder}
                      className="flex-1 py-4 rounded-2xl gap-2 transition-all duration-300 bg-gradient-to-r from-brand-magenta to-brand-peach text-white hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)] text-lg font-bold whitespace-nowrap text-center flex items-center justify-center"
                    >
                      <ShieldCheck size={24} /> {paymentMethod === 'prepaid' ? 'পেমেন্ট সাবমিট করুন' : 'আমার অর্ডার কনফার্ম করুন'}
                    </button>
                  </div>
                </>
              )}

              {checkoutStep === 'preparing' && (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-brand-peach/30 border-t-brand-magenta rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="text-brand-magenta animate-pulse" size={32} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">অর্ডার প্রসেস হচ্ছে...</h3>
                  <p className="text-gray-500 leading-relaxed">আপনার তথ্যগুলো ভেরিফাই করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।</p>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="p-6 sm:p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50 via-transparent to-transparent -z-10"></div>
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/10 border border-green-100"
                  >
                    <span className="text-4xl">🎉</span>
                  </motion.div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Congratulations!</h3>
                  <p className="text-xl font-bold text-brand-magenta mb-6">Great Mother ❤️</p>
                  
                  <div className="bg-white/80 p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4">
                    <p className="text-lg text-gray-700 font-medium leading-relaxed">
                      Your Milkimom is on the way to you.<br/>
                      Get Ready to Receive.
                    </p>
                    <div className="h-px w-12 bg-gray-200 mx-auto"></div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      If Any Help Needed,<br/>
                      Please Contact Us<br/>
                      <span className="font-bold text-gray-900 block mt-1">WhatsApp: 01517-102603</span>
                      or Inbox the Milkimom Facebook Page directly.
                    </p>
                  </div>
                  
                  <div className="w-full space-y-3">
                    <a href="https://wa.me/8801517102603" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(37,211,102,0.5)] flex items-center justify-center gap-2">
                      WhatsApp এ যোগাযোগ করুন
                    </a>
                    <button onClick={() => { setShowCheckoutPopup(false); window.location.href = '/'; }} className="w-full bg-white text-gray-800 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
                      হোম পেজে ফিরে যান
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
