import { BarChart3, Sprout, Rocket, Diamond, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../custom-ui/header";

interface ServiceItem {
  name: string;
}

interface SolutionCard {
  id: string;
  title: string;
  icon: "analytics" | "earned" | "paid" | "creative";
  services: ServiceItem[];
}

interface SolutionsProps {
  cards: SolutionCard[];
}

const iconMap = {
  analytics: BarChart3,
  earned: Sprout,
  paid: Rocket,
  creative: Diamond,
};

export default function Solutions({ cards }: SolutionsProps) {
  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-20 px-8 overflow-hidden">
      {/* Background geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full transform -translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-300 rounded-full transform -translate-y-32"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Header
          theme="dark"
          badge="SOLUTIONS"
          title="A results oriented "
          highlightedTitle="digital agency."
          subtitle="We're specialists, not generalists. We were built to provide deep
            expertise in digital channels that are extremely complex, and
            changing daily. We offer integrated solutions with unique services
            and deliverables tailored to unlock full-funnel growth."
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const IconComponent = iconMap[card.icon];

            return (
              <Card
                key={card.id}
                className="bg-white border-0 shadow-lg h-full rounded-none"
              >
                <CardContent className="p-8">
                  {/* Icon with orange accent */}
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 rounded-sm"></div>
                      <div className="relative bg-white p-2">
                        <IconComponent
                          className="w-8 h-8 text-gray-700"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {card.title}
                  </h3>

                  {/* Services List */}
                  <ul className="space-y-3">
                    {card.services.map((service, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600 text-sm"
                      >
                        <ChevronRight className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" />
                        <span>{service.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
