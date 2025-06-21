'use client';
import Image from "next/image";
import GradientContainer from "@/components/UI/gradientContainer";
import { useCallback } from "react";

export default function Hero() {
  // Smooth scroll to CTA section
  const handleDownloadClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      const navbarOffset = 100;
      const elementPosition = targetElement.offsetTop - navbarOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <GradientContainer
      ellipses={[
        {
          id: 'bottom-left0',
          position: { x: 5, y: 90 },
          size: { width: 600, height: 300},
          colors: { from: '#D9D9D9', to: 'transparent' },
          blur: 100,
          opacity: 100,
          rotation: 37,
          className: ''
        },
        {
          id: 'bottom-left1',
          position: { x: 20, y: 95 },
          size: { width: 380, height: 160},
          colors: { from: '#B9FFC3', to: 'transparent' },
          blur: 100,
          opacity: 100,
          rotation: 37.28,
          className: 'border-2'
        },
        {
          id: 'top-right0',
          position: { x: 85, y: 15 },
          size: { width: 1104.94, height: 164.26 },
          colors: { from: '#D9D9D9', to: 'transparent' },
          blur: 70,
          opacity: 100,
          rotation: 35,
          className: '',
        },
        {
          id: 'top-right1',
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
      className="bg-[#191919] relative mt-12"
      rounded="rounded-2xl"
    >
      <Image
        src="/home/HeroBorder.svg"
        alt="Gradient Border"
        width={374}
        height={89}
        className="absolute translate-x-[20%] hidden md:block"
      />

      <Image
        src="/home/HeroBorder.svg"
        alt="Gradient Border"
        width={374}
        height={89}
        className="absolute bottom-0 right-0 translate-x-[-20%] scale-x-[-1] scale-y-[-1] hidden md:block"
      />

      <div className="flex flex-col justify-center items-center min-w-full min-h-full space-y-4 px-4 sm:px-6 md:px-8">
        <div
          className="h-8 w-fit px-4 sm:px-6 flex justify-center items-center gap-2 border-2 border-[#515151] bg-[#D9D9D9]/10 rounded-2xl cursor-pointer"
          onClick={handleDownloadClick}
        >
          <h3 className="text-[#D9D9D9] text-sm sm:text-md text-center font-medium">Download Now</h3>
          <Image
            src="/home/HyperlinkArrow.svg"
            alt="Hyperlink Arrow"
            width={10}
            height={10}
            className="pt-0.5"
          />
        </div>
        <h1 className="text-[#D9D9D9] text-3xl sm:text-4xl md:text-5xl lg:text-5xl/snug font-semibold text-center px-4">
          See, Hear, Understand <br /> The AI that gets it instantly
        </h1>
        <h2 className="text-[#D9D9D9] text-sm sm:text-md text-center font-thin w-full max-w-[56rem] px-4 sm:px-6 md:px-8">
          Have a personal assistant AI that sees your screen, hears your calls, and knows everything you need before you ask. 
          Your AI that knows without asking
        </h2>
      </div>
    </GradientContainer>
  );
}