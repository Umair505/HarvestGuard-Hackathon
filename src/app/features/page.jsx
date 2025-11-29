"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  CloudRain,
  Smartphone,
  ScanLine,
  BarChart3,
  Bell,
  Users,
  Shield,
  Wifi,
  Database,
  Zap,
  TrendingUp,
  PackageCheck,
  MapPin,
  Clock,
  Award,
  Leaf
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: CloudRain,
      title: "হাইপার-লোকাল আবহাওয়া",
      desc: "উপজেলা ভিত্তিক সঠিক আবহাওয়ার পূর্বাভাস পান। তাপমাত্রা, আর্দ্রতা, বৃষ্টির সম্ভাবনা এবং বাতাসের গতি জানুন।",
      color: "text-blue-500",
      bg: "from-blue-50 to-cyan-50",
      border: "border-blue-200",
      features: [
        "৭ দিনের পূর্বাভাস",
        "ঘন্টায় ঘন্টায় আপডেট",
        "উপজেলা লেভেল নির্ভুলতা",
        "বিপদ সংকেত সতর্কতা"
      ]
    },
    {
      icon: Bell,
      title: "স্মার্ট অ্যাডভাইজরি",
      desc: "বাংলায় কার্যকরী পরামর্শ পান। যেমন 'আজ ধান শুকান, আগামীকাল ভারী বৃষ্টি' - সময়মত সিদ্ধান্ত নিন।",
      color: "text-amber-500",
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-200",
      features: [
        "বাংলায় সহজ ভাষা",
        "রিয়েল-টাইম নোটিফিকেশন",
        "ফসল-নির্দিষ্ট পরামর্শ",
        "জরুরি সতর্কতা"
      ]
    },
    {
      icon: ScanLine,
      title: "AI ফসল স্ক্যানার",
      desc: "ক্যামেরা দিয়ে ফসল স্ক্যান করুন। Gemini AI ব্যবহার করে তাৎক্ষণিক জানুন আপনার ফসল তাজা নাকি নষ্ট।",
      color: "text-emerald-500",
      bg: "from-emerald-50 to-green-50",
      border: "border-emerald-200",
      features: [
        "ইনস্ট্যান্ট স্ক্যানিং",
        "তাজা/নষ্ট শনাক্তকরণ",
        "রোগ নির্ণয়",
        "সমাধান পরামর্শ"
      ]
    },
    {
      icon: BarChart3,
      title: "ডিজিটাল ইনভেন্টরি",
      desc: "অফলাইনেও কাজ করে! ফসলের ব্যাচ ট্র্যাক করুন, ওজন, স্টোরেজ লোকেশন এবং মান নিয়ন্ত্রণ করুন।",
      color: "text-purple-500",
      bg: "from-purple-50 to-pink-50",
      border: "border-purple-200",
      features: [
        "অফলাইন সাপোর্ট",
        "ব্যাচ ম্যানেজমেন্ট",
        "ক্ষতির হিসাব",
        "রিপোর্ট জেনারেশন"
      ]
    },
    {
      icon: Users,
      title: "কৃষক নেটওয়ার্ক",
      desc: "অন্যান্য কৃষক এবং ক্রেতাদের সাথে সংযুক্ত হন। অভিজ্ঞতা শেয়ার করুন এবং ভালো দাম পান।",
      color: "text-rose-500",
      bg: "from-rose-50 to-red-50",
      border: "border-rose-200",
      features: [
        "কমিউনিটি ফোরাম",
        "সরাসরি ক্রেতা সংযোগ",
        "দাম তুলনা",
        "সফলতার গল্প"
      ]
    },
    {
      icon: Shield,
      title: "ডেটা সুরক্ষা",
      desc: "আপনার তথ্য সম্পূর্ণ নিরাপদ। এনক্রিপ্টেড স্টোরেজ এবং প্রাইভেসি সুরক্ষা নিশ্চিত করি।",
      color: "text-indigo-500",
      bg: "from-indigo-50 to-blue-50",
      border: "border-indigo-200",
      features: [
        "এন্ড-টু-এন্ড এনক্রিপশন",
        "GDPR কমপ্লায়েন্ট",
        "লোকাল স্টোরেজ",
        "নো-ডেটা-সেলিং নীতি"
      ]
    }
  ];

  const techFeatures = [
    { icon: Wifi, title: "অফলাইন ফার্স্ট", desc: "ইন্টারনেট ছাড়াও কাজ করে" },
    { icon: Smartphone, title: "মোবাইল অপটিমাইজড", desc: "যেকোনো ডিভাইসে চলে" },
    { icon: Database, title: "ক্লাউড সিঙ্ক", desc: "অটোমেটিক ডেটা সিঙ্ক" },
    { icon: Zap, title: "দ্রুত পারফরম্যান্স", desc: "তাৎক্ষণিক লোডিং" },
  ];

  const benefits = [
    { icon: TrendingUp, label: "৫০% ফসল ক্ষতি হ্রাস", value: "প্রমাণিত" },
    { icon: PackageCheck, label: "৩০% আয় বৃদ্ধি", value: "গড় হার" },
    { icon: MapPin, label: "৬৪ জেলায় সেবা", value: "সম্প্রসারিত" },
    { icon: Clock, label: "২৪/৭ সাপোর্ট", value: "সর্বদা সক্রিয়" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-amber-50/20 font-hind">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
              <Leaf className="w-4 h-4 mr-2" />
              শক্তিশালী ফিচার
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-tiro-bangla text-slate-900 mb-6">
              ফিচারসমূহ
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              প্রযুক্তি এবং ডেটার শক্তিতে কৃষকদের ক্ষমতায়ন। <br />
              আধুনিক সমাধান দিয়ে ফসল সংরক্ষণে বিপ্লব আনছি।
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <benefit.icon className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 mb-1">
                    {benefit.label}
                  </h3>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {benefit.value}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full border-2 ${feature.border} hover:shadow-2xl transition-all duration-300 group overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <CardHeader className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardHeader>

                  <CardContent className="relative">
                    <div className="space-y-2">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${feature.color.replace('text-', 'bg-')}`}></div>
                          <span className="text-sm text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Features */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-tiro-bangla text-slate-900 mb-4">
              প্রযুক্তিগত সুবিধা
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              আধুনিক প্রযুক্তিতে তৈরি, সর্বত্র ব্যবহারযোগ্য
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {techFeatures.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
                      <tech.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">
                      {tech.title}
                    </h3>
                    <p className="text-sm text-slate-600">{tech.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-tiro-bangla text-slate-900 mb-4">
              কিভাবে কাজ করে?
            </h2>
            <p className="text-slate-600">
              মাত্র তিন ধাপে শুরু করুন
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "১", title: "রেজিস্টার করুন", desc: "মোবাইল নম্বর দিয়ে সহজে অ্যাকাউন্ট তৈরি করুন", icon: Smartphone },
              { step: "২", title: "ফসল যোগ করুন", desc: "আপনার ফসলের তথ্য এবং স্টোরেজ লোকেশন যোগ করুন", icon: PackageCheck },
              { step: "৩", title: "পরামর্শ পান", desc: "রিয়েল-টাইম আবহাওয়া এবং স্মার্ট পরামর্শ পান", icon: Award },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="relative border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardContent className="p-8 relative">
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-5xl font-bold text-emerald-600 mb-3 opacity-20">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.desc}</p>
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