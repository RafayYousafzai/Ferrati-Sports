"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
}

interface MobileAccordionProps {
  title: string;
  href: string;
  items: NavItem[];
  onLinkClick: () => void;
}

export default function MobileAccordion({
  title,
  href,
  items,
  onLinkClick,
}: MobileAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        className="flex justify-between items-center w-full text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Link
          className="hover:text-slate-200"
          href={href}
          onClick={onLinkClick}
        >
          {title}
        </Link>
        {items && items.length > 0 && (
          <ChevronDown
            className={`w-6 h-6 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      {isOpen && items && items.length > 0 && (
        <div className="pl-4 flex flex-col space-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              className="w-full text-white hover:text-slate-200 py-1 text-xl"
              href={item.href}
              onClick={onLinkClick}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
