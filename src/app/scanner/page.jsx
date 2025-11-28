"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  Camera, 
  Upload, 
  Loader2, 
  CheckCircle, 
  AlertOctagon, 
  RefreshCcw,
  ScanLine,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CropScanner() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // ১. ছবি সিলেক্ট করা বা ক্যামেরা ওপেন করা
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ফাইল সাইজ চেক (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("ছবির সাইজ 5MB এর কম হতে হবে");
        return;
      }

      setImageFile(file);
      // প্রিভিউ তৈরি
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      // আগের রেজাল্ট রিসেট
      setResult(null);
      setError("");
    }
  };

  // ২. API তে ছবি পাঠানো
 const analyzeCrop = async () => {
  if (!imageFile) return;

  setLoading(true);
  setError("");

  try {
    // ফর্ম ডাটা তৈরি
    const formData = new FormData();
    formData.append('image', imageFile);

    console.log("Sending request to API...");

    const response = await fetch("/api/scan", {
      method: "POST",
      body: formData,
    });

    console.log("Response status:", response.status);

    const data = await response.json();

    if (!response.ok) {
      // সার্ভার থেকে error মেসেজ থাকলে সেটা দেখাবে
      throw new Error(data.error || data.details || `HTTP error! status: ${response.status}`);
    }

    // রেজাল্ট ভ্যালিডেশন
    if (!data || typeof data !== 'object') {
      throw new Error("অবৈধ রেসপন্স ফরম্যাট");
    }

    // ডিফল্ট ভ্যালু সেট করা
    const finalResult = {
      label: data.label || "Unknown",
      score: data.score || 0.5,
      description: data.description || "বিশ্লেষণ সম্পন্ন"
    };

    setResult(finalResult);

  } catch (err) {
    console.error("Scan Error Details:", err);
    
    // ইউজার ফ্রেন্ডলি error মেসেজ
    let userMessage = err.message;
    
    if (err.message.includes("Failed to fetch")) {
      userMessage = "সার্ভারে কানেক্ট হতে সমস্যা হচ্ছে। ইন্টারনেট চেক করুন।";
    } else if (err.message.includes("500")) {
      userMessage = "সার্ভার সমস্যা। কিছুক্ষণ পর আবার চেষ্টা করুন।";
    } else if (err.message.includes("401")) {
      userMessage = "API Key সমস্যা। সিস্টেম অ্যাডমিনকে জানান।";
    } else if (err.message.includes("429")) {
      userMessage = "API limit শেষ। কাল আবার চেষ্টা করুন।";
    }
    
    setError(userMessage);
  } finally {
    setLoading(false);
  }
};

  // রিসেট ফাংশন
  const resetScanner = () => {
    setImagePreview(null);
    setImageFile(null);
    setResult(null);
    setError("");
    // ফাইল ইনপুট রিসেট
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // রেজাল্ট প্রসেসিং (Fresh নাকি Rotten?)
  const isFresh = result?.label?.toLowerCase().includes("fresh");
  const confidence = result ? (result.score * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 mt-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        
        {/* হেডার */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
            <ScanLine className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold font-tiro-bangla text-slate-900">
            শস্য স্ক্যানার (AI)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            ফসলের ছবি তুলে বা আপলোড করে জানুন এটি ভালো নাকি পচা
          </p>
        </div>

        <Card className="shadow-xl border-0 overflow-hidden">
          <CardContent className="p-6">
            
            {/* --- ইমেজ আপলোড এরিয়া --- */}
            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-200 rounded-2xl h-64 flex flex-col items-center justify-center bg-emerald-50/50 cursor-pointer hover:bg-emerald-50 transition-colors group relative overflow-hidden"
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageUpload}
                />
                
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform delay-75">
                    <ImageIcon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>

                <p className="text-slate-900 font-semibold">ছবি তুলুন বা আপলোড করুন</p>
                <p className="text-xs text-slate-500 mt-2">গ্যালারি থেকে সিলেক্ট করুন</p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden h-64 bg-black border border-slate-200">
                {/* প্রিভিউ ইমেজ */}
                <Image 
                  src={imagePreview} 
                  alt="Crop Preview" 
                  fill
                  className="object-cover opacity-90"
                />
                
                {/* স্ক্যানিং এনিমেশন লাইন */}
                {loading && (
                  <div className="absolute inset-0 z-10">
                     <div className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-[scan_2s_infinite_linear]"></div>
                     <div className="absolute bottom-4 w-full text-center text-white font-semibold text-sm animate-pulse">
                       বিশ্লেষণ চলছে...
                     </div>
                  </div>
                )}

                {/* রিসেট বাটন (যদি লোডিং না হয়) */}
                {!loading && !result && (
                  <button 
                    onClick={resetScanner}
                    className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 backdrop-blur-sm transition-colors"
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* --- অ্যাকশন বাটন --- */}
            <div className="mt-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 border border-red-100 animate-in fade-in slide-in-from-top-2">
                  <AlertOctagon className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              {!imagePreview ? (
                <Button className="w-full bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" disabled variant="ghost">
                   প্রথমে একটি ছবি দিন
                </Button>
              ) : loading ? (
                <Button className="w-full bg-emerald-600" disabled>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> অপেক্ষা করুন...
                </Button>
              ) : result ? (
                // --- রেজাল্ট কার্ড ---
                <div className={`p-4 rounded-xl border ${isFresh ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"} animate-in fade-in slide-in-from-bottom-4 shadow-sm`}>
                  <div className="flex items-start gap-4">
                    {isFresh ? (
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                      </div>
                    ) : (
                      <div className="bg-rose-100 p-2 rounded-full">
                        <AlertOctagon className="w-6 h-6 text-rose-600 shrink-0" />
                      </div>
                    )}
                    <div className="w-full">
                      <h3 className={`text-lg font-bold ${isFresh ? "text-emerald-800" : "text-rose-800"} font-tiro-bangla`}>
                        {isFresh ? "ফসলটি ভালো আছে (Fresh)" : "পচে যাওয়ার ঝুঁকি (Rotten)"}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 flex justify-between">
                        <span>AI শনাক্তকরণ:</span>
                        <span className="font-mono font-bold bg-white px-2 rounded border">{result.label}</span>
                      </p>
                      
                      {/* বর্ণনা */}
                      {result.description && (
                        <p className="text-sm text-slate-600 mt-2">
                          {result.description}
                        </p>
                      )}
                      
                      {/* কনফিডেন্স বার */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1 text-slate-500">
                          <span>নির্ভুলতার হার</span>
                          <span className="font-bold">{confidence}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${isFresh ? "bg-emerald-500" : "bg-rose-500"}`} 
                            style={{ width: `${confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={resetScanner} variant="outline" className="w-full mt-4 bg-white hover:bg-slate-50 border-slate-200 text-slate-700">
                    <RefreshCcw className="w-4 h-4 mr-2" /> নতুন ছবি স্ক্যান করুন
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={analyzeCrop} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6 shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1"
                >
                  <ScanLine className="w-5 h-5 mr-2" /> ফলাফল দেখুন
                </Button>
              )}
            </div>

          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-400 mt-8">
          Powered by HarvestGuard AI • v1.0
        </p>
      </div>

      {/* স্ক্যানিং এনিমেশনের স্টাইল */}
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(250px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}