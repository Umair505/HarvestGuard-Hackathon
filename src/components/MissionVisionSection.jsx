"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Star } from "lucide-react";

export default function MissionVisionSection() {
  // ভিশন ডেটা
  const visions = [
    "সবার জন্য স্মার্ট কৃষি",
    "টেকসই এবং পরিবেশবান্ধব",
    "কৃষকদের অন্তর্ভুক্তিমূলক বৃদ্ধি",
    "উদ্ভাবন-চালিত কৃষি ব্যবস্থা",
  ];

  // মিশন ডেটা
  const missions = [
    "সম্পদের সঠিক ব্যবহার নিশ্চিত করা",
    "উন্নত মানের ফসল উৎপাদনে সহায়তা",
    "টেকসই কৃষিকাজ সহজ করা",
    "প্রযুক্তি ও জ্ঞান প্রদান",
  ];

  return (
    <section className="py-20 bg-[#FFFBF5] font-sans overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* --- বাম পাশ: Our Vision --- */}
          <div className="flex flex-col items-center space-y-4 order-2 lg:order-1">
            {/* হেডার বাটন */}
            <div className="bg-[#4A3B32] text-white px-8 py-3 rounded-full font-bold shadow-lg mb-6 relative">
              আমাদের লক্ষ্য (Vision)
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#4A3B32] rotate-45"></div>
            </div>

            {/* ফ্লো চার্ট আইটেম */}
            <div className="space-y-2 w-full flex flex-col items-center">
              {visions.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-full max-w-xs">
                  {/* কানেক্টিং অ্যারো (প্রথমটি বাদে) */}
                  {index !== 0 && (
                    <ArrowDown className="text-[#8B5E3C] w-6 h-6 my-1 animate-bounce" />
                  )}
                  
                  {/* টেক্সট কার্ড */}
                  <div className="w-full bg-[#FDF6E9] border border-[#E6DCC8] text-[#5A4635] py-4 px-6 rounded-2xl text-center font-medium shadow-sm hover:shadow-md hover:border-emerald-300 hover:bg-white transition-all duration-300 cursor-default">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- মাঝখান: Farmer Image & Badge --- */}
          <div className="relative flex justify-center order-1 lg:order-2 mb-12 lg:mb-0">
            
            {/* ডেকোরেটিভ পাতা (উপরে) */}
            <div className="absolute -top-10 left-10 w-20 h-20 animate-pulse z-10">
              <Image 
                src="/images/leaf.png" 
                alt="Leaf" 
                width={80} 
                height={80} 
                className="object-contain rotate-[-45deg]"
              />
            </div>

            {/* Top Rated Badge */}
            <div className="absolute top-10 -left-6 z-20 bg-white p-4 rounded-full shadow-xl border border-slate-100 flex flex-col items-center w-28 h-28 justify-center animate-in fade-in zoom-in duration-700">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-semibold">Top Rated</span>
              <span className="text-xs font-bold text-slate-800 text-center mt-1">2.5M+ Farmers</span>
              <div className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full mt-1">
                4.9/5
              </div>
            </div>

            {/* মেইন ছবি (Farmer) */}
            <div className="relative w-[350px] h-[450px] lg:w-[400px] lg:h-[500px]">
              {/* ইমেজের ব্যাকগ্রাউন্ড গ্লো */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-100 to-transparent rounded-b-full opacity-50 blur-2xl"></div>
              
              <Image
                src="/images/farmer.png"
                alt="Happy Farmer"
                fill
                className="object-contain drop-shadow-2xl z-10"
                priority
              />

              {/* কোটেশন কার্ড (Overlay) */}
              <div className="absolute -bottom-6 right-0 z-20 bg-[#2D241E] text-white p-6 rounded-2xl shadow-2xl max-w-[260px] border-l-4 border-amber-500">
                <p className="text-xs text-slate-300 italic mb-3 leading-relaxed">
                  "গোলাঘর কৃষকদের জন্য একটি আশীর্বাদ। এটি আমাদের টেকসই ভবিষ্যতের পথ দেখায়।"
                </p>
                <div>
                  <h4 className="text-amber-400 font-bold text-sm">জোসেফ সি. জেনসেন</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">প্রতিষ্ঠাতা, গোলাঘর</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- ডান পাশ: Our Mission --- */}
          <div className="flex flex-col items-center space-y-4 order-3">
            {/* হেডার বাটন */}
            <div className="bg-[#4A3B32] text-white px-8 py-3 rounded-full font-bold shadow-lg mb-6 relative">
              আমাদের উদ্দেশ্য (Mission)
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#4A3B32] rotate-45"></div>
            </div>

            {/* ফ্লো চার্ট আইটেম */}
            <div className="space-y-2 w-full flex flex-col items-center">
              {missions.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-full max-w-xs">
                  {/* কানেক্টিং অ্যারো (প্রথমটি বাদে) */}
                  {index !== 0 && (
                    <ArrowDown className="text-[#8B5E3C] w-6 h-6 my-1 animate-bounce" />
                  )}
                  
                  {/* টেক্সট কার্ড */}
                  <div className="w-full bg-[#FDF6E9] border border-[#E6DCC8] text-[#5A4635] py-4 px-6 rounded-2xl text-center font-medium shadow-sm hover:shadow-md hover:border-emerald-300 hover:bg-white transition-all duration-300 cursor-default">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}