"use client"
import { useState, useEffect } from "react";
import GradientContainer from "@/components/UI/gradientContainer";
import Button from "@/components/UI/whiteButton";

type DeviceType = 'windows' | 'mac' | 'unknown';

export default function CTASection() {
  const [deviceType, setDeviceType] = useState<DeviceType>('unknown');

  useEffect(() => {
    // Detect user's operating system
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('mac os x') || userAgent.includes('macintosh')) {
      setDeviceType('mac');
    } else if (userAgent.includes('windows')) {
      setDeviceType('windows');
    } else {
      setDeviceType('windows'); // Default to Windows
    }
  }, []);

  const downloadUrls = {
    windows: 'https://paradigm-backend.vercel.app/api/download/installer',
    macIntel: 'https://paradigm-backend.vercel.app/api/download/installer/mac',
    macSilicon: 'https://paradigm-backend.vercel.app/api/download/installer/mac-silicon'
  };

  const renderDownloadSection = () => {
    if (deviceType === 'mac') {
      return (
        <div className="flex flex-col items-center space-y-2">
          <Button 
            variant="secondary" 
            size="lg"
            isSplit={true}
            leftText="Intel"
            rightText="Apple"
            leftDownloadUrl={downloadUrls.macIntel}
            rightDownloadUrl={downloadUrls.macSilicon}
          />
          <a 
            href={downloadUrls.windows}
            className="text-[#888888] text-xs hover:text-[#B9FFC3] transition-colors cursor-pointer"
          >
            Download for Windows
          </a>
        </div>
      );
    } else {
      // Windows or unknown device
      return (
        <div className="flex flex-col items-center space-y-2">
          <Button 
            variant="secondary" 
            size="lg"
            downloadUrl={downloadUrls.windows}
          >
            Download for Windows
          </Button>
          <div className="flex items-center space-x-4 text-[#888888] text-xs">
            <a 
              href={downloadUrls.macIntel}
              className="hover:text-[#B9FFC3] transition-colors cursor-pointer"
            >
              Download for Mac Intel
            </a>
            <span className="text-[#666666]">•</span>
            <a 
              href={downloadUrls.macSilicon}
              className="hover:text-[#B9FFC3] transition-colors cursor-pointer"
            >
              Download for Mac Apple Silicon
            </a>
          </div>
        </div>
      );
    }
  };

  return (
    <GradientContainer
      ellipses={[
        {
          id: 'cta-bottom-left0',
          position: { x: 5, y: 90 },
          size: { width: 600, height: 300},
          colors: { from: '#D9D9D9', to: 'transparent' },
          blur: 100,
          opacity: 100,
          rotation: 37,
          className: ''
        },
        {
          id: 'cta-bottom-left1',
          position: { x: 20, y: 95 },
          size: { width: 380, height: 160},
          colors: { from: '#B9FFC3', to: 'transparent' },
          blur: 100,
          opacity: 100,
          rotation: 37.28,
          className: 'border-2'
        },
        {
          id: 'cta-top-right0',
          position: { x: 85, y: 15 },
          size: { width: 1104.94, height: 164.26 },
          colors: { from: '#D9D9D9', to: 'transparent' },
          blur: 70,
          opacity: 100,
          rotation: 35,
          className: '',
        },
        {
          id: 'cta-top-right1',
          position: { x: 97, y: 15 },
          size: { width: 392.12, height: 79.59 },
          colors: { from: '#D1F8D7', to: 'transparent' },
          blur: 100,
          opacity: 100,
          rotation: 35,
          className: '',
        }
      ]}
      containerHeight="h-[calc(100vh-6rem)] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]"
      className="bg-[#191919] relative"
      rounded="rounded-2xl"
    >
      <div className="flex flex-col justify-center items-center min-w-full min-h-full space-y-6 px-4 sm:px-6 md:px-8">
        <p className="text-[#888888] text-sm font-medium">Welcome to</p>
        <h1 className="text-[#D9D9D9] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center px-4">
          The Paradigm Shift
        </h1>
        
        {renderDownloadSection()}
      </div>
    </GradientContainer>
  );
}