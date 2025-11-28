"use client";

import React, { useState } from "react";
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  Clock, 
  ShieldCheck,
  MapPin,
  Warehouse,
  Calendar,
  Wind,
  Sun,
  Cloud,
  Loader2,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

export default function RiskDashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  
  // ফর্ম স্টেট
  const [district, setDistrict] = useState("");
  const [storage, setStorage] = useState("");
  const [cropType, setCropType] = useState("");

  const fileInputRef = React.useRef(null);

  // ইমেজ আপলোড হ্যান্ডলার
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ফাইল সাইজ চেক (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("ছবির সাইজ 5MB এর কম হতে হবে");
      return;
    }

    setCropImage(file);
    
    // প্রিভিউ তৈরি
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!district || !storage || !cropType) return;
    
    setLoading(true);
    setData(null);
    
    try {
      const formData = new FormData();
      formData.append('district', district);
      formData.append('cropType', cropType);
      formData.append('storageType', storage);
      
      if (cropImage) {
        formData.append('cropImage', cropImage);
      }

      const res = await fetch("/api/risk-forecast", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setData(result);
    } catch (error) {
      console.error("Analysis error:", error);
      alert(error.message || "বিশ্লেষণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getWeatherIcon = (condition, rainChance) => {
    if (rainChance > 60) return <CloudRain className="w-6 h-6 text-blue-500" />;
    if (condition?.includes("মেঘলা") || condition?.includes("cloud")) return <Cloud className="w-6 h-6 text-gray-500" />;
    if (condition?.includes("রৌদ্র") || condition?.includes("sun")) return <Sun className="w-6 h-6 text-yellow-500" />;
    return <Wind className="w-6 h-6 text-gray-400" />;
  };

  const calculateRiskFactors = (data) => {
    if (!data) return [];
    
    const factors = [];
    const avgHumidity = data.forecast.reduce((sum, day) => sum + day.humidity, 0) / data.forecast.length;
    const avgTemp = data.forecast.reduce((sum, day) => sum + day.temp, 0) / data.forecast.length;
    const rainDays = data.forecast.filter(day => day.rain_chance > 50).length;

    factors.push({
      factor: "গড় আদ্রতা",
      level: avgHumidity > 80 ? "High" : avgHumidity > 70 ? "Medium" : "Low",
      value: `${avgHumidity.toFixed(1)}%`,
      impact: Math.min(100, avgHumidity)
    });

    factors.push({
      factor: "গড় তাপমাত্রা",
      level: avgTemp > 32 ? "High" : avgTemp > 28 ? "Medium" : "Low",
      value: `${avgTemp.toFixed(1)}°C`,
      impact: Math.min(100, (avgTemp - 20) * 5)
    });

    factors.push({
      factor: "বৃষ্টির দিন",
      level: rainDays > 3 ? "High" : rainDays > 1 ? "Medium" : "Low",
      value: `${rainDays} দিন`,
      impact: rainDays * 20
    });

    factors.push({
      factor: "স্টোরেজ ধরন",
      level: storage.includes("খোলা") ? "High" : storage.includes("পাট") ? "Medium" : "Low",
      value: storage.split("(")[0],
      impact: storage.includes("খোলা") ? 80 : storage.includes("পাট") ? 50 : 30
    });

    return factors;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br my-12 from-blue-50 to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* হেডার */}
        <div className="text-center">
          
          <h1 className="text-4xl font-bold font-tiro-bangla text-gray-900 mb-3">
            ফসল রিস্ক প্রেডিকশন সিস্টেম
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            AI-পাওয়ারড বিশ্লেষণ এবং রিয়েল-টাইম আবহাওয়া ডাটা দিয়ে আপনার ফসলের ঝুঁকি নিরূপণ করুন
          </p>
        </div>

        {/* ইনপুট সেকশন */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="font-tiro-bangla text-2xl text-green-800 flex items-center gap-3">
              <BarChart3 className="w-7 h-7" />
              ফসলের তথ্য প্রদান করুন
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* জেলা সিলেক্ট */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 
                  জেলা নির্বাচন
                </label>
                <Select onValueChange={setDistrict}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="আপনার জেলা..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ঢাকা">ঢাকা</SelectItem>
                    <SelectItem value="চট্টগ্রাম">চট্টগ্রাম</SelectItem>
                    <SelectItem value="রাজশাহী">রাজশাহী</SelectItem>
                    <SelectItem value="খুলনা">খুলনা</SelectItem>
                    <SelectItem value="সিলেট">সিলেট</SelectItem>
                    <SelectItem value="বরিশাল">বরিশাল</SelectItem>
                    <SelectItem value="রংপুর">রংপুর</SelectItem>
                    <SelectItem value="ময়মনসিংহ">ময়মনসিংহ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ফসলের ধরন */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">
                  ফসলের ধরন
                </label>
                <Select onValueChange={setCropType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="ফসল নির্বাচন..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ধান">ধান (Paddy)</SelectItem>
                    <SelectItem value="গম">গম (Wheat)</SelectItem>
                    <SelectItem value="ভুট্টা">ভুট্টা (Corn)</SelectItem>
                    <SelectItem value="ডাল">ডাল (Lentils)</SelectItem>
                    <SelectItem value="আলু">আলু (Potato)</SelectItem>
                    <SelectItem value="পেঁয়াজ">পেঁয়াজ (Onion)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* স্টোরেজ টাইপ */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Warehouse className="w-4 h-4" />
                  সংরক্ষণ পদ্ধতি
                </label>
                <Select onValueChange={setStorage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="কিভাবে রাখবেন?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="খোলা স্তূপ (Open Pile)">খোলা স্তূপ</SelectItem>
                    <SelectItem value="পাটের বস্তা (Jute Bags)">পাটের বস্তা</SelectItem>
                    <SelectItem value="প্লাস্টিক ড্রাম (Plastic Drum)">প্লাস্টিক ড্রাম</SelectItem>
                    <SelectItem value="সাইলো (Silo)">সাইলো</SelectItem>
                    <SelectItem value="কোল্ড স্টোরেজ (Cold Storage)">কোল্ড স্টোরেজ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ছবি আপলোড */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  ফসলের ছবি (ঐচ্ছিক)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>

            </div>

            {/* ছবি প্রিভিউ */}
            {imagePreview && (
              <div className="mt-4 p-4 border-2 border-dashed border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center gap-4">
                  <Image
                    src={imagePreview}
                    alt="Crop preview"
                    width={80}
                    height={80}
                    className="object-cover rounded-lg"

                    />
                  <div>
                    <p className="font-semibold text-green-800">ছবি আপলোড হয়েছে</p>
                    <p className="text-sm text-green-600">AI বিশ্লেষণের জন্য প্রস্তুত</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setImagePreview(null);
                      setCropImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="ml-auto"
                  >
                    পরিবর্তন করুন
                  </Button>
                </div>
              </div>
            )}

            {/* অ্যানালাইসিস বাটন */}
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !district || !storage || !cropType}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    AI বিশ্লেষণ চলছে...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    ঝুঁকি বিশ্লেষণ করুন
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* রেজাল্ট সেকশন */}
        {data && (
          <div className="space-y-6 animate-in fade-in duration-1000">
            
            {/* মেইন রিস্ক কার্ড */}
            <Card className={`border-0 shadow-2xl ${
              data.risk_analysis.level === "High" ? "bg-gradient-to-r from-red-50 to-orange-50 border-l-8 border-l-red-500" : 
              data.risk_analysis.level === "Medium" ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-8 border-l-yellow-500" : 
              "bg-gradient-to-r from-green-50 to-emerald-50 border-l-8 border-l-green-500"
            }`}>
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      {data.risk_analysis.level === "High" ? 
                        <AlertTriangle className="w-12 h-12 text-red-500" /> :
                        <ShieldCheck className="w-12 h-12 text-green-500" />
                      }
                      <div>
                        <Badge className={`${getRiskColor(data.risk_analysis.level)} text-lg px-4 py-2 font-bold`}>
                          {data.risk_analysis.level === "High" ? "🚨 উচ্চ ঝুঁকি" : 
                           data.risk_analysis.level === "Medium" ? "⚠️ মধ্যম ঝুঁকি" : 
                           "🛡️ নিম্ন ঝুঁকি"}
                        </Badge>
                        <p className="text-gray-600 mt-2">{data.district} - {data.crop_type}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-800 text-lg leading-relaxed font-medium mb-4">
                      {data.risk_analysis.summary_bn}
                    </p>

                    {/* ইমেজ অ্যানালাইসিস */}
                    {data.image_analysis && data.image_analysis !== "কোনো ছবি প্রদান করা হয়নি" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-blue-800 mb-2">ছবি বিশ্লেষণ:</h4>
                        <p className="text-blue-700">{data.image_analysis}</p>
                      </div>
                    )}

                    {/* রিস্ক ফ্যাক্টরস */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      {calculateRiskFactors(data).map((factor, index) => (
                        <div key={index} className="bg-white/80 p-3 rounded-lg border shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-semibold text-gray-700">{factor.factor}</span>
                            <Badge className={getRiskColor(factor.level)}>
                              {factor.level}
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{factor.value}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className={`h-2 rounded-full ${
                                factor.level === "High" ? "bg-red-500" :
                                factor.level === "Medium" ? "bg-yellow-500" :
                                "bg-green-500"
                              }`}
                              style={{ width: `${factor.impact}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* ETCL বক্স */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border text-center min-w-[200px]">
                    <div className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5" /> 
                      <span>সমালোচনামূলক ক্ষতি পর্যন্ত সময়</span>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {data.risk_analysis.etcl_hours}
                    </div>
                    <div className="text-lg text-gray-600">ঘণ্টা</div>
                    <div className={`text-sm font-semibold mt-3 ${
                      data.risk_analysis.etcl_hours < 72 ? "text-red-600" : 
                      data.risk_analysis.etcl_hours < 120 ? "text-yellow-600" : 
                      "text-green-600"
                    }`}>
                      {data.risk_analysis.etcl_hours < 72 ? "জরুরি পদক্ষেপ প্রয়োজন" : 
                       data.risk_analysis.etcl_hours < 120 ? "সতর্কতা অবলম্বন করুন" : 
                       "পর্যবেক্ষণ চালিয়ে যান"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* আবহাওয়ার পূর্বাভাস */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                <CardTitle className="font-tiro-bangla text-xl text-blue-800 flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  ৭-দিনের আবহাওয়ার পূর্বাভাস - {data.district}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {data.forecast.map((day, idx) => (
                    <div key={idx} className="text-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <p className="font-semibold text-gray-900 mb-3 text-sm">{day.day}</p>
                      <div className="my-3 flex justify-center">
                        {getWeatherIcon(day.condition, day.rain_chance)}
                      </div>
                      <div className="text-xl font-bold text-gray-900 mb-1">{day.temp}°C</div>
                      <div className="text-sm text-gray-600 flex items-center justify-center gap-1 mb-2">
                        <Droplets className="w-4 h-4" /> {day.humidity}%
                      </div>
                      {day.rain_chance > 30 && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                          {day.rain_chance}% বৃষ্টি
                        </Badge>
                      )}
                      <p className="text-xs text-gray-500 mt-2">{day.condition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI সুপারিশ */}
            {data.risk_analysis.recommendations && (
              <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-pink-50">
                <CardHeader className="border-b border-purple-200">
                  <CardTitle className="font-tiro-bangla text-xl text-purple-800 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6" />
                    AI সুপারিশসমূহ
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.risk_analysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-white/80 rounded-lg border border-purple-200 hover:shadow-md transition-all">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-purple-600 font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

       
      </div>
    </div>
  );
}