export default function HowItWorks() {
  return (
    <section className="bg-[#191919] py-16 px-4 sm:px-6 md:px-8 lg:px-12 h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#888888] text-sm font-medium mb-4">How It Works</p>
          <h2 className="text-[#D9D9D9] text-3xl sm:text-4xl md:text-5xl font-semibold">
            Paradigm understand everything <br />
            you hear and see
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
          
          {/* Left Column - Sees */}
          <div className="bg-[#1D1D1D] rounded-lg p-6">
            {/* Terminal Mockup */}
            <div className="bg-[#242424] rounded-lg p-4 border border-[#656565] mb-6">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-[#1D1D1D] border border-[#656565] rounded px-2 py-1 flex items-center space-x-1">
                    <span className="text-[#D9D9D9] text-xs">Chat</span>
                    <span className="text-[#888888] text-xs">⌘I</span>
                  </div>
                  <div className="bg-[#1D1D1D] border border-[#656565] rounded px-2 py-1 flex items-center space-x-1">
                    <span className="text-[#D9D9D9] text-xs">Ask AI</span>
                    <span className="text-[#888888] text-xs">⌘I</span>
                  </div>
                  <div className="bg-[#1D1D1D] border border-[#656565] rounded px-2 py-1 flex items-center space-x-1">
                    <span className="text-[#D9D9D9] text-xs">Restart</span>
                    <span className="text-[#888888] text-xs">⌘R</span>
                  </div>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="text-[#D9D9D9] text-sm">
                <p className="text-[#888888]">Analyzing screen...</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-[#D9D9D9] text-xl font-semibold mb-3">Sees what you see</h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                Sees your entire screen to know what you&apos;re working on across 
                all apps and websites
              </p>
            </div>
          </div>

          {/* Right Column - Hears */}
          <div className="bg-[#1D1D1D] rounded-lg p-6">
            {/* Terminal Mockup */}
            <div className="bg-[#242424] rounded-lg p-4 border border-[#656565] mb-6">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-xs text-[#D9D9D9]">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>00:36</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#1D1D1D] border border-[#656565] rounded px-2 py-1 flex items-center space-x-1">
                    <span className="text-[#D9D9D9] text-xs">Chat</span>
                    <span className="text-[#888888] text-xs">⌘I</span>
                  </div>
                  <div className="bg-[#1D1D1D] border border-[#656565] rounded px-2 py-1 flex items-center space-x-1">
                    <span className="text-[#D9D9D9] text-xs">Ask AI</span>
                    <span className="text-[#888888] text-xs">⌘I</span>
                  </div>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="space-y-3 text-sm">
                <p className="text-[#888888]">
                  I&apos;m thinking of building this AI assistant that can be able to 
                  see what you&apos;re seeing and hear what you&apos;re hearing.
                </p>
                <div className="bg-[#1E3A8A] text-[#D9D9D9] px-3 py-2 rounded inline-block">
                  Awesome! What tech stack should we use
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-[#D9D9D9] text-xl font-semibold mb-3">Hears what you hear</h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                AI assistant listens in the background and understands meetings, 
                videos, and everything happening on your computer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}