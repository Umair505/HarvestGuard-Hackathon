"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  ArrowRight, 
  Sprout, 
  CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Register() {
  // ফর্ম স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    language: "bn", // ডিফল্ট বাংলা
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (lang) => {
    setFormData({ ...formData, language: lang });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Data:", formData);
    // এখানে ফায়ারবেস বা ব্যাকএন্ড লজিক বসবে
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-sans bg-white">
      
      {/* --- বাম পাশ: ছবি এবং মোটিভেশনাল টেক্সট --- */}
      <div className=" lg:flex relative h-full flex-col bg-slate-900 text-white">
        {/* ব্যাকগ্রাউন্ড ইমেজ */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/c1.png"
            alt="Bangladeshi Farmer in Field"
            className="h-full w-full object-cover opacity-60"
          />
          {/* গ্রাডিয়েন্ট ওভারলে */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent" />
        </div>

        {/* কন্টেন্ট (নিচে) */}
        <div className="relative z-20 mt-auto p-8 lg:p-12 space-y-6">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed">
              "আগে সঠিক তথ্যের অভাবে আমার অর্ধেক ফসল পচে যেত। গোলাঘর ব্যবহার করার পর থেকে আমি আবহাওয়ার আগেই খবর পাই এবং আমার ফসল থাকে নিরাপদ।"
            </p>
            <footer className="text-emerald-300 font-bold mt-4">
              — মো: রহিম উদ্দিন, একজন সফল কৃষক
            </footer>
          </blockquote>
          
          {/* স্ট্যাটস */}
          <div className="flex gap-8 pt-6 border-t border-white/20">
            <div>
              <h4 className="text-3xl font-bold text-white">৪.৫+</h4>
              <p className="text-sm text-emerald-200">মিলিয়ন টন অপচয় রোধ</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white">২০+</h4>
              <p className="text-sm text-emerald-200">জেলার কৃষক যুক্ত</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-8 mx-auto">
          
          {/* হেডার */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">
              নতুন অ্যাকাউন্ট খুলুন
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              স্মার্ট কৃষি প্রযুক্তির সাথে যুক্ত হয়ে নিজের ফসল রক্ষা করুন
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
            {/* ভাষা নির্বাচন (Toggle) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">পছন্দের ভাষা / Preferred Language</label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => handleLanguageChange('bn')}
                  className={`cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formData.language === 'bn' ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-emerald-200'}`}
                >
                  <span className="text-lg">🇧🇩</span>
                  <span className={`font-medium ${formData.language === 'bn' ? 'text-emerald-700' : 'text-slate-600'}`}>বাংলা</span>
                  {formData.language === 'bn' && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />}
                </div>
                <div 
                  onClick={() => handleLanguageChange('en')}
                  className={`cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formData.language === 'en' ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-emerald-200'}`}
                >
                  <span className="text-lg">🇺🇸</span>
                  <span className={`font-medium ${formData.language === 'en' ? 'text-emerald-700' : 'text-slate-600'}`}>English</span>
                  {formData.language === 'en' && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* নাম */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="আপনার পূর্ণ নাম"
                  onChange={handleChange}
                />
              </div>

              {/* ফোন নম্বর */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="মোবাইল নম্বর (০১...)"
                  onChange={handleChange}
                />
              </div>

              {/* ইমেইল */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="ইমেইল অ্যাড্রেস"
                  onChange={handleChange}
                />
              </div>

              {/* পাসওয়ার্ড */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="গোপন পাসওয়ার্ড দিন"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* সাবমিট বাটন */}
            <Button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-lg shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all text-lg"
            >
              রেজিস্ট্রেশন করুন <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* ফুটার লিংক */}
            <div className="text-center pt-2">
              <p className="text-sm text-slate-600">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-500 hover:underline transition-all">
                  লগিন করুন
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}