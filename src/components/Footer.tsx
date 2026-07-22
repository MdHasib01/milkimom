import { Facebook, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1c1517] text-white pt-20 pb-24 sm:pb-12 relative overflow-hidden">
      {/* Warm ambient blobs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-magenta/10 rounded-full blur-[100px] -translate-y-1/2 mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-brand-peach/10 rounded-full blur-[100px] translate-y-1/2 mix-blend-overlay"></div>
      
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-peach/50 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-peach to-brand-magenta flex items-center justify-center text-white font-bold text-xl shadow-inner">M</div>
              <span className="text-3xl font-bold tracking-tighter text-white">Milki<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-peach to-brand-gold">mom</span></span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 pb-8 border-b border-white/10 leading-relaxed font-medium">
              ১ ডোজেই পার্মানেন্টলি বুকের দুধ বাড়ায়। মা ও শিশুর সম্পূর্ণ পুষ্টি নিশ্চিত করার বিশ্বস্ত সঙ্গী।
            </p>
            <div className="flex gap-4">
              <a href="https://m.facebook.com/milkimom" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-brand-magenta hover:to-brand-peach hover:border-transparent hover:text-white transition-all duration-300 text-gray-400 group shadow-lg">
                <Facebook size={20} className="group-hover:scale-110 transition-transform duration-300 " />
              </a>
            </div>
          </div>

          <div>
             <h4 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-peach to-brand-gold mb-6 uppercase tracking-widest">Contact</h4>
             <ul className="space-y-4">
               <li>
                 <a href="tel:01517102603" className="flex items-center gap-3 text-gray-400 hover:text-brand-peach transition-colors duration-300 font-medium">
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-brand-peach">
                     <Phone size={14} />
                   </div>
                   01517102603
                 </a>
               </li>
               <li>
                 <a href="https://wa.me/8801517102603" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors duration-300 font-medium">
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-green-400">
                     <Phone size={14} />
                   </div>
                   WhatsApp
                 </a>
               </li>
             </ul>
          </div>

          <div>
             <h4 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-peach to-brand-gold mb-6 uppercase tracking-widest">Address</h4>
             <div className="flex items-start gap-3 text-gray-400 font-medium">
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-brand-magenta shrink-0 mt-0.5">
                 <MapPin size={14} />
               </div>
               <p className="leading-relaxed">
                 202-J, Mohammadia Housing,<br />
                 Mohammadpur, Dhaka
               </p>
             </div>
          </div>

        </div>

        <div className="text-center pt-8 border-t border-white/10 text-gray-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} All Rights Reserved by Milkimom
        </div>
      </div>
    </footer>
  );
}
