import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function FutureLetter() {
  const navigate = useNavigate();
  const scrollToFlavour = () => { navigate("/checkout"); };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.5, duration: 0.3, ease: "easeOut" }
    })
  };

  return (
    <section id="future-letter" className="py-12 lg:py-16 bg-brand-cream relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 sm:mb-14"
        >
          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            <span className="text-rose-500 animate-pulse">❤️</span> যদি আপনার বাবু কথা বলতে পারতো...
          </h2>
        </motion.div>

        {/* Letter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-brand-gold/20 relative mx-auto max-w-2xl"
        >
          {/* Subtle golden corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-brand-gold/30 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-brand-gold/30 rounded-br-3xl"></div>

          <div className="space-y-6 sm:space-y-8 text-center sm:text-left text-gray-800 font-medium text-lg sm:text-xl md:text-2xl leading-relaxed">
            <motion.p
              custom={1}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              মা,
            </motion.p>
            <motion.p
              custom={2}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              আমি এখনো ছোট।
            </motion.p>
            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              কিন্তু আমি জানি,<br className="hidden sm:block"/>
              তুমি আমার জন্য সবসময় সেরাটাই বেছে নাও।
            </motion.p>
            <motion.p
              custom={4}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              আজও সেই ভালোবাসা নিয়েই<br className="hidden sm:block"/>
              সিদ্ধান্ত নিও।
            </motion.p>
            <motion.p
              custom={5}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-right font-bold text-gray-900 mt-8 pt-4 sm:pt-8"
            >
              — তোমার বাবু <span className="text-rose-500">❤️</span>
            </motion.p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          custom={6}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-8 sm:mt-16 text-center"
        >
          <button 
            onClick={scrollToFlavour}
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm sm:text-base px-6 py-4 sm:px-10 sm:py-5 rounded-2xl sm:rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 group w-full sm:w-auto"
          >
            <span>আজও আমি আমার বাবুর জন্য সেরাটাই বেছে নিচ্ছি</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300 " />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
