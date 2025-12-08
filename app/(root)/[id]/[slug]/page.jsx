import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import AllProductsSummary from "@/components/layout/all-products-summary";
import { Button } from "@heroui/button";
import { SiTrustpilot } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import QuoteContactForm from "@/components/layout/QuoteContactForm";

export default async function CategoryPage({ params }) {
  const { id: categorySlug, slug: productSlug } = await params;

  const supabase = await createClient();

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", categorySlug)
    .single();

  if (categoryError) throw categoryError;

  // Fetch products in this category
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  const selectedProduct = products.find(
    (product) => product.slug === productSlug || product.id === productSlug
  );

  if (productsError) throw productsError;

  if (!category) {
    return (
      <div className="container mx-auto p-6 pt-20">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-default-500">
            The requested category could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" pt-20">
      <ProductDetails
        bgColor="bg-slate-50"
        key={selectedProduct.id}
        // buttonText={`Calculate Price`}
        description={[selectedProduct.subtitle]}
        headline={selectedProduct.title}
        image={selectedProduct.image_url}
        variant="light"
        // href={`/calculate-price`}
      >
        <div className="">
          {selectedProduct.trustpilot && (
            <Link href={selectedProduct.trustpilot}>
              <Button className="bg-white">
                <SiTrustpilot className="text-green-400 size-4" />
                TrustPilot
              </Button>
            </Link>
          )}
          {selectedProduct.google_reviews && (
            <Link href={selectedProduct.google_reviews}>
              <Button className="ml-2 bg-white">
                <FcGoogle className=" size-4" />
                Google Reviews
              </Button>
            </Link>
          )}
        </div>
        <div className="bg-white  shadow-2xl rounded-2xl p-8">
          <QuoteContactForm />
        </div>{" "}
      </ProductDetails>
      <div className="bg-white pt-6">
        <Header
          badge="Ferrati"
          highlightedTitle={category.title}
          leftAlign={false}
          subtitle="More products in same category"
          title="More Products in "
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
          {products?.map((product) => (
            <Card
              key={product.id}
              href={`/${categorySlug}/${product.slug || product.id}`}
              image={product.image_url}
              title={product.title}
            >
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="text-sm text-default-500 line-clamp-3"
              />
            </Card>
          ))}
        </div>
      </div>

      <div className="  p-6 mt-6">
        <div className="max-w-7xl mx-auto  html-content">
          <div
            dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
          />
        </div>
      </div>

      <div className="bg-white pt-6">
        <AllProductsSummary order={["categories", "fabrics", "blogs"]} />
      </div>
    </div>
  );
}
