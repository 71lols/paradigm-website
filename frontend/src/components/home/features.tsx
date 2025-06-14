import Image from "next/image";
import GradientContainer from "@/components/UI/gradientContainer";

export default function Features() {
  return (
    <section className="bg-[#191919] py-16 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#888888] text-sm font-medium mb-4">Features</p>
          <h2 className="text-[#D9D9D9] text-3xl sm:text-4xl md:text-5xl font-semibold">
            Paradigm changes the <br />
            way you work
          </h2>
        </div>

        {/* Features Grid */}
        <div className="space-y-8">
          
          {/* Ask Anything */}
          <GradientContainer
            ellipses={[
              {
                id: 'ask-bottom-left',
                position: { x: 5, y: 95 },
                size: { width: 177.2, height: 181.3 },
                colors: { from: '#D9D9D9', to: 'transparent' },
                blur: 80,
                opacity: 40,
                rotation: -20,
                className: ''
              },
              {
                id: 'ask-top-right',
                position: { x: 95, y: 15 },
                size: { width: 250, height: 120 },
                colors: { from: '#D9D9D9', to: 'transparent' },
                blur: 70,
                opacity: 30,
                rotation: 0,
                className: ''
              }
            ]}
            containerHeight="h-80"
            className="relative overflow-hidden"
            rounded="rounded-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full p-8">
              <div className="h-full flex flex-col justify-end">
                <h3 className="text-[#D9D9D9] text-2xl sm:text-3xl font-semibold mb-4">Ask Anything</h3>
                <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                  Get instant answers about what you're seeing, hearing, or 
                  working on without switching apps.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/home/AskAnything.png"
                  alt="Ask Anything Feature"
                  width={400}
                  height={300}
                  className="w-full h-auto max-w-md object-contain"
                />
              </div>
            </div>
          </GradientContainer>

          {/* Adapts to You */}
          <GradientContainer
            ellipses={[
              {
                id: 'adapts-bottom-left',
                position: { x: 5, y: 95 },
                size: { width: 177.2, height: 181.3 },
                colors: { from: '#D9D9D9', to: 'transparent' },
                blur: 80,
                opacity: 40,
                rotation: -20,
                className: ''
              },
              {
                id: 'adapts-top-right',
                position: { x: 95, y: 15 },
                size: { width: 250, height: 120 },
                colors: { from: '#D9D9D9', to: 'transparent' },
                blur: 70,
                opacity: 30,
                rotation: 0,
                className: ''
              }
            ]}
            containerHeight="h-80"
            className="relative overflow-hidden"
            rounded="rounded-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full p-8">
              <div className="h-full flex flex-col justify-end">
                <h3 className="text-[#D9D9D9] text-2xl sm:text-3xl font-semibold mb-4">Adapts to You</h3>
                <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                  Customize the interface, move it anywhere on screen, 
                  and adjust settings to fit your workflow.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/home/AdaptsToYou.png"
                  alt="Adapts to You Feature"
                  width={400}
                  height={300}
                  className="w-full h-auto max-w-md object-contain"
                />
              </div>
            </div>
          </GradientContainer>

          {/* Works with Everything */}
          <GradientContainer
            ellipses={[
              {
                id: 'work-bottom-left',
                position: { x: 5, y: 95 },
                size: { width: 177.2, height: 181.3 },
                colors: { from: '#D9D9D9', to: 'transparent' },
                blur: 80,
                opacity: 40,
                rotation: -20,
                className: ''
              },
              {
                id: 'works-top-right',
                position: { x: 95, y: 15 },
                size: { width: 250, height: 120 },
                colors: { from: '#D9D9D9', to: 'transparent' },
                blur: 70,
                opacity: 30,
                rotation: 0,
                className: ''
              }
            ]}
            containerHeight="h-80"
            className="relative overflow-hidden"
            rounded="rounded-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full p-8">
              <div className="h-full flex flex-col justify-end">
                <h3 className="text-[#D9D9D9] text-2xl sm:text-3xl font-semibold mb-4">Works with Everything</h3>
                <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                  Seamlessly integrates with all your apps and tools 
                  without interrupting what you're doing.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/home/WorksWithAnything.png"
                  alt="Works with Everything Feature"
                  width={400}
                  height={300}
                  className="w-full h-auto max-w-md object-contain"
                />
              </div>
            </div>
          </GradientContainer>

        </div>
      </div>
    </section>
  );
}