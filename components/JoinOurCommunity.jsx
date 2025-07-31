"use client";

import { motion } from "framer-motion";
import { AnimatedTooltip } from "./animated-tooltip";

export default function JoinOurCommunity() {
  return (
    <div className="text-center mt-24">
      <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex flex-row items-center justify-center mr-5">
          <AnimatedTooltip items={people} />
        </div>
        <div className="text-left">
          <div className="text-black font-bold text-lg">Join Our Community</div>
          <div className="text-gray-600 text-sm">
            Growing stronger every day
          </div>
        </div>
      </div>
    </div>
  );
}

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
];
