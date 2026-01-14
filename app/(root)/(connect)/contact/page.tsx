import { Metadata } from "next";

import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Ferrati Sports | Get In Touch for Custom Clothing",
  description:
    "Contact Ferrati Sports for custom clothing manufacturing, quotes, and partnerships. We're here to help bring your brand vision to life.",
  keywords:
    "contact ferrati sports, custom clothing contact, manufacturing inquiry, clothing brand partnership, custom apparel quote",
  openGraph: {
    title: "Contact Ferrati Sports - Custom Clothing Experts",
    description:
      "Get in touch for custom clothing manufacturing and brand partnerships.",
    type: "website",
    url: "https://ferrati-sports.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
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

        <ContactForm />
      </div>
    </div>
  );
}
