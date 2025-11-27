"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Database, BellRing, Sprout, ShieldCheck, ArrowRight } from "lucide-react";

export default function SolutionFlowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const flowSteps = [
    {
      id: 1,
      icon: <Database className="w-8 h-8 text-white" />,
      title: "ডেটা সংগ্রহ",
      description: "আর্দ্রতা, তাপমাত্রা এবং আবহাওয়ার লাইভ ডেটা সেন্সর ও স্যাটেলাইট থেকে সংগ্রহ করা হয়।",
      color: "bg-blue-500",
      shadow: "shadow-blue-200",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      icon: <BellRing className="w-8 h-8 text-white" />,
      title: "স্মার্ট সতর্কতা",
      description: "AI অ্যালগরিদম ঝুঁকি বিশ্লেষণ করে এবং বিপদ আসার আগেই ফোনে নোটিফিকেশন পাঠায়।",
      color: "bg-amber-500",
      shadow: "shadow-amber-200",
      gradient: "from-amber-400 to-amber-600"
    },
    {
      id: 3,
      icon: <Sprout className="w-8 h-8 text-white" />,
      title: "সঠিক পদক্ষেপ",
      description: "অ্যাপ পরামর্শ দিবে কখন ধান শুকাতে হবে বা কখন ঢেকে রাখতে হবে।",
      color: "bg-emerald-500",
      shadow: "shadow-emerald-200",
      gradient: "from-emerald-400 to-emerald-600"
    },
    {
      id: 4,
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "সুরক্ষিত ফসল",
      description: "সঠিক সময়ে সঠিক ব্যবস্থা নেওয়ায় আপনার ফসল থাকে ১০০% নিরাপদ ও সতেজ।",
      color: "bg-green-600",
      shadow: "shadow-green-200",
      gradient: "from-green-500 to-green-700"
    }
  ];

  // অ্যানিমেশন ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-emerald-50/30 font-sans">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
         <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
         {/* গ্রিড প্যাটার্ন (অপশনাল) */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-100 text-emerald-800 text-sm font-semibold mb-6 shadow-sm"
          >
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            কার্যপদ্ধতি
          </motion.div>
          
          <motion.h2
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-4xl md:text-5xl font-bold font-tiro-bangla text-slate-900 mb-6"
          >
            প্রযুক্তি যখন <span className="text-emerald-600">কৃষকের বন্ধু</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-600 text-lg leading-relaxed"
          >
            জটিল প্রযুক্তি, কিন্তু ব্যবহার করা পানির মতোই সহজ। মাত্র ৪টি ধাপে গোলাঘর নিশ্চিত করে আপনার ফসলের সর্বোচ্চ নিরাপত্তা।
          </motion.p>
        </div>

        {/* স্টেপস কন্টেইনার */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* কানেক্টিং লাইন (শুধুমাত্র ডেস্কটপে দেখাবে) */}
          <div className="hidden md:block absolute top-14 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full overflow-hidden">
            {/* অ্যানিমেটেড প্রোগ্রেস লাইন */}
            <motion.div 
               initial={{ width: 0 }}
               animate={isInView ? { width: "100%" } : {}}
               transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
               className="h-full bg-gradient-to-r from-blue-400 via-amber-400 to-green-500"
            />
          </div>

          {flowSteps.map((step, index) => (
            <motion.div 
              key={step.id} 
              variants={itemVariants}
              className="relative flex flex-col items-center text-center group"
            >
              {/* আইকন সার্কেল */}
              <div className={`
                w-28 h-28 rounded-3xl rotate-3 group-hover:rotate-0 transition-all duration-500
                bg-gradient-to-br ${step.gradient}
                flex items-center justify-center mb-8 
                shadow-xl ${step.shadow} 
                ring-8 ring-white z-10 relative
              `}>
                {step.icon}
                
                {/* স্টেপ নম্বর ব্যাজ */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold border-4 border-slate-50 shadow-md text-lg">
                  {step.id}
                </div>
              </div>

              {/* কন্টেন্ট কার্ড */}
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full h-full flex flex-col">
                <h3 className="text-xl font-bold font-tiro-bangla text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* মোবাইলের জন্য অ্যারো আইকন (স্টেপের মাঝখানে) */}
              {index < flowSteps.length - 1 && (
                <div className="md:hidden my-6 text-slate-300 animate-bounce">
                  <ArrowRight className="w-6 h-6 transform rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* নিচের CTA টেক্সট */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={isInView ? { opacity: 1 } : {}}
           transition={{ delay: 1.5 }}
           className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition cursor-pointer">
            এখনই শুরু করুন
          </div>
        </motion.div>

      </div>
    </section>
  );
}