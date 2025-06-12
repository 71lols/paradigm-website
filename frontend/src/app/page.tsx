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
        className="bg-[#191919]"
        rounded="rounded-2xl"
      >
      </GradientContainer>
    </div>
  );
}