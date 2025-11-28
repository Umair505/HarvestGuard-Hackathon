"use client";
import { useState, useEffect } from "react";
import { ChevronUp, Sprout, SproutIcon } from "lucide-react";

export default function ScrollToTopAdvanced() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Calculate scroll progress
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const trackLength = docHeight - winHeight;
    const progress = Math.floor((scrollTop / trackLength) * 100);
    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        className={`
          group relative bg-gradient-to-br from-emerald-500 to-teal-600
          text-white rounded-full w-14 h-14 flex items-center justify-center 
          shadow-xl transition-all duration-500 transform hover:shadow-2xl
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}
        `}
        aria-label="Scroll to top"
      >
        {/* Progress Circle */}
        <svg className="absolute inset-0 w-14 h-14 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * scrollProgress) / 100}
            className="transition-all duration-150"
          />
        </svg>

<Sprout className="w-7 h-7 relative z-10 transform group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300" />
        {/* Hover effect */}
        <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
      </button>

      {/* Tooltip */}
      <div className={`
        absolute right-16 bottom-2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md 
        transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none
        ${isVisible ? "translate-x-0" : "translate-x-4"}
      `}>
        Scroll to top
        <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
      </div>
    </div>
  );
}