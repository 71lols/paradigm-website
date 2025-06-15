"use client";

interface FeatureRow {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

interface FeatureSection {
  title: string;
  features: FeatureRow[];
}

const CheckIcon = () => (
  <svg 
    className="w-5 h-5 text-green-400" 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path 
      fillRule="evenodd" 
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
      clipRule="evenodd" 
    />
  </svg>
);

const renderCellContent = (value: string | boolean) => {
  if (typeof value === 'boolean') {
    return value ? <CheckIcon /> : <span className="text-white/40">–</span>;
  }
  return <span className="text-white/90">{value}</span>;
};

export default function FeatureComparisonTable() {
  const featureSections: FeatureSection[] = [
    {
      title: "Core Features",
      features: [
        {
          feature: "Screen and audio awareness",
          free: true,
          pro: true,
          enterprise: true
        },
        {
          feature: "Queries per day",
          free: "10",
          pro: "Unlimited",
          enterprise: "Unlimited"
        },
        {
          feature: "Character output limit",
          free: "200",
          pro: "Unlimited",
          enterprise: "Unlimited"
        },
        {
          feature: "Context memory",
          free: false,
          pro: "7 Days",
          enterprise: "30 Days"
        },
        {
          feature: "Latest AI models",
          free: false,
          pro: true,
          enterprise: true
        }
      ]
    },
    {
      title: "Workflow & Platform",
      features: [
        {
          feature: "Full customizability",
          free: true,
          pro: true,
          enterprise: true
        },
        {
          feature: "Team collaboration",
          free: false,
          pro: false,
          enterprise: true
        },
        {
          feature: "Custom integrations & API",
          free: false,
          pro: false,
          enterprise: true
        },
        {
          feature: "Dashboard",
          free: false,
          pro: false,
          enterprise: true
        }
      ]
    },
    {
      title: "Support",
      features: [
        {
          feature: "Support Level",
          free: "Community",
          pro: "Email",
          enterprise: "24/7 Phone"
        }
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#191919]">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4">
            <div className="p-6">
              <span className="text-white/60 text-sm font-medium"></span>
            </div>
            <div className="p-6 text-center">
              <span className="text-white text-lg font-semibold">Free</span>
            </div>
            <div className="p-6 text-center">
              <span className="text-white text-lg font-semibold">Pro</span>
            </div>
            <div className="p-6 text-center">
              <span className="text-white text-lg font-semibold">Enterprise</span>
            </div>
          </div>

          {/* Feature Sections */}
          {featureSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Header */}
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="text-white font-semibold text-lg">{section.title}</h3>
              </div>
              
              {/* Section Features */}
              {section.features.map((feature, featureIndex) => (
                <div 
                  key={featureIndex}
                  className="grid grid-cols-4 border-b border-white/10 last:border-b-0"
                >
                  <div className="p-4 flex items-center">
                    <span className="text-white/90 text-sm">{feature.feature}</span>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {renderCellContent(feature.free)}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {renderCellContent(feature.pro)}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {renderCellContent(feature.enterprise)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}