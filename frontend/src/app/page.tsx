import Image from "next/image";
import GradientContainer from "@/components/UI/gradientContainer";

export default function Home() {
  return (
    <div className="bg-[#191919] min-w-screen min-h-screen p-12">
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
        containerHeight="h-[calc(100vh-6rem)]"
        className="bg-[#191919] relative"
        rounded="rounded-2xl"
      >

      <Image
        src="/home/HeroBorder.svg"
        alt="Gradient Border"
        width={374}
        height={89}
        className="absolute translate-x-[20%]"
      />

      <Image
        src="/home/HeroBorder.svg"
        alt="Gradient Border"
        width={374}
        height={89}
        className="absolute bottom-0 right-0 scale-x-[-1] scale-y-[-1] translate-x-[-20%]"
      />

      <div className="flex flex-col justify-center items-center min-w-full min-h-full space-y-4">
        <div className="h-8 w-fit px-6 flex justify-center items-center gap-2 border-2 border-[#515151] bg-[#D9D9D9]/10 rounded-2xl">
          <h3 className="text-[#D9D9D9] text-md text-center font-medium">Get Started Now</h3>
          <Image
            src="/home/HyperlinkArrow.svg"
            alt="Hyperlink Arrow"
            width={10}
            height={10}
            className="pt-0.5"
          />
        </div>
        <h1 className="text-[#D9D9D9] text-5xl/snug font-semibold text-center">See, Hear, Understand <br /> The AI that gets it instantly</h1>
        <h2 className="text-[#D9D9D9] text-md text-center font-thin w-[56rem]"> Have a personal assistant AI that sees your screen, hears your calls, and  knows everything you need before you ask. 
Your AI that knows without asking</h2>
      </div>

      </GradientContainer>
    </div>
  );
}