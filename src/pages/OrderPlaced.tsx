import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { PackageSearch, Home as HomeIcon } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function OrderPlaced() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-center">
          <a href="/">
            <img src={logoImg} alt="Milkimom Logo" className="h-10 w-auto object-contain" />
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-brand-peach/20 p-8 sm:p-12 max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-lg shadow-green-500/10"
          >
            <span className="text-5xl">🎉</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">
            অর্ডার সম্পন্ন হয়েছে!
          </h1>
          <p className="text-lg font-bold text-brand-magenta mb-6">
            অভিনন্দন, Great মা! ❤️
          </p>

          <p className="text-gray-600 leading-relaxed mb-2">
            আপনার Milkimom অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            ইনশাআল্লাহ ২–৩ কার্যদিবসের মধ্যে আপনার অর্ডারটি আপনার ঠিকানায় পৌঁছে যাবে।
          </p>

          {id && (
            <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-8">
              <p className="text-xs text-gray-500 font-medium mb-1">অর্ডার আইডি</p>
              <p className="font-mono text-sm font-bold text-gray-800 break-all select-all">{id}</p>
            </div>
          )}

          <div className="space-y-3">
            {id && (
              <Link
                to={`/track/${id}`}
                className="w-full bg-gradient-to-r from-brand-magenta to-brand-peach text-white py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(189,0,82,0.5)] flex items-center justify-center gap-2"
              >
                <PackageSearch size={22} /> অর্ডার ট্র্যাক করুন
              </Link>
            )}
            <Link
              to="/"
              className="w-full bg-white text-gray-800 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2 border border-gray-200 shadow-sm"
            >
              <HomeIcon size={20} /> হোম পেজে ফিরে যান
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-8 leading-relaxed">
            যেকোনো প্রয়োজনে যোগাযোগ করুন —{' '}
            <a href="https://wa.me/8801517102603" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 hover:underline">
              WhatsApp: 01517-102603
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
