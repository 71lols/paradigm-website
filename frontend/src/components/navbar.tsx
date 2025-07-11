// CustomNavbar.tsx - Complete implementation
"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/UI/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/auth/authContext";
import { motion, AnimatePresence } from "motion/react";

// Custom NavbarLogo to match your theme
const CustomNavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center justify-center space-x-2 px-2 pb-1 text-sm font-normal"
    >
      <Image
        src="/Logo.png"
        alt="Paradigm Logo"
        width={150}
        height={125}
        className="object-contain border-white"
        priority
      />
    </Link>
  );
};

export default function CustomNavbar() {
  const { user } = useAuth();
  const navItems = [
    {
      name: "How it works",
      link: "/#how-it-works",
    },
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Help",
      link: "/help",
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll function
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    // Only prevent default and smooth scroll for hash links (same-page navigation)
    if (link.startsWith('#')) {
      e.preventDefault();
      
      // Remove # from the link to get the element ID
      const targetId = link.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Calculate offset for fixed navbar (adjust this value as needed)
        const navbarOffset = 100;
        const elementPosition = targetElement.offsetTop - navbarOffset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      setIsMobileMenuOpen(false);
    } else {
      // For actual routes (like /pricing), just close mobile menu and let default navigation happen
      setIsMobileMenuOpen(false);
      // Don't prevent default - let the browser navigate normally
    }
  };

  return (
    <Navbar className="fixed inset-x-0 top-4 z-50 w-full">
      {/* Desktop Navigation */}
      <NavBody className="bg-[#191919]/80 backdrop-blur-md rounded-full mx-auto [&.bg-white\/80]:!border [&.bg-white\/80]:!border-[#333333] dark:[&.bg-neutral-950\/80]:!border dark:[&.bg-neutral-950\/80]:!border-[#333333]">
        {({ visible }) => (
          <>
            <CustomNavbarLogo />
            <NavItems 
              items={navItems} 
              className="[&>a]:text-[#D9D9D9] [&>a:hover]:text-white [&_.bg-gray-100]:!bg-[#333333] dark:[&_.bg-neutral-800]:!bg-[#333333]"
              onItemClick={(e, link) => handleNavClick(e, link)}
            />
            <div className="flex items-center gap-3 relative z-10">
              {user ? (
                <>
                  {/* Animated Welcome Message */}
                  <AnimatePresence mode="wait">
                    {!visible && (
                      <motion.span
                        key="welcome-message"
                        initial={{ 
                          opacity: 0, 
                          width: 0, 
                          marginRight: 0,
                          overflow: "hidden"
                        }}
                        animate={{ 
                          opacity: 1, 
                          width: "auto", 
                          marginRight: "12px",
                          transition: {
                            opacity: { duration: 0.3, delay: 0.2 },
                            width: { duration: 0.4, ease: "easeOut" },
                            marginRight: { duration: 0.4, ease: "easeOut" }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          width: 0, 
                          marginRight: 0,
                          transition: {
                            opacity: { duration: 0.2 },
                            width: { duration: 0.3, ease: "easeIn" },
                            marginRight: { duration: 0.3, ease: "easeIn" }
                          }
                        }}
                        className="block px-4 py-2 rounded-xl text-sm font-medium text-[#D9D9D9] whitespace-nowrap"
                        style={{ overflow: "hidden" }}
                      >
                        Welcome, {user.displayName || user.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Dashboard Button */}
                  <Link href="/dashboard" className="cursor-pointer relative z-10">
                    <span className="block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 bg-[#D9D9D9]/10 border-2 border-[#515151] text-[#D9D9D9] cursor-pointer">
                      Dashboard
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="cursor-pointer relative z-10">
                    <span className="block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 text-[#D9D9D9] hover:text-white cursor-pointer">
                      Login
                    </span>
                  </Link>
                  <Link href="/signup" className="cursor-pointer relative z-10">
                    <span className="block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 bg-[#D9D9D9]/10 border-2 border-[#515151] text-[#D9D9D9] cursor-pointer">
                      Sign up
                    </span>
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="bg-[#191919]/80 backdrop-blur-md mx-auto [&.bg-white\/80]:!border [&.bg-white\/80]:!border-[#333333] dark:[&.bg-neutral-950\/80]:!border dark:[&.bg-neutral-950\/80]:!border-[#333333]">
        {() => (
          <>
            <MobileNavHeader>
              <CustomNavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              className="bg-[#191919] border border-[#333333]"
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className="text-[#D9D9D9] hover:text-white"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
                {user ? (
                  <>
                    {/* Mobile Welcome Message - Always visible on mobile */}
                    <span className="px-4 py-2 rounded-xl text-sm font-medium text-[#D9D9D9] w-full text-left">
                      Welcome, {user.displayName || user.email}
                    </span>
                    <Link href="/dashboard" className="w-full cursor-pointer">
                      <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 bg-[#D9D9D9]/10 border-2 border-[#515151] text-[#D9D9D9] w-full justify-center cursor-pointer"
                      >
                        Dashboard
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="w-full cursor-pointer">
                      <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 text-[#D9D9D9] hover:text-white w-full justify-center cursor-pointer"
                      >
                        Login
                      </button>
                    </Link>
                    <Link href="/signup" className="w-full cursor-pointer">
                      <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 bg-[#D9D9D9]/10 border-2 border-[#515151] text-[#D9D9D9] w-full justify-center cursor-pointer"
                      >
                        Sign up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </MobileNavMenu>
          </>
        )}
      </MobileNav>
    </Navbar>
  );
}