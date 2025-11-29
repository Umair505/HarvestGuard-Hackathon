import { NextResponse } from "next/server";

// বাংলাদেশের জেলা থেকে coordinates mapping
const districtCoordinates = {
  // ঢাকা বিভাগ
  "ঢাকা": { lat: 23.8103, lon: 90.4125 },
  "গাজীপুর": { lat: 23.9999, lon: 90.4203 },
  "নারায়ণগঞ্জ": { lat: 23.6238, lon: 90.4995 },
  "মানিকগঞ্জ": { lat: 23.8617, lon: 90.0003 },
  "মুন্সীগঞ্জ": { lat: 23.5422, lon: 90.5305 },
  
  // চট্টগ্রাম বিভাগ
  "চট্টগ্রাম": { lat: 22.3569, lon: 91.7832 },
  "কক্সবাজার": { lat: 21.4272, lon: 92.0058 },
  "রাঙ্গামাটি": { lat: 22.6533, lon: 92.1753 },
  
  // রাজশাহী বিভাগ
  "রাজশাহী": { lat: 24.3745, lon: 88.6042 },
  "নাটোর": { lat: 24.4206, lon: 89.0002 },
  "বগুড়া": { lat: 24.8465, lon: 89.3770 },
  "পাবনা": { lat: 24.0064, lon: 89.2372 },
  
  // খুলনা বিভাগ
  "খুলনা": { lat: 22.8456, lon: 89.5403 },
  "যশোর": { lat: 23.1634, lon: 89.2182 },
  "সাতক্ষীরা": { lat: 22.7186, lon: 89.0700 },
  
  // বরিশাল বিভাগ
  "বরিশাল": { lat: 22.7010, lon: 90.3535 },
  "পটুয়াখালী": { lat: 22.3596, lon: 90.3298 },
  
  // সিলেট বিভাগ
  "সিলেট": { lat: 24.8949, lon: 91.8687 },
  "মৌলভীবাজার": { lat: 24.4829, lon: 91.7774 },
  
  // রংপুর বিভাগ
  "রংপুর": { lat: 25.7439, lon: 89.2752 },
  "দিনাজপুর": { lat: 25.6217, lon: 88.6354 },
  
  // ময়মনসিংহ বিভাগ
  "ময়মনসিংহ": { lat: 24.7471, lon: 90.4203 },
  "জামালপুর": { lat: 24.9375, lon: 89.9403 }
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');

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
      return NextResponse.json(generateMockWeather(district));
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`Weather API failed: ${response.status}`);
    }

    const data = await response.json();

    // Weather data format করা
    const weatherData = {
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

    return NextResponse.json(weatherData);

  } catch (error) {
    console.error("Weather API Error:", error);
    
    // Fallback to mock data
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district') || 'ঢাকা';
    
    return NextResponse.json(generateMockWeather(district));
  }
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
    'Haze': 'ধোঁয়াশা'
  };
  
  return translations[condition] || condition;
}

// Mock Weather Data (Fallback যখন API না থাকে)
function generateMockWeather(district) {
  // নভেম্বর মাসের বাংলাদেশের সাধারণ আবহাওয়া
  const baseTemp = 25 + Math.random() * 5; // 25-30°C
  const baseHumidity = 65 + Math.random() * 15; // 65-80%
  
  const conditions = ['পরিষ্কার', 'আংশিক মেঘলা', 'মেঘলা', 'গুঁড়ি গুঁড়ি বৃষ্টি'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
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
}