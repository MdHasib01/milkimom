import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, XCircle, Loader2, Home as HomeIcon, Printer } from 'lucide-react';
import { getOrderById } from '../lib/api';
import logoImg from '../assets/logo.png';

const STATUS_STEPS = [
  { key: 'Pending', label: 'অর্ডার গৃহীত হয়েছে', description: 'আপনার অর্ডারটি আমরা পেয়েছি।' },
  { key: 'Confirmed', label: 'অর্ডার কনফার্ম হয়েছে', description: 'আপনার অর্ডারটি যাচাই করে কনফার্ম করা হয়েছে।' },
  { key: 'Shipped', label: 'ডেলিভারির জন্য পাঠানো হয়েছে', description: 'আপনার পণ্যটি কুরিয়ারে হস্তান্তর করা হয়েছে।' },
  { key: 'Delivered', label: 'ডেলিভারি সম্পন্ন হয়েছে', description: 'আপনার পণ্যটি পৌঁছে গেছে। ধন্যবাদ!' },
];

export default function TrackOrder() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    (async () => {
      const result = await getOrderById(id);
      if (result.success && result.data) {
        setOrder(result.data);
      } else {
        setError('অর্ডারটি খুঁজে পাওয়া যায়নি। অর্ডার আইডি সঠিক কিনা যাচাই করুন।');
      }
      setLoading(false);
    })();
  }, [id]);

  const isCancelled = order?.status === 'Cancelled';
  const currentIndex = order ? STATUS_STEPS.findIndex((s) => s.key === order.status) : -1;

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-center">
          <a href="/">
            <img src={logoImg} alt="Milkimom Logo" className="h-10 w-auto object-contain" />
          </a>
        </div>
      </header>

      <main className="flex-1 px-4 py-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8 tracking-tight">
            অর্ডার ট্র্যাকিং
          </h1>

          {loading && (
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-12 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-brand-magenta" size={36} />
              <p className="text-gray-500 font-medium">অর্ডারের তথ্য লোড হচ্ছে...</p>
            </div>
          )}

          {!loading && error && (
            <div className="bg-white rounded-3xl shadow-md border border-red-100 p-10 text-center">
              <XCircle className="text-red-400 mx-auto mb-4" size={44} />
              <p className="text-gray-700 font-bold leading-relaxed">{error}</p>
              <Link to="/" className="inline-flex items-center gap-2 mt-6 text-brand-magenta font-bold hover:underline">
                <HomeIcon size={18} /> হোম পেজে ফিরে যান
              </Link>
            </div>
          )}

          {!loading && order && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Order summary card */}
              <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900">{order.product}</p>
                    <p className="text-sm text-gray-500">Flavour: {order.flavour}</p>
                  </div>
                  <p className="font-black text-brand-magenta text-xl">৳{order.price}</p>
                </div>
                <div className="text-sm text-gray-600 space-y-1.5">
                  <p><span className="font-semibold text-gray-800">নাম:</span> {order.customerName}</p>
                  <p><span className="font-semibold text-gray-800">ঠিকানা:</span> {order.address}, {order.thana}, {order.district}</p>
                  <p><span className="font-semibold text-gray-800">পেমেন্ট:</span> {order.paymentStatus === 'Paid' ? 'পরিশোধিত (bKash)' : 'ক্যাশ অন ডেলিভারি'}</p>
                  <p className="font-mono text-xs text-gray-400 pt-2 break-all">Order ID: {order._id}</p>
                </div>
              </div>

              {/* Status timeline */}
              <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
                {isCancelled ? (
                  <div className="text-center py-6">
                    <XCircle className="text-red-400 mx-auto mb-3" size={44} />
                    <p className="font-bold text-gray-900 text-lg">অর্ডারটি বাতিল করা হয়েছে</p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                      কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন।
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {STATUS_STEPS.map((step, idx) => {
                      const done = idx <= currentIndex;
                      const isCurrent = idx === currentIndex;
                      const isLast = idx === STATUS_STEPS.length - 1;
                      return (
                        <div key={step.key} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            {done ? (
                              <CheckCircle2 className={isCurrent ? 'text-brand-magenta' : 'text-green-500'} size={26} />
                            ) : (
                              <Circle className="text-gray-300" size={26} />
                            )}
                            {!isLast && (
                              <div className={`w-0.5 flex-1 min-h-[36px] ${idx < currentIndex ? 'bg-green-400' : 'bg-gray-200'}`} />
                            )}
                          </div>
                          <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                            <p className={`font-bold leading-tight ${done ? 'text-gray-900' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                            <p className={`text-sm mt-1 leading-relaxed ${done ? 'text-gray-600' : 'text-gray-400'}`}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                to={`/invoice/${order._id}`}
                className="w-full bg-white text-gray-800 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2 border border-gray-200 shadow-sm"
              >
                <Printer size={18} /> ইনভয়েস প্রিন্ট / PDF ডাউনলোড
              </Link>

              <p className="text-sm text-gray-500 text-center leading-relaxed">
                যেকোনো প্রয়োজনে —{' '}
                <a href="https://wa.me/8801517102603" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 hover:underline">
                  WhatsApp: 01517-102603
                </a>
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
