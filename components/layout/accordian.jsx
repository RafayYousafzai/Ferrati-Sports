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
  CheckCircle,
} from "lucide-react";
import { Button } from "@heroui/button";
import { useState } from "react";
import QuoteContactForm from "@/components/layout/QuoteContactForm";
import { createClient } from "@/lib/supabase/client";
import { Card, CardBody } from "@heroui/card";

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

  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleConfirm = async () => {
    setSaving(true);
    const { error } = await supabase.from("requested_quotes").insert([
      {
        email,
        name,
        phone,
        description,
        cart_items: [],
        total_price: 0,
      },
    ]);

    setSaving(false);
    if (error) {
      console.error(error);
      alert("Failed to submit quote request. Please try again.");
    } else {
      setSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setName("");
        setPhone("");
        setDescription("");
        setSubmitted(false);
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-4">
          <CardBody className="text-center py-16">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Quote Request Submitted!
            </h2>
            <p className="text-gray-600">
              Thank you! We will get back to you within 24 hours.
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

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

      <div className="p-6 md:px-8 lg:px-10 bg-gray-50 rounded-2xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 text-gray-800">
          Request a Quote
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Tell us your needs, and we will prepare a tailored offer for you.
        </p>
        <QuoteContactForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          description={description}
          setDescription={setDescription}
        />
        <div className="mt-6 text-center">
          <Button
            className="bg-orange-500 text-white px-12 rounded-full"
            color="warning"
            isDisabled={!email || !name}
            radius="lg"
            size="lg"
            isLoading={saving}
            onPress={handleConfirm}
          >
            {saving ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </div>
    </section>
  );
}