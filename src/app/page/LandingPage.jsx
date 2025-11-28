// page/HeroSection.jsx (your existing hero section)
// ... your existing HeroSection code ...

// page/LandingPage.jsx
"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, CloudRain, Warehouse, Camera } from 'lucide-react';
import ProblemSection from '@/components/ui/ProblemSection';
import SolutionFlowSection from '@/components/ui/SolutionFlowSection';
import FeaturesSection from '@/components/ui/FeaturesSection';
import VideoPlay from '@/components/ui/VideoPlay';
import NetworkVisualization from '@/components/NetworkVisualization';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFFEE]">
      {/* Problem Section - Red Zone */}
      <ProblemSection />
      
      {/* Solution Flow Section */}
      <SolutionFlowSection />
       <VideoPlay/>
      
      {/* Features Section */}
      <FeaturesSection />
      <NetworkVisualization />
    </div>
  );
}




