import CustomNavbar from "@/components/navbar";
import PricingHero from "@/components/pricing/pricingCards";
import FeatureComparisonTable from "@/components/pricing/featuresTable";
import Footer from "@/components/home/footer";

export default function PricingPage() {
  return (
    <>
      <CustomNavbar />
      <div className="bg-[#191919] w-full min-h-screen">
        <PricingHero />
        <FeatureComparisonTable />
      </div>
      <Footer />
    </>
  );
}