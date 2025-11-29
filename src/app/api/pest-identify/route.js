import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // ১. ইমেজ ডাটা রিসিভ করা
    const formData = await request.blob();
    const arrayBuffer = await formData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // ২. Gemini API কনফিগার করা
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Note: Google Search Grounding এর জন্য tools ব্যবহার করা হচ্ছে
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      tools: [{ googleSearch: {} }] // Grounding Tool
    });

    // ৩. কৃষি বিশেষজ্ঞের জন্য প্রম্পট (Visual RAG Prompt)
    const prompt = `
      Act as an expert agricultural scientist in Bangladesh.
      Analyze this image of a crop pest or disease.
      
      Task:
      1. Identify the pest or disease correctly.
      2. Search/Retrieve specific, practical "Action Plan" suitable for Bangladeshi farmers (Low cost, Organic, or common Pesticides found in BD).
      3. Determine the Risk Level (High/Medium/Low).

      Output Format:
      Return ONLY a JSON object (no markdown) with these keys:
      {
        "pest_name": "Name in English / বাংলা নাম",
        "risk_level": "High" | "Medium" | "Low",
        "identified_problem": "২ লাইনে সমস্যার বিবরণ (বাংলায়)",
        "action_plan": [
          "পদক্ষেপ ১ (বাংলায় - ঘরোয়া পদ্ধতি)",
          "পদক্ষেপ ২ (বাংলায় - রাসায়নিক/জৈব বালাইনাশক নাম সহ)"
        ],
        "prevention": "ভবিষ্যতে যাতে না হয় তার জন্য ১টি টিপস (বাংলায়)"
      }
    `;

    // ৪. জেনারেট করা
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    // JSON ক্লিন করা (Markdown রিমুভ)
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanedText);

    // Grounding Metadata (যদি থাকে) - এটা দিয়ে সোর্স দেখানো যায়
    // const groundingMetadata = response.candidates[0]?.groundingMetadata;

    return NextResponse.json({ success: true, data: data });

  } catch (error) {
    console.error("Pest ID Error:", error);
    return NextResponse.json(
      { success: false, error: "AI বিশ্লেষণ করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}