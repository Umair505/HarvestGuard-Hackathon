import { NextResponse } from "next/server";

// বাংলাদেশের জেলা থেকে coordinates mapping
const districtCoordinates = {
  // ঢাকা বিভাগ
  "ঢাকা": { lat: 23.8103, lon: 90.4125 },
  "গাজীপুর": { lat: 23.9999, lon: 90.4203 },
  "নারায়ণগঞ্জ": { lat: 23.6238, lon: 90.4995 },
  "মানিকগঞ্জ": { lat: 23.8617, lon: 90.0003 },
  "মুন্সীগঞ্জ": { lat: 23.5422, lon: 90.5305 },
  "নরসিংদী": { lat: 23.9321, lon: 90.7152 },
  
  // চট্টগ্রাম বিভাগ
  "চট্টগ্রাম": { lat: 22.3569, lon: 91.7832 },
  "কক্সবাজার": { lat: 21.4272, lon: 92.0058 },
  "রাঙ্গামাটি": { lat: 22.6533, lon: 92.1753 },
  "বান্দরবান": { lat: 22.1953, lon: 92.2184 },
  "খাগড়াছড়ি": { lat: 23.1193, lon: 91.9846 },
  
  // রাজশাহী বিভাগ
  "রাজশাহী": { lat: 24.3745, lon: 88.6042 },
  "নাটোর": { lat: 24.4206, lon: 89.0002 },
  "বগুড়া": { lat: 24.8465, lon: 89.3770 },
  "পাবনা": { lat: 24.0064, lon: 89.2372 },
  "সিরাজগঞ্জ": { lat: 24.4539, lon: 89.7008 },
  
  // খুলনা বিভাগ
  "খুলনা": { lat: 22.8456, lon: 89.5403 },
  "যশোর": { lat: 23.1634, lon: 89.2182 },
  "সাতক্ষীরা": { lat: 22.7186, lon: 89.0700 },
  "বাগেরহাট": { lat: 22.6518, lon: 89.7853 },
  "কুষ্টিয়া": { lat: 23.9015, lon: 89.1212 },
  
  // বরিশাল বিভাগ
  "বরিশাল": { lat: 22.7010, lon: 90.3535 },
  "পটুয়াখালী": { lat: 22.3596, lon: 90.3298 },
  "ভোলা": { lat: 22.6859, lon: 90.6483 },
  "ঝালকাঠি": { lat: 22.6406, lon: 90.1987 },
  
  // সিলেট বিভাগ
  "সিলেট": { lat: 24.8949, lon: 91.8687 },
  "মৌলভীবাজার": { lat: 24.4829, lon: 91.7774 },
  "হবিগঞ্জ": { lat: 24.3740, lon: 91.4150 },
  "সুনামগঞ্জ": { lat: 25.0650, lon: 91.3950 },
  
  // রংপুর বিভাগ
  "রংপুর": { lat: 25.7439, lon: 89.2752 },
  "দিনাজপুর": { lat: 25.6217, lon: 88.6354 },
  "নীলফামারী": { lat: 25.9345, lon: 88.8496 },
  "গাইবান্ধা": { lat: 25.3288, lon: 89.5281 },
  "লালমনিরহাট": { lat: 25.9173, lon: 89.4455 },
  
  // ময়মনসিংহ বিভাগ
  "ময়মনসিংহ": { lat: 24.7471, lon: 90.4203 },
  "জামালপুর": { lat: 24.9375, lon: 89.9403 },
  "শেরপুর": { lat: 25.0205, lon: 90.0150 },
  "নেত্রকোণা": { lat: 24.8700, lon: 90.7276 }
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');
    const feature = searchParams.get('feature'); // Optional: to identify which feature is calling

    if (!district) {
      return NextResponse.json(
        { error: "জেলার নাম প্রয়োজন" },
        { status: 400 }
      );
    }

    // District coordinates খুঁজুন
    const coords = districtCoordinates[district];
    
    if (!coords) {
      return NextResponse.json(
        { error: `${district} জেলার আবহাওয়া ডাটা পাওয়া যায়নি` },
        { status: 404 }
      );
    }

    // OpenWeatherMap API Call
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      console.error("OpenWeatherMap API Key missing");
      // Fallback: Mock weather data
      return NextResponse.json(generateMockWeather(district, feature));
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${district},BD&units=metric&appid=${apiKey}`;
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`Weather API failed: ${response.status}`);
    }

    const data = await response.json();

    // Different response formats based on calling feature
    const weatherData = formatWeatherData(data, district, feature);

    return NextResponse.json(weatherData);

  } catch (error) {
    console.error("Weather API Error:", error);
    
    // Fallback to mock data
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district') || 'ঢাকা';
    const feature = searchParams.get('feature');
    
    return NextResponse.json(generateMockWeather(district, feature));
  }
}

// Different response formats for different features
function formatWeatherData(data, district, feature) {
  const baseData = {
    district,
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    wind: Math.round(data.wind.speed * 3.6), // m/s to km/h
    condition: translateCondition(data.weather[0].main),
    description: data.weather[0].description,
    rain_chance: data.rain ? Math.min(data.rain['1h'] * 10, 100) : 0,
    timestamp: new Date().toISOString()
  };

  // Voice Assistant এর জন্য simplified format
  if (feature === 'voice-assistant') {
    return {
      temp: baseData.temp,
      humidity: baseData.humidity,
      condition: baseData.condition,
      rainChance: baseData.rain_chance,
      wind: baseData.wind
    };
  }

  // Smart Alert System এর জন্য detailed format
  if (feature === 'smart-alert') {
    return {
      ...baseData,
      risk_level: calculateRiskLevel(baseData),
      recommendations: generateRecommendations(baseData)
    };
  }

  // Default format (Prediction page এর জন্য)
  return baseData;
}

// বাংলায় আবহাওয়ার অবস্থা অনুবাদ
function translateCondition(condition) {
  const translations = {
    'Clear': 'পরিষ্কার',
    'Clouds': 'মেঘলা',
    'Rain': 'বৃষ্টি',
    'Drizzle': 'গুঁড়ি গুঁড়ি বৃষ্টি',
    'Thunderstorm': 'বজ্রবৃষ্টি',
    'Snow': 'তুষারপাত',
    'Mist': 'কুয়াশা',
    'Fog': 'ঘন কুয়াশা',
    'Haze': 'ধোঁয়াশা',
    'Smoke': 'ধোঁয়া',
    'Dust': 'ধুলো',
    'Sand': 'বালি',
    'Ash': 'ভস্ম',
    'Squall': 'ঝড়',
    'Tornado': 'টর্নেডো'
  };
  
  return translations[condition] || condition;
}

// Risk level calculation for Smart Alerts
function calculateRiskLevel(weather) {
  let riskScore = 0;
  
  if (weather.condition.includes('বৃষ্টি') || weather.condition.includes('বজ্র')) {
    riskScore += 30;
  }
  
  if (weather.humidity > 80) {
    riskScore += 25;
  }
  
  if (weather.temp > 35) {
    riskScore += 20;
  }
  
  if (weather.wind > 20) {
    riskScore += 15;
  }
  
  if (weather.rain_chance > 60) {
    riskScore += 10;
  }

  if (riskScore >= 60) return 'High';
  if (riskScore >= 30) return 'Medium';
  return 'Low';
}

// Recommendations for Smart Alerts
function generateRecommendations(weather) {
  const recommendations = [];
  
  if (weather.condition.includes('বৃষ্টি')) {
    recommendations.push('ফসল দ্রুত সুরক্ষিত স্থানে নিন');
    recommendations.push('জলাবদ্ধতা এড়ান');
  }
  
  if (weather.humidity > 80) {
    recommendations.push('গুদামের বায়ু চলাচল বাড়ান');
    recommendations.push('ফসল নিয়মিত পরিদর্শন করুন');
  }
  
  if (weather.temp > 35) {
    recommendations.push('ফসল ছায়ায় রাখুন');
    recommendations.push('পর্যাপ্ত পানি সরবরাহ করুন');
  }
  
  if (weather.wind > 20) {
    recommendations.push('ফসল শক্ত করে বাঁধুন');
    recommendations.push('ভাঙ্গন রোধ করুন');
  }

  return recommendations.length > 0 ? recommendations : ['বর্তমান অবস্থা ভালো, নিয়মিত মনিটরিং চালিয়ে যান'];
}

// Mock Weather Data (Fallback যখন API না থাকে)
function generateMockWeather(district, feature) {
  // নভেম্বর মাসের বাংলাদেশের সাধারণ আবহাওয়া
  const baseTemp = 25 + Math.random() * 5; // 25-30°C
  const baseHumidity = 65 + Math.random() * 15; // 65-80%
  
  const conditions = ['পরিষ্কার', 'আংশিক মেঘলা', 'মেঘলা', 'গুঁড়ি গুঁড়ি বৃষ্টি'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  const baseData = {
    district,
    temp: Math.round(baseTemp),
    feels_like: Math.round(baseTemp + 2),
    humidity: Math.round(baseHumidity),
    pressure: 1010 + Math.random() * 10,
    wind: Math.round(5 + Math.random() * 15), // 5-20 km/h
    condition: randomCondition,
    description: randomCondition,
    rain_chance: randomCondition.includes('বৃষ্টি') ? 60 : 20,
    timestamp: new Date().toISOString(),
    note: "Mock data - API key not configured"
  };

  // Feature-specific mock data formatting
  if (feature === 'voice-assistant') {
    return {
      temp: baseData.temp,
      humidity: baseData.humidity,
      condition: baseData.condition,
      rainChance: baseData.rain_chance,
      wind: baseData.wind
    };
  }

  if (feature === 'smart-alert') {
    return {
      ...baseData,
      risk_level: calculateRiskLevel(baseData),
      recommendations: generateRecommendations(baseData)
    };
  }

  return baseData;
}