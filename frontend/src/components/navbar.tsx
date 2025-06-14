"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/UI/resizable-navbar";
import { useState } from "react";

// Custom NavbarLogo to match your theme
const CustomNavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <span className="font-semibold text-[#D9D9D9]">LOGO</span>
    </a>
  );
};

// Custom NavbarButton to match your theme
const CustomNavbarButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80";
  
  const variants = {
    primary: "bg-[#D9D9D9]/10 border-2 border-[#515151] text-[#D9D9D9]",
    secondary: "text-[#D9D9D9] hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function CustomNavbar() {
  const navItems = [
    {
      name: "How it works",
      link: "#how-it-works",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Help",
      link: "#help",
    },
    {
      name: "Contact Us",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll function
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
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
  };

  return (
    <Navbar className="fixed inset-x-0 top-4 z-50 w-full">
      {/* Desktop Navigation */}
      <NavBody className="bg-[#191919]/80 backdrop-blur-md rounded-full mx-auto [&.bg-white\/80]:!border [&.bg-white\/80]:!border-[#333333] dark:[&.bg-neutral-950\/80]:!border dark:[&.bg-neutral-950\/80]:!border-[#333333]">
        <CustomNavbarLogo />
        <NavItems 
          items={navItems} 
          className="[&>a]:text-[#D9D9D9] [&>a:hover]:text-white [&_.bg-gray-100]:!bg-[#333333] dark:[&_.bg-neutral-800]:!bg-[#333333]"
          onItemClick={(e, link) => handleNavClick(e, link)}
        />
        <div className="flex items-center gap-3">
          <CustomNavbarButton variant="secondary">Login</CustomNavbarButton>
          <CustomNavbarButton variant="primary">Sign in</CustomNavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="bg-[#191919]/80 backdrop-blur-md mx-auto [&.bg-white\/80]:!border [&.bg-white\/80]:!border-[#333333] dark:[&.bg-neutral-950\/80]:!border dark:[&.bg-neutral-950\/80]:!border-[#333333]">
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
            <CustomNavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className="w-full justify-center"
            >
              Login
            </CustomNavbarButton>
            <CustomNavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full justify-center"
            >
              Sign in
            </CustomNavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}