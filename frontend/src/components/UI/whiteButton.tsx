"use client"
import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
  downloadUrl?: string; // URL to the installer file
  downloadFileName?: string; // Optional custom filename
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  onClick,
  className = '',
  downloadUrl,
  downloadFileName
}: ButtonProps) {
  const baseStyles = "flex justify-center items-center gap-2 border-2 rounded-2xl font-medium transition-all duration-200 hover:opacity-80";
  
  const variants = {
    primary: "border-[#515151] bg-[#D9D9D9]/10 text-[#D9D9D9]",
    secondary: "border-[#D9D9D9] bg-white text-[#191919]"
  };
  
  const sizes = {
    sm: "h-6 px-3 text-xs",
    md: "h-8 px-6 text-sm",
    lg: "h-12 px-8 text-base"
  };

  const handleDownload = async () => {
    if (downloadUrl) {
      try {
        // Method 1: Direct download for files hosted on your server
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = downloadFileName || 'installer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Alternative Method 2: For external files or when you need more control
        // const response = await fetch(downloadUrl);
        // const blob = await response.blob();
        // const url = window.URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = downloadFileName || 'installer';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        // window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
        // You might want to show a toast notification here
      }
    }
    
    // Call the original onClick if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleDownload}
    >
      {children}
      {showArrow && (
        <Image
          src="/arrow-icon.svg" // Make sure you have this icon
          alt="Arrow"
          width={16}
          height={16}
        />
      )}
    </button>
  );
}