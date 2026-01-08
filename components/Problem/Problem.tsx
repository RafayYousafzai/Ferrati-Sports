"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import {
  TrendingDown,
  PackageX,
  AlertTriangle,
  Clock,
  Archive,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  Zap,
  Truck,
  AlertOctagon,
  TruckElectric,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import EditableText from "@/components/editable-text";
import EditableImage from "@/components/editable-image";

const Problem = ({
  contentMap = {},
}: {
  contentMap?: Record<string, string>;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Hardcoded problem items with icons
  const problemItems = [
    {
      id: "1",
      icon: AlertOctagon,
      title: "Stitching opens after a few washes",
      description: "Stitching opens after a few washes",
    },

    {
      id: "2",
      icon: Truck,
      title: "Delayed deliveries with zero updates",
      description:
        "Deliveries arrive late, and you discover problems when it's too late.",
    },
    {
      id: "3",
      icon: TrendingDown,
      title: "Inconsistent stitching & poor fabric quality",
      description:
        "Defects lead to returns, refunds, and lost trust with customers.",
    },
    {
      id: "4",
      icon: AlertTriangle,
      title: "Wrong colors & weak trims",
      description:
        "Zippers fail, colors mismatch, logos fade and products feel unreliable.",
    },
    {
      id: "5",
      icon: Archive,
      title: "Outdated systems that slow your growth",
      description:
        "Manual processes and poor coordination slow decisions and your growth.",
    },
    {
      id: "6",
      icon: TrendingDown,
      title: "Confusing pricing & hidden charges",
      description:
        "Unexpected fees appear suddenly and shrink already tight profit margins.",
    },
  ];

  const solutionItems = [
    {
      id: "1",
      icon: TruckElectric,
      title: "Factories take on more than they can handle",
      description:
        "They get overloaded and your production starts slipping through the cracks.",
    },
    {
      id: "2",
      icon: BadgeCheck,
      title: "B grade fabrics replace the original specs",
      description:
        "You think you approved one thing and something else shows up.",
    },
    {
      id: "3",
      icon: ShieldCheck,
      title: "No real SOPs just “how we’ve always done it”",
      description:
        "When processes aren’t written, mistakes repeat themselves again and again.",
    },
    {
      id: "4",
      icon: Headphones,
      title: "Unskilled people handle critical steps",
      description:
        "The parts that matter most don’t always get expert attention.",
    },
    {
      id: "5",
      icon: AlertTriangle,
      title: "No true final inspection, only packing",
      description:
        "Issues are discovered after delivery, when it’s already too late.",
    },
    {
      id: "6",
      icon: Zap,
      title: "Stitching is rushed just to clear capacity",
      description: "Speed wins over care, and quality slips.",
    },
  ];

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="flex justify-center">
        <span className="px-8 py-2  rounded-full text-orange-500  font-bold text-lg uppercase tracking-wider">
          VALUES
        </span>
      </div>
      <div className="container mx-auto max-w-4xl text-balance mb-16">
        <h2 className="text-5xl capitalize font-bold text-center text-black mb-6">
          <EditableText
            as="span"
            id="problem_main_title_1"
            // defaultValue="You design. We make."
            initialContent={contentMap["problem_main_title_1"]}
          />{" "}
          <EditableText
            as="span"
            initialContent={contentMap["problem_main_title_2"]}
            id="problem_main_title_2"
            // defaultValue="You win."
            className="text-orange-500"
          />
        </h2>
        <div className="w-32 rounded-2xl h-1 bg-orange-500 mx-auto mb-10 mt-2" />
        <EditableText
          multiline
          as="p"
          className="text-md sm:text-xl text-center text-black leading-relaxed"
          id="problem_main_desc"
          // defaultValue="We're client partners first, committed to paving the way for growth. We're focused on helping brands disrupt their industry through digital marketing. We're also big on a work life balance. We've built a team of fun, driven, and motivated specialists who are encouraged to live our company values."
          initialContent={contentMap["problem_main_desc"]}
        />
      </div>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Problems Section */}
        <div className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-xl mb-12">
          {/* Header */}
          <motion.div
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-black mb-4">
              <EditableText
                as="span"
                defaultValue="What You Have Been"
                id="problem_pain_title_1"
                initialContent={contentMap["problem_pain_title_1"]}
              />{" "}
              <EditableText
                as="span"
                className="text-orange-500"
                defaultValue="Struggling With."
                id="problem_struggle_title_2"
              />
            </h2>
            <EditableText
              multiline
              as="p"
              className="text-lg text-balance text-black max-w-4xl mx-auto leading-relaxed"
              defaultValue="Slow trend adoption, overproduction, and weak quality control lead to losses and customer issues while poor support and outdated processes keep your brand lagging behind faster competitors."
              id="problem_pain_desc"
              initialContent={contentMap["problem_pain_desc"]}
            />
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left: Problems Grid */}
            <motion.div
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {problemItems.map((item, index) => (
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
                              <item.icon
                                className="w-6 h-6 text-black"
                                strokeWidth={2}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 className="font-bold text-sm -mt-2 text-black mb-1">
                        <EditableText
                          as="span"
                          defaultValue={item.title}
                          id={`problem_item_${item.id}_title`}
                          initialContent={
                            contentMap[`problem_item_${item.id}_title`]
                          }
                        />
                      </h6>
                      <EditableText
                        as="p"
                        className="text-sm text-black"
                        defaultValue={item.description}
                        id={`problem_item_${item.id}_desc`}
                        initialContent={
                          contentMap[`problem_item_${item.id}_desc`]
                        }
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image */}
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
                  <EditableImage
                    id="problem_issues_image"
                    defaultValue="https://images.unsplash.com/photo-1758611971935-331135af686d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632"
                    initialContent={contentMap["problem_issues_image"]}
                    className="w-full h-full"
                    renderImage={(src) => (
                      <Image
                        alt="Manufacturing Problems"
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                        height={600}
                        src={src}
                        width={800}
                      />
                    )}
                  />
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
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-500">
                      Problems
                    </div>
                    <div className="text-xs text-black font-medium">
                      We Solve
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
            <p className="text-lg text-black mb-6">
              We{" "}
              <span className="text-orange-500 font-semibold">
                know the feeling.
              </span>{" "}
              You have amazing plans for your brand, but your manufacturer keeps
              dropping the ball.
            </p>
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

        {/* Solutions Section */}
        <div
          className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-xl"
          style={{ marginTop: "80px" }}
        >
          {/* Header */}
          <motion.div
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl  font-bold text-black mb-4">
              <EditableText
                as="span"
                defaultValue="How"
                id="problem_solution_title_1"
                initialContent={contentMap["problem_solution_title_1"]}
              />{" "}
              <EditableText
                as="span"
                className="text-orange-500"
                defaultValue="Ferrati Empowers"
                id="problem_solution_title_2"
              />{" "}
              <EditableText
                as="span"
                defaultValue="You With."
                id="problem_solution_title_3"
                initialContent={contentMap["problem_solution_title_3"]}
              />
            </h2>
            <EditableText
              multiline
              as="p"
              className="text-lg text-balance text-black max-w-4xl mx-auto leading-relaxed"
              defaultValue="Quick trend adaptation, smart order management, and strict quality control cut waste and defects while responsive support and modern systems keep your brand ahead and future-ready."
              id="problem_solution_desc"
              initialContent={contentMap["problem_solution_desc"]}
            />
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left: Image */}
            <motion.div
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Background Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl" />

              <div className="relative">
                <motion.div
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  className="relative h-80 overflow-hidden rounded-2xl shadow-xl group"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <EditableImage
                    id="problem_solutions_image"
                    defaultValue="https://plus.unsplash.com/premium_photo-1664475666724-8dff6a3cf38d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                    initialContent={contentMap["problem_solutions_image"]}
                    className="w-full h-full"
                    renderImage={(src) => (
                      <Image
                        alt="Ferrati Solutions"
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                        height={600}
                        src={src}
                        width={800}
                      />
                    )}
                  />
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-2xl p-3 z-20 border-2 border-orange-100"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-2">
                    <BadgeCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-500 pr-2">
                      Solutions
                    </div>
                    <div className="text-xs text-black font-medium">
                      We Provide
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Solutions Grid */}
            <motion.div
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {solutionItems.map((item, index) => (
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
                              <item.icon
                                className="w-6 h-6 text-black"
                                strokeWidth={2}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 className="font-bold text-sm -mt-2 text-black mb-1">
                        <EditableText
                          as="span"
                          defaultValue={item.title}
                          id={`solution_item_${item.id}_title`}
                          initialContent={
                            contentMap[`solution_item_${item.id}_title`]
                          }
                        />
                      </h6>
                      <EditableText
                        as="p"
                        className="text-sm text-black"
                        defaultValue={item.description}
                        id={`solution_item_${item.id}_desc`}
                        initialContent={
                          contentMap[`solution_item_${item.id}_desc`]
                        }
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-lg text-black mb-6">
              <EditableText
                id="cta_description_1"
                defaultValue="We deliver solutions  that transform your manufacturing challenges into competitive
              advantages."
                initialContent={contentMap["cta_description_1"]}
                as="span"
              />
            </p>
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
      </div>
    </section>
  );
};

export default Problem;
