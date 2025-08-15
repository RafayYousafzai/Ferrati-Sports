"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import Link from "next/link";
import {
  HelpCircle,
  ShieldCheck,
  Leaf,
  Timer,
  Package,
  Mail,
  Calculator,
  ArrowRight,
} from "lucide-react";
import { Button } from "@heroui/button";

export default function FerratiAccordion() {
  const faqs = [
    {
      id: "custom-bulk",
      title: "Can you handle custom designs and bulk orders?",
      icon: <Package size={18} aria-hidden />,
      body: (
        <p>
          Yes, Ferrati Impex specializes in custom manufacturing and can fulfill
          bulk orders with precision and timely delivery.
        </p>
      ),
    },
    {
      id: "lead-time",
      title: "What is your typical lead time for production?",
      icon: <Timer size={18} aria-hidden />,
      body: (
        <p>
          Lead times vary depending on order size and specifications but
          typically range from <strong>2 to 4 weeks</strong>. We always strive
          to meet client deadlines efficiently.
        </p>
      ),
    },
    {
      id: "sustainable",
      title: "Are your manufacturing practices sustainable?",
      icon: <Leaf size={18} aria-hidden />,
      body: (
        <p>
          Absolutely. We source a significant portion of our materials from
          sustainable suppliers and work with certified factories following
          ethical labor practices.
        </p>
      ),
    },
    {
      id: "certifications",
      title: "Do you offer motorbike gear with safety certifications?",
      icon: <ShieldCheck size={18} aria-hidden />,
      body: (
        <p>
          Yes, our motorbike garments are manufactured to meet industry safety
          standards to provide reliable protection for riders.
        </p>
      ),
    },
    {
      id: "products",
      title: "What types of products does Ferrati Impex manufacture?",
      icon: <HelpCircle size={18} aria-hidden />,
      body: (
        <p>
          We manufacture high‑quality sportswear, casual wear, activewear, and
          motorbike garments tailored to meet diverse customer needs.
        </p>
      ),
    },
    {
      id: "order",
      title: "How can I place an order or request a quote?",
      icon: <Mail size={18} aria-hidden />,
      body: (
        <p>
          You can contact our sales team via email{" "}
          <a
            href="mailto:info@ferratiimpex.com"
            className="underline underline-offset-4 hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
          >
            info@ferratiimpex.com
          </a>{" "}
          or{" "}
          <Link
            href="/contact"
            className="underline underline-offset-4 hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
          >
            submit an inquiry on our website
          </Link>
          .
        </p>
      ),
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-16 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-foreground/70 mb-6">
          Quick answers to common questions about Ferrati Impex manufacturing.
        </p>

        <Accordion
          variant="splitted"
          selectionMode="multiple"
          itemClasses={{
            base: "rounded-2xl border border-foreground/10 data-[open=true]:shadow-sm",
            title: "text-base sm:text-lg font-medium",
            trigger: "py-4 sm:py-5",
            content: "text-sm sm:text-base text-foreground/80",
          }}
        >
          {faqs.map((f) => (
            <AccordionItem
              key={f.id}
              aria-label={f.title}
              title={
                <div className="flex items-center gap-2">
                  {f.icon}
                  <span>{f.title}</span>
                </div>
              }
            >
              {f.body}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Enhanced Hero Section */}
      <div className="flex flex-col justify-center space-y-8 px-6 md:px-8 lg:px-10 bg-orange-500  rounded-2xl shadow-2xl    ">
        {/* Header Section */}
        <div className="text lg:text-left text-white">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Instant Price <span className="  text-white">Estimates.</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-100">
              No Surprises.
            </span>
          </h2>

          <div className="w-20 h-1 bg-white rounded-full mb-8 mx-auto lg:mx-0" />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <p className="text-lg text-gray-50 leading-relaxed text-center lg:text-left">
            Curious about project costs? Use our smart price calculator to get
            an instant estimate based on your specific requirements—no
            guesswork, just clarity.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-sm font-medium text-gray-100">
                Instant Results
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-sm font-medium text-gray-100">
                No Hidden Fees
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-sm font-medium text-gray-100">
                Custom Quotes
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-sm font-medium text-gray-100">
                Bulk Discounts
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-4">
          <Link href="/calculate-price">
            <Button
              className="w-full sm:w-auto px-8 py-4 text-orange-500 bg-white hover:white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              size="lg"
              variant="solid"
            >
              <span className="font-semibold">Calculate Now</span>
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
              />
            </Button>
          </Link>
          <p className="text-xs text-white mt-3 text-center sm:text-left">
            Get your estimate in under 30 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
