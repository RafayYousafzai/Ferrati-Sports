import { Building2, Store, Settings, Lightbulb } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: "building" | "store" | "settings" | "lightbulb";
}

interface ServiceCardsProps {
  cards: ServiceCard[];
}

const iconMap = {
  building: Building2,
  store: Store,
  settings: Settings,
  lightbulb: Lightbulb,
};

export default function ServiceCards({ cards }: ServiceCardsProps) {
  return (
    <div className="w-full  p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {cards.map((card) => {
          const IconComponent = iconMap[card.icon];

          return (
            <Card
              key={card.id}
              className="bg-white border-0 rounded-none shadow-none border-none duration-200"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="relative inline-block">
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 rounded-sm" />
                    <div className="relative bg-white p-2">
                      <IconComponent
                        className="w-8 h-8 text-gray-700"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {card.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
