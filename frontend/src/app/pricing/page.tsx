import CustomNavbar from "@/components/navbar";
import Footer from "@/components/home/footer";

export default function PricingPage() {
  return (
    <>
      <CustomNavbar />
      <div className="bg-[#191919] w-full min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Pricing Plans
            </h1>
            <p className="text-xl text-[#D9D9D9] max-w-2xl mx-auto">
              Choose the perfect plan for your needs
            </p>
          </div>
          
          {/* Pricing cards would go here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Example pricing card */}
            <div className="bg-[#2A2A2A] rounded-lg p-8 border border-[#404040]">
              <h3 className="text-2xl font-semibold text-white mb-4">Starter</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $9<span className="text-lg text-[#D9D9D9]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-[#D9D9D9]">✓ Feature 1</li>
                <li className="text-[#D9D9D9]">✓ Feature 2</li>
                <li className="text-[#D9D9D9]">✓ Feature 3</li>
              </ul>
              <button className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Get Started
              </button>
            </div>
            
            {/* Add more pricing cards as needed */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}