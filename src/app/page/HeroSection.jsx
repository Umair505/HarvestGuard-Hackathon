"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ArrowRight, Leaf, ShieldCheck, CloudRain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroSection() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const slides = [
    {
      id: 1,
      image: "/images/c1.png",
      title: "অরক্ষিত ফসল",
      desc: "সঠিক সংরক্ষণের অভাবে পচে যাচ্ছে হাজার টন ধান।",
    },
    {
      id: 2,
      image: "/images/c2.png",
      title: "স্মার্ট মনিটরিং",
      desc: "আর্দ্রতা ও তাপমাত্রা মাপুন হাতের মুঠোয়।",
    },
    {
      id: 3,
      image: "/images/c3.png",
      title: "নিশ্চিন্ত কৃষক",
      desc: "ফসল বাঁচান, নিজের পরিশ্রমের সঠিক মূল্য পান।",
    },
    {
      id: 4,
      image: "/images/c4.jpeg",
      title: "আগাম সতর্কবার্তা",
      desc: "বৃষ্টি বা ঝড় আসার আগেই অ্যাপের মাধ্যমে নোটিফিকেশন পান।",
    },
    {
      id: 5,
      image: "/images/c5.jpeg",
      title: "রোগ নির্ণয় (AI)",
      desc: "ফসলের ছবি তুলে মুহূর্তেই জেনে নিন কোনো রোগ আছে কিনা।",
    },
    {
      id: 6,
      image: "/images/c6.png",
      title: "সমৃদ্ধ বাংলাদেশ",
      desc: "খাদ্য অপচয় কমিয়ে আমরা গড়বো ক্ষুধামুক্ত দেশ।",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-hind">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50 animate-gradient-shift"></div>
      
      {/* Animated Mesh Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98140_1px,transparent_1px),linear-gradient(to_bottom,#10b98140_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-amber-400 rounded-full animate-float-medium"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-40 right-1/3 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-float-slow delay-1000"></div>
        <div className="absolute bottom-60 left-1/3 w-2 h-2 bg-amber-300 rounded-full animate-float-medium delay-500"></div>
        <div className="absolute top-1/3 right-10 w-1 h-1 bg-green-500 rounded-full animate-float-fast delay-700"></div>
      </div>

      {/* Organic Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Hero Section */}
      <section className="relative flex items-center py-18 md:py-20">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Text and Buttons */}
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-emerald-800 text-sm font-medium border border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <Leaf className="w-4 h-4 animate-pulse" />
                <span>টেকসই কৃষি প্রযুক্তি (SDG 12.3)</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight text-slate-900">
                আপনার কষ্টার্জিত ফসল <br />
                <span className="text-emerald-600 inline-flex items-center gap-2">
                  সুরক্ষিত থাকুক
                 
                </span>
              </h1>

              {/* Sub-text */}
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                বাংলাদেশে প্রতি বছর ৪৫ লক্ষ টন শস্য নষ্ট হয়। গোলাঘর অ্যাপ
                ব্যবহার করে আবহাওয়ার পূর্বাভাস জানুন এবং বৈজ্ঞানিক উপায়ে শস্য
                সংরক্ষণ করুন।
              </p>

              {/* Button Group */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!isLoggedIn && (
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-lg h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    রেজিস্ট্রেশন করুন <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
               <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-12 px-8 border-slate-300 bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  আমাদের সম্পর্কে জানুন
                </Button>
               </Link>
              </div>

              {/* Feature Icons */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 group cursor-pointer">
                  <CloudRain className="text-blue-500 w-5 h-5 group-hover:animate-bounce" /> 
                  <span className="group-hover:text-blue-600 transition-colors">ওয়েদার অ্যালার্ট</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 group cursor-pointer">
                  <ShieldCheck className="text-emerald-500 w-5 h-5 group-hover:animate-bounce" /> 
                  <span className="group-hover:text-emerald-600 transition-colors">সেইফ স্টোরেজ</span>
                </div>
              </div>
            </div>

           {/* --- ডান পাশ: ইমেজ ক্যারোসেল --- */}
            <div className="relative animate-in slide-in-from-right duration-700 fade-in">
              {/* ডেকোরেশন (ব্যাকগ্রাউন্ড ব্লব) */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 to-amber-100 rounded-full blur-2xl opacity-70 -z-10"></div>

              {/* কর্নার ডেকোরেশন এলিমেন্ট */}
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-emerald-400 animate-pulse rounded-tr-xl z-20"></div>
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400 animate-pulse rounded-tl-xl z-20"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-emerald-400 animate-pulse rounded-br-xl z-20"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400 animate-pulse rounded-bl-xl z-20"></div>

              {/* ফ্লোটিং পার্টিকেলস */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full animate-bounce z-20"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-300 z-20"></div>
              <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping z-20"></div>

              <Carousel
                plugins={[plugin.current]}
                opts={{ loop: true }}
                className="w-full max-w-xl mx-auto relative"
              >
                <CarouselContent>
                  {slides.map((slide) => (
                    <CarouselItem key={slide.id}>
                      <div className="p-1">
                        <Card className="border-0 shadow-xl overflow-hidden rounded-2xl relative">
                          {/* শাইন এফেক্ট */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>

                          <CardContent className="flex aspect-[4/3] items-center justify-center p-0 relative group overflow-hidden">
                            {/* কর্নার একসেন্ট */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-lg z-10 group-hover:border-emerald-400 transition-colors duration-300"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500/50 rounded-tr-lg z-10 group-hover:border-amber-400 transition-colors duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-500/50 rounded-bl-lg z-10 group-hover:border-emerald-400 transition-colors duration-300"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500/50 rounded-br-lg z-10 group-hover:border-amber-400 transition-colors duration-300"></div>

                            {/* Use Next.js Image Component with 'fill' */}
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={slide.id === 1}
                            />

                            {/* ছবির ওপর টেক্সট ওভারলে */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                              <h3 className="text-2xl font-bold font-serif">
                                {slide.title}
                              </h3>
                              <p className="text-slate-200 text-sm ">
                                {slide.desc}
                              </p>
                            </div>

                            
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

               
              </Carousel>

              {/* বটম ডেকোরেশন */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full blur-sm opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-15px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(20px); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes corner-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(90deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
          75% { transform: translateY(-15px) rotate(270deg); }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.7; box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
          50% { opacity: 1; box-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animate-corner-glow {
          animation: corner-glow 2s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-700 {
          animation-delay: 700ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animation-delay-1500 {
          animation-delay: 1500ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }

        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </div>
  );
}