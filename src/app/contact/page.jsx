"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Leaf,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "ফোন নম্বর",
      details: "+৮৮ ০১৭১২ ৩৪৫৬৭৮",
      subtext: "সকাল ৯টা - রাত ৯টা",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: Mail,
      title: "ইমেইল",
      details: "support@golaghor.com",
      subtext: "২৪ ঘন্টার মধ্যে উত্তর",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: MapPin,
      title: "ঠিকানা",
      details: "ঢাকা, বাংলাদেশ",
      subtext: "প্রধান কার্যালয়",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: Clock,
      title: "কর্মঘন্টা",
      details: "সকাল ৯টা - রাত ৯টা",
      subtext: "শুক্রবার বন্ধ",
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("দয়া করে সকল প্রয়োজনীয় তথ্য পূরণ করুন");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
              <MessageSquare className="w-4 h-4 mr-2" />
              আমরা সাহায্য করতে প্রস্তুত
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-tiro-bangla text-slate-900 mb-6">
              যোগাযোগ করুন
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              আপনার যেকোনো প্রশ্ন, পরামর্শ বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন। <br />
              আমরা সর্বদা আপনার সেবায় প্রস্তুত।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl group h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${info.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={`w-8 h-8 ${info.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-slate-900 font-semibold mb-1">
                      {info.details}
                    </p>
                    <p className="text-sm text-slate-600">{info.subtext}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-emerald-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-tiro-bangla text-slate-900">
                    বার্তা পাঠান
                  </CardTitle>
                  <p className="text-slate-600">
                    আপনার প্রশ্ন বা মন্তব্য আমাদের জানান
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          নাম *
                        </label>
                        <Input
                          placeholder="আপনার নাম লিখুন"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="border-2 border-slate-200 focus:border-emerald-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          ফোন নম্বর
                        </label>
                        <Input
                          placeholder="০১৭১২-৩৪৫৬৭৮"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="border-2 border-slate-200 focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        ইমেইল *
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-2 border-slate-200 focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        বিষয়
                      </label>
                      <Input
                        placeholder="বার্তার বিষয়"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="border-2 border-slate-200 focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        বার্তা *
                      </label>
                      <Textarea
                        placeholder="আপনার বার্তা এখানে লিখুন..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="border-2 border-slate-200 focus:border-emerald-400 resize-none"
                      />
                    </div>

                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {isSubmitting ? (
                        "পাঠানো হচ্ছে..."
                      ) : (
                        <>
                          বার্তা পাঠান
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Card */}
              <Card className="border-2 border-emerald-200 overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-emerald-100 to-amber-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        আমাদের অবস্থান
                      </h3>
                      <p className="text-slate-600">
                        ঢাকা, বাংলাদেশ
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="border-2 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-tiro-bangla text-slate-900">
                    সোশ্যাল মিডিয়ায় ফলো করুন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {[
                      { icon: Facebook, color: "hover:bg-blue-500", label: "Facebook" },
                      { icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                      { icon: Instagram, color: "hover:bg-pink-500", label: "Instagram" },
                      { icon: Linkedin, color: "hover:bg-blue-600", label: "LinkedIn" },
                    ].map((social, i) => (
                      <button
                        key={i}
                        className={`flex-1 h-14 rounded-xl border-2 border-emerald-200 bg-white flex items-center justify-center ${social.color} hover:text-white transition-all duration-300 hover:scale-105 hover:border-transparent group`}
                        aria-label={social.label}
                      >
                        <social.icon className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Support */}
              <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-tiro-bangla text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-amber-600" />
                    দ্রুত সহায়তা
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-slate-700">
                    জরুরি সহায়তার জন্য সরাসরি কল করুন:
                  </p>
                  <a
                    href="tel:+8801712345678"
                    className="block text-center text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    +৮৮ ০১৭১২ ৩৪৫৬৭৮
                  </a>
                  <p className="text-sm text-slate-600 text-center">
                    সকাল ৯টা - রাত ৯টা (শুক্রবার বন্ধ)
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Leaf className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold font-tiro-bangla text-slate-900 mb-4">
              প্রায়শই জিজ্ঞাসিত প্রশ্ন
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              আপনার প্রশ্নের উত্তর হয়তো ইতিমধ্যে আমাদের FAQ সেকশনে আছে
            </p>
            <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              FAQ দেখুন
            </Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}