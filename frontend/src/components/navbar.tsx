'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/UI/whiteButton';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-[#191919]/80 backdrop-blur-md border border-[#333333] rounded-full px-6 py-3">
        <div className="flex items-center justify-between space-x-8">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-[#D9D9D9] text-lg font-semibold">LOGO</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#how-it-works" className="text-[#D9D9D9] hover:text-white text-sm font-medium transition-colors">
              How it works
            </a>
            <a href="#features" className="text-[#D9D9D9] hover:text-white text-sm font-medium transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-[#D9D9D9] hover:text-white text-sm font-medium transition-colors">
              Pricing
            </a>
            <a href="#help" className="text-[#D9D9D9] hover:text-white text-sm font-medium transition-colors">
              Help
            </a>
            <a href="#contact" className="text-[#D9D9D9] hover:text-white text-sm font-medium transition-colors flex items-center">
              Contact Us
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6L16 12l-6 6" />
              </svg>
            </a>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="text-[#D9D9D9] hover:text-white text-sm font-medium transition-colors">
              Login
            </button>
            <Button variant="primary" size="sm">
              Sign in
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-[#D9D9D9] hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}