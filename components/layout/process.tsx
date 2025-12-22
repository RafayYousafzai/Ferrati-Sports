import { ChevronRight, Calendar, CheckCircle, Rocket } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@heroui/button";
import EditableText from "@/components/editable-text";
import { IconBulb } from "@tabler/icons-react";

export default function Process({
  contentMap = {},
}: {
  contentMap?: Record<string, string>;
}) {
  // Transform cards into 3-step process
  const steps = [
    {
      number: "1",
      title: "Share Your Vision",
      description:
        "Send us your design or idea. We'll guide you through 100+ fabric choices, fit options, and finishing touches. ",
      icon: "Calendar",
    },
    {
      number: "2",
      title: "Approve Your Sample",
      description:
        "Get a prototype in 7–10 business days. Make any  changes before bulk production.",
      icon: "CheckCircle",
    },
    {
      number: "3",
      title: "Launch with Confidence",
      description: "Receive your finished products in 30 days ready to sell.",
      icon: "Rocket",
    },
  ];

  const iconMap: Record<string, any> = {
    Calendar: IconBulb,
    CheckCircle: CheckCircle,
    Rocket: Rocket,
  };

  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl mb-20">
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-16 px-10 lg:px-10 rounded-3xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full transform translate-x-48 -translate-y-48" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full transform -translate-x-40 translate-y-40" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="px-8 py-2 bg-white/20 rounded-full text-white font-semibold text-sm uppercase tracking-wider border border-white/30">
                THE PLAN
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-6">
                <EditableText
                  id="process_title"
                  defaultValue="Your Path to Hustle-Free Manufacturing"
                  initialContent={contentMap["process_title"]}
                  as="span"
                />
              </h2>
              <EditableText
                id="process_description"
                defaultValue="From concept to delivery, we've streamlined the entire process into three simple steps."
                initialContent={contentMap["process_description"]}
                multiline
                className="text-xl text-white/90 max-w-3xl mx-auto"
                as="p"
              />
            </div>

            {/* 3-Step Process with New Card Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
              {steps.map((step, index) => {
                const IconComponent = iconMap[step.icon];

                return (
                  <div key={step.number} className="relative">
                    <Card className="relative bg-white border-0 rounded-3xl shadow-none border-none duration-200 h-full py-10">
                      <CardContent className="p-8 text-center">
                        <div className="mb-6">
                          <div className="relative inline-block">
                            <div className="absolute -top-2 -left-2 w-12 h-12 bg-orange-500 rounded-sm" />
                            <div className="relative bg-white rounded-3xl p-3">
                              <IconComponent
                                className="w-12 h-12 text-gray-900"
                                strokeWidth={1.5}
                              />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {step.title}
                        </h3>

                        <p className="text-black leading-relaxed text-balance">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Arrow connector (except last) */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <ChevronRight className="w-8 h-8 text-white opacity-70" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* CTA Section */}
          <div className="text-center mt-12">
            <Link href="/services/free-clothing-samples">
              <Button
                disableRipple
                className="border-1 border-white hover:bg-white text-white hover:text-orange-500 font-bold text-base lg:text-lg px-12 py-8 tracking-wider [&]:hover:opacity-100"
                radius="full"
                size="lg"
                variant="bordered"
              >
                START FOR FREE
              </Button>
            </Link>
          </div>
        </div>{" "}
      </div>
    </section>
  );
}
