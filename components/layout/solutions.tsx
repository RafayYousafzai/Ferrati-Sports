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
  return (
    <section className="relative   py-20 px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Optional: Original Process Cards Below */}
        {cards && cards.length > 0 && (
          <>
            <div className="mt-10 mb-8 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Complete Manufacturing Process
              </h3>
              <p className="text-gray-700 text-lg">
                Behind the scenes of our streamlined 3-step system
              </p>
            </div>

            <DraggableContainer>
              {cards.map((card) => (
                <div key={card.id} className="flex-none w-80 ">
                  <div className="h-full">
                    <Card className="bg-orange-500 rounded-2xl border-0  h-full transition-all duration-500  group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-100/0  " />

                      <CardContent className="p-8 relative z-10">
                        <h3 className="text-xl font-bold text-white mb-6  ">
                          {card.title}
                        </h3>

                        <ul className="space-y-3">
                          {card.services.map((service, serviceIndex) => (
                            <li
                              key={serviceIndex}
                              className="flex items-center text-white text-sm  "
                            >
                              <ChevronRight className="w-4 h-4 text-white mr-3 flex-shrink-0  " />
                              <span className="transition-all duration-300 text-medium text-">
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
