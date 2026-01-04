import { createClient } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/product-details";
import AllProductsSummary from "@/components/layout/all-products-summary";
import WhyFerrati from "@/components/layout/why-ferrati";
import QuoteContactForm from "@/components/layout/QuoteContactForm";

export default async function Page({ params }) {
  const { id: serviceSlug } = await params;

  const supabase = await createClient();

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
        rightChildren={
          <div className="mt-10">
            <WhyFerrati />
          </div>
        }
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
