"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Star, ShieldCheck, Check, MessageSquarePlus, X, Loader2, ImagePlus, Trash2, Calendar, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { JudgeMeReview, JudgeMeData } from '../../lib/judgeme';

interface ReviewCardsProps {
  initialData?: JudgeMeData;
}

const LOCAL_STORAGE_REVIEWS_KEY = "levl_local_submitted_reviews";

export function ReviewCards({ initialData }: ReviewCardsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<string | number, boolean>>({});
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fallbackReviews: JudgeMeReview[] = [
    {
      id: 1,
      name: "Michelle G.",
      date: "Aug 25, 2026",
      title: "Actually Woke Up Rested",
      body: "I fell asleep quickly, and actually stayed asleep the entire night. As a young mom, waking up feeling actually rested was so refreshing.",
      rating: 5,
      verifiedType: "Verified Buyer",
    },
    {
      id: 2,
      name: "Aaron M.",
      date: "Aug 23, 2026",
      title: "Better Sleep and Feeling Stronger",
      body: "I drift into dreamland pretty easily again. From a physical standpoint, I’m gaining and retaining muscle mass easier and I haven’t done a grip strength test but my overall health outcomes seem to have leveled up since starting a nightly regiment of LEVL.",
      rating: 5,
      verifiedType: "Verified Buyer",
    },
    {
      id: 3,
      name: "Lisa M.",
      date: "Aug 20, 2026",
      title: "Best Sleep I've Had in Years",
      body: "2 Capsules turned out to be perfect. It was the best night of sleep I may have ever had in years",
      rating: 5,
      verifiedType: "Verified Buyer",
    },
    {
      id: 4,
      name: "Cathleen L.",
      date: "Aug 19, 2026",
      title: "Sleeping Through the Night Again",
      body: "As a postmenopausal woman I was frustrated with experiencing nights of difficulty falling asleep, staying asleep or just broken sleep. Then I tried LEVL’s DeepCell product. I was looking for a drug free sleep aid so that I would wake up rested and ready to start my day. DeepCell was the perfect choice. Beginning on night 1, I took the recommended dosage and actually felt myself drifting off into a relaxed state. Next thing I know it's a new day. I experienced a restful night which I hadn't encountered in a long time. I take LEVL on a regular schedule and can honestly say I feel so much better in the morning after sleeping through the night.",
      rating: 5,
      verifiedType: "Verified Buyer",
    },
    {
      id: 5,
      name: "Andrea S.",
      date: "Aug 19, 2026",
      title: "Finally Falling Asleep Without Grogginess",
      body: "LEVL’s DeepCell product has worked tremendously for me. I typically have a hard time falling asleep, often lying awake for hours, but since I started using this, I’ve noticed a huge difference. Within an hour of taking the supplement, I feel relaxed and a sleepy wave comes over me. I’m able to drift off without the usual tossing and turning. What I love most is that I wake up feeling refreshed and energized, never groggy or drowsy. It’s been a total game changer for my nightly routine.",
      rating: 5,
      verifiedType: "Verified Buyer",
    },
  ];

  const [reviewsList, setReviewsList] = useState<JudgeMeReview[]>(
    initialData?.reviews?.length ? initialData.reviews : fallbackReviews
  );

  // Sync when initialData changes from server revalidation
  useEffect(() => {
    if (initialData?.reviews?.length) {
      setReviewsList(prev => {
        const localOnly = prev.filter(r => typeof r.id === 'string' && r.id.startsWith('local-'));
        const existingLiveIds = new Set(initialData.reviews.map(r => r.id));
        const filteredLocal = localOnly.filter(r => !existingLiveIds.has(r.id));
        return [...filteredLocal, ...initialData.reviews];
      });
    }
  }, [initialData]);

  // Load persistent reviews submitted locally on this device
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
      if (stored) {
        const localReviews: JudgeMeReview[] = JSON.parse(stored);
        if (localReviews.length) {
          setReviewsList(prev => {
            const existingIds = new Set(prev.map(r => r.id));
            const newToAdd = localReviews.filter(r => !existingIds.has(r.id));
            return [...newToAdd, ...prev];
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Lock background scroll completely when modal is open
  useEffect(() => {
    if (isModalOpen || previewModalImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, previewModalImage]);

  const averageRating = initialData?.averageRating || 5.0;
  const totalReviews = reviewsList.length;

  const toggleExpand = (id: string | number) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Modal Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [userType, setUserType] = useState('Verified Buyer');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setPreviewModalImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoscroll carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const isMobile = window.innerWidth < 768;
        const scrollAmount = isMobile ? window.innerWidth * 0.85 + 20 : 460 + 20;
        
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Trigger file picker cleanly
  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Handle Multi-file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const combinedFiles = [...selectedFiles, ...newFiles].slice(0, 5); // max 5
      setSelectedFiles(combinedFiles);

      const previews = combinedFiles.map(file => URL.createObjectURL(file));
      setFilePreviews(previews);
    }
  };

  const removeFileAtIndex = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    const newPreviews = filePreviews.filter((_, i) => i !== index);
    setFilePreviews(newPreviews);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim() || 'customer@levlhealth.com');
      formData.append('rating', rating.toString());
      formData.append('title', title.trim() || 'Verified Experience');
      formData.append('body', quote.trim());
      formData.append('productId', '9030713999558');
      
      // Append all selected files
      selectedFiles.forEach((file) => {
        formData.append('pictures', file);
      });

      // Submit to backend
      await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      const currentPreviews = [...filePreviews];

      const newReview: JudgeMeReview = {
        id: `local-${Date.now()}`,
        name: name.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        title: title.trim() || 'Verified Experience',
        body: quote.trim(),
        rating,
        verifiedType: userType,
        pictures: currentPreviews.length > 0 ? currentPreviews : undefined,
      };

      // Optimistically add to state and persistent localStorage
      setReviewsList(prev => [newReview, ...prev]);

      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
        const prevLocal: JudgeMeReview[] = stored ? JSON.parse(stored) : [];
        localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify([newReview, ...prevLocal]));
      } catch {
        // ignore
      }

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setTitle('');
        setQuote('');
        setSelectedFiles([]);
        setFilePreviews([]);
      }, 1500);
    } catch (err) {
      console.error('Error submitting review to Judge.me:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/30 text-[var(--color-levl-cyan)] text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Judge.me Verified Community Feedback</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
          Real Experiences & Clinical Feedback
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[var(--color-levl-text-secondary)]">
          Documented outcomes from early clinical testers, trial participants, and customers.
        </p>

        {/* Rating Aggregate Stats Bar */}
        <div className="mt-6 flex flex-row items-center justify-between sm:justify-center gap-4 sm:gap-10 p-3.5 sm:p-5 rounded-2xl bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] shadow-xl max-w-lg mx-auto">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-2xl sm:text-4xl font-extrabold text-white">{averageRating.toFixed(1)}</span>
            <div className="flex flex-col items-start shrink-0">
              <div className="flex items-center gap-0.5 text-[var(--color-levl-cyan)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs text-[var(--color-levl-text-secondary)] font-medium whitespace-nowrap">
                {totalReviews} Verified Reviews
              </span>
            </div>
          </div>

          <div className="w-px h-7 bg-white/10" />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[var(--color-levl-cyan)] text-black font-bold text-xs hover:bg-[var(--color-levl-cyan)]/90 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
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
        <div className="absolute left-0 top-0 bottom-4 w-6 md:w-20 bg-gradient-to-r from-[var(--color-levl-bg)] to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-4 w-6 md:w-20 bg-gradient-to-l from-[var(--color-levl-bg)] to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-5 pb-3 sm:pb-5 pt-2 px-4 sm:px-0 snap-x snap-mandatory hide-scrollbar items-start"
        >
          {reviewsList.map((review) => {
            const isLong = review.body.length > 260;
            const isExpanded = !!expandedReviews[review.id];

            return (
              <div 
                key={review.id} 
                className="snap-center shrink-0 w-[85vw] sm:w-[380px] md:w-[460px] bg-[linear-gradient(30deg,#15102aee,#281534cc)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:border-[var(--color-levl-cyan)]/50 transition-all hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] relative z-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-0.5 text-[var(--color-levl-cyan)]">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/25 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-[var(--color-levl-cyan)] stroke-[2.5]" />
                      <span>{review.verifiedType || "Verified Buyer"}</span>
                    </span>
                  </div>

                  {review.title && (
                    <h4 className="text-white font-bold text-sm md:text-base mb-1.5 leading-snug">
                      {review.title}
                    </h4>
                  )}

                  <div className="text-white/90 text-xs sm:text-sm leading-relaxed font-normal mb-3">
                    <p>
                      "{isLong && !isExpanded ? `${review.body.slice(0, 240)}...` : review.body}"
                    </p>
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(review.id)}
                        className="text-[var(--color-levl-cyan)] font-semibold text-xs mt-1 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>{isExpanded ? "Read less" : "Read more"}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>

                  {/* Attached Photos */}
                  {review.pictures && review.pictures.length > 0 && (
                    <div className="flex items-center gap-2 mb-3 overflow-x-auto hide-scrollbar py-1">
                      {review.pictures.map((picUrl, idx) => (
                        <img
                          key={idx}
                          src={picUrl}
                          alt="Review attachment"
                          onClick={() => setPreviewModalImage(picUrl)}
                          className="w-14 h-14 rounded-lg object-cover border border-white/20 hover:border-[var(--color-levl-cyan)] cursor-pointer hover:scale-105 transition-all shrink-0 bg-black/40"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-white font-bold text-xs sm:text-sm tracking-wide">{review.name}</p>
                    <p className="text-[10px] sm:text-xs text-[var(--color-levl-text-muted)]">Verified Experience</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[var(--color-levl-cyan)] font-medium">
                    <Calendar className="w-3 h-3 opacity-70" />
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Lightbox Modal via Portal */}
      {mounted && previewModalImage && createPortal(
        <div 
          onClick={() => setPreviewModalImage(null)}
          className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-black/95 cursor-pointer"
        >
          <div className="relative max-w-2xl max-h-[85vh]">
            <img
              src={previewModalImage}
              alt="Enlarged review attachment"
              className="rounded-2xl max-h-[80vh] w-auto object-contain shadow-2xl border border-white/20"
            />
            <button
              type="button"
              onClick={() => setPreviewModalImage(null)}
              className="absolute top-3 right-3 text-white bg-black/80 p-2.5 rounded-full hover:bg-black transition-colors cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Write a Review 100% Solid Full-Screen Takeover Dialog via Portal */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999999] bg-[#07090E] w-screen h-screen min-h-[100dvh] flex flex-col overflow-hidden text-white">
          {/* Top Bar: Title & High-Contrast Close Button */}
          <div className="h-16 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#07090E] z-50">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Write a Review</h3>
              <p className="text-xs text-[var(--color-levl-text-secondary)]">
                Share your experience with LEVL DeepCell
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Form Scroll View - 100% Opaque Solid Container */}
          <div className="flex-1 overflow-y-auto bg-[#07090E] p-4 sm:p-8 overscroll-contain">
            <div className="max-w-xl mx-auto">
              {isSubmitted ? (
                <div className="py-20 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-levl-green)]/20 border border-[var(--color-levl-green)] flex items-center justify-center text-[var(--color-levl-green)]">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Thank You for Your Review!</h4>
                  <p className="text-sm text-gray-400 max-w-sm">Your feedback and photos have been submitted to Judge.me and added to the community board.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-5 pb-24">
                  {/* Rating */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Overall Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 text-[var(--color-levl-cyan)] hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-8 h-8 sm:w-7 sm:h-7 ${star <= rating ? 'fill-current' : 'text-gray-700'}`} />
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
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Email Address <span className="text-gray-500 font-normal">(Private)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none"
                    />
                  </div>

                  {/* Verification Status (No Beta Option) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Verification Status</label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none cursor-pointer"
                    >
                      <option value="Verified Buyer">Verified Buyer</option>
                      <option value="Verified Early Tester">Verified Early Tester</option>
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
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none"
                    />
                  </div>

                  {/* Body */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Your Experience / Review</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How did DeepCell affect your sleep architecture, morning energy, or recovery?"
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:border-[var(--color-levl-cyan)] outline-none resize-none"
                    />
                  </div>

                  {/* Submit Photos / Media */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-300">
                        Add Photos <span className="text-gray-500 font-normal">(Up to 5 images)</span>
                      </label>
                      {filePreviews.length > 0 && filePreviews.length < 5 && (
                        <button
                          type="button"
                          onClick={openFilePicker}
                          className="text-xs text-[var(--color-levl-cyan)] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add photo</span>
                        </button>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {filePreviews.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-black/50 border border-white/10">
                        {filePreviews.map((preview, i) => (
                          <div key={i} className="relative rounded-lg overflow-hidden border border-white/25 aspect-square bg-black/60">
                            <img
                              src={preview}
                              alt="Upload preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeFileAtIndex(i)}
                              className="absolute top-1.5 right-1.5 p-1 bg-black/80 rounded-full text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                              aria-label="Remove image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        {filePreviews.length < 5 && (
                          <button
                            type="button"
                            onClick={openFilePicker}
                            className="flex flex-col items-center justify-center border border-dashed border-white/30 rounded-lg hover:border-[var(--color-levl-cyan)] hover:bg-white/5 transition-all aspect-square cursor-pointer"
                          >
                            <Plus className="w-6 h-6 text-gray-300 mb-0.5" />
                            <span className="text-xs text-gray-400 font-medium">Add Photo</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={openFilePicker}
                        className="w-full flex flex-col items-center justify-center p-5 border border-dashed border-white/25 rounded-xl hover:border-[var(--color-levl-cyan)]/60 hover:bg-white/5 transition-all cursor-pointer group bg-black/30"
                      >
                        <ImagePlus className="w-7 h-7 text-gray-400 group-hover:text-[var(--color-levl-cyan)] transition-colors mb-1.5" />
                        <span className="text-sm text-gray-200 font-medium">Click to select photos</span>
                        <span className="text-xs text-gray-500 mt-0.5">Select up to 5 photos from your device</span>
                      </button>
                    )}
                  </div>

                  {/* Submit Action Button */}
                  <div className="pt-4 pb-16">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-full bg-[var(--color-levl-cyan)] text-black font-bold text-base hover:bg-[var(--color-levl-cyan)]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[var(--color-levl-cyan)]/25 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <span>Submit Review</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
