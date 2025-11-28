'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // Next Image ইমপোর্ট

function NetworkVisualization() {
  const [containerSize, setContainerSize] = useState({
    width: 600,
    height: 600
  });

  const dimensions = useMemo(() => {
    const baseSize = Math.min(containerSize.width, containerSize.height);
    const scale = baseSize / 700;
    return {
      containerSize: baseSize,
      outerRadius: Math.floor(290 * scale),
      innerRadius: Math.floor(180 * scale),
      centerImageSize: Math.floor(140 * scale),
      outerAvatarSize: Math.floor(70 * scale),
      innerAvatarSize: Math.floor(60 * scale),
      outerImageSize: Math.floor(56 * scale),
      innerImageSize: Math.floor(48 * scale),
      strokeWidth: Math.max(1, Math.floor(2 * scale)),
      tooltipTextSize: scale < 0.6 ? 'text-xs' : 'text-sm',
      centerX: baseSize / 2,
      centerY: baseSize / 2
    };
  }, [containerSize]);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const maxWidth = Math.min(width - 32, 600);
      setContainerSize({
        width: maxWidth,
        height: maxWidth
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const avatars = useMemo(() => {
    return [
      { id: 1, name: "রহিম (কুমিল্লা)", image: "https://randomuser.me/api/portraits/men/32.jpg", ring: "outer" },
      { id: 2, name: "করিম (বগুড়া)", image: "https://randomuser.me/api/portraits/men/45.jpg", ring: "outer" },
      { id: 3, name: "সুমি (রংপুর)", image: "https://randomuser.me/api/portraits/women/44.jpg", ring: "outer" },
      { id: 4, name: "জামাল (সিলেট)", image: "https://randomuser.me/api/portraits/men/22.jpg", ring: "outer" },
      { id: 5, name: "রফিক (দিনাজপুর)", image: "https://randomuser.me/api/portraits/men/11.jpg", ring: "outer" },
      { id: 6, name: "হাসান (খুলনা)", image: "https://randomuser.me/api/portraits/men/5.jpg", ring: "outer" },
      { id: 7, name: "আড়তদার ১", image: "https://randomuser.me/api/portraits/men/86.jpg", ring: "inner" },
      { id: 8, name: "পাইকারি বাজার", image: "https://randomuser.me/api/portraits/men/64.jpg", ring: "inner" },
      { id: 9, name: "কৃষি অফিসার", image: "https://randomuser.me/api/portraits/women/65.jpg", ring: "inner" },
      { id: 10, name: "ট্রান্সপোর্ট", image: "https://randomuser.me/api/portraits/men/76.jpg", ring: "inner" },
      { id: 11, name: "আবহাওয়া কেন্দ্র", image: "https://randomuser.me/api/portraits/women/33.jpg", ring: "inner" },
      { id: 12, name: "সালাম (ফেনী)", image: "https://randomuser.me/api/portraits/men/51.jpg", ring: "outer" },
    ];
  }, []);

  const outerRingAvatars = avatars.filter(a => a.ring === 'outer');
  const innerRingAvatars = avatars.filter(a => a.ring === 'inner');
  const [activeConnections, setActiveConnections] = useState([]);

  const allAvatarPositions = useMemo(() => {
    const getAvatarAbsolutePosition = (index, total, radius, startAngleOffset = 0) => {
      const angle = startAngleOffset + index / total * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return { cx: dimensions.centerX + x, cy: dimensions.centerY + y };
    };
    const positions = {};
    outerRingAvatars.forEach((avatar, index) => {
      positions[avatar.id] = getAvatarAbsolutePosition(index, outerRingAvatars.length, dimensions.outerRadius, Math.PI / 2);
    });
    innerRingAvatars.forEach((avatar, index) => {
      positions[avatar.id] = getAvatarAbsolutePosition(index, innerRingAvatars.length, dimensions.innerRadius, Math.PI / 3);
    });
    positions['center'] = { cx: dimensions.centerX, cy: dimensions.centerY };
    return positions;
  }, [dimensions, outerRingAvatars, innerRingAvatars]);

  const allConnectionPoints = useMemo(() => [...avatars.map(a => a.id), 'center'], [avatars]);
  const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    const interval = setInterval(() => {
      let from, to, newConnection = null;
      let attempts = 0;
      do {
        from = getRandomElement(allConnectionPoints);
        to = getRandomElement(allConnectionPoints);
        attempts++;
        if (from !== to) {
          newConnection = { from, to, color: getRandomElement(['#10b981', '#f59e0b', '#3b82f6', '#059669']) }; 
          break;
        }
      } while (attempts < 10);
      setActiveConnections(newConnection ? [newConnection] : []);
    }, 2000);
    return () => clearInterval(interval);
  }, [allConnectionPoints]);

  const isCurrentlyConnected = id => activeConnections.some(conn => conn.from === id || conn.to === id);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-hind">
      
      {/* নতুন টেক্সট সেকশন */}
      <div className="text-center mb-8 px-4">
        <h3 className="text-2xl md:text-5xl font-bold font-tiro-bangla text-slate-800 mb-2">
          আমাদের <span className="text-emerald-600">লাইভ নেটওয়ার্ক</span>
        </h3>
        <p className="text-slate-600 max-w-md mx-auto text-sm md:text-lg">
          সারা দেশজুড়ে আমাদের কৃষক, বিশেষজ্ঞ এবং ক্রেতারা একে অপরের সাথে সংযুক্ত। প্রযুক্তির ছোঁয়ায় গড়ে উঠছে শক্তিশালী কৃষি ইকোসিস্টেম।
        </p>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden min-h-[400px]" style={{ width: '100%', maxWidth: '600px', aspectRatio: '1/1' }}>
        <div className="relative" style={{ width: `${dimensions.containerSize}px`, height: `${dimensions.containerSize}px` }}>
          
          <div className="absolute border-2 border-dashed border-emerald-400/30 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" style={{ width: `${dimensions.outerRadius * 2}px`, height: `${dimensions.outerRadius * 2}px` }}></div>
          <div className="absolute border-2 border-dashed border-amber-400/30 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite_reverse]" style={{ width: `${dimensions.innerRadius * 2}px`, height: `${dimensions.innerRadius * 2}px` }}></div>

          {/* সেন্টার ইমেজ - Next Image ব্যবহার করা হয়েছে */}
          <div className="absolute shadow-2xl z-10 cursor-pointer bg-white rounded-full p-2" style={{ left: `${dimensions.centerX}px`, top: `${dimensions.centerY}px`, transform: `translate(-50%, -50%)` }}>
            <div className="rounded-full overflow-hidden bg-emerald-50" style={{ width: `${dimensions.centerImageSize}px`, height: `${dimensions.centerImageSize}px` }}>
              <Image 
                src="/images/logo.png" 
                alt="Golaghor Hub" 
                width={200}
                height={200}
                className="w-full h-full object-contain p-4"
                unoptimized 
              />
            </div>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full font-bold shadow-lg text-sm whitespace-nowrap">
              গোলাঘর সার্ভার
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <AnimatePresence>
              {activeConnections.map(conn => {
                const fromPos = allAvatarPositions[conn.from];
                const toPos = allAvatarPositions[conn.to];
                if (!fromPos || !toPos) return null;
                return <motion.line key={`${conn.from}-${conn.to}`} x1={fromPos.cx} y1={fromPos.cy} x2={toPos.cx} y2={toPos.cy} stroke={conn.color} strokeWidth={dimensions.strokeWidth} strokeOpacity="0.6" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />;
              })}
            </AnimatePresence>
          </svg>

          {/* আউটার রিং আইকন - Next Image */}
          {outerRingAvatars.map(avatar => {
            const { cx, cy } = allAvatarPositions[avatar.id];
            const isActive = isCurrentlyConnected(avatar.id);
            return (
              <div key={avatar.id} className="absolute transition-all duration-300" style={{ left: `${cx}px`, top: `${cy}px`, transform: `translate(-50%, -50%) scale(${isActive ? 1.2 : 1})` }}>
                <div className={`bg-white rounded-full p-1 shadow-md border-2 ${isActive ? 'border-emerald-500' : 'border-slate-100'}`} style={{ width: `${dimensions.outerAvatarSize}px`, height: `${dimensions.outerAvatarSize}px` }}>
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image 
                      src={avatar.image} 
                      alt={avatar.name} 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized // এক্সটার্নাল URL এর জন্য
                    />
                  </div>
                  {isActive && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap z-20">
                      {avatar.name}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* ইনার রিং আইকন - Next Image */}
          {innerRingAvatars.map(avatar => {
            const { cx, cy } = allAvatarPositions[avatar.id];
            const isActive = isCurrentlyConnected(avatar.id);
            return (
              <div key={avatar.id} className="absolute transition-all duration-300" style={{ left: `${cx}px`, top: `${cy}px`, transform: `translate(-50%, -50%) scale(${isActive ? 1.2 : 1})` }}>
                <div className={`bg-white rounded-full p-1 shadow-md border-2 ${isActive ? 'border-amber-500' : 'border-slate-100'}`} style={{ width: `${dimensions.innerAvatarSize}px`, height: `${dimensions.innerAvatarSize}px` }}>
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image 
                      src={avatar.image} 
                      alt={avatar.name} 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                  {isActive && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap z-20">
                      {avatar.name}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NetworkVisualization;