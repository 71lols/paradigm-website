import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/howItWorks";

export default function Home() {
  return (
    <div className="bg-[#191919] w-full min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
      <Hero />
      <HowItWorks />
    </div>
  );
}