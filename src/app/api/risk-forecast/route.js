import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // ১. ফর্ম ডাটা থেকে ডাটা নেওয়া
    const formData = await request.formData();
    const district = formData.get('district');
    const cropType = formData.get('cropType');
    const storageType = formData.get('storageType');
    const cropImage = formData.get('cropImage');

    if (!district || !cropType || !storageType) {
      return NextResponse.json(
        { error: "সমস্ত প্রয়োজনীয় তথ্য প্রদান করুন" },
        { status: 400 }
      );
    }

    // ২. Gemini API কনফিগার করা
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // ৩. ইমেজ প্রসেসিং (যদি থাকে)
    let imageAnalysis = "";
    if (cropImage) {
      try {
        const arrayBuffer = await cropImage.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');

        const imagePrompt = `
এই ফসলের ছবিটি বিশ্লেষণ করুন এবং নিম্নলিখিত বিষয়গুলো খুঁজে দেখুন:
- ফসলের বর্তমান অবস্থা (তাজা/নষ্ট)
- কোনো দাগ, ফাঙ্গাস বা পোকামাকড়ের আক্রমণ
- রং এবং টেক্সচারের পরিবর্তন
- সামগ্রিক স্বাস্থ্য অবস্থা

সরাসরি বাংলায় উত্তর দিন (২-৩ বাক্য):
`;

        const imageResult = await model.generateContent([
          {
            text: imagePrompt,
          },
          {
            inlineData: {
              mimeType: cropImage.type || 'image/jpeg',
              data: base64Image,
            },
          },
        ]);

        imageAnalysis = imageResult.response.text();
      } catch (imageError) {
        console.error("Image analysis failed:", imageError);
        imageAnalysis = "ছবি বিশ্লেষণ করা সম্ভব হয়নি";
      }
    }

    // ৪. মূল প্রম্পট তৈরি করা
    const prompt = `
আপনি একজন বাংলাদেশী কৃষি বিশেষজ্ঞ AI। নিম্নলিখিত তথ্যের ভিত্তিতে ফসলের সংরক্ষণ ঝুঁকি বিশ্লেষণ করুন:

প্রসঙ্গ:
- জেলা: ${district}, বাংলাদেশ
- ফসলের ধরন: ${cropType}
- সংরক্ষণ পদ্ধতি: ${storageType}
- বর্তমান মৌসুম: নভেম্বর (শীতের শুরু)
- ছবি বিশ্লেষণ: ${imageAnalysis || "কোনো ছবি প্রদান করা হয়নি"}

কাজ:
১. ${district} জেলার জন্য বাস্তবসম্মত ৭-দিনের আবহাওয়ার পূর্বাভাস তৈরি করুন
২. আবহাওয়া এবং সংরক্ষণ পদ্ধতির ভিত্তিতে ঝুঁকি বিশ্লেষণ করুন
৩. ETCL (সমালোচনামূলক ক্ষতি পর্যন্ত আনুমানিক সময়) গণনা করুন
৪. বাংলায় বিস্তারিত সুপারিশ প্রদান করুন

শুধুমাত্র JSON ফরম্যাটে উত্তর দিন এই ফিল্ডগুলো সহ:
{
  "district": "${district}",
  "crop_type": "${cropType}",
  "storage_type": "${storageType}",
  "forecast": [
    {
      "day": "আজ",
      "temp": 28,
      "humidity": 75,
      "rain_chance": 40,
      "condition": "আংশিক মেঘলা"
    },
    ... (৬ দিনের জন্য)
  ],
  "risk_analysis": {
    "level": "High",
    "etcl_hours": 72,
    "summary_bn": "আগামী ৩ দিনে বৃষ্টির সম্ভাবনা ও উচ্চ আদ্রতার কারণে ফসলের ফাঙ্গাস ও পচন এর উচ্চ ঝুঁকি রয়েছে।",
    "main_risk": "Aflatoxin Mold",
    "recommendations": [
      "প্রথম সুপারিশ",
      "দ্বিতীয় সুপারিশ", 
      "তৃতীয় সুপারিশ"
    ]
  },
  "image_analysis": "${imageAnalysis || "কোনো ছবি প্রদান করা হয়নি"}"
}

বাংলাদেশের নভেম্বর মাসের আবহাওয়া অনুযায়ী বাস্তবসম্মত ডাটা তৈরি করুন।
`;

    // ৫. Gemini API কে কল করা
    const result = await model.generateContent([
      {
        text: prompt,
      },
    ]);

    const responseText = result.response.text();
    
    // ৬. রেসপন্স পার্স করা
    let cleanedText = responseText.trim();
    
    // JSON ক্লিন করা (যদি Markdown ফরম্যাট থাকে)
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json|```/g, '').trim();
    }
    
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json(parsedData);

  } catch (error) {
    console.error("Risk Forecast Error:", error);
    
    let errorMessage = "ঝুঁকি বিশ্লেষণ করা সম্ভব হয়নি। আবার চেষ্টা করুন।";
    
    if (error.message.includes("API_KEY") || error.message.includes("key")) {
      errorMessage = "API Key সমস্যা। দয়া এনভায়রনমেন্ট ভেরিয়েবল চেক করুন।";
    } else if (error.message.includes("quota")) {
      errorMessage = "API quota শেষ হয়েছে। দয়া করে পরে চেষ্টা করুন।";
    } else if (error.message.includes("JSON")) {
      errorMessage = "AI রেসপন্স পার্স করতে সমস্যা হচ্ছে।";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}