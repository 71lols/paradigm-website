"use client";

export default function Footer() {
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
  };

  return (
    <footer className="bg-[#191919] py-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column - Brand & Legal */}
          <div className="space-y-6">
            {/* Legal Links */}
            <div className="flex space-x-6">
              <a href="#" className="text-[#D9D9D9] text-sm hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-[#D9D9D9] text-sm hover:text-white transition-colors">
                Private Policy
              </a>
            </div>
            
            {/* Brand */}
            <div className="space-y-2">
              <h3 className="text-[#D9D9D9] text-xl font-semibold">Paradigm</h3>
              <h4 className="text-[#D9D9D9] text-lg">The Paradigm Shift</h4>
            </div>
            
            {/* Copyright */}
            <p className="text-[#888888] text-sm">
              Paradigm 2025. All Rights Reserved
            </p>
          </div>

          {/* Right Column - Navigation */}
          <div className="grid grid-cols-2 gap-8">
            
            {/* Navigation Links */}
            <div className="space-y-4">
              <a 
                href="#how-it-works" 
                onClick={(e) => handleNavClick(e, "#how-it-works")}
                className="block text-[#D9D9D9] text-sm hover:text-white transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleNavClick(e, "#features")}
                className="block text-[#D9D9D9] text-sm hover:text-white transition-colors"
              >
                Features
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => handleNavClick(e, "#pricing")}
                className="block text-[#D9D9D9] text-sm hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a 
                href="#help" 
                onClick={(e) => handleNavClick(e, "#help")}
                className="block text-[#D9D9D9] text-sm hover:text-white transition-colors"
              >
                Help
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, "#contact")}
                className="block text-[#D9D9D9] text-sm hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
            
            {/* Social Links */}
            <div className="space-y-4">
              <a href="#" className="block text-[#D9D9D9] text-sm hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="block text-[#D9D9D9] text-sm hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="block text-[#D9D9D9] text-sm hover:text-white transition-colors">
                Github
              </a>
              <a href="#" className="block text-[#D9D9D9] text-sm hover:text-white transition-colors">
                Discord
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}