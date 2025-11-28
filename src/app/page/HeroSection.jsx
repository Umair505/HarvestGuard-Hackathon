"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image"; // 1. Import Next.js Image component
import { ArrowRight, Leaf, ShieldCheck, CloudRain } from "lucide-react";
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
  // 2. Fixed Autoplay: stopOnInteraction: false keeps it running even after user swipes
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  // 3. Fixed Images: Used string paths for public folder assets
  // NOTE: For 'public' folder images, use string paths directly.
  // Imports (import c1 from...) are for files inside 'src'.
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
      desc: "বৃষ্টি বা ঝড় আসার আগেই অ্যাপের মাধ্যমে নোটিফিকেশন পান।",
    },
    {
      id: 5,
      image: "/images/c5.jpeg",
      title: "রোগ নির্ণয় (AI)",
      desc: "ফসলের ছবি তুলে মুহূর্তেই জেনে নিন কোনো রোগ আছে কিনা।",
    },
    {
      id: 6,
      image: "/images/c6.png",
      title: "সমৃদ্ধ বাংলাদেশ",
      desc: "খাদ্য অপচয় কমিয়ে আমরা গড়বো ক্ষুধামুক্ত দেশ।",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-hind">
      {/* ২. হিরো সেকশন */}
      <section className="flex-1 flex items-center py-18 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* --- বাম পাশ: টেক্সট এবং বাটন --- */}
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              {/* ব্যাজ */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFEE] text-emerald-800 text-sm font-medium border border-emerald-200">
                <Leaf className="w-4 h-4" />
                <span>টেকসই কৃষি প্রযুক্তি (SDG 12.3)</span>
              </div>

              {/* হেডলাইন */}
              <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight text-slate-900">
                আপনার কষ্টার্জিত ফসল <br />
                <span className="text-emerald-600">সুরক্ষিত থাকুক</span>
              </h1>

              {/* সাব-টেক্সট */}
              <p className="text-lg text-slate-600 max-w-lg">
                বাংলাদেশে প্রতি বছর ৪৫ লক্ষ টন শস্য নষ্ট হয়। গোলাঘর অ্যাপ
                ব্যবহার করে আবহাওয়ার পূর্বাভাস জানুন এবং বৈজ্ঞানিক উপায়ে শস্য
                সংরক্ষণ করুন।
              </p>

              {/* বাটন গ্রুপ */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-lg h-12 px-8"
                >
                  রেজিস্ট্রেশন করুন <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-12 px-8 border-slate-300"
                >
                  কিভাবে কাজ করে?
                </Button>
              </div>

              {/* ছোট ফিচার আইকন */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CloudRain className="text-blue-500 w-5 h-5" /> ওয়েদার
                  অ্যালার্ট
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ShieldCheck className="text-emerald-500 w-5 h-5" /> সেইফ
                  স্টোরেজ
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
                              <p className="text-slate-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
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
    </div>
  );
}
