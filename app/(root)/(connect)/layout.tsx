"use client";
import { PriceCalculationProvider } from "@/context/PriceCalculationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PriceCalculationProvider>{children}</PriceCalculationProvider>;
}
