"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, FileText, Package } from "lucide-react";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ctaOptions = [
    {
      icon: MessageCircle,
      title: "Chat on WhatsApp",
      description: "Get instant answers to your questions",
      href: "https://wa.me/923328574009",
      color: "bg-[#25D366]",
      hoverColor: "hover:bg-[#20BA5A]",
    },
    {
      icon: FileText,
      title: "Get a Quote",
      description: "Receive a detailed pricing proposal",
      href: "/request-quote",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
    {
      icon: Package,
      title: "Request Sample Kit",
      description: "See and feel our quality firsthand",
      href: "/services/free-clothing-samples",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full blur-3xl"
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-semibold text-sm uppercase tracking-wider">
            READY TO START?
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mt-8 mb-6">
            Let&apos;s Build Your Brand{" "}
            <span className="text-orange-400">Together.</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Don&apos;t risk your next collection on unreliable suppliers.
          </p>
          <p className="text-xl text-orange-400 font-semibold">
            Partner with Ferrati Sports — the manufacturer that delivers
            quality, speed, and trust.
          </p>
        </motion.div>

        {/* CTA Options Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {ctaOptions.map((option, index) => (
            <motion.div
              key={index}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Link
                href={option.href}
                rel={
                  option.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                target={option.href.startsWith("http") ? "_blank" : undefined}
              >
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-8 h-full hover:border-orange-400 transition-all cursor-pointer group">
                  <div
                    className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-300">{option.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Primary CTA Buttons */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="https://wa.me/923328574009"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button
              className="px-10 py-6 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all min-w-[250px]"
              radius="sm"
              size="lg"
            >
              💬 Chat on WhatsApp
            </Button>
          </a>
          <Link href="/request-quote">
            <Button
              className="px-10 py-6 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all min-w-[250px]"
              radius="sm"
              size="lg"
            >
              🧵 Get a Quote
            </Button>
          </Link>
          <Link href="/services/free-clothing-samples">
            <Button
              className="px-10 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all min-w-[250px]"
              radius="sm"
              size="lg"
            >
              📦 Request Sample Kit
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-green-400 text-2xl">✓</span>
            <span className="text-white font-semibold">
              Join 200+ brands who trust us
            </span>
          </div>
          <p className="text-gray-400 mt-4">
            No credit card required • Free consultation • Fast response
          </p>
        </motion.div>
      </div>
    </section>
  );
}
