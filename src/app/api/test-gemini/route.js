import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not found" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // একটি সাধারণ টেক্সট রিকোয়েস্ট
    const result = await model.generateContent("What is 2+2? Answer in one word.");
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      success: true,
      apiKey: apiKey.substring(0, 10) + "...", // প্রথম ১০টি ক্যারেক্টার শো করবে
      response: text.trim(),
      message: "Gemini API is working correctly"
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: error.message,
      details: "API Key might be invalid or there's a network issue"
    });
  }
}