"use client";
import React from "react";
import Link from "next/link"; // Link ইমপোর্ট করা ভালো যদি বাটনগুলো পেজ নেভিগেশন করে
import { ArrowRight } from "lucide-react"; // আইকন সৌন্দর্যের জন্য

export default function VideoPlay() {
  return (
    <div className="relative w-full h-screen min-h-[500px] overflow-hidden font-hind">
      
      {/* Background Video */}
      <video
        src="/RuralFarmingAgricultueNature720.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover scale-105" 
      />

      {/* Dark Overlay with Gradient (More Readable Text) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-emerald-950/90"></div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16 md:pt-0">
        
        {/* Tagline */}
        <div className="flex items-center gap-2 mb-4 animate-in fade-in zoom-in duration-1000">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <p className="uppercase tracking-[0.2em] text-amber-300 text-xs md:text-sm font-bold shadow-black drop-shadow-md">
            Smart Agriculture Solution
          </p>
        </div>

        {/* Main Headings - Font size reduced and responsive */}
        <div className="space-y-1 mb-6">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold font-serif tracking-tight drop-shadow-xl animate-in slide-in-from-bottom duration-700">
            Preserve Your
          </h1>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 text-4xl sm:text-5xl md:text-7xl font-bold font-serif drop-shadow-2xl animate-in slide-in-from-bottom duration-1000 delay-100 pb-2">
            Golden Harvest
          </h1>
        </div>

        {/* Sub Text - Smaller and clean */}
        <p className="text-slate-200 max-w-xl text-sm sm:text-base md:text-lg mb-8 leading-relaxed drop-shadow-md animate-in slide-in-from-bottom duration-1000 delay-200 px-2">
          বাংলাদেশে প্রতি বছর নষ্ট হওয়া <span className="text-amber-400 font-semibold">৪৫ লক্ষ টন</span> খাদ্যশস্য রক্ষা করুন। 
          স্মার্ট স্টোরেজ এবং আবহাওয়ার পূর্বাভাস এখন আপনার হাতের মুঠোয়।
        </p>

        {/* Buttons - Removed Video option, resized Start button */}
        <div className="animate-in fade-in duration-1000 delay-300">
           <button className="group backdrop-blur-md bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-900 transition-all flex items-center gap-2">
            শুরু করুন
          </button>
        </div>
        
      </div>

      
    </div>
  );
}