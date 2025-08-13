"use client";

import React from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import Link from "next/link";
import {
  HelpCircle,
  ShieldCheck,
  Leaf,
  Timer,
  Package,
  Mail,
} from "lucide-react";

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
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
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
    </section>
  );
}
