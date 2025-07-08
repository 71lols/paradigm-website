'use client';
import CustomNavbar from "@/components/navbar";

export default function HelpPage() {
  return (
    <div className="bg-[#191919] min-h-screen">
      <CustomNavbar />
      {/* Header */}
      <div className="bg-[#191919] py-16 px-4 sm:px-6 md:px-8 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[#D9D9D9] text-4xl sm:text-5xl font-semibold mb-4">
            Paradigm User Guide
          </h1>
          <p className="text-[#888888] text-lg">
            Everything you need to know to get started with your AI assistant
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="flex gap-8">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-[#1D1D1D] rounded-lg p-6">
              <h3 className="text-[#D9D9D9] font-semibold mb-4">Contents</h3>
              <nav className="space-y-2">
                <a href="#getting-started" className="block text-[#888888] hover:text-[#B9FFC3] text-sm transition-colors">
                  Getting Started
                </a>
                <a href="#keyboard-shortcuts" className="block text-[#888888] hover:text-[#B9FFC3] text-sm transition-colors">
                  Keyboard Shortcuts
                </a>
                <a href="#how-to-use" className="block text-[#888888] hover:text-[#B9FFC3] text-sm transition-colors">
                  How to Use Paradigm
                </a>
                <a href="#audio-transcription" className="block text-[#888888] hover:text-[#B9FFC3] text-sm transition-colors">
                  Audio Transcription
                </a>
                <a href="#ai-contexts" className="block text-[#888888] hover:text-[#B9FFC3] text-sm transition-colors">
                  AI Contexts
                </a>
                <a href="#troubleshooting" className="block text-[#888888] hover:text-[#B9FFC3] text-sm transition-colors">
                  Troubleshooting
                </a>
                <a href="#support" className="block text-[#888888] hover:text-[#B9FFC3] text-sm transition-colors">
                  Contact Us
                </a>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-16">
        
        {/* Getting Started */}
        <section id="getting-started" className="bg-[#1D1D1D] rounded-lg p-8">
          <h2 className="text-[#D9D9D9] text-2xl font-semibold mb-6">Getting Started</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-3">1. Create Your Account</h3>
              <p className="text-[#888888] text-sm leading-relaxed mb-3">
                Before downloading the app, we recommend creating an account for the full experience. 
                You can <a href="/signup" className="text-[#B9FFC3] hover:underline">sign up here</a>:
              </p>
              <ul className="text-[#888888] text-sm space-y-1 ml-4">
                <li>• <strong className="text-[#D9D9D9]">Email/Password</strong>: Traditional signup with your email</li>
                <li>• <strong className="text-[#D9D9D9]">Google</strong>: Quick signup with your Google account</li>
                <li>• <strong className="text-[#D9D9D9]">GitHub</strong>: Perfect for developers - sign up with GitHub</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-3">2. Download & Installation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {/* Windows */}
                <div className="bg-[#242424] rounded-lg p-4 border border-[#3A3A3A]">
                  <h4 className="text-[#D9D9D9] font-medium mb-2">Windows</h4>
                  <ol className="text-[#888888] text-sm space-y-1">
                    <li>1. Download the Windows installer</li>
                    <li>2. <span className="text-yellow-400">⚠️</span> You&apos;ll see a blue Windows Defender warning</li>
                    <li>3. Click <strong>&ldquo;More info&rdquo;</strong> → <strong>&ldquo;Run anyway&rdquo;</strong></li>
                    <li>4. Follow the installation wizard</li>
                  </ol>
                </div>

                {/* Mac Intel */}
                <div className="bg-[#242424] rounded-lg p-4 border border-[#3A3A3A]">
                  <h4 className="text-[#D9D9D9] font-medium mb-2">Mac Intel</h4>
                  <ol className="text-[#888888] text-sm space-y-1">
                    <li>1. Download the Mac Intel version</li>
                    <li>2. <span className="text-yellow-400">⚠️</span> macOS will say app &ldquo;isn&apos;t safe&rdquo;</li>
                    <li>3. Go to <strong>Finder</strong> → locate <strong>Paradigm.app</strong></li>
                    <li>4. <strong>Right-click</strong> → <strong>&ldquo;Open&rdquo;</strong></li>
                  </ol>
                </div>

                {/* Apple Silicon */}
                <div className="bg-[#242424] rounded-lg p-4 border border-[#3A3A3A]">
                  <h4 className="text-[#D9D9D9] font-medium mb-2">Apple Silicon</h4>
                  <ol className="text-[#888888] text-sm space-y-1">
                    <li>1. Download the Apple Silicon version</li>
                    <li>2. <span className="text-yellow-400">⚠️</span> App isn&apos;t signed yet</li>
                    <li>3. Open <strong>Terminal</strong> and run:</li>
                  </ol>
                  <div className="bg-[#1A1A1A] rounded p-2 mt-2">
                    <code className="text-[#B9FFC3] text-xs">sudo xattr -d com.apple.quarantine /Applications/Paradigm.app</code>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-3">3. Connect Your Account</h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                When you first open Paradigm, you&apos;ll be prompted to connect the account you created earlier. 
                If you don&apos;t have an account yet, you can <a href="/login" className="text-[#B9FFC3] hover:underline">log in here</a> or 
                <a href="/signup" className="text-[#B9FFC3] hover:underline ml-1">create one</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section id="keyboard-shortcuts" className="bg-[#1D1D1D] rounded-lg p-8">
          <h2 className="text-[#D9D9D9] text-2xl font-semibold mb-6">Keyboard Shortcuts</h2>
          <p className="text-[#888888] text-sm leading-relaxed mb-6">
            Paradigm is designed for speed and efficiency through keyboard shortcuts:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-4">Core Functions</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-[#242424] rounded p-3">
                  <span className="text-[#D9D9D9] text-sm">Take screenshot</span>
                  <kbd className="bg-[#3A3A3A] text-[#D9D9D9] px-2 py-1 rounded text-xs">⌘ + H</kbd>
                </div>
                <div className="flex justify-between items-center bg-[#242424] rounded p-3">
                  <span className="text-[#D9D9D9] text-sm">Ask AI about screenshot</span>
                  <kbd className="bg-[#3A3A3A] text-[#D9D9D9] px-2 py-1 rounded text-xs">⌘ + Enter</kbd>
                </div>
                <div className="flex justify-between items-center bg-[#242424] rounded p-3">
                  <span className="text-[#D9D9D9] text-sm">Start new conversation</span>
                  <kbd className="bg-[#3A3A3A] text-[#D9D9D9] px-2 py-1 rounded text-xs">⌘ + R</kbd>
                </div>
                <div className="flex justify-between items-center bg-[#242424] rounded p-3">
                  <span className="text-[#D9D9D9] text-sm">Hide/show assistant</span>
                  <kbd className="bg-[#3A3A3A] text-[#D9D9D9] px-2 py-1 rounded text-xs">⌘ + B</kbd>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-4">Window Management</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-[#242424] rounded p-3">
                  <span className="text-[#D9D9D9] text-sm">Move window around</span>
                  <kbd className="bg-[#3A3A3A] text-[#D9D9D9] px-2 py-1 rounded text-xs">⌘ + Arrow Keys</kbd>
                </div>
              </div>
              
              <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg p-4 mt-4">
                <div className="flex items-start space-x-2">
                  <div className="text-yellow-400 text-sm">⚠️</div>
                  <div>
                    <p className="text-[#D9D9D9] text-xs font-medium mb-1">Important Note</p>
                    <p className="text-[#888888] text-xs leading-relaxed">
                      All shortcuts except hide/show (⌘+B) are disabled when the assistant is hidden
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="bg-[#1D1D1D] rounded-lg p-8">
          <h2 className="text-[#D9D9D9] text-2xl font-semibold mb-6">How to Use Paradigm</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#242424] rounded-lg p-4 text-center">
              <div className="text-[#B9FFC3] text-2xl mb-2">1</div>
              <h3 className="text-[#D9D9D9] font-medium mb-2">Take Screenshot</h3>
              <p className="text-[#888888] text-xs">Press ⌘+H to capture your screen</p>
            </div>
            <div className="bg-[#242424] rounded-lg p-4 text-center">
              <div className="text-[#B9FFC3] text-2xl mb-2">2</div>
              <h3 className="text-[#D9D9D9] font-medium mb-2">Ask AI</h3>
              <p className="text-[#888888] text-xs">Press ⌘+Enter to analyze</p>
            </div>
            <div className="bg-[#242424] rounded-lg p-4 text-center">
              <div className="text-[#B9FFC3] text-2xl mb-2">3</div>
              <h3 className="text-[#D9D9D9] font-medium mb-2">Chat</h3>
              <p className="text-[#888888] text-xs">Continue with follow-up questions</p>
            </div>
            <div className="bg-[#242424] rounded-lg p-4 text-center">
              <div className="text-[#B9FFC3] text-2xl mb-2">4</div>
              <h3 className="text-[#D9D9D9] font-medium mb-2">Restart</h3>
              <p className="text-[#888888] text-xs">Press ⌘+R for new conversation</p>
            </div>
          </div>

          <div className="bg-[#242424] rounded-lg p-4">
            <h3 className="text-[#B9FFC3] text-lg font-medium mb-3">Best Practices</h3>
            <ul className="text-[#888888] text-sm space-y-2">
              <li>• Screenshot coding problems, error messages, or anything you need help with</li>
              <li>• Be specific in your follow-up questions</li>
              <li>• Use the restart function to keep conversations focused</li>
              <li>• Make sure text is readable in screenshots</li>
            </ul>
          </div>
        </section>

        {/* Audio Transcription */}
        <section id="audio-transcription" className="bg-[#1D1D1D] rounded-lg p-8">
          <h2 className="text-[#D9D9D9] text-2xl font-semibold mb-6">Audio Transcription</h2>
          <p className="text-[#888888] text-sm leading-relaxed mb-6">
            Transform your voice into actionable insights. After processing, an Activity component appears on your 
            <a href="/dashboard" className="text-[#B9FFC3] hover:underline ml-1">dashboard</a>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-4">How It Works</h3>
              <ol className="text-[#888888] text-sm space-y-2">
                <li>1. <strong className="text-[#D9D9D9]">Turn on the microphone</strong> in the app</li>
                <li>2. <strong className="text-[#D9D9D9]">Speak your problem or thoughts</strong> - the model listens to everything</li>
                <li>3. <strong className="text-[#D9D9D9]">Stop the audio session</strong> when you&apos;re done</li>
                <li>4. <strong className="text-[#D9D9D9]">AI Processing</strong>: The model will either solve your problem or summarize what you said</li>
              </ol>
            </div>

            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-4">What You Get</h3>
              <div className="bg-[#242424] rounded-lg p-4">
                <p className="text-[#888888] text-sm mb-3">An Activity component appears on your dashboard with:</p>
                <ul className="text-[#888888] text-sm space-y-1">
                  <li>• <strong className="text-[#D9D9D9]">Summary</strong> of your audio session</li>
                  <li>• <strong className="text-[#D9D9D9]">Action items</strong> extracted from your speech</li>
                  <li>• <strong className="text-[#D9D9D9]">Full transcript</strong> of what was said</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI Contexts */}
        <section id="ai-contexts" className="bg-[#1D1D1D] rounded-lg p-8">
          <h2 className="text-[#D9D9D9] text-2xl font-semibold mb-6">AI Contexts</h2>
          <p className="text-[#888888] text-sm leading-relaxed mb-6">
            Personalize Paradigm to understand your specific needs. You can create and manage these on your 
            <a href="/dashboard" className="text-[#B9FFC3] hover:underline">dashboard</a>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-4">Creating & Using Contexts</h3>
              <div className="space-y-4">
                <div className="bg-[#242424] rounded-lg p-4">
                  <h4 className="text-[#D9D9D9] font-medium mb-2">Create</h4>
                  <ol className="text-[#888888] text-sm space-y-1">
                    <li>1. Go to your <a href="/dashboard" className="text-[#B9FFC3] hover:underline">Dashboard</a></li>
                    <li>2. Find AI Contexts section</li>
                    <li>3. Create contexts with your project details</li>
                  </ol>
                </div>
                
                <div className="bg-[#242424] rounded-lg p-4">
                  <h4 className="text-[#D9D9D9] font-medium mb-2">Activate</h4>
                  <ol className="text-[#888888] text-sm space-y-1">
                    <li>1. Activate a context on <a href="/dashboard" className="text-[#B9FFC3] hover:underline">dashboard</a></li>
                    <li>2. Return to Paradigm app</li>
                    <li>3. Click three dots (⋯) menu</li>
                    <li>4. Select &ldquo;Refresh Context&rdquo;</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[#B9FFC3] text-lg font-medium mb-4">Benefits</h3>
              <div className="bg-[#242424] rounded-lg p-4">
                <ul className="text-[#888888] text-sm space-y-2">
                  <li>• AI responses tailored to your projects</li>
                  <li>• Consistent understanding across conversations</li>
                  <li>• More relevant solutions and suggestions</li>
                </ul>
              </div>

              <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg p-4 mt-4">
                <h4 className="text-[#D9D9D9] text-sm font-medium mb-2">Tips</h4>
                <ul className="text-[#888888] text-xs space-y-1">
                  <li>• Keep contexts updated with current project info</li>
                  <li>• Be specific about your tech stack and preferences</li>
                  <li>• Refresh contexts regularly for best results</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="bg-[#1D1D1D] rounded-lg p-8">
          <h2 className="text-[#D9D9D9] text-2xl font-semibold mb-6">Troubleshooting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#242424] rounded-lg p-4">
                <h3 className="text-[#B9FFC3] font-medium mb-2">App Won&apos;t Open (macOS)</h3>
                <ul className="text-[#888888] text-sm space-y-1">
                  <li>• Try right-click → &ldquo;Open&rdquo; first</li>
                  <li>• For Apple Silicon, use the terminal command</li>
                  <li>• Check you downloaded the correct version</li>
                </ul>
              </div>

              <div className="bg-[#242424] rounded-lg p-4">
                <h3 className="text-[#B9FFC3] font-medium mb-2">Shortcuts Not Working</h3>
                <ul className="text-[#888888] text-sm space-y-1">
                  <li>• Make sure app isn&apos;t hidden (press ⌘+B)</li>
                  <li>• Verify correct modifier keys</li>
                  <li>• Restart app if unresponsive</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#242424] rounded-lg p-4">
                <h3 className="text-[#B9FFC3] font-medium mb-2">Audio Not Working</h3>
                <ul className="text-[#888888] text-sm space-y-1">
                  <li>• Check microphone permissions</li>
                  <li>• Verify audio input access in system settings</li>
                  <li>• Try restarting the audio session</li>
                </ul>
              </div>

              <div className="bg-[#242424] rounded-lg p-4">
                <h3 className="text-[#B9FFC3] font-medium mb-2">Context Not Loading</h3>
                <ul className="text-[#888888] text-sm space-y-1">
                  <li>• Click &ldquo;Refresh Context&rdquo; after activating</li>
                  <li>• Check internet connection</li>
                  <li>• Verify context was saved properly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section id="support" className="bg-[#1D1D1D] rounded-lg p-8">
          <h2 className="text-[#D9D9D9] text-2xl font-semibold mb-6">Still Have Questions?</h2>
          <p className="text-[#888888] text-sm leading-relaxed mb-6">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help! Reach out to our team:
          </p>
          
          <div className="bg-[#242424] rounded-lg p-6 text-center">
            <div className="text-[#B9FFC3] text-2xl mb-3">📧</div>
            <h3 className="text-[#D9D9D9] font-medium mb-2">Contact Us</h3>
            <p className="text-[#888888] text-sm mb-4">For any questions, bugs, feature requests, or feedback</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <a 
                href="mailto:chris.pengfei.ma@gmail.com" 
                className="text-[#B9FFC3] hover:underline text-sm"
              >
                chris.pengfei.ma@gmail.com
              </a>
              <span className="text-[#888888] text-sm hidden sm:inline">or</span>
              <a 
                href="mailto:cadenc.woss@gmail.com" 
                className="text-[#B9FFC3] hover:underline text-sm"
              >
                cadenc.woss@gmail.com
              </a>
            </div>
          </div>
          
          <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg p-4 mt-6">
            <p className="text-[#888888] text-xs text-center">
              💡 <strong className="text-[#D9D9D9]">Pro tip:</strong> Include your operating system and Paradigm version when reporting issues for faster support!
            </p>
          </div>
        </section>
        
        </div>
      </div>
    </div>
    </div>
  );
}