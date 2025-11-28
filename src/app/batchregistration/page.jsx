"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Upload, 
  Download, 
  User, 
  Award, 
  Calendar,
  Scale,
  MapPin,
  Warehouse,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Save,
  Wifi,
  WifiOff,
  History,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast  } from "sonner";

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState("register");
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState("synced");
  const [isLoading, setIsLoading] = useState(false);

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    cropType: "ধান (Paddy/Rice)",
    estimatedWeight: "",
    harvestDate: "",
    division: "",
    district: "",
    storageType: ""
  });

  // ব্যাচ ডাটা
  const [batches, setBatches] = useState([]);
  const [achievements, setAchievements] = useState([]);

  // ডিভিশন এবং ডিস্ট্রিক্ট ডাটা
  const divisions = [
    { name: "ঢাকা", districts: ["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ", "নরসিংদী", "মানিকগঞ্জ"] },
    { name: "চট্টগ্রাম", districts: ["চট্টগ্রাম", "কক্সবাজার", "রাঙ্গামাটি", "বান্দরবান", "খাগড়াছড়ি"] },
    { name: "রাজশাহী", districts: ["রাজশাহী", "বগুড়া", "পাবনা", "সিরাজগঞ্জ", "নাটোর"] },
    { name: "খুলনা", districts: ["খুলনা", "সাতক্ষীরা", "বাগেরহাট", "যশোর", "কুষ্টিয়া"] },
    { name: "সিলেট", districts: ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"] },
    { name: "বরিশাল", districts: ["বরিশাল", "পটুয়াখালী", "ভোলা", "ঝালকাঠি", "পিরোজপুর"] },
    { name: "রংপুর", districts: ["রংপুর", "দিনাজপুর", "নীলফামারী", "গাইবান্ধা", "লালমনিরহাট"] },
    { name: "ময়মনসিংহ", districts: ["ময়মনসিংহ", "শেরপুর", "জামালপুর", "নেত্রকোণা"] }
  ];

  const storageTypes = [
    "পাটের বস্তা (Jute Bag Stack)",
    "সাইলো (Silo)",
    "খোলা জায়গা (Open Area)",
    "প্লাস্টিক ড্রাম (Plastic Drum)",
    "কোল্ড স্টোরেজ (Cold Storage)",
    "মাটির পাত্র (Earthen Pot)"
  ];

  // অ্যাচিভমেন্ট সিস্টেম
  const allAchievements = [
    { id: 1, name: "প্রথম ফসল রেজিস্ট্রেশন", badge: "🌱", description: "প্রথমবারের মতো ফসল রেজিস্ট্রেশন করুন", earned: false },
    { id: 2, name: "ঝুঁকি ব্যবস্থাপনা বিশেষজ্ঞ", badge: "🛡️", description: "৫টি ঝুঁকি সফলভাবে মোকাবেলা করুন", earned: false },
    { id: 3, name: "ফসল রক্ষাকর্তা", badge: "👨‍🌾", description: "১০টি ব্যাচ রেজিস্ট্রেশন করুন", earned: false },
    { id: 4, name: "গুণমান রক্ষক", badge: "⭐", description: "৯৫%以上 গুণমান রেটিং অর্জন করুন", earned: false },
    { id: 5, name: "মৌসুমি বিশেষজ্ঞ", badge: "🌦️", description: "৪টি ভিন্ন মৌসুমে ফসল রেজিস্ট্রেশন করুন", earned: false }
  ];

  // নেটওয়ার্ক স্ট্যাটাস চেক
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingBatches();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // লোকাল স্টোরেজ থেকে ডাটা লোড
  useEffect(() => {
    loadFromLocalStorage();
    loadBatchesFromDB();
  }, []);

  const loadFromLocalStorage = () => {
    try {
      const savedAchievements = localStorage.getItem('farmerAchievements');
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements));
      } else {
        setAchievements(allAchievements);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

const loadBatchesFromDB = async () => {
    try {
      const response = await fetch('/api/batches');
      if (response.ok) {
        const data = await response.json();
        setBatches(data);
      }
    } catch (error) {
      console.error('Error loading batches from DB:', error);
      // Fallback to localStorage if DB fails
      const savedBatches = localStorage.getItem('farmerBatches');
      if (savedBatches) {
        setBatches(JSON.parse(savedBatches));
      }
    }
  };

  // লোকাল স্টোরেজে সেভ করুন
  const saveToLocalStorage = (newBatches, newAchievements) => {
    try {
      localStorage.setItem('farmerBatches', JSON.stringify(newBatches));
      if (newAchievements) {
        localStorage.setItem('farmerAchievements', JSON.stringify(newAchievements));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // পেন্ডিং ব্যাচ সিঙ্ক
  const syncPendingBatches = async () => {
    try {
      const pendingBatches = JSON.parse(localStorage.getItem('pendingBatches') || '[]');
      if (pendingBatches.length > 0) {
        setSyncStatus('syncing');
        
        for (const batch of pendingBatches) {
          await saveBatchToDB(batch);
        }
        
        localStorage.removeItem('pendingBatches');
        setSyncStatus('synced');
        
        toast(`${pendingBatches.length}টি ব্যাচ সফলভাবে সিঙ্ক হয়েছে`);
      }
    } catch (error) {
      console.error('Error syncing pending batches:', error);
      setSyncStatus('error');
    }
  };

  // ডাটাবেসে ব্যাচ সেভ
  const saveBatchToDB = async (batchData) => {
    try {
      const response = await fetch('/api/batches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
      });

      if (!response.ok) {
        throw new Error('Failed to save batch to database');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // ফর্ম হ্যান্ডলার
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ব্যাচ রেজিস্ট্রেশন
  const registerBatch = async () => {
    if (!formData.cropType || !formData.estimatedWeight || !formData.harvestDate || 
        !formData.division || !formData.district || !formData.storageType) {
      toast.error("দয়া করে সমস্ত প্রয়োজনীয় তথ্য প্রদান করুন");
      return;
    }

    setIsLoading(true);

    const newBatch = {
      id: Date.now().toString(),
      ...formData,
      registrationDate: new Date().toISOString(),
      status: "active",
      qualityScore: Math.floor(Math.random() * 20) + 80,
      riskLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
      lossEvents: [],
      interventions: [],
      synced: isOnline
    };

    try {
      let savedBatch;

      if (isOnline) {
        // সরাসরি ডাটাবেসে সেভ
        savedBatch = await saveBatchToDB(newBatch);
      } else {
        // লোকাল স্টোরেজে সেভ এবং পেন্ডিং তালিকায় যোগ
        savedBatch = newBatch;
        const pendingBatches = JSON.parse(localStorage.getItem('pendingBatches') || '[]');
        pendingBatches.push(newBatch);
        localStorage.setItem('pendingBatches', JSON.stringify(pendingBatches));
      }

      const updatedBatches = [savedBatch, ...batches];
      setBatches(updatedBatches);
      
      // লোকাল স্টোরেজে ব্যাকআপ
      saveToLocalStorage(updatedBatches);
      
      // অ্যাচিভমেন্ট চেক
      let updatedAchievements = [...achievements];
      
      if (batches.length === 0) {
        updatedAchievements = updatedAchievements.map(ach => 
          ach.id === 1 ? { ...ach, earned: true, earnedDate: new Date().toISOString() } : ach
        );
        setAchievements(updatedAchievements);
        saveToLocalStorage(updatedBatches, updatedAchievements);
      }

      // ফর্ম রিসেট
      setFormData({
        cropType: "ধান (Paddy/Rice)",
        estimatedWeight: "",
        harvestDate: "",
        division: "",
        district: "",
        storageType: ""
      });

      toast.success(isOnline 
        ? "ফসল ব্যাচ ডাটাবেসে সেভ হয়েছে" 
        : "ফসল ব্যাচ অফলাইন সেভ হয়েছে। অনলাইন হলে অটো সিঙ্ক হবে।");

    } catch (error) {
      console.error('Error registering batch:', error);
      toast.error("ব্যাচ রেজিস্ট্রেশন失败. আবার চেষ্টা করুন");
    } finally {
      setIsLoading(false);
    }
  };

  // ডাটা এক্সপোর্ট
  const exportData = (format) => {
    const dataToExport = {
      batches: batches,
      achievements: achievements.filter(a => a.earned),
      exportDate: new Date().toISOString()
    };

    if (format === 'json') {
      const dataStr = JSON.stringify(dataToExport, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `farmer-data-${new Date().getTime()}.json`;
      link.click();
    } else if (format === 'csv') {
      let csvContent = "ID,Crop Type,Weight,Harvest Date,Division,District,Storage Type,Status,Quality Score,Risk Level\n";
      
      batches.forEach(batch => {
        csvContent += `"${batch.id}","${batch.cropType}","${batch.estimatedWeight}","${batch.harvestDate}","${batch.division}","${batch.district}","${batch.storageType}","${batch.status}","${batch.qualityScore}","${batch.riskLevel}"\n`;
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `farmer-batches-${new Date().getTime()}.csv`;
      link.click();
    }

    toast.success(`${format.toUpperCase()} ফরম্যাটে ডাটা ডাউনলোড হয়েছে`);
  };

  // ম্যানুয়াল সিঙ্ক
  const syncData = async () => {
    if (!isOnline) {
      toast.error("ইন্টারনেট সংযোগ নেই। ডাটা সিঙ্ক করা সম্ভব নয়।");
      return;
    }

    setSyncStatus("syncing");
    
    try {
      await syncPendingBatches();
      await loadBatchesFromDB(); // রিফ্রেশ ডাটা
      
      toast.success("সমস্ত ডাটা সফলভাবে সিঙ্ক করা হয়েছে!");
    } catch (error) {
      setSyncStatus("error");
      toast.error("ডাটা সিঙ্ক করতে সমস্যা হয়েছে।");
    }
  };
  // স্ট্যাটাস ক্যালকুলেশন
  const getStats = () => {
    const activeBatches = batches.filter(b => b.status === "active").length;
    const completedBatches = batches.filter(b => b.status === "completed").length;
    const totalLossEvents = batches.reduce((sum, batch) => sum + batch.lossEvents.length, 0);
    const successRate = batches.length > 0 ? 
      Math.round((batches.filter(b => b.qualityScore >= 90).length / batches.length) * 100) : 0;

    return { activeBatches, completedBatches, totalLossEvents, successRate };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {/* হেডার */}
        <div className="text-center mt-14">
          
          <h1 className="text-4xl font-bold font-tiro-bangla text-gray-900 mb-3">
            ফসল ব্যাচ রেজিস্ট্রেশন
          </h1>
          <p className="text-gray-600 text-lg">
            আপনার ফসলের ব্যাচ রেজিস্ট্রেশন করুন এবং ডিজিটালভাবে ট্র্যাক করুন
          </p>
        </div>

        {/* নেটওয়ার্ক স্ট্যাটাস */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              <span className="font-semibold">{isOnline ? 'অনলাইন' : 'অফলাইন'}</span>
            </div>
            <div className="text-sm text-gray-500">
              {syncStatus === "synced" && "✅ সমস্ত ডাটা সিঙ্ক করা হয়েছে"}
              {syncStatus === "syncing" && "🔄 ডাটা সিঙ্ক হচ্ছে..."}
              {syncStatus === "error" && "❌ সিঙ্ক ব্যর্থ"}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => exportData('json')} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              JSON
            </Button>
            <Button 
              onClick={() => exportData('csv')} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              CSV
            </Button>
            <Button 
              onClick={syncData}
              disabled={!isOnline || syncStatus === "syncing"}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-4 h-4" />
              {syncStatus === "syncing" ? "সিঙ্ক হচ্ছে..." : "সিঙ্ক করুন"}
            </Button>
          </div>
        </div>

        {/* ট্যাব নেভিগেশন */}
        <div className="flex space-x-1 bg-white p-2 rounded-xl shadow-sm border">
          {[
            { id: "register", name: "নতুন রেজিস্ট্রেশন", icon: Plus },
            { id: "profile", name: "প্রোফাইল ও ব্যাচ", icon: User },
            { id: "achievements", name: "অ্যাচিভমেন্ট", icon: Award }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* রেজিস্ট্রেশন ফর্ম */}
        {activeTab === "register" && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="font-tiro-bangla text-2xl text-green-800 flex items-center gap-3">
                <Plus className="w-7 h-7" />
                নতুন ফসল ব্যাচ রেজিস্ট্রেশন
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* ফসলের ধরন */}
                <div className="space-y-3">
                  <Label htmlFor="cropType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    ফসলের ধরন *
                  </Label>
                  <Select 
                    value={formData.cropType} 
                    onValueChange={(value) => handleInputChange('cropType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ধান (Paddy/Rice)">ধান (Paddy/Rice)</SelectItem>
                      <SelectItem value="গম (Wheat)">গম (Wheat)</SelectItem>
                      <SelectItem value="ভুট্টা (Corn)">ভুট্টা (Corn)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* আনুমানিক ওজন */}
                <div className="space-y-3">
                  <Label htmlFor="estimatedWeight" className="text-sm font-semibold text-gray-700">
                    আনুমানিক ওজন (কেজি) *
                  </Label>
                  <Input
                    id="estimatedWeight"
                    type="number"
                    placeholder="যেমন: 500"
                    value={formData.estimatedWeight}
                    onChange={(e) => handleInputChange('estimatedWeight', e.target.value)}
                  />
                </div>

                {/* harvesting তারিখ */}
                <div className="space-y-3">
                  <Label htmlFor="harvestDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    harvesting তারিখ *
                  </Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                  />
                </div>

                {/* ডিভিশন */}
                <div className="space-y-3">
                  <Label htmlFor="division" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    ডিভিশন *
                  </Label>
                  <Select 
                    value={formData.division} 
                    onValueChange={(value) => handleInputChange('division', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ডিভিশন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map(division => (
                        <SelectItem key={division.name} value={division.name}>
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* ডিস্ট্রিক্ট */}
                <div className="space-y-3">
                  <Label htmlFor="district" className="text-sm font-semibold text-gray-700">
                    ডিস্ট্রিক্ট *
                  </Label>
                  <Select 
                    value={formData.district} 
                    onValueChange={(value) => handleInputChange('district', value)}
                    disabled={!formData.division}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="প্রথমে ডিভিশন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.division && divisions
                        .find(d => d.name === formData.division)
                        ?.districts.map(district => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>

                {/* স্টোরেজ টাইপ */}
                <div className="space-y-3">
                  <Label htmlFor="storageType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Warehouse className="w-4 h-4" />
                    সংরক্ষণ পদ্ধতি *
                  </Label>
                  <Select 
                    value={formData.storageType} 
                    onValueChange={(value) => handleInputChange('storageType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="পদ্ধতি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {storageTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>

              {/* সাবমিট বাটন */}
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={registerBatch}
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg font-bold shadow-lg"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      সেভ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      ব্যাচ রেজিস্টার করুন
                    </>
                  )}
                </Button>
              </div>

              {/* অফলাইন নোট */}
              {!isOnline && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                  <p className="text-yellow-800 font-semibold">
                    ⚠️ আপনি বর্তমানে অফলাইন। ডাটা লোকাল স্টোরেজে সেভ হবে এবং ইন্টারনেট সংযোগ পেলে অটো সিঙ্ক হবে।
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* প্রোফাইল ও ব্যাচ তালিকা */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* স্ট্যাটস কার্ড */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600">{stats.activeBatches}</div>
                  <div className="text-sm text-gray-600 mt-1">সক্রিয় ব্যাচ</div>
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mt-2" />
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-600">{stats.completedBatches}</div>
                  <div className="text-sm text-gray-600 mt-1">সম্পন্ন ব্যাচ</div>
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mt-2" />
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-amber-600">{stats.totalLossEvents}</div>
                  <div className="text-sm text-gray-600 mt-1">ক্ষয়ক্ষতি ইভেন্ট</div>
                  <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mt-2" />
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-purple-600">{stats.successRate}%</div>
                  <div className="text-sm text-gray-600 mt-1">সাফল্যের হার</div>
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* ব্যাচ তালিকা */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
                <CardTitle className="font-tiro-bangla text-xl text-gray-800 flex items-center gap-3">
                  <History className="w-6 h-6" />
                  আমার ফসল ব্যাচ তালিকা ({batches.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {batches.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Warehouse className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">কোনো ব্যাচ পাওয়া যায়নি</h3>
                    <p className="text-gray-500">প্রথম ফসল ব্যাচ রেজিস্ট্রেশন করুন</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {batches.map(batch => (
                      <div key={batch.id || batch._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg text-gray-900">{batch.cropType}</h3>
                              <Badge className={
                                batch.status === "active" ? "bg-green-100 text-green-800" :
                                "bg-blue-100 text-blue-800"
                              }>
                                {batch.status === "active" ? "সক্রিয়" : "সম্পন্ন"}
                              </Badge>
                              <Badge className={
                                batch.riskLevel === "High" ? "bg-red-100 text-red-800" :
                                batch.riskLevel === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                "bg-green-100 text-green-800"
                              }>
                                ঝুঁকি: {batch.riskLevel}
                              </Badge>
                              {!batch.synced && (
                                <Badge variant="outline" className="text-orange-600 border-orange-300">
                                  ⚠️ অফলাইন
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-semibold">ওজন:</span> {batch.estimatedWeight} কেজি
                              </div>
                              <div>
                                <span className="font-semibold">হার্ভেস্ট:</span> {batch.harvestDate}
                              </div>
                              <div>
                                <span className="font-semibold">অবস্থান:</span> {batch.district}, {batch.division}
                              </div>
                              <div>
                                <span className="font-semibold">গুণমান:</span> {batch.qualityScore}%
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <span className="font-semibold text-sm">সংরক্ষণ:</span>
                              <span className="text-sm text-gray-600 ml-2">{batch.storageType}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              বিস্তারিত
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* অ্যাচিভমেন্ট সেকশন */}
        {activeTab === "achievements" && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="font-tiro-bangla text-2xl text-purple-800 flex items-center gap-3">
                <Award className="w-7 h-7" />
                আমার অ্যাচিভমেন্ট
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`border rounded-xl p-6 text-center transition-all ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-lg' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-4xl mb-3">{achievement.badge}</div>
                    <h3 className={`font-semibold text-lg mb-2 ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {achievement.description}
                    </p>
                    {achievement.earned ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        অর্জিত
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        লক করা
                      </Badge>
                    )}
                    {achievement.earnedDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        অর্জিত: {new Date(achievement.earnedDate).toLocaleDateString('bn-BD')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ফুটার */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
          <p>🌾 ডিজিটাল কৃষি • 💾 অফলাইন সাপোর্ট • 🏆 গেমিফিকেশন</p>
          <p className="mt-1">HarvestGuard Farmer Portal • আপনার ফসলের বিশ্বস্ত অংশীদার</p>
        </div>
      </div>
    </div>
  );
}