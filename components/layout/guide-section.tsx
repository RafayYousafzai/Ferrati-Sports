"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Zap, DollarSign, Leaf, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";
import EditableText from "@/components/editable-text";

const features = [
  {
    icon: Building2,
    title: "In-house manufacturing facility",
    description: "Complete control over quality and production",
  },
  {
    icon: Zap,
    title: "Fast, flexible production",
    description: "30-day delivery with low MOQ from 50 units",
  },
  {
    icon: DollarSign,
    title: "Transparent pricing",
    description: "No hidden costs or surprise charges",
  },
  {
    icon: Leaf,
    title: "Ethical and sustainable",
    description: "Responsible manufacturing practices",
  },
  {
    icon: Headphones,
    title: "Expert design support",
    description: "Guidance from concept to final product",
  },
  {
    icon: DollarSign,
    title: "Global shipping",
    description: "Reliable delivery to your doorstep worldwide",
  },
];

export default function GuideSection({
  contentMap = {},
}: {
  contentMap?: Record<string, string>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="container mx-auto px-4 max-w-7xl mb-20">
      <div className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-xl">
        {/* Header */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl  font-bold text-black mb-4">
            <EditableText
              id="guide_title_1"
              defaultValue="We Get It. That's Why We Built"
              initialContent={contentMap["guide_title_1"]}
              as="span"
            />{" "}
            <EditableText
              id="guide_title_2"
              defaultValue="Ferrati Sports."
              className="text-orange-500"
              initialContent={contentMap["guide_title_2"]}
              as="span"
            />
          </h2>
          <EditableText
            id="guide_description"
            defaultValue="We've helped over 200 apparel brands across the UK, USA, and Europe bring their sportswear collections to life on time and on budget."
            initialContent={contentMap["guide_description"]}
            multiline
            className="text-lg text-balance text-black max-w-4xl mx-auto leading-relaxed"
            as="p"
          />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Story & Features */}
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  className="flex gap-3 items-start my-3"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute -top-1 -left-1 w-8 h-8 bg-orange-500 rounded-sm  " />
                      <div className="mb-6">
                        <div className="relative inline-block">
                          <div className="relative bg-white rounded-3xl p-3">
                            <feature.icon className="w-6 h-6 text-black" />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-bold text-sm -mt-2 text-black mb-1">
                      <EditableText
                        id={`guide_feature_${index}_title`}
                        defaultValue={feature.title}
                        initialContent={
                          contentMap[`guide_feature_${index}_title`]
                        }
                        as="span"
                      />
                    </h6>
                    <EditableText
                      id={`guide_feature_${index}_desc`}
                      defaultValue={feature.description}
                      initialContent={contentMap[`guide_feature_${index}_desc`]}
                      className="text-sm  text-black"
                      as="p"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Single Image */}
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Background Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl" />

            <div className="relative">
              <motion.div
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="relative h-80 overflow-hidden rounded-2xl shadow-xl group"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <Image
                  alt="Ferrati Sports Manufacturing"
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  height={600}
                  src="/assets/hero.webp"
                  width={800}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent mix-blend-overlay" />
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-3 z-20 border-2 border-orange-100"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-2">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-orange-600">200+</div>
                  <div className="text-xs text-gray-600 font-medium">
                    Brands Trust Us
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* CTA Section */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* <p className="text-lg text-black mb-6">
            We{" "}
            <span className="text-orange-500 font-semibold">
              know the feeling.
            </span>{" "}
            You have amazing plans for your brand, but your manufacturer keeps
            dropping the ball.
          </p> */}
          <Link href="/request-quote">
            <Button
              disableRipple
              className="border-1 border-e-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white font-bold text-base lg:text-lg px-12 py-8 border-orange-500 tracking-wider [&]:hover:opacity-100"
              radius="full"
              size="lg"
              variant="bordered"
            >
              START FOR FREE
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
