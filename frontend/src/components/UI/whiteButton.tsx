import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  showArrow = false,
  onClick,
  className = ''
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

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
      {showArrow && (
        <Image
          src="/home/HyperlinkArrow.svg"
          alt="Arrow"
          width={10}
          height={10}
          className="pt-0.5"
        />
      )}
    </button>
  );
}