"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Leaf,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: "আমরা যে তথ্য সংগ্রহ করি",
      content: [
        "ব্যক্তিগত তথ্য: নাম, ফোন নম্বর, ইমেইল ঠিকানা",
        "কৃষি সংক্রান্ত তথ্য: ফসলের ধরন, পরিমাণ, সংরক্ষণ স্থান",
        "অবস্থান তথ্য: উপজেলা-ভিত্তিক আবহাওয়া সেবার জন্য",
        "ডিভাইস তথ্য: IP ঠিকানা, ব্রাউজার টাইপ, অপারেটিং সিস্টেম",
        "ব্যবহারের তথ্য: অ্যাপ ব্যবহারের ধরন এবং সময়"
      ]
    },
    {
      icon: Eye,
      title: "আমরা কিভাবে তথ্য ব্যবহার করি",
      content: [
        "আবহাওয়া পূর্বাভাস এবং স্মার্ট পরামর্শ প্রদান",
        "ফসল সংরক্ষণে সহায়তা ও ক্ষতি কমাতে",
        "ব্যবহারকারীর অ্যাকাউন্ট পরিচালনা",
        "সেবার মান উন্নয়ন এবং নতুন ফিচার যোগ",
        "নিরাপত্তা এবং জালিয়াতি প্রতিরোধ",
        "আইনি বাধ্যবাধকতা পূরণ"
      ]
    },
    {
      icon: Lock,
      title: "তথ্যের সুরক্ষা",
      content: [
        "এন্ড-টু-এন্ড এনক্রিপশন প্রযুক্তি ব্যবহার",
        "সুরক্ষিত সার্ভারে ডেটা সংরক্ষণ",
        "নিয়মিত নিরাপত্তা অডিট এবং আপডেট",
        "সীমিত কর্মচারী অ্যাক্সেস নীতি",
        "দ্বি-ফ্যাক্টর অথেন্টিকেশন সুবিধা",
        "অফলাইন মোডে লোকাল স্টোরেজ"
      ]
    },
    {
      icon: UserCheck,
      title: "তথ্য শেয়ারিং নীতি",
      content: [
        "আমরা কখনো আপনার ব্যক্তিগত তথ্য বিক্রি করি না",
        "তৃতীয় পক্ষের সাথে শুধুমাত্র প্রয়োজনীয় ক্ষেত্রে শেয়ার করি",
        "আবহাওয়া সেবা প্রদানকারীর সাথে সীমিত তথ্য শেয়ার",
        "আইনি প্রয়োজনে সরকারি কর্তৃপক্ষের সাথে",
        "আপনার সম্মতি ছাড়া কোনো মার্কেটিং উদ্দেশ্যে ব্যবহার নয়"
      ]
    }
  ];

  const rights = [
    "আপনার তথ্য দেখার এবং সংশোধনের অধিকার",
    "তথ্য মুছে ফেলার অনুরোধ করার অধিকার",
    "ডেটা পোর্টেবিলিটি - তথ্য ডাউনলোড করার অধিকার",
    "মার্কেটিং যোগাযোগ থেকে অপ্ট-আউট করার অধিকার",
    "ডেটা প্রসেসিংয়ে আপত্তি জানানোর অধিকার"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-amber-50/20 font-hind">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Shield className="w-4 h-4 mr-2" />
              আপনার তথ্য সুরক্ষিত
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-tiro-bangla text-slate-900 mb-6">
              গোপনীয়তা নীতি
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              সর্বশেষ আপডেট: ২৯ নভেম্বর, ২০২৫
            </p>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              গোলাঘর আপনার গোপনীয়তাকে অত্যন্ত গুরুত্ব দেয়। এই নীতিমালা ব্যাখ্যা করে
              আমরা কিভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষা করি।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold font-tiro-bangla text-slate-900">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* User Rights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold font-tiro-bangla text-slate-900">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  আপনার অধিকার
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {rights.map((right, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{right}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold font-tiro-bangla text-slate-900">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  কুকিজ এবং ট্র্যাকিং
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">
                  আমরা আপনার অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহার করি। কুকিজ হল ছোট টেক্সট
                  ফাইল যা আপনার ডিভাইসে সংরক্ষিত থাকে।
                </p>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">আমরা যে কুকিজ ব্যবহার করি:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                    <li>প্রয়োজনীয় কুকিজ - সাইট কার্যকর করতে</li>
                    <li>পারফরমেন্স কুকিজ - সেবা উন্নত করতে</li>
                    <li>ফাংশনাল কুকিজ - আপনার পছন্দ মনে রাখতে</li>
                  </ul>
                </div>
                <p className="text-sm text-slate-600">
                  আপনি যেকোনো সময় ব্রাউজার সেটিংস থেকে কুকিজ নিয়ন্ত্রণ করতে পারেন।
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Children's Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-2 border-emerald-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  শিশুদের গোপনীয়তা
                </h3>
                <p className="text-slate-700">
                  আমাদের সেবা ১৮ বছরের কম বয়সীদের জন্য নয়। আমরা জেনেশুনে শিশুদের কাছ
                  থেকে ব্যক্তিগত তথ্য সংগ্রহ করি না। যদি আমরা জানতে পারি যে কোনো শিশুর
                  তথ্য সংগ্রহ হয়েছে, আমরা তা অবিলম্বে মুছে ফেলব।
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Policy Updates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-2 border-emerald-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  নীতিমালার পরিবর্তন
                </h3>
                <p className="text-slate-700">
                  আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। কোনো পরিবর্তন
                  হলে আমরা এই পৃষ্ঠায় নতুন তারিখ সহ আপডেট পোস্ট করব এবং উল্লেখযোগ্য
                  পরিবর্তনের ক্ষেত্রে আপনাকে ইমেইল বা অ্যাপ নোটিফিকেশনের মাধ্যমে জানাব।
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50">
              <CardContent className="p-8 text-center">
                <Leaf className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-tiro-bangla text-slate-900 mb-3">
                  প্রশ্ন বা উদ্বেগ?
                </h3>
                <p className="text-slate-700 mb-4">
                  গোপনীয়তা সম্পর্কিত কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন:
                </p>
                <div className="space-y-2">
                  <p className="text-slate-900 font-semibold">
                    ইমেইল: privacy@golaghor.com
                  </p>
                  <p className="text-slate-900 font-semibold">
                    ফোন: +৮৮ ০১৭১২ ৩৪৫৬৭৮
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}