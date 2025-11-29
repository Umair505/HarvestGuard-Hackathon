"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, AlertTriangle, CloudRain, Thermometer, Droplets, Wind, CheckCircle, XCircle, Phone, User, CloudLightning } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const SmartAlertSystem = () => {
  const { data: session, status } = useSession();
  const [batches, setBatches] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const [alertHistory, setAlertHistory] = useState([]);

  // ১. সেশন চেক এবং ব্যাচ ডাটা লোড করা
  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session?.user?.email) {
      fetchUserBatches(session.user.email);
    } else {
      setLoading(false);
    }
  }, [status, session]);

  // ২. ব্যাচ থাকলে ওয়েদার চেক এবং অ্যালার্ট জেনারেট (প্রতি ৩০ মিনিটে)
  useEffect(() => {
    if (batches.length > 0) {
      checkWeatherAndGenerateAlerts();
      const interval = setInterval(checkWeatherAndGenerateAlerts, 30 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [batches]);

  // --- ফাংশনসমূহ ---

  const fetchUserBatches = async (userEmail) => {
    try {
      setLoading(true);
      
      // ডাটাবেস থেকে সব ব্যাচ কল করা
      const response = await fetch('/api/batches');
      
      if (!response.ok) {
        throw new Error("Failed to fetch batches");
      }

      const allBatches = await response.json();
      
      // সেশনের ইমেইল অনুযায়ী ইউজারের ব্যাচ ফিল্টার করা
      // চেক করা হচ্ছে farmerInfo অবজেক্ট আছে কিনা এবং তার ইমেইল ম্যাচ করে কিনা
      const userBatches = allBatches.filter(batch => 
        batch.farmerInfo && batch.farmerInfo.email === userEmail
      );
      
      setBatches(userBatches);
      
      if (userBatches.length === 0) {
        toast.info("আপনার কোনো সক্রিয় ফসল ব্যাচ পাওয়া যায়নি।");
      }
    } catch (error) {
      console.error('Error fetching batches:', error);
      toast.error("ব্যাচ লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForDistrict = async (district) => {
    // এখানে আসল ওয়েদার API কল হবে (যেমন OpenWeatherMap)
    // আপাতত মক ডাটা রিটার্ন করছে
    return {
      temp: Math.floor(25 + Math.random() * 15), // 25-40°C
      humidity: Math.floor(60 + Math.random() * 40), // 60-100%
      wind: Math.floor(5 + Math.random() * 20),
      rainChance: Math.floor(Math.random() * 100)
    };
  };

  const generateSmartAlert = async (batch, weather) => {
    const riskFactors = [];
    
    // লজিক ইঞ্জিন (Logic Engine)
    if (weather.rainChance > 80 && batch.storageType && batch.storageType.includes("Open")) {
      return {
        priority: 'critical',
        title: '🚨 জরুরি সতর্কতা: বৃষ্টির পূর্বাভাস',
        message: `আগামীকাল ${batch.district} এলাকায় বৃষ্টির প্রবল সম্ভাবনা (${weather.rainChance}%)। আপনার খোলা ধানের স্তূপ এখনই পলিথিন দিয়ে ঢেকে দিন।`,
        actions: ['পলিথিন দিয়ে দ্রুত ঢেকে দিন', 'নিচু জায়গা থেকে ফসল সরিয়ে নিন']
      };
    }

    if (weather.temp > 35 && batch.cropType.includes("Potato")) {
      return {
        priority: 'critical',
        title: '🔥 হিট শকের সতর্কতা',
        message: `তাপমাত্রা ${weather.temp}°C এ পৌঁছেছে। আলুর গুদামে হিট শকের তীব্র ঝুঁকি। এখনই ফ্যান বা কুলিং সিস্টেম চালু করুন।`,
        actions: ['ফ্যান বা এসি চালু করুন', 'গুদামের ভেন্টিলেশন চেক করুন']
      };
    }

    if (weather.humidity > 85 && batch.storageType && batch.storageType.includes("Silo")) {
      return {
        priority: 'high',
        title: '💧 উচ্চ আর্দ্রতা সতর্কতা',
        message: `বাতাসে আর্দ্রতা ${weather.humidity}%। সাইলোর ভেতরে ফাঙ্গাস বা মোল্ড তৈরির ঝুঁকি আছে।`,
        actions: ['এরিয়েশন (Aeration) ফ্যান চালান', 'আর্দ্রতা মিটার চেক করুন']
      };
    }

    // ডিফল্ট সেফ কন্ডিশন
    return { priority: 'safe' };
  };

  const checkWeatherAndGenerateAlerts = async () => {
    const newAlerts = [];
    
    for (const batch of batches) {
      const weather = await fetchWeatherForDistrict(batch.district);
      setWeatherData(prev => ({ ...prev, [batch.district]: weather }));

      const alert = await generateSmartAlert(batch, weather);
      
      if (alert && alert.priority !== 'safe') {
        newAlerts.push({
          ...alert,
          batchId: batch._id || batch.id, // _id বা id হ্যান্ডেল করা
          batchCrop: batch.cropType,
          batchDistrict: batch.district,
          timestamp: new Date().toISOString()
        });

        if (alert.priority === 'critical') {
          simulateSMS(batch, alert);
        }
      }
    }
    setAlerts(newAlerts);
    if(newAlerts.length > 0) setAlertHistory(prev => [...newAlerts, ...prev].slice(0, 10));
  };

  const simulateSMS = (batch, alert) => {
    console.log(`%c[SMS SENT TO ${session?.user?.name || 'Farmer'}]: ${alert.message}`, "color: red; font-weight: bold; background: yellow; padding: 4px;");
    // টোস্ট দেখানো হচ্ছে না যাতে ইউজার বিরক্ত না হয়, শুধু কনসোলে লগ হবে রিকোয়ারমেন্ট অনুযায়ী
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-rose-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-amber-500';
      default: return 'bg-emerald-500';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <CloudRain className="w-5 h-5" />;
      case 'medium': return <Droplets className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const refreshAlerts = () => {
    toast.info("সতর্কতা আপডেট করা হচ্ছে...");
    checkWeatherAndGenerateAlerts();
  };

  // --- লোডিং স্টেট ---
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-tiro-bangla">ডাটা লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // --- আন-অথেন্টিকেটেড স্টেট ---
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 px-4">
        <Card className="max-w-md w-full text-center border-red-100 shadow-lg">
          <CardContent className="p-8">
            <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2 font-tiro-bangla">লগইন প্রয়োজন</h2>
            <p className="text-slate-500 mb-6">আপনার ব্যক্তিগত সতর্কতা দেখতে দয়া করে লগইন করুন।</p>
            <Link href="/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">লগইন করুন</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    // ফিক্সড প্যাডিং: pt-28 যাতে নেভবারের নিচে স্পেস থাকে
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* হেডার */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-100 border border-rose-200 text-rose-800 px-4 py-1.5 rounded-full text-sm font-bold mb-4 animate-pulse">
            <CloudLightning className="w-4 h-4" /> লাইভ মনিটরিং সক্রিয়
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-tiro-bangla text-slate-900 mb-2">
            স্মার্ট <span className="text-emerald-600">সতর্কতা</span> কেন্দ্র
          </h1>
          <p className="text-slate-500 font-hind">
            স্বাগতম, <span className="font-bold text-emerald-700">{session?.user?.name || 'কৃষক'}</span>! আপনার {batches.length}টি ব্যাচ মনিটর করা হচ্ছে।
          </p>
          
          <div className="mt-4">
            <Button 
              onClick={refreshAlerts}
              variant="outline"
              className="flex items-center gap-2 mx-auto"
            >
              <CloudRain className="w-4 h-4" />
              সতর্কতা আপডেট করুন
            </Button>
          </div>
        </div>

        {/* --- অ্যালার্ট সেকশন --- */}
        {alerts.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-tiro-bangla text-slate-700 flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-500" /> জরুরি নোটিফিকেশন ({alerts.length})
            </h3>
            {alerts.map((alert, idx) => (
              <Alert key={idx} className={`border-l-4 shadow-sm ${alert.priority === 'critical' ? 'border-l-rose-500 bg-rose-50' : 'border-l-amber-500 bg-amber-50'}`}>
                <div className="flex gap-4">
                  <div className={`p-2 rounded-full h-fit ${alert.priority === 'critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                    {getPriorityIcon(alert.priority)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-lg font-bold font-tiro-bangla mb-1 ${alert.priority === 'critical' ? 'text-rose-800' : 'text-amber-800'}`}>
                        {alert.title}
                      </h4>
                      <Badge variant="outline" className="bg-white/50">{alert.batchDistrict}</Badge>
                    </div>
                    
                    <p className="text-slate-700 mb-3 leading-relaxed">{alert.message}</p>
                    
                    {/* অ্যাকশন লিস্ট */}
                    {alert.actions && (
                      <div className="bg-white/60 p-3 rounded-lg border border-black/5">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">করণীয় পদক্ষেপ:</p>
                        <ul className="space-y-1">
                          {alert.actions.map((action, i) => (
                            <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-emerald-600" /> {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {alert.priority === 'critical' && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-rose-600 font-bold bg-white/50 px-2 py-1 rounded w-fit">
                        <Phone className="w-3 h-3" /> SMS পাঠানো হয়েছে
                      </div>
                    )}
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        ) : (
          // কোনো অ্যালার্ট না থাকলে
          <Card className="border-emerald-100 bg-emerald-50/50 shadow-sm text-center py-10">
            <CardContent>
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 font-tiro-bangla">সবকিছু স্বাভাবিক আছে</h3>
              <p className="text-emerald-600 mt-2">বর্তমানে আপনার কোনো ফসলে ঝুঁকির পূর্বাভাস নেই।</p>
            </CardContent>
          </Card>
        )}

        {/* --- ব্যাচ লিস্ট (Reference) --- */}
        <div className="mt-12">
          <h3 className="text-lg font-bold text-slate-600 mb-4 border-b pb-2">মনিটর করা হচ্ছে এমন ব্যাচসমূহ</h3>
          {batches.length === 0 ? (
             <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
               <p>কোনো ব্যাচ পাওয়া যায়নি। ড্যাশবোর্ডে গিয়ে নতুন ব্যাচ যুক্ত করুন।</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {batches.map(batch => (
                <Card key={batch._id || batch.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-slate-100 p-3 rounded-lg">
                      {batch.cropType && batch.cropType.includes("Paddy") ? <span className="text-2xl">🌾</span> : <span className="text-2xl">🥔</span>}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{batch.cropType}</p>
                      <div className="flex gap-2 text-xs text-slate-500 mt-1">
                        <Badge variant="secondary">{batch.district}</Badge>
                        <Badge variant="outline">{batch.storageType}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SmartAlertSystem;