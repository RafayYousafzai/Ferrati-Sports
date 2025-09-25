import { cookies } from "next/headers";

import Header from "@/components/custom-ui/header";
import Card from "@/components/custom-ui/card";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import AllProductsSummary from "@/components/layout/all-products-summary";

// Main page component
export default async function FabricPage({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetch the specific fabric by ID
  const { data: fabric } = await supabase
    .from("fabrics")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!fabric) {
    return <div>Fabric not found</div>;
  }

  // Fetch limited fabrics for related products section
  const { data: relatedFabrics } = await supabase
    .from("fabrics")
    .select("*")
    .limit(6);

  return (
    <div className="  pt-20">
      <ProductDetails
        description={[
          `${fabric.description.substring(0, 600).replace(/<[^>]*>/g, "")}...`,
        ]}
        headline={fabric.title}
        image={fabric.image_url}
        variant="white"
      />

      {/* Full Fabric Description */}
      <div className="max-w-7xl mx-auto p-6 html-content">
        <div dangerouslySetInnerHTML={{ __html: fabric.description }} />
      </div>

      <AllProductsSummary order={["fabrics", "categories", "blogs"]} />
    </div>
  );
}
