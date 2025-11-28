"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoveLeft, Home, Sprout, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* --- ব্যাকগ্রাউন্ড ডেকোরেশন (এনিমেটেড মেঘ) --- */}
      <div className="absolute top-20 left-10 text-slate-200 animate-[float_10s_ease-in-out_infinite]">
        <Cloud className="w-24 h-24" />
      </div>
      <div className="absolute top-40 right-20 text-slate-200 animate-[float_15s_ease-in-out_infinite_reverse]">
        <Cloud className="w-16 h-16" />
      </div>
      
      {/* নিচের দিকে ঘাসের বা প্যাটার্ন */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-emerald-50 to-transparent pointer-events-none"></div>

      {/* --- মেইন কন্টেন্ট --- */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        
        {/* 404 টেক্সট এবং আইকন */}
        <div className="relative inline-block mb-6">
          <h1 className="text-[150px] font-bold text-emerald-900 leading-none tracking-tighter drop-shadow-sm font-serif">
            4<span className="text-emerald-500">0</span>4
          </h1>
          
          {/* ০ এর মাঝখানে স্প্রাউট আইকন বসানো */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-2">
             <Sprout className="w-24 h-24 text-emerald-600 animate-bounce" />
          </div>
        </div>

        {/* মেসেজ */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-tiro-bangla">
          দুঃখিত! আপনি পথ হারিয়েছেন
        </h2>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          মনে হচ্ছে আপনি এমন কোনো জমিতে চলে এসেছেন যেখানে কোনো ফসল নেই। লিংকটি সম্ভবত ভুল বা পেজটি সরানো হয়েছে।
        </p>

        {/* বাটন গ্রুপ */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {/* ব্যাক বাটন */}
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="h-12 px-6 border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-base"
          >
            <MoveLeft className="mr-2 h-5 w-5" /> ফিরে যান
          </Button>

          {/* হোম বাটন */}
          <Link href="/">
            <Button className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white text-base shadow-lg shadow-emerald-200">
              <Home className="mr-2 h-5 w-5" /> হোম পেজ
            </Button>
          </Link>
        </div>

      </div>

      {/* --- ফুটার এরিয়া --- */}
      <div className="absolute bottom-8 text-slate-400 text-sm">
        HarvestGuard &copy; {new Date().getFullYear()}
      </div>

      {/* কাস্টম এনিমেশন স্টাইল */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
}