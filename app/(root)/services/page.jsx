import AllProductsSummary from "@/components/layout/all-products-summary";

export default function page() {
  return (
    <div>
      <AllProductsSummary order={["categories", "fabrics", "blogs"]} />
    </div>
  );
}
