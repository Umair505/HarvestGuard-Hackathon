"use client";

import dynamic from "next/dynamic";
import { AlertTriangle, MapPin, Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// ম্যাপ কম্পোনেন্টটি ডায়নামিকলি ইমপোর্ট করা (SSR: false)
const RiskMap = dynamic(() => import("@/components/RiskMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-slate-100 rounded-3xl flex flex-col items-center justify-center animate-pulse border-2 border-slate-200">
      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-bold font-tiro-bangla">
        চট্টগ্রামের ম্যাপ লোড হচ্ছে...
      </p>
    </div>
  ),
});

export default function RiskMapPage() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
//   if (!isLoggedIn) {
//     redirect("/login");
//   }

  return (
    // pt-24 বা pt-28 দেওয়া হয়েছে যাতে নেভবারের নিচে কন্টেন্ট ঢাকা না পড়ে
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12 px-4 md:px-8 font-sans relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-0"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* --- হেডার সেকশন (এনিমেটেড) --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-700 text-sm font-bold shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              কমিউনিটি সতর্কবার্তা
            </motion.div>

            <h1 className="text-4xl md:text-5xl pt-4 font-bold font-hind text-slate-900 leading-tight">
              আঞ্চলিক{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600 pt">
                ঝুঁকি মানচিত্র
              </span>
            </h1>

            <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-emerald-500 pl-4 bg-white/50 py-2 rounded-r-lg">
              আপনার আশেপাশের (২নং গেইট, অক্সিজেন, বায়েজিদ) খামারগুলোর বর্তমান
              অবস্থা দেখুন। লাল চিহ্নিত এলাকাগুলো{" "}
              <span className="font-bold text-red-600">উচ্চ ঝুঁকিপূর্ণ</span>,
              তাই আগে থেকেই সতর্ক হোন।
            </p>
          </div>

          {/* কুইক স্ট্যাটস / লিজেন্ড */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex flex-col gap-3 min-w-[250px]"
          >
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700 pb-2 border-b">
              <span>নির্দেশিকা</span>
              <Info className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-200"></div>
                <span className="text-slate-600">আপনার খামার</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-200"></div>
                <span className="text-slate-600">উচ্চ ঝুঁকি (High Risk)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></div>
                <span className="text-slate-600">নিরাপদ (Low Risk)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- ম্যাপ কন্টেইনার (এনিমেটেড) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          {/* গ্লাস এফেক্ট বর্ডার */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-white rounded-[1.8rem] p-2 shadow-2xl border border-slate-200 overflow-hidden">
            <RiskMap />

            {/* ম্যাপের নিচে লোকেশন ইন্ডিকেটর */}
            <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500 animate-bounce" />
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  বর্তমান এলাকা
                </p>
                <p className="text-sm font-bold text-slate-800">
                  চট্টগ্রাম (২নং গেইট এলাকা)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ফুটার নোট */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-slate-400 text-sm mt-8 flex items-center justify-center gap-2"
        >
          <Info className="w-4 h-4" />
          <span>
            গোপনীয়তা রক্ষার্থে প্রতিবেশী খামারগুলোর নাম উহ্য রাখা হয়েছে।
          </span>
        </motion.div>
      </div>
    </div>
  );
}
