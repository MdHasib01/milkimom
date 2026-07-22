import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const scrollToForm = () => { navigate("/checkout"); };

  return (
    <header className="flex justify-between items-center px-6 sm:px-12 py-6 bg-white/30 backdrop-blur-md border-b border-white/20 relative z-30">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-brand-peach flex items-center justify-center text-white font-bold text-xl shadow-inner">M</div>
        <span className="text-2xl font-bold tracking-tighter text-brand-magenta">Milki<span className="text-brand-gold">mom</span></span>
      </div>
      
      <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-700 uppercase tracking-wide">
        <a href="#hero" className="hover:text-brand-magenta transition-colors duration-300 ">হোম</a>
        <a href="#benefits" className="hover:text-brand-magenta transition-colors duration-300 ">উপকারিতা</a>
        <a href="#reviews" className="hover:text-brand-magenta transition-colors duration-300 ">রিভিউ</a>
        <a href="#faq" className="hover:text-brand-magenta transition-colors duration-300 ">প্রশ্নোত্তর</a>
      </nav>
      
      <button 
        onClick={scrollToForm}
        className="bg-brand-magenta text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-brand-magenta/30 transition-all duration-300 scale-100 hover:-translate-y-1 hover:shadow-lg active:scale-95 "
      >
        অর্ডার করুন
      </button>
    </header>
  );
}
