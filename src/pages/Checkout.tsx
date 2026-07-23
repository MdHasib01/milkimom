import React, { useLayoutEffect } from 'react';
import { ShieldCheck, Truck, CreditCard, Users } from 'lucide-react';
import OrderForm from '../components/OrderForm';
import { useMotherCounter } from '../hooks/useMotherCounter';
import logoImg from '../assets/logo.png';

export default function Checkout() {
  const { total: masterMotherCount } = useMotherCounter();

  useLayoutEffect(() => {
    // Prevent browser from restoring scroll position on Checkout page
    const originalScrollRestoration = window.history.scrollRestoration;
    try {
      window.history.scrollRestoration = 'manual';
    } catch (e) {
      // Ignore
    }

    // Scroll position must always start at (0, 0) instantly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as any
    });

    return () => {
      // Restore previous scroll restoration behavior
      try {
        window.history.scrollRestoration = originalScrollRestoration;
      } catch (e) {
        // Ignore
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-magenta selection:text-white">
      {/* 1. Secure Checkout Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="/" className="flex items-center justify-center gap-2">
              <img src={logoImg} alt="Milkimom Logo" className="h-9 sm:h-11 w-auto object-contain" />
            </a>
            
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-6 text-[11px] sm:text-xs font-bold text-gray-600">
              <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-magenta" /> Secure Checkout</div>
              <div className="flex items-center gap-1.5"><Truck size={14} className="text-brand-magenta" /> Free Delivery</div>
              <div className="flex items-center gap-1.5"><CreditCard size={14} className="text-brand-magenta" /> Cash on Delivery</div>
              <div className="flex items-center gap-1.5"><Users size={14} className="text-brand-magenta" /> {masterMotherCount.toLocaleString('en-US')}+ Mothers</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 2. Selected Product */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-brand-peach/20 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-lightpink rounded-xl flex items-center justify-center border border-brand-peach/10 p-2">
              <img src={logoImg} alt="Milkimom" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-gray-900">Milkimom Complete Dose</h2>
              <p className="text-sm text-gray-500 font-medium">15 Days Formula</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-black text-brand-magenta drop-shadow-sm">৳<span className="bengali-num">৪৯৯০</span></p>
          </div>
        </div>

        {/* 4. OTO Placeholder (Will be implemented later.) */}
        <div className="mb-8" id="oto-placeholder"></div>

        {/* 3. Flavour Selection, 5. Order Form, 6. Order Summary, 7. Payment, 8. Success Flow are in OrderForm */}
        <div className="-mx-4 sm:mx-0">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
