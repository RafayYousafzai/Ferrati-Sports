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
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Problem = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Hardcoded problem items with icons
  const problemItems = [
    {
      id: "1",
      icon: TrendingDown,
      title: "Slow trend adoption",
      description:
        "Slow to follow new trends, which means you lose buyers to faster competitors.",
    },
    {
      id: "2",
      icon: PackageX,
      title: "Overproduction waste",
      description:
        "Making more stock than needed, leaving you with waste and money loss.",
    },
    {
      id: "3",
      icon: AlertTriangle,
      title: "Weak quality control",
      description:
        "Weak checks on quality, causing damaged or faulty products to reach customers.",
    },
    {
      id: "4",
      icon: Clock,
      title: "Poor support response",
      description:
        "Support teams that don't respond quickly, leaving you stuck and delayed.",
    },
    {
      id: "5",
      icon: Archive,
      title: "Outdated processes",
      description:
        "Old ways of working that keep your brand behind while others move forward.",
    },
  ];

  // Hardcoded solution items with icons
  const solutionItems = [
    {
      id: "1",
      icon: TrendingUp,
      description:
        "Fast response to trends so your products reach the market on time.",
    },
    {
      id: "2",
      icon: ShieldCheck,
      description:
        "Smarter order control that avoids waste and protects your money.",
    },
    {
      id: "3",
      icon: BadgeCheck,
      description:
        "Careful quality checks at every stage to stop defects before they happen.",
    },
    {
      id: "4",
      icon: Headphones,
      description:
        "A support team that is always ready with quick and clear answers.",
    },
    {
      id: "5",
      icon: Zap,
      description:
        "Modern systems and fresh ideas that prepare your brand for the future.",
    },
  ];

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="container mx-auto max-w-4xl text-balance mb-16">
        <h2 className="text-5xl capitalize font-bold text-center text-black mb-6">
          You design. We make. <span className="text-orange-500">You win.</span>
        </h2>
        <div className="w-32 rounded-2xl h-1 bg-orange-500 mx-auto mb-10 mt-2" />
        <p className="text-md sm:text-xl text-center text-black leading-relaxed">
          We&apos;re client partners first, committed to paving the way for
          growth. We&apos;re focused on helping brands disrupt their industry
          through digital marketing. We&apos;re also big on a work life balance.
          We&apos;ve built a team of fun, driven, and motivated specialists who
          are encouraged to live our company values.
        </p>
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
              What You Have Been{" "}
              <span className="text-orange-500">Struggling With.</span>
            </h2>
            <p className="text-lg text-balance text-black max-w-4xl mx-auto leading-relaxed">
              Slow trend adoption, overproduction, and weak quality control lead
              to losses and customer issues while poor support and outdated
              processes keep your brand lagging behind faster competitors.
            </p>
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
                      <p className="text-sm text-black -mt-2">
                        {item.description}
                      </p>
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
                  <Image
                    alt="Manufacturing Problems"
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    height={600}
                    src="https://images.unsplash.com/photo-1758611971935-331135af686d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632"
                    width={800}
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
                      Common Issues
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
            <Link href="/services/free-clothing-samples">
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
          style={{ marginTop: "80px" }}
          className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-xl"
        >
          {/* Header */}
          <motion.div
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl  font-bold text-black mb-4">
              How <span className="text-orange-500">Ferrati Empowers</span> You
              With.
            </h2>
            <p className="text-lg text-balance text-black max-w-4xl mx-auto leading-relaxed">
              Quick trend adaptation, smart order management, and strict quality
              control cut waste and defects while responsive support and modern
              systems keep your brand ahead and future-ready.
            </p>
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
                  <Image
                    alt="Ferrati Solutions"
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    height={600}
                    src="https://plus.unsplash.com/premium_photo-1664475666724-8dff6a3cf38d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                    width={800}
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
                    <div className="text-xl font-bold text-orange-500">
                      Our Solutions
                    </div>
                    <div className="text-xs text-black font-medium">
                      For Your Success
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
                      <p className="text-sm -mt-2 text-black">
                        {item.description}
                      </p>
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
              We{" "}
              <span className="text-orange-500 font-semibold">
                deliver solutions
              </span>{" "}
              that transform your manufacturing challenges into competitive
              advantages.
            </p>
            <Link href="/services/free-clothing-samples">
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
