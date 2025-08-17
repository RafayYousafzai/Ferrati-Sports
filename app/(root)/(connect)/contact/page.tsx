"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";

import { createClient } from "@/lib/supabase/client";

const interestOptions = [
  { key: "client", label: "Becoming a client" },
  { key: "career", label: "A career at Ferrati" },
  { key: "rfp", label: "RFP participation" },
  { key: "media", label: "Process inquiry" },
  { key: "partnership", label: "Partnership opportunities" },
  { key: "other", label: "Other" },
];

const supabase = createClient();

export default function ContactPage() {
  const [form, setForm] = useState({
    email: "",
    phone: "+92",
    firstName: "",
    lastName: "",
    interest: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contact_requests").insert([
      {
        email: form.email,
        phone: form.phone,
        name: `${form.firstName} ${form.lastName}`.trim(),
        interest: form.interest,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      addToast({
        title: "Failed to send message. Please try again.",
        color: "warning",
      });
    } else {
      addToast({
        title: "Your message has been sent!",
        color: "success",
      });
      setForm({
        email: "",
        phone: "+92",
        firstName: "",
        lastName: "",
        interest: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              height="40"
              id="grid"
              patternUnits="userSpaceOnUse"
              width="40"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%" />
          <path
            d="M0 400 Q300 200 600 400 T1200 400"
            fill="none"
            opacity="0.3"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M0 600 Q400 300 800 600 T1200 600"
            fill="none"
            opacity="0.2"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-4">
            CONTACT
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            You Made it!
          </h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8" />
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            Looking to build your brand or elevate your career?
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              required
              classNames={{
                input: "bg-gray-100 text-gray-900",
                inputWrapper:
                  "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
              }}
              placeholder="Email"
              size="lg"
              type="email"
              value={form.email}
              variant="flat"
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              classNames={{
                input: "bg-gray-100 text-gray-900",
                inputWrapper:
                  "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
              }}
              placeholder="Phone"
              size="lg"
              type="tel"
              value={form.phone}
              variant="flat"
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              required
              classNames={{
                input: "bg-gray-100 text-gray-900",
                inputWrapper:
                  "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
              }}
              placeholder="First Name"
              size="lg"
              type="text"
              value={form.firstName}
              variant="flat"
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <Input
              classNames={{
                input: "bg-gray-100 text-gray-900",
                inputWrapper:
                  "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
              }}
              placeholder="Last Name"
              size="lg"
              type="text"
              value={form.lastName}
              variant="flat"
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
          <Textarea
            fullWidth
            className=""
            label="Description"
            placeholder="Enter your description"
            value={form.interest}
            onChange={(e) => handleChange("interest", e.target.value)}
          />

          <div className="pt-6">
            <Button
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold"
              isLoading={loading}
              size="lg"
              type="submit"
            >
              Send Message
            </Button>
          </div>
          <div className="text-xs text-gray-400 max-w-2xl">
            <p>
              By submitting this form, you consent to receive marketing
              communications via automated technology, including pre-recorded
              messages, cell phones and emails. This includes if the number is
              currently on any Do Not Call Lists. This consent is not required
              to make a purchase.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
