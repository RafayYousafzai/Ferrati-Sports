import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/product-details";
import AllProductsSummary from "@/components/layout/all-products-summary";

export default async function Page({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!service) {
    return <div>Blog not found</div>;
  }
  return (
    <div>
      <ProductDetails
        buttonText="All Services"
        description={[service.description]}
        headline={service.title}
        href="/request-quote"
        image={service.image_url}
        sectionTitle="Ferrati"
        variant="white"
        showButton={false}
      />

      <div className="max-w-7xl mx-auto p-6 html-content">
        <div dangerouslySetInnerHTML={{ __html: service.description }} />
      </div>

      <AllProductsSummary order={["categories", "fabrics", "blogs"]} />
    </div>
  );
}
