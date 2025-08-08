"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

const interestOptions = [
  { key: "client", label: "Becoming a client" },
  { key: "career", label: "A career at Ferrati" },
  { key: "rfp", label: "RFP participation" },
  { key: "media", label: "Process inquiry" },
  { key: "partnership", label: "Partnership opportunities" },
  { key: "other", label: "Other" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path
            d="M0 400 Q300 200 600 400 T1200 400"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0 600 Q400 300 800 600 T1200 600"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-4">
            CONTACT
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            You made it!
          </h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            Looking to build your brand or elevate your career?
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="email"
              placeholder="Email"
              variant="flat"
              size="lg"
              classNames={{
                input: "bg-gray-100 text-gray-900",
                inputWrapper:
                  "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
              }}
            />
            <div className="flex">
              {/* <div className="flex items-center bg-gray-100 px-3 rounded-l-xl border-r h-14">
                <span className="text-green-600 mr-2">🇵🇰</span>
                <span className="text-gray-900 text-sm">+92</span>
              </div> */}
              <Input
                type="tel"
                placeholder=""
                defaultValue="+92"
                variant="flat"
                size="lg"
                classNames={{
                  input: "bg-gray-100 text-gray-900",
                  inputWrapper:
                    "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              placeholder="First Name"
              variant="flat"
              size="lg"
              classNames={{
                input: "bg-gray-100 text-gray-900",
                inputWrapper:
                  "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
              }}
            />
            <Input
              type="text"
              placeholder="Last Name"
              variant="flat"
              size="lg"
              classNames={{
                input: "bg-gray-100 text-gray-900",
                inputWrapper:
                  "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
              }}
            />
          </div>

          <Select
            placeholder="I'm interested in..."
            variant="flat"
            size="lg"
            classNames={{
              trigger:
                "bg-gray-100 border-0 shadow-none hover:bg-gray-200 data-[open=true]:bg-gray-100",
              value: "text-gray-900",
              popoverContent: "bg-white",
            }}
          >
            {interestOptions.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <div className="pt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold"
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
