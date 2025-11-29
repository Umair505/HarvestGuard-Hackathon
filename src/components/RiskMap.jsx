"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- ১. কাস্টম আইকন কনফিগারেশন ---
const createIcon = (color, pulse = false) => {
  return new L.DivIcon({
    className: "custom-icon",
    html: `
      <div style="position: relative; width: 24px; height: 24px;">
        ${pulse ? `<div style="position: absolute; width: 100%; height: 100%; background-color: ${color}; border-radius: 50%; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
        ">
          <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
        </div>
        <style>
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        </style>
      </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const icons = {
  user: createIcon("#3b82f6", true), // Blue with Pulse
  low: createIcon("#10b981"),        // Green
  medium: createIcon("#f59e0b"),     // Yellow
  high: createIcon("#ef4444"),       // Red
};

// --- ২. মক ডাটা জেনারেটর (চট্টগ্রাম বেসড) ---
// ২নং গেইট, অক্সিজেন, বায়েজিদ, খুলশী এলাকা টার্গেট করা হয়েছে
const generateMockNeighbors = (centerLat, centerLng) => {
  const neighbors = [];
  
  // কিছু নির্দিষ্ট পয়েন্ট (Landmarks)
  const landmarks = [
    { name: "অক্সিজেন মোড় এলাকা", lat: 22.3925, lng: 91.8155 },
    { name: "ইস্ট ডেল্টা ইউনিভার্সিটি (EDU)", lat: 22.3785, lng: 91.8037 },
    { name: "মুরাদপুর", lat: 22.3640, lng: 91.8330 },
    { name: "জিইসি মোড়", lat: 22.3586, lng: 91.8120 },
    { name: "বায়েজিদ বোস্তামী", lat: 22.3850, lng: 91.8050 },
  ];

  // ল্যান্ডমার্কগুলো যোগ করা
  landmarks.forEach((loc, i) => {
    const riskTypes = ["Low", "Medium", "High"];
    // র‍্যান্ডমলি ঝুঁকি ঠিক করা, তবে অক্সিজেন বা EDU এর দিকে একটু ভ্যারিয়েশন রাখা
    const risk = riskTypes[Math.floor(Math.random() * riskTypes.length)];
    
    neighbors.push({
      id: `landmark-${i}`,
      lat: loc.lat + (Math.random() - 0.5) * 0.005, // সামান্য এদিক সেদিক
      lng: loc.lng + (Math.random() - 0.5) * 0.005,
      risk,
      area: loc.name,
      crop: ["ধান (Paddy)", "শাক-সবজি", "ভুট্টা"][Math.floor(Math.random() * 3)],
      updated: `${Math.floor(Math.random() * 5) + 1} ঘণ্টা আগে`
    });
  });

  // আরও কিছু র‍্যান্ডম পয়েন্ট
  for (let i = 0; i < 8; i++) {
    const lat = centerLat + (Math.random() - 0.5) * 0.06;
    const lng = centerLng + (Math.random() - 0.5) * 0.06;
    
    const riskTypes = ["Low", "Medium", "High"];
    const risk = riskTypes[Math.floor(Math.random() * riskTypes.length)];
    
    neighbors.push({
      id: i,
      lat,
      lng,
      risk,
      area: "আশেপাশের খামার",
      crop: "ধান (Paddy)",
      updated: `${Math.floor(Math.random() * 12) + 1} ঘণ্টা আগে`
    });
  }
  return neighbors;
};

export default function RiskMap() {
  // চট্টগ্রাম ২নং গেইট (ষোলশহর) কোঅর্ডিনেট
  const userLocation = { lat: 22.3685, lng: 91.8236 }; 
  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    const data = generateMockNeighbors(userLocation.lat, userLocation.lng);
    setNeighbors(data);
  }, []);

  return (
    <div className="w-full h-[600px] rounded-2xl relative z-0 bg-slate-100">
      <MapContainer 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={13} 
        style={{ height: "100%", width: "100%", borderRadius: "1.5rem" }}
        scrollWheelZoom={true} // Changed from false to true to enable scroll zoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* --- ইউজারের অবস্থান (নীল পিন) --- */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={icons.user}>
          <Popup>
            <div className="font-sans text-center p-1">
              <h3 className="font-bold text-blue-600 text-base">আপনার খামার</h3>
              <p className="text-xs text-slate-500">২নং গেইট, চট্টগ্রাম</p>
              <div className="mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full inline-block">
                নিরাপদ জোন
              </div>
            </div>
          </Popup>
        </Marker>
        
        {/* সেফ জোন সার্কেল */}
        <Circle 
          center={[userLocation.lat, userLocation.lng]}
          pathOptions={{ fillColor: '#3b82f6', color: '#3b82f6', opacity: 0.1, fillOpacity: 0.05 }}
          radius={2000} 
        />

        {/* --- প্রতিবেশীদের অবস্থান --- */}
        {neighbors.map((neighbor) => (
          <Marker 
            key={neighbor.id} 
            position={[neighbor.lat, neighbor.lng]}
            icon={neighbor.risk === "High" ? icons.high : neighbor.risk === "Medium" ? icons.medium : icons.low}
          >
            <Popup>
              <div className="font-sans min-w-[160px]">
                <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-800 text-sm">{neighbor.area}</span>
                </div>
                
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-xs">ফসল:</span>
                    <span className="font-medium text-slate-700">{neighbor.crop}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs">ঝুঁকি:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                      neighbor.risk === "High" ? "bg-red-500" : 
                      neighbor.risk === "Medium" ? "bg-amber-500" : "bg-emerald-500"
                    }`}>
                      {neighbor.risk === "High" ? "উচ্চ" : 
                       neighbor.risk === "Medium" ? "মাঝারি" : "কম"}
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 mt-2 text-right italic">
                    আপডেট: {neighbor.updated}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}