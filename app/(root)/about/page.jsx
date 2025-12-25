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
import { Handshake, Trophy } from "lucide-react";

import FerratiAccordion from "@/components/layout/accordian";
import EditableText from "@/components/editable-text";
import { createStaticClient } from "@/lib/supabase/static";

export default async function OurProcess() {
  const supabase = createStaticClient();
  const { data: contentBlocks } = await supabase.from("content_blocks").select("*");

  const getContent = (key, defaultText) => {
    const block = contentBlocks?.find(b => b.key === key);
    return block ? block.value : defaultText;
  };

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Free Consultation",
      id_title: "process_consult_title",
      description:
        "Start with a no-cost consultation via Zoom, phone call, or at our office in Sialkot, Pakistan to discuss your goals and requirements.",
      id_desc: "process_consult_desc",
      features: [
        { text: "Free mockup service", id: "process_consult_f1" },
        { text: "Design consultation", id: "process_consult_f2" },
        { text: "Material guidance", id: "process_consult_f3" },
      ],
    },
    {
      icon: Palette,
      title: "Design & Development",
      id_title: "process_design_title",
      description:
        "Our expert designers work with you to bring your vision to life using modern technology and creative designs.",
      id_desc: "process_design_desc",
      features: [
        { text: "Custom designs", id: "process_design_f1" },
        { text: "16+ printing techniques", id: "process_design_f2" },
        { text: "Pattern grading", id: "process_design_f3" },
      ],
    },
    {
      icon: Shirt,
      title: "Material Selection",
      id_title: "process_material_title",
      description:
        "Choose from over 15 different types of high-quality fabrics including cotton, polyester, fleece, and specialized materials.",
      id_desc: "process_material_desc",
      features: [
        { text: "15+ fabric types", id: "process_material_f1" },
        { text: "Eco-friendly materials", id: "process_material_f2" },
        { text: "Quality sourcing", id: "process_material_f3" },
      ],
    },
    {
      icon: Factory,
      title: "Production",
      id_title: "process_prod_title",
      description:
        "Manufacturing in our 4000 sq meter state-of-the-art factory with 15 machines, 3 production lines, and 20+ experienced experts.",
      id_desc: "process_prod_desc",
      features: [
        { text: "Fast production", id: "process_prod_f1" },
        { text: "2.5 tons daily capacity", id: "process_prod_f2" },
        { text: "Global standards", id: "process_prod_f3" },
      ],
    },
    {
      icon: CheckCircle,
      title: "Quality Control",
      id_title: "process_qc_title",
      description:
        "Our quality control team rigorously checks products at every stage to ensure you receive high-quality apparel.",
      id_desc: "process_qc_desc",
      features: [
        { text: "Multi-stage inspection", id: "process_qc_f1" },
        { text: "Quality assurance", id: "process_qc_f2" },
        { text: "Standard compliance", id: "process_qc_f3" },
      ],
    },
    {
      icon: Truck,
      title: "Logistics & Delivery",
      id_title: "process_logistics_title",
      description:
        "Global shipping services with options like CIF, C&F, and Door-to-Door delivery to bring your custom apparel worldwide.",
      id_desc: "process_logistics_desc",
      features: [
        { text: "Worldwide shipping", id: "process_logistics_f1" },
        { text: "Multiple delivery options", id: "process_logistics_f2" },
        { text: "Secure packaging", id: "process_logistics_f3" },
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      id_title: "why_pricing_title",
      description: "Best rates in the market",
      id_desc: "why_pricing_desc",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      id_title: "why_turnaround_title",
      description: "Quick delivery times",
      id_desc: "why_turnaround_desc",
    },
    {
      icon: Users,
      title: "Low MOQ",
      id_title: "why_moq_title",
      description: "Minimum 25 pieces per design",
      id_desc: "why_moq_desc",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      id_title: "why_quality_title",
      description: "Highest quality standards",
      id_desc: "why_quality_desc",
    },
    {
      icon: Globe,
      title: "Global Reach",
      id_title: "why_global_title",
      description: "Worldwide shipping available",
      id_desc: "why_global_desc",
    },
    {
      icon: Zap,
      title: "Innovation",
      id_title: "why_innovation_title",
      description: "Latest technology & methods",
      id_desc: "why_innovation_desc",
    },
  ];

  const values = [
    {
      title: "Think Big",
      id_title: "value_think_big_title",
      description:
        "Quality isn't just a buzzword; it's our baseline. From the first thread to the final print, we enforce strict quality control to ensure every garment represents your brand flawlessly.",
      id_desc: "value_think_big_desc",
      icon: Shirt,
    },
    {
      title: "Own It",
      id_title: "value_own_it_title",
      description:
        "We take full ownership of the supply chain. No excuses, no delays. We act as your internal production team, solving problems before they ever reach your dashboard.",
      id_desc: "value_own_it_desc",
      icon: Handshake,
    },
    {
      title: "Win Together",
      id_title: "value_win_together_title",
      description:
        "Your growth is our growth. We don't just supply clothes; we provide the infrastructure for you to scale. When your brand succeeds in the market, we succeed as your partner.",
      id_desc: "value_win_together_desc",
      icon: Trophy,
    },
  ];

  // Prepare simple content map for Accordion which cannot easily access full array due to structure difference
  // Actually easier to just pass the raw data array to Accordion
  const contentMap = contentBlocks?.reduce((acc, block) => {
    acc[block.key] = block.value;
    return acc;
  }, {}) || {};

  return (
    <div className="min-h-screen bg-slate-50 pb-12 px-4 pt-20 ">
      <div className="max-w-7xl mx-auto">
        <section className="w-full py-20 ">
          <div className="max-w-7xl mx-auto">
            <Header
              title={
                <EditableText
                  id="about_hero_title"
                  defaultValue="What we believe, and  "
                  initialContent={getContent("about_hero_title", "What we believe, and  ")}
                />
              }
              highlightedTitle={
                <EditableText
                  id="about_hero_highlight"
                  defaultValue="live by."
                  initialContent={getContent("about_hero_highlight", "live by.")}
                />
              }
              subtitle={
                <EditableText
                  id="about_hero_subtitle"
                  defaultValue=" We are more than just a manufacturer. We are partners committed to elevating your brand through premium manufacturing, transparency, and unwavering reliability."
                  initialContent={getContent("about_hero_subtitle", " We are more than just a manufacturer. We are partners committed to elevating your brand through premium manufacturing, transparency, and unwavering reliability.")}
                />
              }
            />

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-10 rounded-xl  flex flex-col items-center text-center group border border-transparent "
                >
                  {/* Icon Container */}
                  <div className="mb-6 p-4 rounded-full bg-orange-50 group-hover:bg-orange-500 transition-colors duration-300">
                    <value.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-5xl font-bold text-gray-900 mb-4">
                    <EditableText
                      id={value.id_title}
                      defaultValue={value.title}
                      initialContent={getContent(value.id_title, value.title)}
                    />
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-md">
                    "<EditableText
                      id={value.id_desc}
                      defaultValue={value.description}
                      initialContent={getContent(value.id_desc, value.description)}
                    />"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Header
          title={
            <EditableText
              id="process_section_title"
              defaultValue="Our Manufacturing "
              initialContent={getContent("process_section_title", "Our Manufacturing ")}
            />
          }
          highlightedTitle={
            <EditableText
              id="process_section_highlight"
              defaultValue="Process."
              initialContent={getContent("process_section_highlight", "Process.")}
            />
          }
          subtitle={
            <EditableText
              id="process_section_subtitle"
              defaultValue="   From concept to delivery - discover how we transform your ideas into high-quality custom apparel with our streamlined 6-step process, backed by years of expertise and state-of-the-art facilities."
              initialContent={getContent("process_section_subtitle", "   From concept to delivery - discover how we transform your ideas into high-quality custom apparel with our streamlined 6-step process, backed by years of expertise and state-of-the-art facilities.")}
            />
          }
        />

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card
                key={index}
                className="relative overflow-hidden group transition-all duration-300   shadow-none border-none bg-white rounded-2xl"
              >
                <CardHeader className="">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="relative top-5">
                      <div className="absolute -top-1 -left-1 w-8 h-8 bg-orange-500 rounded-sm  " />
                      <div className="mb-6">
                        <div className="relative inline-block">
                          <div className="relative bg-white rounded-3xl p-3">
                            <IconComponent className="w-6 h-6 text-orange-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-black">
                        <EditableText
                          id={step.id_title}
                          defaultValue={step.title}
                          initialContent={getContent(step.id_title, step.title)}
                        />
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 font-semibold mb-4 leading-relaxed">
                    <EditableText
                      id={step.id_desc}
                      defaultValue={step.description}
                      initialContent={getContent(step.id_desc, step.description)}
                    />
                  </CardDescription>
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-sm text-black text-gray-700 font-semibold">
                          <EditableText
                            id={feature.id}
                            defaultValue={feature.text}
                            initialContent={getContent(feature.id, feature.text)}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <br />
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white p-8 md:p-12  my-16 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-black mb-4">
              <EditableText
                id="why_choose_title"
                defaultValue="Why Choose "
                initialContent={getContent("why_choose_title", "Why Choose ")}
              />
              <span className="text-orange-500">
                <EditableText
                  id="why_choose_highlight"
                  defaultValue="Ferrati?"
                  initialContent={getContent("why_choose_highlight", "Ferrati?")}
                />
              </span>
            </h2>
            <p className="text-black text-xl max-w-2xl mx-auto">
              <EditableText
                id="why_choose_subtitle"
                defaultValue="We stand out as the best apparel manufacturer with our commitment to quality, innovation, and customer satisfaction."
                initialContent={getContent("why_choose_subtitle", "We stand out as the best apparel manufacturer with our commitment to quality, innovation, and customer satisfaction.")}
              />
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
                  {/* <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-none flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-orange-500" />
                  </div> */}
                  <div className="relative">
                    <div className="absolute -top-1 -left-1 w-8 h-8 bg-orange-500 rounded-sm  " />
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <div className="relative bg-white rounded-3xl p-3">
                          <IconComponent className="w-6 h-6 text-orange-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <h2 className="text-lg text-black font-bold mb-1">
                      <EditableText
                        id={item.id_title}
                        defaultValue={item.title}
                        initialContent={getContent(item.id_title, item.title)}
                      />
                    </h2>
                    <p className="text-sm text-gray-700 font-semibold">
                      <EditableText
                        id={item.id_desc}
                        defaultValue={item.description}
                        initialContent={getContent(item.id_desc, item.description)}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              <EditableText id="stat_1_val" defaultValue="2019" initialContent={getContent("stat_1_val", "2019")} />
            </div>
            <div className="text-sm font-extrabold text-gray-700">
              <EditableText id="stat_1_label" defaultValue="Established" initialContent={getContent("stat_1_label", "Established")} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              <EditableText id="stat_2_val" defaultValue="4000" initialContent={getContent("stat_2_val", "4000")} />
            </div>
            <div className="text-sm font-extrabold text-gray-700">
              <EditableText id="stat_2_label" defaultValue="Sq Meter Factory" initialContent={getContent("stat_2_label", "Sq Meter Factory")} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              <EditableText id="stat_3_val" defaultValue="15+" initialContent={getContent("stat_3_val", "15+")} />
            </div>
            <div className="text-sm font-extrabold text-gray-700">
              <EditableText id="stat_3_label" defaultValue="Fabric Types" initialContent={getContent("stat_3_label", "Fabric Types")} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              <EditableText id="stat_4_val" defaultValue="25" initialContent={getContent("stat_4_val", "25")} />
            </div>
            <div className="text-sm font-extrabold text-gray-700">
              <EditableText id="stat_4_label" defaultValue="Min Order Qty" initialContent={getContent("stat_4_label", "Min Order Qty")} />
            </div>
          </div>
        </div>
      </div>{" "}
      <FerratiAccordion calculator={false} contentMap={contentMap} />
    </div>
  );
}
