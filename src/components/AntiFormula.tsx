import { useNavigate } from 'react-router-dom';
import { ShieldX, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function AntiFormula() {
  const navigate = useNavigate();
  const scrollToForm = () => { navigate("/checkout"); };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-brand-magenta to-[#a80048] text-white text-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-peach/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 lg:p-16 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)]"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl mb-8 shadow-inner">
            <ShieldX className="text-white w-10 h-10 drop-shadow-md" />
          </div>
          
          <h2 className="text-balance text-3xl sm:text-4xl font-bold mb-6 leading-tight drop-shadow-sm">
            বাচ্চার সুস্থতায় একচুলও ছাড় নয়।
          </h2>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 font-medium leading-relaxed">
            ফর্মুলা দুধকে না বলি, <span className="bg-white/20 px-3 py-1 rounded-lg">বুকের দুধ নিশ্চিত করি।</span>
          </p>
          
          <button onClick={scrollToForm} className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-brand-magenta text-lg font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] w-full sm:w-auto">
             আমি বাবুর জন্য বুকের দুধ নিশ্চিত করতে চাই
             <Heart size={20} fill="currentColor" className="text-brand-magenta group-hover:scale-110 transition-transform duration-300 " />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
