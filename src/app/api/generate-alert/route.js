import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { batch, weather, currentDate } = await request.json();

    if (!batch || !weather) {
      return NextResponse.json(
        { error: "ব্যাচ এবং আবহাওয়া ডাটা প্রয়োজন" },
        { status: 400 }
      );
    }

    // Gemini AI Configuration
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // আবহাওয়া রিস্ক স্কোর গণনা
    const riskFactors = calculateRiskFactors(batch, weather);

    // AI প্রম্পট তৈরি
    const prompt = `
আপনি একজন বাংলাদেশী কৃষি বিশেষজ্ঞ AI যিনি ফসল সংরক্ষণ সতর্কবার্তা তৈরি করেন।

প্রসঙ্গ:
- ফসল: ${batch.cropType}
- ওজন: ${batch.estimatedWeight} কেজি
- সংরক্ষণ: ${batch.storageType}
- জেলা: ${batch.district}, ${batch.division}
- সংগ্রহের তারিখ: ${batch.harvestDate}
- বর্তমান তারিখ: ${currentDate}

বর্তমান আবহাওয়া (${batch.district}):
- তাপমাত্রা: ${weather.temp}°C
- আর্দ্রতা: ${weather.humidity}%
- বৃষ্টির সম্ভাবনা: ${weather.rain_chance || 0}%
- বায়ু: ${weather.wind || 'N/A'} km/h
- অবস্থা: ${weather.condition || 'পরিষ্কার'}

ঝুঁকি মূল্যায়ন:
- ঝুঁকি স্তর: ${riskFactors.overallRisk}
- তাপমাত্রা স্কোর: ${riskFactors.tempRisk}/10
- আর্দ্রতা স্কোর: ${riskFactors.humidityRisk}/10
- বৃষ্টি স্কোর: ${riskFactors.rainRisk}/10

কাজ:
১. এই ডাটার ভিত্তিতে একটি সুনির্দিষ্ট, কার্যকর সতর্কবার্তা তৈরি করুন (বাংলায়)
২. সতর্কবার্তার Priority নির্ধারণ করুন: critical (9-10), high (7-8), medium (5-6), low (3-4), safe (0-2)
৩. ৩টি কংক্রিট করণীয় পদক্ষেপ দিন

❌ খারাপ উদাহরণ: "আবহাওয়া খারাপ।"
✅ ভালো উদাহরণ: "আগামীকাল ভারী বৃষ্টি হবে এবং আপনার আলু গুদামে আর্দ্রতা বিপজ্জনক (${weather.humidity}%)। এখনই ফ্যান চালু করুন এবং গুদাম খুলে রাখুন।"

শুধুমাত্র JSON আউটপুট দিন:
{
  "priority": "critical|high|medium|low|safe",
  "title": "সংক্ষিপ্ত শিরোনাম (১০-১৫ শব্দ)",
  "message": "বিস্তারিত বার্তা সুনির্দিষ্ট ডাটা সহ (৩০-৫০ শব্দ)",
  "actions": [
    "প্রথম পদক্ষেপ (সুনির্দিষ্ট)",
    "দ্বিতীয় পদক্ষেপ (সময়সীমা সহ)",
    "তৃতীয় পদক্ষেপ (পরিমাপযোগ্য)"
  ],
  "risk_score": ${riskFactors.totalScore},
  "estimated_loss_hours": 24,
  "specific_threat": "Fungal Growth|Moisture|Heat|Pest|Multiple"
}

নোট: বাংলায় লিখুন, ডাটা এবং সংখ্যা অন্তর্ভুক্ত করুন, SMS-friendly রাখুন (160 অক্ষরের মধ্যে মূল বার্তা)।
`;

    // Gemini API Call
    const result = await model.generateContent([{ text: prompt }]);
    const responseText = result.response.text();

    // JSON Clean করা
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json|```/g, '').trim();
    }

    const alertData = JSON.parse(cleanedText);

    // যদি priority "safe" হয় তাহলে null return
    if (alertData.priority === 'safe') {
      return NextResponse.json(null);
    }

    return NextResponse.json(alertData);

  } catch (error) {
    console.error("Alert Generation Error:", error);
    
    // Fallback: Rule-based Alert যদি AI ব্যর্থ হয়
    const { batch, weather } = await request.json();
    const fallbackAlert = createFallbackAlert(batch, weather);
    
    return NextResponse.json(fallbackAlert);
  }
}

// ঝুঁকি স্কোর গণনা
function calculateRiskFactors(batch, weather) {
  let tempRisk = 0;
  let humidityRisk = 0;
  let rainRisk = 0;

  // তাপমাত্রা ঝুঁকি (Ideal: 15-25°C)
  if (weather.temp > 32) tempRisk = 9;
  else if (weather.temp > 28) tempRisk = 7;
  else if (weather.temp > 25) tempRisk = 5;
  else if (weather.temp < 10) tempRisk = 6;
  else tempRisk = 2;

  // আর্দ্রতা ঝুঁকি (Ideal: 50-65%)
  if (weather.humidity > 85) humidityRisk = 10;
  else if (weather.humidity > 75) humidityRisk = 8;
  else if (weather.humidity > 65) humidityRisk = 5;
  else if (weather.humidity < 40) humidityRisk = 4;
  else humidityRisk = 2;

  // বৃষ্টি ঝুঁকি
  const rainChance = weather.rain_chance || 0;
  if (rainChance > 70) rainRisk = 9;
  else if (rainChance > 50) rainRisk = 7;
  else if (rainChance > 30) rainRisk = 5;
  else rainRisk = 2;

  // সংরক্ষণ পদ্ধতির ঝুঁকি মাল্টিপ্লায়ার
  const storageMultiplier = {
    'ঘরে (সাধারণ)': 1.3,
    'মাটির পাত্র': 1.2,
    'প্লাস্টিক ব্যাগ': 1.4,
    'বস্তা (Sack)': 1.3,
    'ট্রেডিশনাল গোলা': 1.2,
    'সাইলো (Silo)': 0.8,
    'হিমাগার (Cold Storage)': 0.5,
  };

  const multiplier = storageMultiplier[batch.storageType] || 1.0;
  
  const totalScore = Math.round(
    ((tempRisk + humidityRisk + rainRisk) / 3) * multiplier
  );

  let overallRisk = 'Low';
  if (totalScore >= 9) overallRisk = 'Critical';
  else if (totalScore >= 7) overallRisk = 'High';
  else if (totalScore >= 5) overallRisk = 'Medium';

  return {
    tempRisk,
    humidityRisk,
    rainRisk,
    totalScore,
    overallRisk,
    multiplier
  };
}

// Fallback Rule-based Alert
function createFallbackAlert(batch, weather) {
  const riskFactors = calculateRiskFactors(batch, weather);
  
  if (riskFactors.totalScore < 5) {
    return null; // Safe condition
  }

  const alerts = {
    critical: {
      title: `🚨 জরুরি: ${batch.cropType} সংরক্ষণে চরম ঝুঁকি`,
      message: `আবহাওয়া অত্যন্ত প্রতিকূল (তাপ: ${weather.temp}°C, আর্দ্রতা: ${weather.humidity}%)। আপনার ${batch.storageType}-এ ফসল নষ্ট হওয়ার সম্ভাবনা খুব বেশি। এখনই পদক্ষেপ নিন।`,
      actions: [
        `অবিলম্বে গুদাম পরিদর্শন করুন এবং ভেন্টিলেশন চালু করুন`,
        `আগামী ৬ ঘণ্টার মধ্যে ${batch.estimatedWeight} কেজি ফসল শুকাতে শুরু করুন`,
        `স্থানীয় কৃষি কর্মকর্তার সাথে যোগাযোগ করুন (হটলাইন: 16123)`
      ]
    },
    high: {
      title: `⚠️ উচ্চ সতর্কতা: ${batch.cropType} ঝুঁকিতে`,
      message: `বর্তমান আবহাওয়া (তাপ: ${weather.temp}°C, আর্দ্রতা: ${weather.humidity}%) আপনার ${batch.storageType}-এর জন্য ঝুঁকিপূর্ণ। ২৪ ঘণ্টার মধ্যে সমস্যা হতে পারে।`,
      actions: [
        `আজই গুদামে বায়ু চলাচল বাড়ান`,
        `প্রতি ৪ ঘণ্টায় ফসল পরীক্ষা করুন`,
        `যদি সম্ভব হয়, আর্দ্রতা কমাতে ডিহিউমিডিফায়ার ব্যবহার করুন`
      ]
    },
    medium: {
      title: `⚡ সতর্কতা: ${batch.cropType} মনিটরিং প্রয়োজন`,
      message: `আবহাওয়া পরিবর্তন হচ্ছে (তাপ: ${weather.temp}°C, আর্দ্রতা: ${weather.humidity}%)। নিয়মিত পর্যবেক্ষণ করুন।`,
      actions: [
        `দিনে ২ বার গুদাম পরিদর্শন করুন`,
        `ফসলের রং ও গন্ধ চেক করুন`,
        `আবহাওয়ার পূর্বাভাস নিয়মিত দেখুন`
      ]
    }
  };

  const priority = riskFactors.totalScore >= 9 ? 'critical' 
    : riskFactors.totalScore >= 7 ? 'high' 
    : 'medium';

  return {
    priority,
    ...alerts[priority],
    risk_score: riskFactors.totalScore,
    estimated_loss_hours: riskFactors.totalScore * 8,
    specific_threat: weather.humidity > 80 ? 'Fungal Growth' : 'Multiple'
  };
}