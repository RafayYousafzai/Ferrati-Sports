import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import AllProductsSummary from "@/components/layout/all-products-summary";
import QuoteContactForm from "@/components/layout/QuoteContactForm";
import WhyFerrati from "@/components/layout/why-ferrati";

// Main page component
export default async function FabricPage({ params }) {
  const { id: fabricSlug } = await params;

  const supabase = await createClient();

  // Fetch the specific fabric by slug
  const { data: fabric } = await supabase
    .from("fabrics")
    .select("*")
    .eq("slug", fabricSlug)
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
        bgColor="bg-slate-50"
        rightChildren={
          <div className="mt-10">
            <WhyFerrati />
          </div>
        }
      >
        {" "}
        <div className="bg-white  shadow-2xl rounded-2xl p-8">
          <QuoteContactForm />
        </div>
      </ProductDetails>
      <div className="bg-white pt-4">
        <AllProductsSummary order={["fabrics"]} />
      </div>
      {/* Full Fabric Description */}
      <div className="max-w-7xl mx-auto p-6 mt-10 html-content">
        <div dangerouslySetInnerHTML={{ __html: fabric.description }} />
      </div>

      <AllProductsSummary order={["categories", "blogs"]} />
    </div>
  );
}
