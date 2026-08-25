"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Star, ShieldCheck, Check, MessageSquarePlus, X, Loader2, ImagePlus, Trash2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { JudgeMeReview, JudgeMeData } from '../../lib/judgeme';

interface ReviewCardsProps {
  initialData?: JudgeMeData;
}

export function ReviewCards({ initialData }: ReviewCardsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [reviewsList, setReviewsList] = useState<JudgeMeReview[]>(
    initialData?.reviews || [
      {
        id: 1,
        name: "Michelle G.",
        date: "Aug 25, 2026",
        title: "Actually Woke Up Rested",
        body: "I fell asleep quickly, and actually stayed asleep the entire night. As a young mom, waking up feeling actually rested was so refreshing.",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
      {
        id: 2,
        name: "Aaron M.",
        date: "Aug 23, 2026",
        title: "Better Sleep and Feeling Stronger",
        body: "I drift into dreamland pretty easily again. From a physical standpoint, I’m gaining and retaining muscle mass easier and I haven’t done a grip strength test but my overall health outcomes seem to have leveled up since starting a nightly regiment of LEVL.",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
      {
        id: 3,
        name: "Lisa M.",
        date: "Aug 20, 2026",
        title: "Best Sleep I've Had in Years",
        body: "2 Capsules turned out to be perfect. It was the best night of sleep I may have ever had in years",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
      {
        id: 4,
        name: "Cathleen L.",
        date: "Aug 19, 2026",
        title: "Sleeping Through the Night Again",
        body: "As a postmenopausal woman I was frustrated with experiencing nights of difficulty falling asleep, staying asleep or just broken sleep. Then I tried LEVL’s DeepCell product. I was looking for a drug free sleep aid so that I would wake up rested and ready to start my day. DeepCell was the perfect choice. Beginning on night 1, I took the recommended dosage and actually felt myself drifting off into a relaxed state. Next thing I know it's a new day. I experienced a restful night which I hadn't encountered in a long time. I take LEVL on a regular schedule and can honestly say I feel so much better in the morning after sleeping through the night.",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
      {
        id: 5,
        name: "Andrea S.",
        date: "Aug 19, 2026",
        title: "Finally Falling Asleep Without Grogginess",
        body: "LEVL’s DeepCell product has worked tremendously for me. I typically have a hard time falling asleep, often lying awake for hours, but since I started using this, I’ve noticed a huge difference. Within an hour of taking the supplement, I feel relaxed and a sleepy wave comes over me. I’m able to drift off without the usual tossing and turning. What I love most is that I wake up feeling refreshed and energized, never groggy or drowsy. It’s been a total game changer for my nightly routine.",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
    ]
  );

  const averageRating = initialData?.averageRating || 5.0;
  const totalReviews = reviewsList.length;

  // Modal Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [userType, setUserType] = useState('Beta Trial Participant');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Autoscroll carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const isMobile = window.innerWidth < 768;
        const scrollAmount = isMobile ? window.innerWidth * 0.85 + 24 : 600 + 24;
        
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email || 'verified-tester@levlhealth.com');
      formData.append('rating', rating.toString());
      formData.append('title', title || 'Verified Experience');
      formData.append('body', quote);
      formData.append('productId', '9030713999558');
      if (selectedFile) {
        formData.append('pictures', selectedFile);
      }

      await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      const newReview: JudgeMeReview = {
        id: Date.now(),
        name,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        title: title || 'Verified Experience',
        body: quote,
        rating,
        verifiedType: userType,
      };

      setReviewsList([newReview, ...reviewsList]);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setTitle('');
        setQuote('');
        removeFile();
      }, 1500);
    } catch (err) {
      console.error('Error submitting review to Judge.me:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
      {/* Section Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/30 text-[var(--color-levl-cyan)] text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Judge.me Verified Community Feedback</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Real Experiences & Clinical Feedback
        </h2>
        <p className="text-lg text-[var(--color-levl-text-secondary)]">
          Documented outcomes from early clinical testers, trial participants, and customers.
        </p>

        {/* Rating Aggregate Stats Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 p-6 rounded-2xl bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] shadow-xl">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-extrabold text-white">{averageRating.toFixed(1)}</span>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-0.5 text-[var(--color-levl-cyan)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[var(--color-levl-text-secondary)] font-medium">
                {totalReviews} Verified Reviews
              </span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10" />

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-[var(--color-levl-green)]" />
            <span><strong>100% 5-Star Ratings</strong> • 5 of 5 Verified Testers</span>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10" />

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-levl-cyan)] text-black font-bold text-xs hover:bg-[var(--color-levl-cyan)]/90 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div 
        className="relative -mx-4 sm:mx-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
      >
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-8 w-12 md:w-32 bg-gradient-to-r from-[var(--color-levl-bg)] to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-8 w-12 md:w-32 bg-gradient-to-l from-[var(--color-levl-bg)] to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 pt-4 px-4 sm:px-0 snap-x snap-mandatory hide-scrollbar"
        >
          {reviewsList.map((review) => (
            <div 
              key={review.id} 
              className="snap-center shrink-0 w-[85vw] md:w-[560px] bg-[linear-gradient(30deg,#15102aee,#281534cc)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-[var(--color-levl-cyan)]/50 transition-all hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] relative z-0"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[var(--color-levl-cyan)]">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/25 px-2.5 py-0.5 rounded-full">
                    <Check className="w-3 h-3" />
                    <span>{review.verifiedType || "Verified Beta Tester"}</span>
                  </span>
                </div>

                {review.title && (
                  <h4 className="text-white font-bold text-base mb-2">
                    {review.title}
                  </h4>
                )}

                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 font-normal">
                  "{review.body}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm tracking-wide">{review.name}</p>
                  <p className="text-xs text-[var(--color-levl-text-muted)]">Verified Experience</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-levl-cyan)] font-medium">
                  <Calendar className="w-3.5 h-3.5 opacity-70" />
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal (Click outside or X to close) */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B0E17] border border-[var(--color-levl-panel-border)] rounded-2xl max-w-lg w-full max-h-[88vh] overflow-y-auto shadow-2xl relative flex flex-col hide-scrollbar"
            >
              {/* Sticky Modal Header with Close Button */}
              <div className="sticky top-0 bg-[#0B0E17]/95 backdrop-blur-md z-30 px-6 pt-5 pb-3 border-b border-white/10 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-0.5">Submit Your Experience</h3>
                  <p className="text-xs text-[var(--color-levl-text-secondary)]">
                    Share your feedback for LEVL DeepCell. Submissions sync with Judge.me.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors shrink-0 cursor-pointer ml-3 -mr-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {isSubmitted ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-levl-green)]/20 border border-[var(--color-levl-green)] flex items-center justify-center text-[var(--color-levl-green)]">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Thank You for Your Feedback!</h4>
                    <p className="text-xs text-gray-400">Your review and media have been submitted to Judge.me and added to the community board.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    {/* Rating */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Overall Rating</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 text-[var(--color-levl-cyan)] hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-gray-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Your Name or Initials</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Andrea S."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address <span className="text-gray-500 font-normal">(Private)</span></label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none"
                      />
                    </div>

                    {/* Verification Status */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Verification Status</label>
                      <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none"
                      >
                        <option value="Beta Trial Participant">Beta Trial Participant</option>
                        <option value="Verified Early Tester">Verified Early Tester</option>
                        <option value="In-Store Customer">In-Store Retail Customer</option>
                        <option value="Online Customer">Verified Online Customer</option>
                      </select>
                    </div>

                    {/* Review Title */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Review Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Total game changer for sleep & recovery"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none"
                      />
                    </div>

                    {/* Body */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Your Experience / Review</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="How did DeepCell affect your sleep architecture, morning energy, or recovery?"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none resize-none"
                      />
                    </div>

                    {/* Submit Photo / Video */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Add Photo or Video <span className="text-gray-500 font-normal">(Optional)</span></label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="review-file-upload"
                      />

                      {filePreview ? (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-[var(--color-levl-cyan)]/40">
                          <div className="flex items-center gap-3">
                            <img
                              src={filePreview}
                              alt="Upload preview"
                              className="w-12 h-12 object-cover rounded-lg border border-white/10"
                            />
                            <div>
                              <p className="text-xs font-medium text-white truncate max-w-[200px]">
                                {selectedFile?.name}
                              </p>
                              <p className="text-[10px] text-gray-400">
                                {(selectedFile ? selectedFile.size / 1024 / 1024 : 0).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="review-file-upload"
                          className="flex flex-col items-center justify-center p-4 border border-dashed border-white/20 rounded-xl hover:border-[var(--color-levl-cyan)]/50 hover:bg-white/5 transition-all cursor-pointer group"
                        >
                          <ImagePlus className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-levl-cyan)] transition-colors mb-1" />
                          <span className="text-xs text-gray-300 font-medium">Click to upload photo or video</span>
                          <span className="text-[10px] text-gray-500 mt-0.5">PNG, JPG, MP4 up to 25MB</span>
                        </label>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-full bg-[var(--color-levl-cyan)] text-black font-bold text-sm hover:bg-[var(--color-levl-cyan)]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[var(--color-levl-cyan)]/25 disabled:opacity-50 mt-2"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <span>Submit Review to Judge.me</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
