import { cookies } from "next/headers";

import Header from "@/components/custom-ui/header";
import Card from "@/components/custom-ui/card";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import AllProductsSummary from "@/components/layout/all-products-summary";

// Main page component
export default async function BlogPage({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetch the specific fabric by ID
  const { data: fabric } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!fabric) {
    return <div>Blog not found</div>;
  }

  // Fetch limited blogs for related products section
  const { data: relatedBlogs } = await supabase
    .from("blogs")
    .select("*")
    .limit(6);

  return (
    <section className="bg-white">
      <ProductDetails
        description={[
          `${fabric.description.substring(0, 600).replace(/<[^>]*>/g, "")}...`,
        ]}
        headline={fabric.title}
        image={fabric.image_url}
        sectionTitle=""
        variant="white"
        showButton={false}
      />

      {/* Full Blog Description */}
      <div className="max-w-7xl mx-auto p-6 html-content">
        <div dangerouslySetInnerHTML={{ __html: fabric.description }} />
      </div>

      <AllProductsSummary order={["blogs", "categories", "fabrics"]} />
    </section>
  );
}
