"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { 
  CloudRain, 
  TrendingUp, 
  AlertTriangle, 
  Sprout, 
  WifiOff, 
  Smartphone, 
  ShieldCheck, 
  Leaf
} from "lucide-react";
import { AnimatedList } from "../AnimatedList";

// --- ১. নোটিফিকেশন ডেটা (Farmers Context) ---
let notifications = [
  {
    name: "বজ্রপাতের সতর্কতা",
    description: "আপনার এলাকায় আগামী ২ ঘণ্টায় ঝড়ের সম্ভাবনা।",
    time: "১০ মিনিট আগে",
    icon: "⛈️",
    color: "#EF4444", // Red
  },
  {
    name: "ধানের বাজার দর",
    description: "আজকের বাজার দর: ১২৫০ টাকা/মন।",
    time: "১৫ মিনিট আগে",
    icon: "💰",
    color: "#10B981", // Emerald
  },
  {
    name: "আর্দ্রতা বেশি",
    description: "গোলায় আর্দ্রতা ৮০% ছাড়িয়েছে। দ্রুত ব্যবস্থা নিন।",
    time: "৩০ মিনিট আগে",
    icon: "💧",
    color: "#F59E0B", // Amber
  },
  {
    name: "রোগ শনাক্তকরণ",
    description: "আপনার আপলোড করা ছবিতে 'ব্লাস্ট রোগ' ধরা পড়েছে।",
    time: "১ ঘণ্টা আগে",
    icon: "🦠",
    color: "#6366F1", // Indigo
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

// --- ২. নোটিফিকেশন কার্ড কম্পোনেন্ট ---
const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white shadow-sm border border-slate-100",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-xl text-white drop-shadow-md">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-bold whitespace-pre text-slate-800 dark:text-white font-tiro-bangla">
            <span className="text-sm sm:text-base">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-slate-400 font-sans">{time}</span>
          </figcaption>
          <p className="text-xs sm:text-sm font-normal text-slate-500 dark:text-white/60 font-sans">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

// --- ৩. মেইন সেকশন ---
export default function FeaturesSection() {
  return (
    <section className="py-24 max-w-11/12 mx-auto overflow-hidden font-hind relative">
      
     

      <div className="max-w-11/12 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Features Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-sm font-semibold">
              <Sprout className="w-4 h-4" />
              <span>স্মার্ট কৃষি প্রযুক্তি</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-tiro-bangla text-slate-900 leading-tight">
              আপনার খামারের জন্য <br />
              <span className="text-emerald-600">রিয়েল-টাইম</span> আপডেট
            </h2>
            
            <p className="text-lg text-slate-600">
              গোলাঘর অ্যাপের মাধ্যমে কৃষকরা পাচ্ছেন আবহাওয়া, বাজার দর এবং শস্যের অবস্থার তাৎক্ষণিক নোটিফিকেশন। আমাদের অত্যাধুনিক ফিচারগুলো আপনার কৃষিকাজকে করবে সহজ ও নিরাপদ।
            </p>

            {/* Feature List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <FeatureItem 
                icon={<WifiOff className="w-5 h-5 text-emerald-600" />}
                title="অফলাইন মোড"
                desc="ইন্টারনেট ছাড়াই তথ্য সেভ করুন।"
              />
              <FeatureItem 
                icon={<Smartphone className="w-5 h-5 text-emerald-600" />}
                title="মোবাইল অ্যাপ"
                desc="সহজ ইন্টারফেস, সব ফোনে চলে।"
              />
              <FeatureItem 
                icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
                title="সুরক্ষিত ডেটা"
                desc="আপনার তথ্য সম্পূর্ণ নিরাপদ।"
              />
              <FeatureItem 
                icon={<Leaf className="w-5 h-5 text-emerald-600" />}
                title="রোগ নির্ণয়"
                desc="এআই স্ক্যানারে শস্যের রোগ ধরুন।"
              />
            </div>
          </div>

          {/* Right Side: Animated List Demo */}
          <div className="relative">
            {/* Phone Frame / Card Container */}
            <div className="relative flex h-[500px] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-xl shadow-2xl">
              
              {/* Header of the Card */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white/80">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                       <CloudRain className="text-emerald-600 w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-800 font-tiro-bangla">লাইভ আপডেট</h4>
                       <p className="text-xs text-slate-500">গোলাঘর সার্ভার</p>
                    </div>
                 </div>
                 <div className="flex gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-600">সক্রিয়</span>
                 </div>
              </div>

              {/* Animated List Content */}
              <div className="p-4 flex-1 overflow-hidden relative">
                 <AnimatedList delay={2000}>
                  {notifications.map((item, idx) => (
                    <Notification {...item} key={idx} />
                  ))}
                </AnimatedList>
                
                {/* Gradient Fade at bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// Small Helper Component for Feature Grid
function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100">
      <div className="shrink-0 mt-1 bg-emerald-50 p-2 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-800 font-tiro-bangla">{title}</h4>
        <p className="text-xs text-slate-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}