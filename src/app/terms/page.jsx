"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  UserX,
  Shield,
  Leaf,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TermsConditionsPage() {
  const sections = [
    {
      icon: UserX,
      title: "সেবা ব্যবহারের শর্তাবলী",
      content: [
        "আপনাকে অবশ্যই ১৮ বছর বা তার বেশি বয়সী হতে হবে",
        "সঠিক এবং সম্পূর্ণ তথ্য প্রদান করতে হবে",
        "অ্যাকাউন্ট নিরাপত্তা বজায় রাখার দায়িত্ব আপনার",
        "একাধিক অ্যাকাউন্ট তৈরি করা নিষিদ্ধ",
        "অন্যের অ্যাকাউন্ট ব্যবহার করা যাবে না"
      ],
      color: "emerald"
    },
    {
      icon: XCircle,
      title: "নিষিদ্ধ কার্যক্রম",
      content: [
        "মিথ্যা বা বিভ্রান্তিকর তথ্য প্রদান করা",
        "অবৈধ বা ক্ষতিকর উদ্দেশ্যে সেবা ব্যবহার",
        "অন্য ব্যবহারকারীদের হয়রানি বা হুমকি দেওয়া",
        "সিস্টেম বা নিরাপত্তা ভাঙার চেষ্টা করা",
        "স্প্যাম বা অযাচিত বিজ্ঞাপন পাঠানো",
        "কপিরাইট বা ট্রেডমার্ক লঙ্ঘন করা"
      ],
      color: "rose"
    },
    {
      icon: Scale,
      title: "বুদ্ধিবৃত্তিক সম্পত্তি",
      content: [
        "সকল কন্টেন্ট, ডিজাইন এবং ফিচার গোলাঘরের সম্পত্তি",
        "আপনি শুধুমাত্র ব্যক্তিগত ব্যবহারের জন্য লাইসেন্স পাবেন",
        "বাণিজ্যিক ব্যবহারের জন্য আমাদের অনুমতি প্রয়োজন",
        "কন্টেন্ট কপি, সংশোধন বা বিতরণ নিষিদ্ধ",
        "গোলাঘর ট্রেডমার্ক এবং লোগো সুরক্ষিত"
      ],
      color: "blue"
    },
    {
      icon: Shield,
      title: "দায়বদ্ধতার সীমা",
      content: [
        "আবহাওয়া পূর্বাভাস শুধুমাত্র রেফারেন্সের জন্য",
        "আমরা পূর্বাভাসের ১০০% নির্ভুলতার গ্যারান্টি দিই না",
        "ফসল ক্ষতির জন্য আমরা দায়ী নই",
        "পরামর্শ অনুসরণের সিদ্ধান্ত আপনার নিজের",
        "সেবা বিঘ্নিত বা বন্ধ হতে পারে কোনো নোটিশ ছাড়া",
        "আমরা তৃতীয় পক্ষের লিংক বা সেবার জন্য দায়ী নই"
      ],
      color: "amber"
    }
  ];

  const terminationReasons = [
    "শর্তাবলী লঙ্ঘন",
    "মিথ্যা তথ্য প্রদান",
    "অবৈধ কার্যকলাপে জড়িত থাকা",
    "অন্য ব্যবহারকারীদের ক্ষতি করা",
    "দীর্ঘ সময় অ্যাকাউন্ট নিষ্ক্রিয় থাকা"
  ];

  const userResponsibilities = [
    "অ্যাকাউন্ট তথ্য আপডেট রাখা",
    "পাসওয়ার্ড গোপন রাখা এবং নিয়মিত পরিবর্তন করা",
    "সন্দেহজনক কার্যক্রম রিপোর্ট করা",
    "নিয়ম ও শর্তাবলী মেনে চলা",
    "অন্যদের সাথে সম্মানজনক আচরণ করা"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-amber-50/20 font-hind">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
              <FileText className="w-4 h-4 mr-2" />
              আইনি দলিল
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-tiro-bangla text-slate-900 mb-6">
              শর্তাবলী
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              সর্বশেষ আপডেট: ২৯ নভেম্বর, ২০২৫
            </p>
            <Alert className="mt-6 max-w-2xl mx-auto border-amber-200 bg-amber-50">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-slate-700 ml-2">
                গোলাঘর সেবা ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন। দয়া করে সম্পূর্ণ
                পড়ুন।
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </section>

      {/* Main Sections */}
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
                <Card className={`border-2 border-${section.color}-100 hover:border-${section.color}-300 transition-all duration-300 shadow-lg`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold font-tiro-bangla text-slate-900">
                      <div className={`w-12 h-12 bg-${section.color}-100 rounded-xl flex items-center justify-center`}>
                        <section.icon className={`w-6 h-6 text-${section.color}-600`} />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 text-${section.color}-600 flex-shrink-0 mt-0.5`} />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Payment & Refund */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold font-tiro-bangla text-slate-900">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Info className="w-6 h-6 text-green-600" />
                  </div>
                  পেমেন্ট এবং রিফান্ড
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">বর্তমান সেবা:</h4>
                  <p className="text-slate-700">
                    গোলাঘরের মূল সেবা বর্তমানে সম্পূর্ণ বিনামূল্যে। ভবিষ্যতে প্রিমিয়াম
                    ফিচার চালু হতে পারে।
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">প্রিমিয়াম সেবা (ভবিষ্যৎ):</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                    <li>সকল পেমেন্ট নিরাপদ পেমেন্ট গেটওয়ের মাধ্যমে</li>
                    <li>৭ দিনের মধ্যে রিফান্ড অনুরোধ করতে পারবেন</li>
                    <li>সেবা ব্যবহার করা হলে রিফান্ড প্রযোজ্য নয়</li>
                    <li>প্রযুক্তিগত সমস্যার জন্য সম্পূর্ণ রিফান্ড</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Termination */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold font-tiro-bangla text-slate-900">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                    <UserX className="w-6 h-6 text-rose-600" />
                  </div>
                  অ্যাকাউন্ট বন্ধ করা
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">
                  আমরা যেকোনো সময় নিম্নলিখিত কারণে আপনার অ্যাকাউন্ট স্থগিত বা বন্ধ করতে
                  পারি:
                </p>
                <ul className="space-y-2">
                  {terminationReasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{reason}</span>
                    </li>
                  ))}
                </ul>
                <Alert className="border-rose-200 bg-rose-50">
                  <AlertDescription className="text-slate-700">
                    আপনিও যেকোনো সময় আপনার অ্যাকাউন্ট মুছে ফেলতে পারেন। তবে মনে রাখবেন,
                    অ্যাকাউন্ট মুছে ফেললে সকল ডেটা স্থায়ীভাবে হারিয়ে যাবে।
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold font-tiro-bangla text-slate-900">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  ব্যবহারকারীর দায়িত্ব
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {userResponsibilities.map((responsibility, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-2 border-emerald-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  শর্তাবলীর পরিবর্তন
                </h3>
                <p className="text-slate-700 mb-4">
                  আমরা যেকোনো সময় এই শর্তাবলী সংশোধন করার অধিকার সংরক্ষণ করি।
                  উল্লেখযোগ্য পরিবর্তনের ক্ষেত্রে আমরা:
                </p>
                <ul className="space-y-2">
                  {[
                    "ইমেইল বা অ্যাপ নোটিফিকেশনের মাধ্যমে জানাব",
                    "এই পৃষ্ঠায় নতুন তারিখ সহ আপডেট পোস্ট করব",
                    "পরিবর্তন কার্যকর হওয়ার ৩০ দিন আগে নোটিশ দেব"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 mt-4 text-sm">
                  পরিবর্তনের পরও সেবা ব্যবহার চালিয়ে গেলে আপনি নতুন শর্তাবলী মেনে নিয়েছেন
                  বলে ধরা হবে।
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-2 border-emerald-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-emerald-600" />
                  প্রযোজ্য আইন
                </h3>
                <p className="text-slate-700">
                  এই শর্তাবলী বাংলাদেশের আইন দ্বারা নিয়ন্ত্রিত হবে। যেকোনো বিরোধের ক্ষেত্রে
                  ঢাকার আদালতের এখতিয়ার প্রযোজ্য হবে।
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact for Terms */}
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
                  শর্তাবলী সম্পর্কে প্রশ্ন?
                </h3>
                <p className="text-slate-700 mb-4">
                  এই শর্তাবলী সম্পর্কে কোনো প্রশ্ন বা স্পষ্টীকরণের জন্য যোগাযোগ করুন:
                </p>
                <div className="space-y-2">
                  <p className="text-slate-900 font-semibold">
                    ইমেইল: legal@golaghor.com
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
