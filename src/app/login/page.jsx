"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Sprout, 
  LogIn 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // লগিন লজিক এখানে হবে
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-sans bg-white">
      
      <div className="lg:flex relative h-full flex-col bg-slate-900 text-white">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/c3.png"
            alt="Bangladeshi Village Morning"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 via-transparent to-emerald-900/90" />
        </div>



        <div className="relative z-20 mt-auto p-12">
          <h2 className="text-4xl font-bold font-serif mb-4 leading-tight">
            স্বাগতম ফিরে আসার জন্য!
          </h2>
          <p className="text-emerald-100 text-lg max-w-md">
            আপনার ফসলের বর্তমান অবস্থা এবং আবহাওয়ার সর্বশেষ আপডেট জানতে লগিন করুন।
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">
              অ্যাকাউন্টে প্রবেশ করুন
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              আপনার ইমেইল এবং পাসওয়ার্ড দিয়ে লগিন করুন
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              
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
                  placeholder="পাসওয়ার্ড"
                  onChange={handleChange}
                />
              </div>
              
              {/* ফরগট পাসওয়ার্ড লিংক */}
              <div className="flex items-center justify-end">
                <Link href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
            </div>

            {/* লগিন বাটন */}
            <Button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-lg shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all text-lg"
            >
              লগিন করুন <LogIn className="ml-2 h-5 w-5" />
            </Button>

            {/* রেজিস্ট্রেশন লিংক */}
            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-600">
                কোনো অ্যাকাউন্ট নেই?{' '}
                <Link href="/register" className="font-bold text-emerald-600 hover:text-emerald-500 hover:underline transition-all">
                  নতুন অ্যাকাউন্ট খুলুন
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}