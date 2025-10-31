import { ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { DraggableContainer } from "./solutions/DraggableContainer";

interface ServiceItem {
  name: string;
}

interface SolutionCard {
  id: string;
  title: string;
  icon: "analytics" | "earned" | "paid" | "creative";
  services: ServiceItem[];
  href?: string;
}

interface SolutionsProps {
  cards: SolutionCard[];
}

export default function Solutions({ cards }: SolutionsProps) {
  // Transform cards into 3-step process
  const steps = [
    {
      number: "1",
      title: "Share Your Vision",
      description:
        "Send us your design or idea. We'll guide you through fabric, fit, and finishes.",
    },
    {
      number: "2",
      title: "Approve Your Sample",
      description:
        "Get a prototype in 7–10 business days. Make changes before bulk production.",
    },
    {
      number: "3",
      title: "Launch with Confidence",
      description: "Receive your finished products in 30 days — ready to sell.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-20 px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full transform translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full transform -translate-x-40 translate-y-40" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-white/20 rounded-full text-white font-semibold text-sm uppercase tracking-wider border border-white/30">
            THE PLAN
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-6">
            Your Path to Stress-Free Manufacturing
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            From concept to delivery, we&apos;ve streamlined the entire process
            into three simple steps.
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                {/* Step Number Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-white opacity-50" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a href="/request-quote">
            <button className="px-10 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
              Your 30-Day Production Cycle
            </button>
          </a>
        </div>

        {/* Optional: Original Process Cards Below */}
        {cards && cards.length > 0 && (
          <>
            <div className="mt-20 mb-8 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Complete Manufacturing Process
              </h3>
              <p className="text-white/80 text-lg">
                Behind the scenes of our streamlined 3-step system
              </p>
            </div>

            <DraggableContainer>
              {cards.map((card) => (
                <div key={card.id} className="flex-none w-80">
                  <div className="h-full">
                    <Card className="bg-white rounded-2xl border-0 shadow-lg h-full transition-all duration-500  group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-100/0 group-hover:from-orange-50/30 group-hover:to-orange-100/20 transition-all duration-500" />

                      <CardContent className="p-8 relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-orange-700 transition-colors duration-300">
                          {card.title}
                        </h3>

                        <ul className="space-y-3">
                          {card.services.map((service, serviceIndex) => (
                            <li
                              key={serviceIndex}
                              className="flex items-center text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300"
                            >
                              <ChevronRight className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0 transition-colors duration-300 group-hover:text-orange-600" />
                              <span className="transition-all duration-300 text-medium text-gray-800">
                                {service.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </DraggableContainer>
          </>
        )}
      </div>
    </section>
  );
}
