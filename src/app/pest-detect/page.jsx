"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  Camera, 
  Upload, 
  ScanSearch, 
  Bug, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope,
  Leaf,
  Loader2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PestDetect() {
  const { data: session, status } = useSession(); // অথেন্টিকেশন চেক
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  // ছবি হ্যান্ডলার
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setResult(null); // আগের রেজাল্ট ক্লিয়ার
    }
  };

  // AI কল করা
  const identifyPest = async () => {
    if (!imageFile) return;
    setLoading(true);

    try {
      const response = await fetch("/api/pest-identify", {
        method: "POST",
        body: imageFile,
      });
      const resData = await response.json();
      
      if (resData.success) {
        setResult(resData.data);
      } else {
        alert(resData.error);
      }
    } catch (error) {
      console.error(error);
      alert("সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    if (level === "High") return "bg-red-100 text-red-700 border-red-200";
    if (level === "Medium") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  };

  // ১. লোডিং স্টেট (সেশন চেক করার সময়)
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-tiro-bangla">যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // ২. আন-অথেন্টিকেটেড স্টেট (লগইন করা না থাকলে)
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center pt-24 px-4">
        <Card className="max-w-md w-full text-center border-red-100 shadow-xl">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3 font-tiro-bangla">লগইন প্রয়োজন</h2>
            <p className="text-slate-500 mb-8 leading-relaxed font-sans">
              ফসলের ডাক্তার ফিচারটি ব্যবহার করে রোগ নির্ণয় করতে দয়া করে আপনার অ্যাকাউন্টে প্রবেশ করুন।
            </p>
            <Link href="/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full py-6 text-lg font-bold shadow-lg shadow-emerald-100">
                লগইন করুন
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ৩. অথেন্টিকেটেড স্টেট (মূল অ্যাপ)
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* হেডার */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-2 border-4 border-white shadow-sm">
            <Stethoscope className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-tiro-bangla text-slate-900">
            ফসলের ডাক্তার (AI)
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            স্বাগতম, <span className="font-bold text-emerald-700">{session?.user?.name}</span>! আক্রান্ত পাতা বা পোকার ছবি আপলোড করে সমাধান নিন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* --- বাম পাশ: আপলোড সেকশন --- */}
          <Card className="border-2 border-dashed border-emerald-200 shadow-sm bg-white/50 backdrop-blur">
            <CardContent className="p-6">
              
              {!imagePreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-80 flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-emerald-50/50 hover:border-emerald-100 transition-all group"
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-10 h-10 text-emerald-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-700">ছবি তুলুন বা আপলোড করুন</p>
                  <p className="text-sm text-slate-400 mt-1">পরিষ্কার আলোতে ছবি তুলুন</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative h-80 w-full rounded-xl overflow-hidden border border-slate-200 bg-black">
                    <Image 
                      src={imagePreview} 
                      alt="Uploaded Pest" 
                      fill 
                      className="object-contain"
                    />
                    {/* স্ক্যানিং এনিমেশন */}
                    {loading && (
                      <div className="absolute inset-0 z-10 bg-black/20">
                        <div className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] animate-[scan_2s_infinite_linear]"></div>
                        <div className="absolute bottom-4 left-0 w-full text-center text-white font-bold animate-pulse">
                          AI রোগ নির্ণয় করছে...
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!loading && !result && (
                    <Button onClick={identifyPest} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg shadow-lg shadow-emerald-200">
                      <ScanSearch className="w-5 h-5 mr-2" /> রোগ নির্ণয় করুন
                    </Button>
                  )}
                  
                  {!loading && (
                    <Button 
                      variant="outline" 
                      onClick={() => { setImagePreview(null); setResult(null); }}
                      className="w-full"
                    >
                      অন্য ছবি দিন
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* --- ডান পাশ: ফলাফল (Action Plan) --- */}
          <div>
            {!result ? (
              // যখন কোনো রেজাল্ট নেই (Placeholder)
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm opacity-60 min-h-[300px]">
                <Leaf className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-400 font-tiro-bangla">ফলাফল এখানে আসবে</h3>
                <p className="text-sm text-slate-400 mt-2">
                  ছবি আপলোড করার পর AI বিশ্লেষণ করে এখানে বিস্তারিত রিপোর্ট দিবে।
                </p>
              </div>
            ) : (
              // রেজাল্ট কার্ড (Prescription Style)
              <Card className="border-0 shadow-xl overflow-hidden animate-in slide-in-from-right-5 duration-700">
                <CardHeader className="bg-emerald-600 text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 mb-2">
                        শনাক্তকরণ সফল
                      </Badge>
                      <CardTitle className="text-2xl font-bold font-tiro-bangla">
                        {result.pest_name}
                      </CardTitle>
                    </div>
                    <div className="bg-white p-2 rounded-lg">
                      <Bug className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  
                  {/* ঝুঁকির মাত্রা */}
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${getRiskColor(result.risk_level)}`}>
                    <AlertTriangle className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">ঝুঁকির মাত্রা</p>
                      <p className="font-bold text-lg">{result.risk_level === "High" ? "উচ্চ ঝুঁকি (High)" : result.risk_level === "Medium" ? "মাঝারি ঝুঁকি (Medium)" : "কম ঝুঁকি (Low)"}</p>
                    </div>
                  </div>

                  {/* সমস্যার বিবরণ */}
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <ScanSearch className="w-4 h-4 text-emerald-600" /> সমস্যা:
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {result.identified_problem}
                    </p>
                  </div>

                  {/* সমাধান / Action Plan */}
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> প্রতিকার ও করণীয়:
                    </h4>
                    <ul className="space-y-3">
                      {result.action_plan.map((step, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-slate-700">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* প্রতিরোধ */}
                  {result.prevention && (
                    <Alert className="bg-blue-50 border-blue-100">
                      <Leaf className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800 text-sm font-medium">
                        পরামর্শ: {result.prevention}
                      </AlertDescription>
                    </Alert>
                  )}

                </CardContent>
              </Card>
            )}
          </div>

        </div>
      </div>

      {/* স্ক্যানিং এনিমেশন স্টাইল */}
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(320px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}