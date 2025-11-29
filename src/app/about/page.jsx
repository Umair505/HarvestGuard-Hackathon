"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Sprout, 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Leaf,
  Award,
  Heart,
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { number: "৪.৫ মিলিয়ন", label: "টন ফসল ক্ষতি (বার্ষিক)", icon: TrendingUp },
    { number: "$১.৫ বিলিয়ন", label: "অর্থনৈতিক ক্ষতি", icon: Target },
    { number: "১০,০০০+", label: "সংযুক্ত কৃষক", icon: Users },
    { number: "৮৫%", label: "ফসল সংরক্ষণ হার", icon: Shield },
  ];

  const values = [
    {
      icon: Heart,
      title: "কৃষক কেন্দ্রিক",
      desc: "কৃষকদের সমস্যা সমাধানই আমাদের প্রথম লক্ষ্য",
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      icon: Lightbulb,
      title: "প্রযুক্তি সচেতন",
      desc: "আধুনিক প্রযুক্তির সঠিক ব্যবহার করি",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: Leaf,
      title: "টেকসই উন্নয়ন",
      desc: "পরিবেশ বান্ধব সমাধান প্রদান করি",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: Award,
      title: "গুণমান নিশ্চিত",
      desc: "সর্বোচ্চ মানের সেবা প্রদান করতে প্রতিশ্রুতিবদ্ধ",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
  ];

  const milestones = [
    { year: "২০২৩", title: "প্রতিষ্ঠা", desc: "গোলাঘর প্ল্যাটফর্ম চালু" },
    { year: "২০২৪", title: "সম্প্রসারণ", desc: "৬৪টি জেলায় সেবা চালু" },
    { year: "২০২৫", title: "AI ইন্টিগ্রেশন", desc: "ফসল স্ক্যানার চালু" },
    { year: "২০২৬", title: "লক্ষ্য", desc: "১ লক্ষ কৃষক সংযুক্তি" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-white to-amber-50/30 font-hind">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-300 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
              <Leaf className="w-4 h-4 mr-2" />
              SDG 12.3 - খাদ্য অপচয় হ্রাস
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-tiro-bangla text-slate-900 mb-6">
              গোলাঘর সম্পর্কে
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              প্রযুক্তির মাধ্যমে বাংলাদেশের খাদ্য ক্ষতি কমাতে আমরা প্রতিশ্রুতিবদ্ধ।
              কৃষকদের ডেটা-চালিত অন্তর্দৃষ্টি, স্মার্ট স্টোরেজ পরামর্শ এবং আবহাওয়া
              সতর্কতা প্রদান করে ফসলের ক্ষতি কমানো আমাদের মূল লক্ষ্য।
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-10 h-10 mx-auto mb-4 text-emerald-600" />
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold font-tiro-bangla text-slate-900 mb-4">
                    আমাদের লক্ষ্য
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    বাংলাদেশে প্রতি বছর যে ৪.৫ মিলিয়ন মেট্রিক টন খাদ্য শস্য নষ্ট হয়,
                    তা কমিয়ে আনা। দুর্বল সংরক্ষণ, আর্দ্রতা এবং অদক্ষ পরিচালনার কারণে
                    এই ক্ষতি হয়ে থাকে যা $১.৫ বিলিয়ন ডলার অর্থনৈতিক ক্ষতির সমান।
                  </p>
                  <div className="space-y-2">
                    {["ফসল ক্ষতি ৫০% কমানো", "কৃষক আয় ৩০% বৃদ্ধি", "খাদ্য নিরাপত্তা নিশ্চিত"].map((goal, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="text-slate-700">{goal}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mb-6">
                    <Sprout className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold font-tiro-bangla text-slate-900 mb-4">
                    আমাদের দৃষ্টিভঙ্গি
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    "গোলাঘর" একটি ওয়েব অ্যাপ যা প্রদান করে: উপজেলা-ভিত্তিক আবহাওয়া
                    পূর্বাভাস, বাংলায় স্মার্ট পরামর্শ (যেমন "আজ ধান শুকান, আগামীকাল
                    ভারী বৃষ্টি"), AI ফসল স্ক্যানার এবং ডিজিটাল ইনভেন্টরি ব্যবস্থা।
                  </p>
                  <div className="space-y-2">
                    {["প্রযুক্তি সহজীকরণ", "সবার জন্য সেবা", "স্থায়িত্বশীল উন্নয়ন"].map((vision, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-amber-600" />
                        <span className="text-slate-700">{vision}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-tiro-bangla text-slate-900 mb-4">
              আমাদের মূল্যবোধ
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              যে নীতিগুলো আমাদের প্রতিটি কাজে প্রতিফলিত হয়
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${value.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-tiro-bangla text-slate-900 mb-4">
              আমাদের যাত্রা
            </h2>
            <p className="text-slate-600">
              কৃষকদের সেবায় আমাদের পথচলা
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 rounded-bl-full opacity-50"></div>
                    <h3 className="text-3xl font-bold text-emerald-600 mb-2">
                      {milestone.year}
                    </h3>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-slate-600 text-sm">{milestone.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}