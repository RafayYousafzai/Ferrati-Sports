export const metadata = {
  title: "About Us - Ferrati Sports | Premium Custom Clothing Manufacturer",
  description:
    "Learn about Ferrati Sports' journey in premium custom clothing manufacturing. Our expertise, values, and commitment to delivering high-quality apparel for brands worldwide.",
  keywords:
    "about ferrati sports, custom clothing manufacturer, apparel manufacturing company, clothing brand story, premium manufacturing",
  openGraph: {
    title: "About Ferrati Sports - Premium Custom Clothing Manufacturer",
    description:
      "Learn about our journey and expertise in premium custom clothing manufacturing.",
    type: "website",
    url: "https://ferrati-sports.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/custom-ui/header";
import {
  MessageSquare,
  Palette,
  Shirt,
  CheckCircle,
  Truck,
  Users,
  Factory,
  Globe,
  Award,
  Clock,
  DollarSign,
  Zap,
} from "lucide-react";

export default function OurProcess() {
  const processSteps = [
    {
      icon: MessageSquare,
      title: "Free Consultation",
      description:
        "Start with a no-cost consultation via Zoom, phone call, or at our office in Sialkot, Pakistan to discuss your goals and requirements.",
      features: [
        "Free mockup service",
        "Design consultation",
        "Material guidance",
      ],
    },
    {
      icon: Palette,
      title: "Design & Development",
      description:
        "Our expert designers work with you to bring your vision to life using modern technology and creative designs.",
      features: [
        "Custom designs",
        "16+ printing techniques",
        "Pattern grading",
      ],
    },
    {
      icon: Shirt,
      title: "Material Selection",
      description:
        "Choose from over 15 different types of high-quality fabrics including cotton, polyester, fleece, and specialized materials.",
      features: [
        "15+ fabric types",
        "Eco-friendly materials",
        "Quality sourcing",
      ],
    },
    {
      icon: Factory,
      title: "Production",
      description:
        "Manufacturing in our 4000 sq meter state-of-the-art factory with 15 machines, 3 production lines, and 20+ experienced experts.",
      features: [
        "Fast production",
        "2.5 tons daily capacity",
        "Global standards",
      ],
    },
    {
      icon: CheckCircle,
      title: "Quality Control",
      description:
        "Our quality control team rigorously checks products at every stage to ensure you receive high-quality apparel.",
      features: [
        "Multi-stage inspection",
        "Quality assurance",
        "Standard compliance",
      ],
    },
    {
      icon: Truck,
      title: "Logistics & Delivery",
      description:
        "Global shipping services with options like CIF, C&F, and Door-to-Door delivery to bring your custom apparel worldwide.",
      features: [
        "Worldwide shipping",
        "Multiple delivery options",
        "Secure packaging",
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Best rates in the market",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Quick delivery times",
    },
    {
      icon: Users,
      title: "Low MOQ",
      description: "Minimum 25 pieces per design",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Highest quality standards",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Worldwide shipping available",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Latest technology & methods",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12 px-4 pt-20">
      <div className="max-w-7xl mx-auto">
        <Header
          title="Our Manufacturing Process."
          highlightedTitle=" "
          subtitle="   From concept to delivery - discover how we transform your ideas into
            high-quality custom apparel with our streamlined 6-step process,
            backed by years of expertise and state-of-the-art facilities."
        />

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card
                key={index}
                className="relative overflow-hidden group transition-all duration-300  rounded-none shadow-none border-none bg-white"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-none flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <IconComponent className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      {/* <Badge variant="outline" className="text-xs mb-2">
                        Step {index + 1}
                      </Badge> */}
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-500 mb-4 leading-relaxed">
                    {step.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white p-8 md:p-12  mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Ferrati?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We stand out as the best apparel manufacturer with our commitment
              to quality, innovation, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-none hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-none flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">2019</div>
            <div className="text-sm text-gray-500">Established</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">4000</div>
            <div className="text-sm text-gray-500">Sq Meter Factory</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">15+</div>
            <div className="text-sm text-gray-500">Fabric Types</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">25</div>
            <div className="text-sm text-gray-500">Min Order Qty</div>
          </div>
        </div>
      </div>
    </div>
  );
}
