import React, { useState, useEffect } from 'react';
import { Megaphone, Eye, Target, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
  {
    title: "Multimodal Intelligence",
    description: "Our AI doesn't just read; it sees. It analyzes your video frames and image composition to ensure the copy perfectly matches your visual hook.",
    image: "https://placehold.co/800x400/1e1b4b/818cf8?text=Visual+Analysis+AI",
    icon: <Eye className="w-6 h-6 text-indigo-400" />
  },
  {
    title: "Conversion Engineered",
    description: "Every word is selected based on high-performing ad frameworks designed to stop the scroll and drive action—whether it's clicks, leads, or sales.",
    image: "https://placehold.co/800x400/022c22/34d399?text=High+Conversion+Rates",
    icon: <Target className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "Platform Native",
    description: "Formatted specifically for Meta's algorithm. We handle the emojis, the spacing, and the structure so your ads look native and professional.",
    image: "https://placehold.co/800x400/2e1065/a78bfa?text=Social+Platform+Ready",
    icon: <Share2 className="w-6 h-6 text-purple-400" />
  }
];

export const FeatureCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  return (
    <div 
      className="relative w-full bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden mb-10 group shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
        {/* Header Badge */}
       <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-full px-3 py-1 flex items-center shadow-lg">
            <Megaphone size={14} className="mr-2 text-indigo-400"/>
            <span className="text-xs font-semibold text-slate-300">Why this works</span>
       </div>

      <div className="relative h-[450px] md:h-[320px] w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform
              ${index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
            `}
          >
             <div className="flex flex-col md:flex-row h-full">
                {/* Image Side */}
                <div className="w-full md:w-5/12 h-48 md:h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent z-10 opacity-80" />
                    <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-100 group-hover:scale-110"
                    />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-7/12 p-6 md:p-12 flex flex-col justify-center bg-slate-900 md:bg-slate-900/40 backdrop-blur-md h-full relative border-t md:border-t-0 md:border-l border-slate-800/50">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700 shadow-inner">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{feature.title}</h3>
                    </div>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
                        {feature.description}
                    </p>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-[60%] md:top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/50 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-800 border border-slate-700 backdrop-blur-sm z-30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-[60%] md:top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/50 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-800 border border-slate-700 backdrop-blur-sm z-30"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm
                ${index === currentIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
