// components/ProblemSection.jsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, TrendingDown, Target, ArrowRight } from "lucide-react";

const cardAnimation = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const floatAnimation = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const problemStats = [
    {
      id: 1,
      icon: <AlertTriangle className="w-6 h-6" />,
      number: "৪.৫",
      unit: "মিলিয়ন টন",
      title: "বার্ষিক খাদ্য অপচয়",
      description: "বাংলাদেশে প্রতি বছর সঠিক সংরক্ষণের অভাবে এই বিশাল পরিমাণ খাদ্য নষ্ট হয়, যা লক্ষ লক্ষ মানুষের খাদ্যের চাহিদা পূরণ করতে পারত।",
      image: "/images/p1.png",
      gradient: "from-red-900/80 via-red-800/70 to-red-900/80",
      delay: 0.1
    },
    {
      id: 2,
      icon: <TrendingDown className="w-6 h-6" />,
      number: "২৫%",
      unit: "ফসল ক্ষতি",
      title: "পোস্ট-হারভেস্ট লস",
      description: "ফসল কাটার পর থেকে ভোক্তার কাছে পৌঁছানো পর্যন্ত ২৫ শতাংশই নষ্ট হয়ে যায়, মূলত পরিবহন ও সংরক্ষণের অব্যবস্থাপনার কারণে।",
      image: "/images/p2.png",
      gradient: "from-amber-900/80 via-amber-800/70 to-amber-900/80",
      delay: 0.3
    },
    {
      id: 3,
      icon: <Target className="w-6 h-6" />,
      number: "SDG ১২.৩",
      unit: "গ্লোবাল গোল",
      title: "লক্ষ্যমাত্রা ২০৩০",
      description: "২০৩০ সালের মধ্যে খাদ্য অপচয় অর্ধেকে নামিয়ে আনার আন্তর্জাতিক লক্ষ্য, যেখানে গোলাঘর গুরুত্বপূর্ণ ভূমিকা রাখছে।",
      image: "/images/p3.png",
      gradient: "from-emerald-900/80 via-emerald-800/70 to-emerald-900/80",
      delay: 0.5
    }
  ];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50/30">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10% left-5% w-72 h-72 bg-rose-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10% right-5% w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-200/50 text-rose-700 text-base font-semibold mb-8 shadow-lg shadow-rose-100/50"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            জাতীয় সংকট
            <span className="w-1 h-1 bg-rose-300 rounded-full"></span>
            বর্তমান পরিস্থিতি
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold font-tiro-bangla text-gray-900 mb-6 leading-tight"
          >
            খাদ্য অপচয়: 
            <span className="block text-transparent bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text">
              একটি নির্মম বাস্তবতা
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            প্রতিটি দানা মূল্যবান। তবুও প্রযুক্তির অভাবে আমরা হারাচ্ছি আমাদের সম্পদের এক বিশাল অংশ। 
            এই অপচয় শুধু অর্থনৈতিক ক্ষতি নয়, এটি মানবিক সংকটও বটে।
          </motion.p>
        </div>
        
        {/* Cinematic Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {problemStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardAnimation}
              transition={{ delay: stat.delay }}
              className="group relative"
            >
              {/* Main Card */}
              <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
                
                {/* Background Image with Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${stat.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${stat.gradient}`} />
                
                {/* Content Container */}
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  
                  {/* Icon and Badge */}
                  <motion.div 
                    className="flex items-center justify-between mb-4"
                    variants={floatAnimation}
                    animate="float"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                        {stat.icon}
                      </div>
                      <span className="text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                  </motion.div>

                  {/* Number and Unit */}
                  <div className="mb-4">
                    <motion.h3 
                      className="text-5xl font-bold mb-2 leading-none"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: stat.delay + 0.2 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <motion.p 
                      className="text-lg font-semibold opacity-90"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: stat.delay + 0.3 }}
                    >
                      {stat.unit}
                    </motion.p>
                  </div>

                  {/* Title and Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: stat.delay + 0.4 }}
                  >
                    <h4 className="text-2xl font-bold font-tiro-bangla mb-3 leading-tight">
                      {stat.title}
                    </h4>
                    <p className="text-white/90 leading-relaxed text-sm mb-6  transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {stat.description}
                    </p>
                  </motion.div>

                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center gap-6">
            <div className="px-8 py-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-rose-200/50 shadow-2xl shadow-rose-100/30">
              <p className="text-gray-700 text-lg font-semibold">
                এই অপচয় রোধ করাই <span className="text-rose-600 font-bold text-xl">গোলাঘর</span>-এর মূল লক্ষ্য
              </p>
            </div>
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              খাদ্য অপচয় নিয়ন্ত্রণ করি
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}