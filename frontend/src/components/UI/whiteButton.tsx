"use client"
import Image from "next/image";

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
  downloadUrl?: string;
  downloadFileName?: string;
  // Split button props
  isSplit?: boolean;
  leftText?: string;
  rightText?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftDownloadUrl?: string;
  rightDownloadUrl?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  onClick,
  className = '',
  downloadUrl,
  downloadFileName,
  isSplit = false,
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
  leftDownloadUrl,
  rightDownloadUrl
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

  const handleDownload = async (url?: string, filename?: string) => {
    if (url) {
      try {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'installer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  const handleRegularClick = async () => {
    if (downloadUrl) {
      await handleDownload(downloadUrl, downloadFileName);
    }
    if (onClick) {
      onClick();
    }
  };

  const handleLeftClick = async () => {
    if (leftDownloadUrl) {
      await handleDownload(leftDownloadUrl);
    }
    if (onLeftClick) {
      onLeftClick();
    }
  };

  const handleRightClick = async () => {
    if (rightDownloadUrl) {
      await handleDownload(rightDownloadUrl);
    }
    if (onRightClick) {
      onRightClick();
    }
  };

  if (isSplit) {
    const baseClasses = `border-2 rounded-2xl ${variant === 'secondary' ? 'border-[#D9D9D9] bg-white text-[#191919]' : 'border-[#515151] bg-[#D9D9D9]/10 text-[#D9D9D9]'}`;
    const heightClass = size === 'lg' ? 'h-12' : size === 'md' ? 'h-8' : 'h-6';
    const textSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs';
    const totalWidth = size === 'lg' ? 'min-w-48' : size === 'md' ? 'min-w-40' : 'min-w-32';
    
    return (
      <div className={`flex ${baseClasses} ${heightClass} ${totalWidth} font-medium overflow-hidden ${className}`}>
        {/* Left half */}
        <div
          onClick={handleLeftClick}
          className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer px-4"
        >
          <span className={`${textSize} font-medium`}>{leftText}</span>
        </div>
        
        {/* Divider */}
        <div className="w-px h-full bg-current opacity-30 flex-shrink-0"></div>
        
        {/* Right half */}
        <div
          onClick={handleRightClick}
          className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer px-4"
        >
          <span className={`${textSize} font-medium`}>{rightText}</span>
        </div>
      </div>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleRegularClick}
    >
      {children}
      {showArrow && (
        <Image
          src="/arrow-icon.svg"
          alt="Arrow"
          width={16}
          height={16}
        />
      )}
    </button>
  );
}