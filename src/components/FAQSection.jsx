"use client";

import * as React from "react";
import { Phone, Facebook, Twitter, Instagram, Linkedin, ChevronDown, Leaf, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function FAQSection() {
  const [openItems, setOpenItems] = React.useState([0]);

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // গোলাঘর অ্যাপ রিলেটেড প্রশ্ন ও উত্তর
  const faqs = [
    {
      question: "গোলাঘর অ্যাপটি কি কৃষকদের জন্য সম্পূর্ণ বিনামূল্যে?",
      answer:
        "হ্যাঁ, গোলাঘর অ্যাপটির মূল ফিচারগুলো কৃষকদের ব্যবহারের জন্য সম্পূর্ণ ফ্রি। তবে ভবিষ্যতে অ্যাডভান্সড অ্যানালিটিক্স বা বিশেষ পরামর্শের জন্য প্রিমিয়াম প্ল্যান আসতে পারে।",
    },
    {
      question: "ইন্টারনেট না থাকলে কি আমি অ্যাপটি ব্যবহার করতে পারব?",
      answer:
        "অবশ্যই! আমাদের 'অফলাইন মোড' এর মাধ্যমে আপনি ইন্টারনেট ছাড়াও ফসলের তথ্য সেভ করতে পারবেন। পরে ইন্টারনেট সংযোগ পেলে তা স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।",
    },
    {
      question: "আবহাওয়ার পূর্বাভাস কতটা সঠিক এবং নির্ভরযোগ্য?",
      answer:
        "আমরা আন্তর্জাতিক মানের আবহাওয়া API এবং লোকাল স্যাটেলাইট ডেটা ব্যবহার করি। তাই আমাদের দেওয়া পূর্বাভাস এবং অ্যালার্টগুলো প্রায় ৯০% নির্ভুল।",
    },
    {
      question: "আমি কি অ্যাপের মাধ্যমে সরাসরি ফসল বিক্রি করতে পারব?",
      answer:
        "হ্যাঁ, আমাদের 'মার্কেট কানেক্ট' ফিচারের মাধ্যমে আপনি মধ্যস্বত্বভোগী ছাড়াই সরাসরি আড়তদার বা বড় ক্রেতাদের সাথে যোগাযোগ করে ন্যায্য মূল্যে ফসল বিক্রি করতে পারবেন।",
    },
    {
      question: "স্মার্ট স্টোরেজ বা সাইলো ব্যবহারের সুবিধা কী?",
      answer:
        "স্মার্ট স্টোরেজ বা সাইলো আপনার ফসলকে আর্দ্রতা, পোকা এবং ফাঙ্গাস থেকে রক্ষা করে। এতে ফসল দীর্ঘসময় সতেজ থাকে এবং আপনি পরে ভালো দামে বিক্রি করতে পারেন।",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-emerald-50/30 font-hind">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Contact Card */}
          <div className="lg:sticky lg:top-24">
            <Card className="border-2 border-dashed border-emerald-200 shadow-xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                {/* Profile Section */}
                <div className="relative mb-8">
                  {/* Decorative Leaves */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-12">
                    <div className="flex justify-center gap-1">
                      {[...Array(7)].map((_, i) => (
                        <Leaf
                          key={i}
                          className="w-6 h-6 text-emerald-500 transform -rotate-12"
                          style={{
                            opacity: 0.3 + (i * 0.1),
                            transform: `rotate(${-30 + i * 10}deg)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-emerald-300 animate-spin-slow"></div>
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 overflow-hidden border-4 border-white shadow-lg">
                     <Image
                        src="https://res.cloudinary.com/dxzmdryfg/image/upload/v1759768268/photo_2025-08-13_20-10-19_s8jkh1.jpg"
                        alt="Support Agent"
                        fill 
                        className="object-cover" 
                    />
                    </div>
                    {/* আইকন ব্যাজ */}
                    <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md z-10">
                       <Sprout className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="text-center pt-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1 font-tiro-bangla">
                      ড. উমাইর মাহমুদ
                    </h3>
                    <p className="text-emerald-600 font-medium py-2">প্রধান কৃষিবিদ, গোলাঘর</p>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-tiro-bangla">
                    আপনার কি আরো প্রশ্ন আছে?
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    অ্যাপ ব্যবহার, ফসল সংরক্ষণ বা বাজারজাতকরণ নিয়ে কোনো সমস্যা হলে 
                    নির্দ্বিধায় যোগাযোগ করুন। আমাদের বিশেষজ্ঞ টিম সবসময় আপনার পাশে আছে।
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-3 mb-6">
                  {[
                    { icon: Facebook, color: "hover:bg-blue-500" },
                    { icon: Instagram, color: "hover:bg-pink-500" },
                    { icon: Linkedin, color: "hover:bg-blue-600" },
                  ].map((social, i) => (
                    <button
                      key={i}
                      className={`w-12 h-12 rounded-full border-2 border-amber-200 bg-amber-50 flex items-center justify-center ${social.color} hover:text-white transition-all duration-300 hover:scale-110 hover:border-transparent`}
                    >
                      <social.icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>

                {/* Phone Number */}
                <div className="text-center mb-6">
                  <a
                    href="tel:+8801700000000"
                    className="text-2xl font-bold text-slate-900 hover:text-emerald-600 transition-colors font-mono"
                  >
                    +৮৮০ ১৭০০-০০০০০০
                  </a>
                </div>

                {/* Call Button */}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  সরাসরি কল করুন
                  <Phone className="ml-2 h-5 w-5" />
                </Button>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                  <Sprout className="w-full h-full text-emerald-900 transform rotate-12" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - FAQ List */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-200">
                <Leaf className="w-4 h-4" />
                <span>সচরাচর জিজ্ঞাসা</span>
                <Leaf className="w-4 h-4" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-tiro-bangla text-slate-900 mb-4 leading-tight">
                আপনার মনের <br/>
                <span className="text-emerald-600">সকল প্রশ্নের</span> উত্তর
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible
                  key={index}
                  open={openItems.includes(index)}
                  onOpenChange={() => toggleItem(index)}
                >
                  <Card
                    className={`border-2 transition-all duration-300 ${
                      openItems.includes(index)
                        ? "border-emerald-400 shadow-lg bg-gradient-to-r from-emerald-50 to-amber-50"
                        : "border-slate-200 hover:border-emerald-300 bg-gradient-to-r from-slate-50 to-amber-50/30"
                    }`}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-6 cursor-pointer group">
                        <h3 className="text-lg font-bold font-tiro-bangla text-slate-900 text-left group-hover:text-emerald-600 transition-colors">
                          {faq.question}
                        </h3>
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            openItems.includes(index)
                              ? "bg-amber-500 text-white rotate-180"
                              : "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white"
                          }`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-slate-600 leading-relaxed border-t border-emerald-200/50 pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}