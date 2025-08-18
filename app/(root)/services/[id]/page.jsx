import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/product-details";
import AllProductsSummary from "@/components/layout/all-products-summary";
import { Button } from "@heroui/button";
import Link from "next/link";

export default async function Page({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: service } = await supabase
    .from("services")
    .select("description, id, image_url, title")
    .eq("id", params.id)
    .single();

  if (!service) {
    return <div>Blog not found</div>;
  }
  return (
    <div>
      <ProductDetails
        buttonText="All Services"
        description={[
          "We provide top-notch services tailored to your needs. Experience excellence with our dedicated team. From concept to completion, we ensure satisfaction.",
        ]}
        headline={service.title}
        href="/request-quote"
        image={service.image_url}
        sectionTitle="Ferrati"
        variant="white"
        showButton={false}
      >
        <Link href="/categories">
          <Button size="lg" className=" bg-orange-500 text-white">
            All Products
          </Button>
        </Link>
        <Link href="/request-quote">
          <Button size="lg" className="ml-2 bg-orange-500 text-white">
            Request Quote
          </Button>
        </Link>
      </ProductDetails>

      <div className="max-w-7xl mx-auto py-6 html-content ">
        <div dangerouslySetInnerHTML={{ __html: service.description }} />
      </div>

      <AllProductsSummary order={["categories", "fabrics", "blogs"]} />
    </div>
  );
}
