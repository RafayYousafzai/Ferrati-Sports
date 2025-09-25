"use client";
import { PriceCalculationProvider } from "@/context/PriceCalculationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PriceCalculationProvider>
      <div className="pt-20">{children}</div>
    </PriceCalculationProvider>
  );
}
