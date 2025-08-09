"use client";

import { ProductSelectionPanel } from "@/components/calculate-price/ProductSelectionPanel";
import Header from "@/components/custom-ui/header";
import { usePriceCalculation } from "@/context/PriceCalculationContext";

export default function RequestQuote() {
  const { loading } = usePriceCalculation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 gap-8">
      <Header
        badge="OUR APPROACH"
        highlightedTitle="Selling"
        subtitle="We Believe In Building trust through unparalleled quality and genuine partnerships, allowing our exceptional work to speak for itself."
        title="Sell without "
      />

      <div className="space-y-6">
        <ProductSelectionPanel fn={false} />
      </div>
    </div>
  );
}
