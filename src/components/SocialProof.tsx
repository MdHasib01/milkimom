import { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, PlayCircle, Clock, Edit3, X, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateRandomReview, generateUniqueReview, ReviewType } from '../data/reviewsData';
import girl1Img from '../assets/reviewer/girl1.jpeg';
import girl2Img from '../assets/reviewer/girl2.jpeg';
import girl3Img from '../assets/reviewer/girl3.jpeg';
import girl4Img from '../assets/reviewer/girl4.jpeg';

const videoItems = [
  {
    title: "ডাক্তারের পরামর্শ",
    videoUrl: "PASTE_VIDEO_LINK_1_HERE",
    thumbnail: "PASTE_THUMBNAIL_LINK_1_HERE"
  },
  {
    title: "মায়ের অভিজ্ঞতা",
    videoUrl: "PASTE_VIDEO_LINK_2_HERE",
    thumbnail: "PASTE_THUMBNAIL_LINK_2_HERE"
  },
  {
    title: "মিল্কিমম সম্পর্কে জানুন",
    videoUrl: "PASTE_VIDEO_LINK_3_HERE",
    thumbnail: "PASTE_THUMBNAIL_LINK_3_HERE"
  }
];

export default function SocialProof() {
  const [reviews, setReviews] = useState<ReviewType[]>(() => {
    return [generateRandomReview(), generateRandomReview(), generateRandomReview(), generateRandomReview()];
  });
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);

  const [reviewForm, setReviewForm] = useState({ name: '', address: '', email: '', rating: 5, review: '', flavour: 'Dark Chocolate' });
  const [reviewErrors, setReviewErrors] = useState<string[]>([]);

  const handleReviewSubmit = (e: any) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!reviewForm.name.trim()) errors.push("আপনার নাম দিন");
    if (!reviewForm.email.trim() || !reviewForm.email.includes('@')) errors.push("সঠিক ইমেইল দিন");
    if (reviewForm.review.trim().length < 10) errors.push("কমপক্ষে ১০ অক্ষরের রিভিউ লিখুন");
    
    if (errors.length > 0) {
      setReviewErrors(errors);
      return;
    }
    setShowReviewModal(false);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const addReview = () => {
      setReviews(prev => {
        const newReview = generateUniqueReview(prev);
        return [newReview, ...prev].slice(0, 20);
      });
      const nextInterval = Math.floor(Math.random() * 10000) + 12000;
      timeoutId = setTimeout(addReview, nextInterval);
    };
    const nextInterval = Math.floor(Math.random() * 10000) + 12000;
    timeoutId = setTimeout(addReview, nextInterval);
    return () => clearTimeout(timeoutId);
  }, []);

  const nextSlide = () => setCurrentVideoSlide((p) => (p + 1) % videoItems.length);
  const prevSlide = () => setCurrentVideoSlide((p) => (p - 1 + videoItems.length) % videoItems.length);

  return (
    <section className="py-12 lg:py-16 bg-[#fcfaf9] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-peach/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Reviews Section */}
        <div className="relative mb-24">
          <div className="flex flex-col items-center justify-center mb-10 text-center">
            <h2 className="text-balance text-3xl sm:text-4xl font-[800] text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="text-[#ff1c36]">লক্ষাধিক+ মা</span><br/>
              স্যাটিসফাইড মায়েদের রিভিউগুলো হ্যাপিনেস ছড়ায়
            </h2>

            {/* Premium Mother Avatars */}
            <div className="flex -space-x-3 mb-4 justify-center">
              <img src={girl1Img} alt="Mother" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg relative z-[1] object-cover" />
              <img src={girl2Img} alt="Mother" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg relative z-[2] object-cover" />
              <img src={girl3Img} alt="Mother" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg relative z-[3] object-cover" />
              <img src={girl4Img} alt="Mother" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg relative z-[4] object-cover" />
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg relative z-[5] bg-brand-lightpink flex items-center justify-center text-brand-magenta font-bold text-xs sm:text-sm">
                25K+
              </div>
            </div>
            
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              25K+ Verified Mother Reviews
            </h3>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex text-brand-gold drop-shadow-sm">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="font-bold text-gray-700 text-lg">4.9/5</span>
            </div>
            
            <div className="text-[#ff1c36] text-sm sm:text-base font-bold animate-pulse text-center bg-[#ff1c36]/10 px-4 py-2 rounded-full inline-block mb-2">
              🔴 লাইভ রিভিউ আপলোড হচ্ছে...
            </div>
          </div>

          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-brand-peach/50 to-transparent"></div>
          
          <div className="max-h-[650px] overflow-y-auto pr-2 sm:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-brand-peach/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-peach/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-brand-magenta/50 transition-colors duration-300 ">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 pb-4">
              <AnimatePresence initial={false}>
                {reviews.map((r) => (
                  <motion.div 
                    key={r.id}
                    layout={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-[0_15px_35px_-15px_rgba(0,0,0,0.06)] border border-white relative group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex text-brand-gold drop-shadow-sm">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={16} fill={idx < r.stars ? "currentColor" : "none"} color={idx < r.stars ? "currentColor" : "#e5e7eb"} />
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand-magenta/70 bg-brand-lightpink/30 px-3 py-1 rounded-full border border-brand-peach/20">
                        <Clock size={10} />
                        {r.timeText}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 text-sm lg:text-base leading-relaxed font-medium">"{r.t}"</p>
                    
                    <div className="flex items-center gap-3 mt-auto border-t border-brand-peach/10 pt-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-magenta to-brand-peach rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
                        {r.n.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-900 flex items-center gap-1.5 truncate leading-relaxed">
                          {r.n} <CheckCircle size={14} className="text-brand-magenta shrink-0" />
                        </p>
                        <p className="text-xs text-gray-500 font-medium truncate leading-relaxed">Verified Mother</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="absolute bottom-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-brand-peach/50 to-transparent"></div>

          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">আপনার রিভিউ শেয়ার করুন</h3>
            <p className="text-gray-600 mb-8 font-medium leading-relaxed">আপনার মিল্কিমম ব্যবহারের অভিজ্ঞতা অন্য মায়েদের সিদ্ধান্ত নিতে সাহায্য করতে পারে।</p>
            <button onClick={() => setShowReviewModal(true)} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-magenta to-[#ff1c36] rounded-full font-bold text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Edit3 size={20} /> আমার রিভিউ শেয়ার করবো
            </button>
          </div>
        </div>

        {/* Videos Section */}
        <div className="mt-20 mb-20 sm:mb-24">
          <div className="text-center mb-8 sm:mb-14">
             <div className="inline-flex items-center gap-2 mb-4 bg-brand-lightpink/50 text-brand-magenta px-4 py-2 rounded-full border border-brand-peach/30">
               <PlayCircle size={16} /> <span className="font-bold text-sm tracking-wide">বিশেষজ্ঞদের মতামত</span>
             </div>
            <h2 className="text-balance text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta to-brand-peach">ডাক্তারদের</span> পরামর্শ ও মায়েদের অভিজ্ঞতা দেখুন।
            </h2>
          </div>

          <div className="relative w-full max-w-sm mx-auto overflow-visible px-4">
            <motion.div 
              className="flex w-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                 if (offset.x < -50 || velocity.x < -100) nextSlide();
                 else if (offset.x > 50 || velocity.x > 100) prevSlide();
              }}
              animate={{ x: `-${currentVideoSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {videoItems.map((video, idx) => (
                <div 
                  key={idx} 
                  className="w-full shrink-0 px-2 flex justify-center" 
                  onClick={() => setActiveVideoIndex(idx)}
                >
                  <div className="w-full aspect-[3/4] bg-white/60 backdrop-blur-md rounded-[2.5rem] p-3 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-white cursor-pointer group hover:shadow-[0_20px_50px_-20px_rgba(189,0,82,0.15)] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-peach/5 to-transparent"></div>
                    <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative bg-gray-50 flex items-center justify-center border border-white/50 shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-peach/20 to-brand-magenta/5 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                      
                      {video.thumbnail.startsWith('PASTE') ? (
                        <div className="w-full h-full bg-gradient-to-br from-brand-peach/10 to-brand-lightpink/30 flex items-center justify-center">
                          <span className="text-brand-magenta/40 font-medium text-sm">Thumbnail</span>
                        </div>
                      ) : (
                        <img src={video.thumbnail} alt={video.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 transition-opacity duration-300 opacity-0" onLoad={(e) => e.currentTarget.classList.remove('opacity-0')} />
                      )}
                      
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <PlayCircle className="text-brand-magenta w-16 h-16 opacity-90 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg rounded-full bg-white relative" />
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none">
                        <div className="bg-white/90 text-brand-magenta px-4 py-2.5 rounded-xl text-sm backdrop-blur-md font-bold shadow-lg text-center truncate border border-white">
                          {video.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="absolute top-1/2 -left-2 -translate-y-1/2 flex items-center z-30">
                <button onClick={prevSlide} className="w-12 h-12 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-brand-magenta hover:scale-110 transition-transform duration-300 "><ChevronLeft size={24} /></button>
            </div>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 flex items-center z-30">
                <button onClick={nextSlide} className="w-12 h-12 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-brand-magenta hover:scale-110 transition-transform duration-300 "><ChevronRight size={24} /></button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeVideoIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 touch-none"
            onClick={() => setActiveVideoIndex(null)}
          >
            <button 
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300 shadow-sm z-50"
              onClick={(e) => { e.stopPropagation(); setActiveVideoIndex(null); }}
            >
              <X size={24} />
            </button>
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300 shadow-sm z-50"
              onClick={(e) => { 
                e.stopPropagation(); 
                setActiveVideoIndex((prev) => (prev! - 1 + videoItems.length) % videoItems.length); 
              }}
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300 shadow-sm z-50"
              onClick={(e) => { 
                e.stopPropagation(); 
                setActiveVideoIndex((prev) => (prev! + 1) % videoItems.length); 
              }}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[400px] aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -50) {
                  setActiveVideoIndex((prev) => (prev! + 1) % videoItems.length);
                } else if (offset.x > 50) {
                  setActiveVideoIndex((prev) => (prev! - 1 + videoItems.length) % videoItems.length);
                }
              }}
            >
              {videoItems[activeVideoIndex].videoUrl.startsWith('PASTE') ? (
                <div className="text-white/50 text-center px-6">
                  <PlayCircle size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="font-medium leading-relaxed">Video Player Placeholder</p>
                  <p className="text-xs mt-2 opacity-60 break-all leading-relaxed">{videoItems[activeVideoIndex].videoUrl}</p>
                </div>
              ) : (
                <video 
                  src={videoItems[activeVideoIndex].videoUrl} 
                  controls 
                  autoPlay 
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}

        {showReviewModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#fdfbfb] max-h-[85dvh] flex flex-col p-6 sm:p-8 max-w-md w-full rounded-2xl shadow-2xl relative my-8 text-left border border-white"
            >
              <button 
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full text-gray-400 hover:text-brand-magenta hover:bg-brand-lightpink transition-colors duration-300 shadow-sm"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-lightpink/50 flex flex-col items-center justify-center text-brand-magenta">
                  <Star fill="currentColor" size={20} className="text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">আপনার রিভিউ দিন</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">আপনার মতামত আমাদের জন্য গুরুত্বপূর্ণ</p>
                </div>
              </div>

              {reviewErrors.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex flex-col gap-1">
                  {reviewErrors.map((err, i) => <div key={i} className="flex items-center gap-1.5"><XCircle size={14}/> {err}</div>)}
                </div>
              )}

              <div className="overflow-y-auto flex-1 -mx-6 px-6 sm:-mx-8 sm:px-8 pb-2"><form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-800">আপনার নাম *</label>
                  <input type="text" value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-2 focus:ring-brand-lightpink outline-none transition-all duration-300 placeholder:text-gray-400" placeholder="উদাঃ সাদিয়া রহমান" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-800">আপনার ঠিকানা</label>
                  <input type="text" value={reviewForm.address} onChange={e => setReviewForm({...reviewForm, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-2 focus:ring-brand-lightpink outline-none transition-all duration-300 placeholder:text-gray-400" placeholder="উদাঃ মিরপুর, ঢাকা" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-800">আপনার ইমেইল *</label>
                  <input type="email" value={reviewForm.email} onChange={e => setReviewForm({...reviewForm, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-2 focus:ring-brand-lightpink outline-none transition-all duration-300 placeholder:text-gray-400" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-800">রেটিং *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button type="button" key={star} onClick={() => setReviewForm({...reviewForm, rating: star})} className="p-1 transition-transform duration-300 hover:scale-110">
                        <Star size={28} fill={reviewForm.rating >= star ? "currentColor" : "none"} className={reviewForm.rating >= star ? "text-brand-gold" : "text-gray-300"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-800">আপনার মতামত *</label>
                  <textarea value={reviewForm.review} onChange={e => setReviewForm({...reviewForm, review: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-2 focus:ring-brand-lightpink outline-none transition-all duration-300 resize-none placeholder:text-gray-400" placeholder="মিল্কিমম সম্পর্কে আপনার অভিজ্ঞতা লিখুন (কমপক্ষে ১০ অক্ষর)..." />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-brand-magenta to-[#ff1c36] text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 mt-6 active:scale-95 whitespace-nowrap text-center flex items-center justify-center">
                  রিভিউ সাবমিট করুন
                </button>
              </form></div>
            </motion.div>
          </motion.div>
        )}

        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 max-w-sm w-full rounded-2xl shadow-2xl text-center border border-brand-peach/30 relative"
            >
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 "
              >
                <X size={20} />
              </button>
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">ধন্যবাদ!</h3>
              <div className="space-y-2 text-gray-600 font-medium">
                <p>আপনার রিভিউটি রিসিভ হয়েছে।</p>
                <p>কিছুক্ষণের মধ্যেই পোস্ট করা হবে।</p>
              </div>
              <button onClick={() => setShowSuccessModal(false)} className="mt-8 w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors duration-300 ">
                বন্ধ করুন
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
