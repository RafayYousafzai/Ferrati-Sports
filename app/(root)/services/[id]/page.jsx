import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/product-details";
import AllProductsSummary from "@/components/layout/all-products-summary";
import { Button } from "@heroui/button";
import Link from "next/link";
import QuoteContactForm from "@/components/layout/QuoteContactForm";

export default async function Page({ params }) {
  const serviceSlug = params.id;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: service } = await supabase
    .from("services")
    .select("description, id, image_url, title")
    .eq("slug", serviceSlug)
    .single();

  if (!service) {
    return <div>Blog not found</div>;
  }
  return (
    <div className="pt-20">
      <ProductDetails
        description={[
          "We provide top-notch services tailored to your needs. Experience excellence with our dedicated team. From concept to completion, we ensure satisfaction.",
        ]}
        headline={service.title}
        href="/request-quote"
        image={service.image_url}
        variant="white"
        showButton={false}
        bgColor="bg-slate-50"
      >
        <div className="bg-white  shadow-2xl rounded-2xl p-8">
          <QuoteContactForm />
        </div>
      </ProductDetails>

      <div className="bg-white pt-4">
        <AllProductsSummary order={["services"]} />
      </div>
      <div className="max-w-7xl mx-auto py-6 html-content mt-6">
        <div dangerouslySetInnerHTML={{ __html: service.description }} />
      </div>

      <AllProductsSummary order={["categories", "fabrics", "blogs"]} />
    </div>
  );
}
