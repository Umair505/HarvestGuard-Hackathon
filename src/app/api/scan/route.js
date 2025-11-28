import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // ১. ফর্ম ডাটা থেকে ইমেজ নেওয়া
    const formData = await request.formData();
    const imageFile = formData.get('image');
    
    if (!imageFile) {
      return NextResponse.json(
        { error: "কোনো ছবি পাওয়া যায়নি" },
        { status: 400 }
      );
    }

    // ২. ফাইলকে বাফারে কনভার্ট করা
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    // ৩. Gemini API কনফিগার করা - আপনার কাজ করা মডেল দিয়ে
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // ৪. প্রম্পট তৈরি করা
    const prompt = `
এই কৃষি ছবিটি বিশ্লেষণ করুন এবং নির্ধারণ করুন যে ফসলটি তাজা নাকি নষ্ট।

মনে রাখবেন:
- তাজা ফসলের রং উজ্জ্বল এবং প্রাকৃতিক হয়
- নষ্ট ফসলের উপর দাগ, কালো пятна বা ফাঙ্গাস থাকতে পারে
- গঠন এবং টেক্সচার দেখুন

শুধুমাত্র JSON ফরম্যাটে উত্তর দিন এই ফিল্ডগুলো সহ:
{
  "label": "Fresh [ফসলের নাম]" বা "Rotten [ফসলের নাম]",
  "score": 0.0 থেকে 1.0 এর মধ্যে একটি সংখ্যা (আত্মবিশ্বাসের স্তর),
  "description": "বাংলায় সংক্ষিপ্ত ব্যাখ্যা (২-৩ বাক্য)"
}

উদাহরণ:
{"label": "Fresh Tomato", "score": 0.95, "description": "টমেটোগুলো টকটকে লাল, মসৃণ এবং কোনো দাগ নেই। সম্পূর্ণ তাজা অবস্থায় রয়েছে।"}
`;

    // ৫. Gemini API কে কল করা
    const result = await model.generateContent([
      {
        text: prompt,
      },
      {
        inlineData: {
          mimeType: imageFile.type || 'image/jpeg',
          data: base64Image,
        },
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
    console.error("Gemini Scan Error:", error);
    
    let errorMessage = "ছবি বিশ্লেষণ করা সম্ভব হয়নি। আবার চেষ্টা করুন।";
    
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