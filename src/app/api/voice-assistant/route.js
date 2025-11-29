import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { query, userData, batches, weather, currentTime } = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prepare context information
    const userContext = `
ব্যবহারকারী তথ্য:
- নাম: ${userData.name || 'অজানা'}
- ইমেইল: ${userData.email || 'অজানা'}
- ফোন: ${userData.phone || 'অজানা'}

ব্যাচ তথ্য (মোট ${batches.length}টি):
${batches.map(batch => `
- ফসল: ${batch.cropType}
- অবস্থান: ${batch.district}, ${batch.division}
- সংরক্ষণ: ${batch.storageType}
- ওজন: ${batch.estimatedWeight} কেজি
- গুণমান: ${batch.qualityScore}%
- ঝুঁকি: ${batch.riskLevel}
`).join('')}

আবহাওয়া তথ্য:
- তাপমাত্রা: ${weather.temp}°C
- আদ্রতা: ${weather.humidity}%
- অবস্থা: ${weather.condition}
- বৃষ্টির সম্ভাবনা: ${weather.rainChance}%

বর্তমান সময়: ${new Date(currentTime).toLocaleString('bn-BD')}
`;

    const prompt = `
তুমি একজন কৃষি বিশেষজ্ঞ AI সহকারী। বাংলায় উত্তর দিবে।

প্রসঙ্গ তথ্য:
${userContext}

ব্যবহারকারীর প্রশ্ন: "${query}"

নির্দেশনা:
1. সম্পূর্ণ বাংলায় উত্তর দিতে হবে
2. সহজ ও বোধগম্য ভাষা ব্যবহার করতে হবে
3. ব্যবহারকারীর ব্যাচ এবং আবহাওয়ার তথ্য বিবেচনা করতে হবে
4. ব্যবহারিক ও কার্যকরী পরামর্শ দিতে হবে
5. সর্বোচ্চ ২-৩টি করণীয় পদক্ষেপ সাজেস্ট করতে হবে

আউটপুট ফরম্যাট (JSON):
{
  "answer": "পুরো উত্তর বাংলায়",
  "actions": ["পরামর্শ ১", "পরামর্শ ২", "পরামর্শ ৩"]
}

উদাহরণ:
প্রশ্ন: "আজকের আবহাওয়া?"
উত্তর: {
  "answer": "আজকের আবহাওয়া ভালো আছে। তাপমাত্রা ৩০°C এবং আদ্রতা ৭০%। বৃষ্টির সম্ভাবনা কম। আপনার ফসলের জন্য অনুকূল পরিবেশ।",
  "actions": ["ফসল নিয়মিত পরিদর্শন করুন", "আবহাওয়ার আপডেট রাখুন"]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON response
    let parsedResponse;
    try {
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON format');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback response
      parsedResponse = {
        answer: "আমি আপনার প্রশ্নটি বুঝতে পেরেছি। বর্তমানে সঠিক উত্তর দিতে পারছি না। অনুগ্রহ করে একটু পর আবার চেষ্টা করুন।",
        actions: ["আবার প্রশ্ন করুন", "সহায়তা কেন্দ্রে যোগাযোগ করুন"]
      };
    }

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error("Voice Assistant API Error:", error);
    
    return NextResponse.json({
      answer: "দুঃখিত, আমি এখন আপনার প্রশ্নের উত্তর দিতে পারছি না। অনুগ্রহ করে পুনরায় আবার চেষ্টা করুন।",
      actions: ["আবার চেষ্টা করুন", "ইন্টারনেট সংযোগ চেক করুন"]
    }, { status: 500 });
  }
}