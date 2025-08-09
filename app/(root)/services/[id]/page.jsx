import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/product-details";

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

  // Fetch limited services for related products section
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .single();

  console.log(services);

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
    </div>
  );
}
