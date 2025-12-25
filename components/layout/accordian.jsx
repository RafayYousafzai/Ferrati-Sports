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
} from "lucide-react";
import QuoteContactForm from "@/components/layout/QuoteContactForm";
import Image from "next/image";
import EditableText from "@/components/editable-text";

export default function FerratiAccordion({ calculator = true }) {
  const faqs = [

    {
      id: "custom-bulk",
      title: <EditableText id="faq_custom_bulk_title" defaultValue="Can you handle custom designs and bulk orders?" />,
      icon: <Package size={18} aria-hidden />,
      body: (
        <div className="text-sm sm:text-base text-foreground/80">
          <EditableText id="faq_custom_bulk_body" defaultValue="Yes, Ferrati Impex specializes in custom manufacturing and can fulfill bulk orders with precision and timely delivery." multiline={true} />
        </div>
      ),
    },
    {
      id: "lead-time",
      title: <EditableText id="faq_lead_time_title" defaultValue="What is your typical lead time for production?" />,
      icon: <Timer size={18} aria-hidden />,
      body: (
        <div className="text-sm sm:text-base text-foreground/80">
          <EditableText id="faq_lead_time_body" defaultValue="Lead times vary depending on order size and specifications but typically range from 2 to 4 weeks. We always strive to meet client deadlines efficiently." multiline={true} />
        </div>
      ),
    },
    {
      id: "sustainable",
      title: <EditableText id="faq_sustainable_title" defaultValue="Are your manufacturing practices sustainable?" />,
      icon: <Leaf size={18} aria-hidden />,
      body: (
        <div className="text-sm sm:text-base text-foreground/80">
          <EditableText id="faq_sustainable_body" defaultValue="Absolutely. We source a significant portion of our materials from sustainable suppliers and work with certified factories following ethical labor practices." multiline={true} />
        </div>
      ),
    },
    {
      id: "certifications",
      title: <EditableText id="faq_certifications_title" defaultValue="Do you offer motorbike gear with safety certifications?" />,
      icon: <ShieldCheck size={18} aria-hidden />,
      body: (
        <div className="text-sm sm:text-base text-foreground/80">
          <EditableText id="faq_certifications_body" defaultValue="Yes, our motorbike garments are manufactured to meet industry safety standards to provide reliable protection for riders." multiline={true} />
        </div>
      ),
    },
    {
      id: "products",
      title: <EditableText id="faq_products_title" defaultValue="What types of products does Ferrati Impex manufacture?" />,
      icon: <HelpCircle size={18} aria-hidden />,
      body: (
        <div className="text-sm sm:text-base text-foreground/80">
          <EditableText id="faq_products_body" defaultValue="We manufacture high‑quality sportswear, casual wear, activewear, and motorbike garments tailored to meet diverse customer needs." multiline={true} />
        </div>
      ),
    },
    {
      id: "order",
      title: <EditableText id="faq_order_title" defaultValue="How can I place an order or request a quote?" />,
      icon: <Mail size={18} aria-hidden />,
      body: (
        <div className="text-sm sm:text-base text-foreground/80">
          <EditableText id="faq_order_body" defaultValue="You can contact our sales team via email info@ferratiimpex.com or submit an inquiry on our website." multiline={true} />
        </div>
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
      {calculator ? (
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Get an instant estimate for your project.
            </h2>
            <p className="text-sm sm:text-base text-foreground/70">
              Easily estimate your project cost in just a few clicks. Our
              calculator helps you plan your budget, compare options, and get
              clarity before you start.
            </p>
            <Link href="/calculate-price" passHref>
              <button className="cursor-pointer px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                Get a Price
              </button>
            </Link>
          </div>
          <div className="w-full">
            <Image
              src={"/assets/photo-calculator.webp"}
              alt="Calculator"
              width={500}
              height={500}
              className="w-full h-[80%] object-cover rounded-2xl"
            />
          </div>
        </div>
      ) : (
        <div className="p-6 md:px-8 lg:px-10 bg-white rounded-2xl shadow-lg">
          <QuoteContactForm disc="" />
        </div>
      )}
    </section>
  );
}
