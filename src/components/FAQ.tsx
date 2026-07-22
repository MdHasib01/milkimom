import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FAQS = [
  { q: "কত দিনে বুকের দুধ বাড়বে?", a: "মিল্কিমম খেলে ৩ দিনের মধ্যে বুকের দুধ বৃদ্ধি পাবে। ফলে আপনার বাচ্চা পরিপূর্ণ বুকের দুধ পাবে।" },
  { q: "বুকের দুধ কি পার্মানেন্টলি বাড়বে?", a: "মিল্কিমমের একটি কমপ্লিট ডোজ শেষ হওয়ার পরেও বুকের দুধের ফ্লো কমে যায় না। ব্রেস্টফিডিংয়ের শেষ পর্যন্ত স্থায়ী হয়।" },
  { q: "১ টাই ডোজ খেতে হবে?", a: "মিল্কিমম ১ ডোজই খেতে হয়। বারবার খাওয়ার প্রয়োজন নেই।" },
  { q: "কত দিনের ডোজ?", a: "১৫ দিনের কমপ্লিট ডোজ।" },
  { q: "খাওয়ার নিয়ম কী?", a: "সাথে দেওয়া চামচের ১ চামচ করে দিনে ২ বার, ১ গ্লাস দুধ বা পানিতে মিশিয়ে খাবেন। সাথে ইউজার ম্যানুয়াল দেওয়া হয়।" },
  { q: "বাবু সাক করে না, পাম্প ইউস করি, বাড়বে কি?", a: "জ্বী, পাম্প করলেও বুকের দুধ বাড়বে।" },
  { q: "বুকের দুধ একেবারেই বন্ধ হয়ে গেছে, তাও কি দুধ আসবে?", a: "জ্বী, মিল্কিমম খেয়ে একদম বুকের দুধ বন্ধ হয়ে যাওয়া মায়েদেরও বুকের দুধ আসে।" },
  { q: "টেস্ট কেমন?", a: "মিল্কিমম হালকা মিষ্টি স্বাদের, তাই খেতেও মজা লাগে।" },
  { q: "মিল্কিমম জিনিসটা কী?", a: "মিল্কিমম বুকের দুধ তৈরি, বৃদ্ধি ও বুকের দুধে পুষ্টি উপাদান বজায় রাখার জন্য একটি সেমি লিকুইড সাপ্লিমেন্ট।" },
  { q: "বাবুর বয়স ০-২৪ মাসের মধ্যে খাওয়া যাবে?", a: "বাবুর বয়স ০ দিন থেকে ২৪ মাসের মধ্যে যেকোনো সময়ে মিল্কিমম খাওয়া যায়।" },
  { q: "মিল্কিমমের উপাদান কী?", a: "মিল্কিমম তৈরি হয় ১০টি কার্যকরী উপাদানে। স্টারলিং নাইজেলা, চেস্ট হানি ও ৮টি সিক্রেট উপাদানসহ রেয়ার ইম্পোর্টেড উপাদানে তৈরি।" },
  { q: "সাইডইফেক্ট মুক্ত তো?", a: "মিল্কিমম সম্পূর্ণ সাইডইফেক্ট মুক্ত, ন্যাচারাল, ল্যাব টেস্টেড এবং সার্টিফাইড।" },
  { q: "দামটা একটু বেশি মনে হচ্ছে, এত দাম কেন?", a: "রেয়ার ও ইম্পোর্টেড উপাদান দিয়ে তৈরি হওয়ায় এর কার্যকারিতা বজায় রাখতে প্রিমিয়াম কোয়ালিটি রাখা হয়। সবচেয়ে বড় ব্যাপার, এটি ১ ডোজ খেলেই হয়।" },
  { q: "মিল্কিমম খেলে বাচ্চার গ্রোথ বাড়বে?", a: "মিল্কিমম বুকের দুধে সঠিক পুষ্টি বজায় রাখতে সাহায্য করে। যথাযথ পুষ্টি পেলে বাচ্চার গ্রোথ, ওয়েট গেইন ও ব্রেইন ডেভেলপমেন্ট সাপোর্ট পায়।" },
  { 
    q: "আমার থাইরয়েড, ডায়াবেটিস, ব্লাড প্রেশার, IBS বা অন্যান্য সমস্যা থাকলে কি মিল্কিমম খেতে পারবো?", 
    a: (
      <div className="space-y-3">
        <p>জ্বী, থাইরয়েড, ডায়াবেটিস, ব্লাড প্রেশার, IBS (Irritable Bowel Syndrome) বা অন্যান্য শারীরিক সমস্যা থাকলেও আপনি নিশ্চিন্তে মিল্কিমম খেতে পারবেন। ✅</p>
        <p>মিল্কিমম সম্পূর্ণ ন্যাচারাল, ল্যাব টেস্টেড, সাইডইফেক্ট মুক্ত এবং মায়েদের জন্য তৈরি একটি সেমি-লিকুইড সাপ্লিমেন্ট।</p>
      </div>
    )
  },
  { q: "বুকের দুধ পাতলা হলে মিল্কিমম কি ঘন করে?", a: "মিল্কিমম নিউট্রিশন ব্যালান্স করে বুকের দুধের গুণগত মান বজায় রাখতে সাহায্য করে।" },
];

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const scrollToForm = () => { navigate("/checkout"); };

  return (
    <section className="py-12 lg:py-16 bg-[#fdfbfb] relative">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand-peach/10 rounded-full blur-[80px] -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-lightpink/15 rounded-full blur-[100px] translate-x-1/3"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-peach/20 to-brand-magenta/5 border border-white shadow-inner mb-6">
            <MessageCircleQuestion className="text-brand-magenta w-8 h-8" />
          </div>
          <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">মায়েদের কিছু <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta to-brand-peach">কমন প্রশ্ন</span></h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-white overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_-15px_rgba(189,0,82,0.1)]">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-gray-800 hover:bg-brand-peach/5 transition-colors duration-300 "
              >
                <span className="pr-4">{faq.q}</span>
                <div className={`p-1 rounded-full shrink-0 transition-colors duration-300 ${openIndex === i ? 'bg-brand-magenta text-white' : 'bg-brand-peach/10 text-brand-magenta'}`}>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-gray-600 border-t border-brand-peach/10 bg-white/40 leading-relaxed">
                      <div className="pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button onClick={() => navigate("/checkout")} className="group relative inline-flex gap-3 px-10 py-5 bg-gradient-to-r from-brand-magenta to-brand-peach text-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-[0_15px_30px_-10px_rgba(189,0,82,0.4)] w-full sm:w-auto text-lg font-bold whitespace-nowrap text-center flex items-center justify-center">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
            <span>মিল্কিমম বিশ্বাসযোগ্য, আমি অর্ডার করতে চাই</span>
          </button>
        </div>
      </div>
    </section>
  );
}
