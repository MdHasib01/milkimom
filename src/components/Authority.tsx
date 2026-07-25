import { Stethoscope, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import saddamImg from '../assets/doctors/saddam.png';
import nazmulImg from '../assets/doctors/nazmul.png';
import hadisImg from '../assets/doctors/hadis.png';
import wahidImg from '../assets/doctors/wahid.png';

const DOCTORS = [
  { name: 'Dr. Md Saddam', desig: 'Doctor', img: saddamImg },
  { name: 'Dr. Md Nazmul', desig: 'Doctor', img: nazmulImg },
  { name: 'Dr. Md Hadis', desig: 'Doctor', img: hadisImg },
  { name: 'Dr. Wahidur Rahman', desig: 'Doctor', img: wahidImg },
];

const HOSPITALS = [
  { name: 'Popular Hospital', color: 'text-blue-600 bg-blue-100/50 group-hover:bg-blue-100' },
  { name: 'Ibn Sina Hospital', color: 'text-green-600 bg-green-100/50 group-hover:bg-green-100' },
  { name: 'Square Hospitals Ltd.', color: 'text-blue-500 bg-blue-50 group-hover:bg-blue-100' },
  { name: 'Ad-din Hospital', color: 'text-teal-600 bg-teal-100/50 group-hover:bg-teal-100' },
  { name: 'BRB Hospital', color: 'text-indigo-600 bg-indigo-100/50 group-hover:bg-indigo-100' },
  { name: 'Islami Bank Hospital', color: 'text-emerald-600 bg-emerald-100/50 group-hover:bg-emerald-100' },
  { name: 'Labaid Diagnostics', color: 'text-cyan-600 bg-cyan-100/50 group-hover:bg-cyan-100' },
  { name: 'ARACO', color: 'text-red-500 bg-red-50 group-hover:bg-red-100' },
  { name: 'Royal Hospital Ltd.', color: 'text-purple-600 bg-purple-100/50 group-hover:bg-purple-100' },
  { name: 'SIBL Foundation Hospital & Diagnostic Center', color: 'text-sky-600 bg-sky-100/50 group-hover:bg-sky-100' },
  { name: 'Famous Derma', color: 'text-pink-600 bg-pink-100/50 group-hover:bg-pink-100' },
  { name: 'Banasree Care Hospital Limited', color: 'text-orange-600 bg-orange-100/50 group-hover:bg-orange-100' }
];

export default function Authority() {
  return (
    <section id="authority-section" className="py-12 lg:py-16 bg-[#fdfbfb] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-lightpink/15 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="flex justify-center gap-8 lg:gap-16 mb-8 bg-white/60 backdrop-blur-sm border border-white py-6 px-10 rounded-2xl mx-auto w-fit shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)]">
             <div className="text-center">
               <span className="block text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-peach to-brand-gold mb-1">13+</span>
               <span className="text-xs font-bold text-brand-magenta uppercase tracking-widest">Top Hospitals</span>
             </div>
             <div className="w-px bg-brand-peach/20"></div>
             <div className="text-center">
               <span className="block text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-magenta to-brand-peach mb-1">66+</span>
               <span className="text-xs font-bold text-brand-magenta uppercase tracking-widest">Specialist Doctors</span>
             </div>
          </div>
          <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight">
            মিল্কিমমের উপর আস্থা রেখেছেন দেশের স্বনামধন্য <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta to-brand-peach">হসপিটাল এবং অসংখ্য ডাক্তার</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto gap-3 sm:gap-5 mb-8">
          {DOCTORS.map((doc, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col items-center"
             >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-peach to-brand-lightpink opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
               
               <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-3 p-1 bg-gradient-to-br from-brand-peach/30 to-brand-magenta/20 shadow-sm relative group-transition-transform duration-300 group-hover:scale-105">
                 <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white relative">
                   <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top" />
                 </div>
                 <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                   <CheckCircle2 className="text-[#10b981] w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" stroke="white" />
                 </div>
               </div>

               <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1 leading-tight">
                 {doc.name}
               </h3>
               <p className="text-brand-magenta font-semibold text-[11px] sm:text-xs leading-relaxed">
                 {doc.desig}
               </p>
             </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-[1400px]:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {HOSPITALS.map((hosp, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.05 }}
               className="bg-white/70 backdrop-blur-sm shadow-sm border border-brand-peach/10 flex items-center gap-2 p-2 sm:p-2.5 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group cursor-default"
             >
               <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 bg-gradient-to-br ${hosp.color}`}>
                 <Building2 size={16} />
               </div>
               <div className="flex-1 min-w-0 flex items-center justify-between gap-1 overflow-hidden">
                 <span className="font-bold text-gray-800 text-[10px] sm:text-xs truncate leading-tight" title={hosp.name}>{hosp.name}</span>
                 <CheckCircle2 className="text-[#10b981] shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" stroke="white" />
               </div>
             </motion.div>
          ))}
        </div>

        <p className="text-center font-bold text-gray-600 mt-8 leading-relaxed">
          দেশের বিভিন্ন স্বনামধন্য হসপিটাল, ক্লিনিক ও চিকিৎসকদের আস্থায় মিল্কিমম।
        </p>

      </div>
    </section>
  );
}
