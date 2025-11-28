"use client";

import React, { useState, useEffect } from "react";
import { 
  Sprout, 
  Save, 
  Download, 
  Trophy, 
  History, 
  AlertTriangle, 
  TrendingUp, 
  FileJson, 
  FileSpreadsheet,
  Leaf,
  MapPin
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// --- স্ট্যাটিক ডাটা (Division/District) ---
const locations = {
  "Dhaka": ["Gazipur", "Tangail", "Narsingdi"],
  "Chittagong": ["Comilla", "Noakhali", "Chandpur"],
  "Rajshahi": ["Bogura", "Naogaon", "Pabna"],
  "Sylhet": ["Sylhet Sadar", "Sunamganj", "Habiganj"],
  "Rangpur": ["Dinajpur", "Rangpur Sadar", "Kurigram"],
};

export default function FarmerDashboard() {
  // --- States ---
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    cropType: "Rice/Paddy (ধান)", // Fixed initially
    weight: "",
    harvestDate: "",
    division: "",
    district: "",
    storageType: "",
  });

  // ইউজার ডাটা (LocalStorage থেকে লোড হবে)
  const [batches, setBatches] = useState([]);
  const [badges, setBadges] = useState([
    { id: 1, name: "নতুন চাষী", icon: "🌱", earned: true, desc: "অ্যাকাউন্ট খোলার জন্য" },
    { id: 2, name: "প্রথম সংগ্রহ", icon: "🌾", earned: false, desc: "প্রথম ব্যাচ যুক্ত করলে" },
    { id: 3, name: "রিস্ক এক্সপার্ট", icon: "🛡️", earned: false, desc: "ঝুঁকি কমানোর পদক্ষেপ নিলে" },
  ]);

  // --- LocalStorage Logic (Offline Support) ---
  useEffect(() => {
    setMounted(true);
    const savedBatches = localStorage.getItem("harvest_batches");
    const savedBadges = localStorage.getItem("harvest_badges");

    if (savedBatches) setBatches(JSON.parse(savedBatches));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("harvest_batches", JSON.stringify(batches));
      localStorage.setItem("harvest_badges", JSON.stringify(badges));
    }
  }, [batches, badges, mounted]);

  // --- ফর্ম হ্যান্ডলিং ---
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBatch = {
      id: Date.now(), // Unique ID
      ...formData,
      status: "Active", // Active, Sold, Lost
      riskLevel: "Low", // Mock logic
      addedAt: new Date().toLocaleDateString("bn-BD"),
    };

    // ব্যাচ লিস্ট আপডেট
    const updatedBatches = [newBatch, ...batches];
    setBatches(updatedBatches);

    // ব্যাজ লজিক (Gamification)
    if (batches.length === 0) {
      const updatedBadges = badges.map(b => 
        b.id === 2 ? { ...b, earned: true } : b
      );
      setBadges(updatedBadges);
      alert("অভিনন্দন! আপনি 'প্রথম সংগ্রহ' ব্যাজ অর্জন করেছেন! 🎉");
    }

    // ফর্ম রিসেট
    setFormData({
      cropType: "Rice/Paddy (ধান)",
      weight: "",
      harvestDate: "",
      division: "",
      district: "",
      storageType: "",
    });
    
    // ট্যাবে নিয়ে যাওয়া
    setActiveTab("inventory");
  };

  // --- এক্সপোর্ট ফাংশন (JSON/CSV) ---
  const exportData = (type) => {
    const dataStr = type === 'json' 
      ? "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(batches, null, 2))
      : "data:text/csv;charset=utf-8," + encodeURIComponent(
          ["ID,Crop,Weight,Date,Location,Storage\n" + 
          batches.map(b => `${b.id},${b.cropType},${b.weight},${b.harvestDate},${b.district},${b.storageType}`).join("\n")]
        );
    
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `harvest_data.${type}`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!mounted) return null; // Hydration fix

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8 mt-12">
        
        {/* --- হেডার সেকশন --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-tiro-bangla text-slate-900">কৃষক ড্যাশবোর্ড</h1>
            <p className="text-slate-500">আপনার ফসলের হিসাব এবং অর্জনসমূহ</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportData('csv')} className="border-emerald-200 text-emerald-700">
              <FileSpreadsheet className="w-4 h-4 mr-2" /> CSV এক্সপোর্ট
            </Button>
            <Button variant="outline" onClick={() => exportData('json')} className="border-emerald-200 text-emerald-700">
              <FileJson className="w-4 h-4 mr-2" /> JSON এক্সপোর্ট
            </Button>
          </div>
        </div>

        {/* --- মেইন ট্যাব --- */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-emerald-100 text-emerald-900">
            <TabsTrigger value="overview">প্রোফাইল</TabsTrigger>
            <TabsTrigger value="add_batch">নতুন ফসল</TabsTrigger>
            <TabsTrigger value="inventory">ইনভেন্টরি</TabsTrigger>
          </TabsList>

          {/* --- ১. প্রোফাইল ও ব্যাজ (Profile & Gamification) --- */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* স্ট্যাটস কার্ড */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-emerald-500 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">মোট সংগৃহীত ফসল</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{batches.length} <span className="text-sm font-normal text-slate-400">টি ব্যাচ</span></div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-amber-500 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">ঝুঁকি মোকাবিলা</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">৮৫% <span className="text-sm font-normal text-slate-400">সাফল্য</span></div>
                  <Progress value={85} className="h-2 mt-2 bg-amber-100" indicatorClassName="bg-amber-500" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-blue-500 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">মোট ওজন</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {batches.reduce((acc, curr) => acc + Number(curr.weight), 0)} 
                    <span className="text-sm font-normal text-slate-400"> কেজি</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* অর্জন / ব্যাজ (Gamification) */}
            <Card>
              <CardHeader>
                <CardTitle className="font-tiro-bangla flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" /> অর্জনসমূহ (Badges)
                </CardTitle>
                <CardDescription>আপনার সফলতার স্বীকৃতি</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                        badge.earned 
                          ? "bg-emerald-50 border-emerald-200 opacity-100" 
                          : "bg-slate-50 border-slate-100 opacity-50 grayscale"
                      }`}
                    >
                      <div className="text-3xl">{badge.icon}</div>
                      <div>
                        <h4 className="font-bold text-slate-800">{badge.name}</h4>
                        <p className="text-xs text-slate-500">{badge.desc}</p>
                        {badge.earned && <Badge className="mt-1 bg-emerald-500 text-[10px]">অর্জিত</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- ২. নতুন ব্যাচ ফর্ম (Add Batch) --- */}
          <TabsContent value="add_batch" className="mt-6">
            <Card className="border-t-4 border-t-emerald-600 shadow-lg">
              <CardHeader>
                <CardTitle className="font-tiro-bangla text-xl">নতুন ফসল যুক্ত করুন</CardTitle>
                <CardDescription>আপনার সংগ্রহ করা ধানের বিস্তারিত তথ্য দিন</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ফসলের ধরন (Read only) */}
                    <div className="space-y-2">
                      <Label>ফসলের ধরন</Label>
                      <div className="flex items-center h-10 w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500">
                        <Sprout className="mr-2 h-4 w-4" /> Rice/Paddy (ধান)
                      </div>
                    </div>

                    {/* ওজন */}
                    <div className="space-y-2">
                      <Label>আনুমানিক ওজন (কেজি)</Label>
                      <Input 
                        type="number" 
                        placeholder="উদাহরণ: ৫০০" 
                        required
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                      />
                    </div>

                    {/* তারিখ */}
                    <div className="space-y-2">
                      <Label>ফসল কাটার তারিখ</Label>
                      <Input 
                        type="date" 
                        required 
                        value={formData.harvestDate}
                        onChange={(e) => handleInputChange("harvestDate", e.target.value)}
                      />
                    </div>

                    {/* স্টোরেজ টাইপ */}
                    <div className="space-y-2">
                      <Label>সংরক্ষণ পদ্ধতি (Storage Type)</Label>
                      <Select 
                        onValueChange={(val) => handleInputChange("storageType", val)}
                        value={formData.storageType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Jute Bag">পাটের বস্তা (Jute Bag)</SelectItem>
                          <SelectItem value="Silo">সাইলো / ড্রাম (Silo)</SelectItem>
                          <SelectItem value="Open Area">খোলা মেঝে (Open Area)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* লোকেশন (বিভাগ ও জেলা) */}
                    <div className="space-y-2">
                      <Label>বিভাগ (Division)</Label>
                      <Select 
                        onValueChange={(val) => {
                          handleInputChange("division", val);
                          handleInputChange("district", ""); // Reset district
                        }}
                        value={formData.division}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="বিভাগ..." />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(locations).map(div => (
                            <SelectItem key={div} value={div}>{div}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>জেলা (District)</Label>
                      <Select 
                        disabled={!formData.division}
                        onValueChange={(val) => handleInputChange("district", val)}
                        value={formData.district}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="জেলা..." />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.division && locations[formData.division].map(dist => (
                            <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold text-lg">
                    <Save className="mr-2 h-5 w-5" /> তথ্য সংরক্ষণ করুন
                  </Button>

                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- ৩. ইনভেন্টরি লিস্ট (List) --- */}
          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-tiro-bangla">আপনার ফসলের তালিকা</CardTitle>
                <CardDescription>সকল অ্যাক্টিভ এবং সংরক্ষিত ফসলের বিবরণ</CardDescription>
              </CardHeader>
              <CardContent>
                {batches.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Leaf className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>কোনো তথ্য পাওয়া যায়নি। 'নতুন ফসল' ট্যাবে গিয়ে যুক্ত করুন।</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>তারিখ</TableHead>
                          <TableHead>ফসল</TableHead>
                          <TableHead>ওজন (কেজি)</TableHead>
                          <TableHead>লোকেশন</TableHead>
                          <TableHead>স্টোরেজ</TableHead>
                          <TableHead>স্ট্যাটাস</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {batches.map((batch) => (
                          <TableRow key={batch.id}>
                            <TableCell>{batch.harvestDate}</TableCell>
                            <TableCell className="font-medium">{batch.cropType}</TableCell>
                            <TableCell>{batch.weight}</TableCell>
                            <TableCell>{batch.district}, {batch.division}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-slate-50">
                                {batch.storageType}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                {batch.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}