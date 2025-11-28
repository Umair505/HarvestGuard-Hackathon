"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind, 
  Droplets, 
  MapPin, 
  Search, 
  AlertTriangle,
  Umbrella,
  Sprout
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// --- কনফিগারেশন এবং হেল্পার ফাংশন ---

const API_KEY = "ca3716f88459d35e5e7e386fd97daf55"; // আপনার দেওয়া API Key

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর
const toBanglaDigit = (str) => {
  const banglaDigits = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
  return String(str).replace(/[0-9]/g, (w) => banglaDigits[w]);
};

// ইংরেজি দিনকে বাংলায় রূপান্তর
const getBanglaDay = (dateStr) => {
  const date = new Date(dateStr);
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  return days[date.getDay()];
};

// আবহাওয়া অনুযায়ী পরামর্শ জেনারেটর
const getAdvisory = (temp, rainChance, humidity) => {
  if (rainChance > 70) return { text: "আগামী ২৪ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা। কাটা ধান দ্রুত নিরাপদ স্থানে সরিয়ে নিন বা পলিথিন দিয়ে ঢেকে রাখুন।", color: "bg-blue-100 text-blue-800", icon: <Umbrella className="w-5 h-5"/> };
  if (temp > 35) return { text: "অতিরিক্ত তাপমাত্রা (হিট শক) হতে পারে। ফসলে পর্যাপ্ত সেচ দিন এবং দুপুরের রোদ এড়িয়ে চলুন।", color: "bg-amber-100 text-amber-800", icon: <Sun className="w-5 h-5"/> };
  if (humidity > 85) return { text: "বাতাসে অত্যাধিক আর্দ্রতা। ধানে ব্লাস্ট রোগ বা ফাঙ্গাস আক্রমণের ঝুঁকি আছে। সতর্ক থাকুন।", color: "bg-purple-100 text-purple-800", icon: <AlertTriangle className="w-5 h-5"/> };
  return { text: "আবহাওয়া অনুকূল আছে। নিয়মিত পরিচর্যা চালিয়ে যান।", color: "bg-emerald-100 text-emerald-800", icon: <Sprout className="w-5 h-5"/> };
};

export default function WeatherPage() {
  const [location, setLocation] = useState("Gazipur"); 
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
    
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location},BD&units=metric&appid=${API_KEY}`);
      const data = await res.json();

      if (data.cod !== "200") {
        throw new Error("লোকেশন খুঁজে পাওয়া যায়নি। সঠিক উপজেলার নাম দিন।");
      }

      // ২. বর্তমান ডেটা সেট করা (প্রথম এন্ট্রি)
      setWeather(data.list[0]);

      // ৩. ৫ দিনের ডেটা প্রসেস করা (প্রতিদিন দুপুর ১২টার ডেটা নেওয়া)
      const dailyData = data.list.filter((item) => item.dt_txt.includes("12:00:00"));
      setForecast(dailyData);

    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // পেজ লোড হলে একবার কল হবে
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 flex justify-center">
      <div className="max-w-4xl mt-12 w-full space-y-8">

        {/* --- হেডার সেকশন --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-1 rounded-full text-emerald-800 font-semibold text-sm">
            <CloudRain className="w-4 h-4" /> স্মার্ট এগ্রো ওয়েদার
          </div>
          <h1 className="text-3xl md:text-5xl mt-5 font-bold font-tiro-bangla text-slate-900">
            আবহাওয়ার <span className="text-emerald-600">পূর্বাভাস</span> ও পরামর্শ
          </h1>
          <p className="text-slate-500">আপনার উপজেলার নাম লিখুন এবং লাইভ আপডেট পান</p>
        </motion.div>

        {/* --- সার্চ বার --- */}
        <div className="relative max-w-lg mx-auto">
          <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-lg border border-slate-100">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input 
                placeholder="উপজেলা বা জেলার নাম (ইংরেজিতে)..." 
                className="pl-10 border-0 shadow-none focus-visible:ring-0 text-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
              />
            </div>
            <Button 
              onClick={fetchWeather}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6"
              disabled={loading}
            >
              {loading ? "খোঁজা হচ্ছে..." : <Search className="w-5 h-5" />}
            </Button>
          </div>
          {error && <p className="text-red-500 text-center mt-2 text-sm bg-red-50 p-2 rounded-lg">{error}</p>}
        </div>

        {/* --- মেইন ওয়েদার ডিসপ্লে --- */}
        <AnimatePresence mode="wait">
          {weather && (
            <motion.div 
              key="weather-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              
              {/* ১. বর্তমান অবস্থা কার্ড (গ্লাস ইফেক্ট) */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-2xl p-6 md:p-10">
                {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-semibold opacity-90">{getBanglaDay(new Date())}, আজ</h2>
                    <div className="text-7xl font-bold font-sans mt-2 tracking-tighter">
                      {toBanglaDigit(Math.round(weather.main.temp))}°
                    </div>
                    <p className="text-xl capitalize mt-1 opacity-90 font-tiro-bangla">
                      {weather.weather[0].main === 'Rain' ? 'বৃষ্টিপাত' : 
                       weather.weather[0].main === 'Clouds' ? 'মেঘলা আকাশ' : 
                       weather.weather[0].main === 'Clear' ? 'রৌদ্রোজ্জ্বল' : 'কুয়াশাচ্ছন্ন'}
                    </p>
                  </div>

                  {/* বড় আইকন */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-32 h-32 md:w-40 md:h-40"
                  >
                    {/* ওয়েদার কন্ডিশন অনুযায়ী আইকন রেন্ডারিং */}
                    {weather.weather[0].main === 'Rain' ? <CloudRain className="w-full h-full text-blue-200" /> :
                     weather.weather[0].main === 'Clouds' ? <Cloud className="w-full h-full text-slate-200" /> :
                     <Sun className="w-full h-full text-yellow-300" />}
                  </motion.div>

                  {/* ডিটেইলস গ্রিড */}
                  <div className="grid grid-cols-2 gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <Wind className="w-6 h-6 opacity-70" />
                      <div>
                        <p className="text-xs opacity-70">বাতাস</p>
                        <p className="font-bold">{toBanglaDigit(weather.wind.speed)} কিমি/ঘঃ</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Droplets className="w-6 h-6 opacity-70" />
                      <div>
                        <p className="text-xs opacity-70">আর্দ্রতা</p>
                        <p className="font-bold">{toBanglaDigit(weather.main.humidity)}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CloudRain className="w-6 h-6 opacity-70" />
                      <div>
                        <p className="text-xs opacity-70">বৃষ্টির সম্ভাবনা</p>
                        <p className="font-bold">{toBanglaDigit(Math.round(weather.pop * 100))}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ২. স্মার্ট পরামর্শ (Advisory Banner) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {(() => {
                  const advice = getAdvisory(weather.main.temp, weather.pop * 100, weather.main.humidity);
                  return (
                    <div className={`p-4 rounded-2xl border-l-8 shadow-sm flex items-start gap-4 ${advice.color} border-l-current`}>
                      <div className="p-2 bg-white/50 rounded-full shrink-0 animate-pulse">
                        {advice.icon}
                      </div>
                      <div>
                        <h3 className="font-bold font-tiro-bangla text-lg">কৃষি পরামর্শ</h3>
                        <p className="text-sm md:text-base font-medium opacity-90 mt-1 leading-relaxed">
                          {advice.text}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>

              {/* ৩. আগামী ৫ দিনের পূর্বাভাস */}
              <div>
                <h3 className="text-xl font-bold font-tiro-bangla text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                  আগামী ৫ দিনের পূর্বাভাস
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {forecast.map((day, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      whileHover={{ y: -5 }}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-all"
                    >
                      <p className="text-sm font-semibold text-slate-500">{getBanglaDay(day.dt_txt)}</p>
                      
                      <div className="my-2">
                        {day.weather[0].main === 'Rain' ? <CloudRain className="w-8 h-8 text-blue-500" /> :
                         day.weather[0].main === 'Clouds' ? <Cloud className="w-8 h-8 text-slate-400" /> :
                         <Sun className="w-8 h-8 text-amber-500" />}
                      </div>

                      <div className="font-bold text-xl text-slate-800">
                        {toBanglaDigit(Math.round(day.main.temp))}°
                      </div>
                      
                      <div className="w-full h-[1px] bg-slate-100 my-1"></div>
                      
                      <div className="flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                        <Droplets className="w-3 h-3" />
                        {toBanglaDigit(Math.round(day.pop * 100))}% বৃষ্টি
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}