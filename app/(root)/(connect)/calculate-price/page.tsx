"use client";

import { ProductSelectionPanel } from "@/components/calculate-price/ProductSelectionPanel";
import { ShoppingCartPanel } from "@/components/calculate-price/ShoppingCartPanel";
import Header from "@/components/custom-ui/header";
import { usePriceCalculation } from "@/context/PriceCalculationContext";

export default function PriceCalculator() {
  const { loading, view } = usePriceCalculation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8 gap-8">
      <Header
        badge="OUR APPROACH"
        highlightedTitle="Price"
        title="Calculate "
        subtitle="Get an instant estimate for your project using our simple calculator"
      />

      <div className="space-y-6">
        {view === "selection" ? (
          <ProductSelectionPanel />
        ) : (
          <ShoppingCartPanel />
        )}
      </div>
    </div>
  );
}
