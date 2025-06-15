"use client";
import CustomNavbar from "@/components/navbar";
import GradientContainer from "@/components/UI/gradientContainer";

interface PricingCardProps {
  title: string;
  price: string;
  priceSubtext: string;
  description: string;
  buttonText: string;
  buttonSecondary?: string;
  features: string[];
  ellipseColor: string;
}

const WhiteButton = ({ 
  children, 
  className = "", 
  variant = "primary",
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: "primary" | "secondary";
  [key: string]: any;
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100",
    secondary: "bg-transparent text-white border border-white/30 hover:bg-white/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const PricingCard = ({
  title,
  price,
  priceSubtext,
  description,
  buttonText,
  buttonSecondary,
  features,
  ellipseColor
}: PricingCardProps) => {
  const ellipses = [
    {
      id: "bottom-left",
      position: { x: 5, y: 95 },
      size: { width: 250, height: 120 },
      colors: { from: ellipseColor, to: "transparent" },
      blur: 80,
      opacity: 80,
      rotation: 70
    },
    {
      id: "top-right", 
      position: { x: 95, y: 5 },
      size: { width: 250, height: 120 },
      colors: { from: ellipseColor, to: "transparent" },
      blur: 80,
      opacity: 85,
      rotation: -70
    }
  ];

  return (
    <GradientContainer 
      ellipses={ellipses}
      className="p-8"
      containerHeight="h-auto"
      rounded="rounded-2xl"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-3xl font-md text-white mb-2">{title}</h3>
          <div className="flex items-baseline mb-3">
            <span className="text-4xl font-thin text-white/70">{price}</span>
            <span className="text-white/70 ml-1">{priceSubtext}</span>
          </div>
          <p className="text-white/80 text-md mt-8">{description}</p>
        </div>

        {/* Button and Secondary Text */}
        <div className="h-20 flex flex-col justify-start">
          <WhiteButton variant="primary" className="w-full mb-2">
            {buttonText}
          </WhiteButton>
          {buttonSecondary && (
            <p className="text-white/70 text-sm text-center">
              {buttonSecondary}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <svg 
                className="w-5 h-5 text-green-400 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-white/90 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </GradientContainer>
  );
};

export default function PricingSection() {
  const pricingPlans = [
    {
      title: "Free",
      price: "$0",
      priceSubtext: "/mo",
      description: "Get started with contextual AI assistance, completely on us",
      buttonText: "Download for Windows",
      buttonSecondary: "Download for Mac",
      features: [
        "Screen and audio awareness",
        "10 queries per day",
        "200 Character output limit",
        "Unlimited Access to Free Models",
        "Community Support",
        "Full Customizability"
      ],
      ellipseColor: "#D9D9D9"
    },
    {
      title: "Pro",
      price: "$20",
      priceSubtext: "/mo",
      description: "Full-powered AI that transforms how you work",
      buttonText: "Upgrade to Pro",
      features: [
        "Unlimited queries",
        "Advanced context memory",
        "Unlimited Access to Latest Models",
        "Email Support",
        "Everything in Free"
      ],
      ellipseColor: "#B9FFC3"
    },
    {
      title: "Enterprise",
      price: "Custom",
      priceSubtext: "",
      description: "Scale contextual AI across your organization",
      buttonText: "Contact Sales",
      features: [
        "Enhanced security and compliance",
        "Extended context memory",
        "Team collaboration features",
        "Custom integrations and API access",
        "24/7 Support",
        "Admin dashboard and analytics",
        "Everything in Pro"
      ],
      ellipseColor: "#B9CDFF"
    }
  ];

  return (
    <>
      <CustomNavbar />
      <section className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#191919] pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-16 max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              Start Free.
              <br />
              Experience the Future.
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              Try the full power of contextual AI assistance without any commitment.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                priceSubtext={plan.priceSubtext}
                description={plan.description}
                buttonText={plan.buttonText}
                buttonSecondary={plan.buttonSecondary}
                features={plan.features}
                ellipseColor={plan.ellipseColor}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}