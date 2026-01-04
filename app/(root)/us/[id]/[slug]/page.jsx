import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import AllProductsSummary from "@/components/layout/all-products-summary";
import { Button } from "@heroui/button";
import { SiTrustpilot } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import QuoteContactForm from "@/components/layout/QuoteContactForm";
import ReviewsShowcase from "@/components/layout/reviews-showcase";
import WhyFerrati from "@/components/layout/why-ferrati";

export async function generateMetadata({ params }) {
  const { id: categorySlug, slug: productSlug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", categorySlug)
    .single();

  if (!category) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id);

  const selectedProduct = products?.find(
    (product) => product.slug === productSlug || product.id === productSlug
  );

  if (!selectedProduct) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  // Use meta_title and meta_description if available, otherwise fallback to title
  const title = selectedProduct.meta_title || selectedProduct.title;
  const description =
    selectedProduct.meta_description || selectedProduct.subtitle;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      images: selectedProduct.image_url
        ? [{ url: selectedProduct.image_url }]
        : [],
    },
  };
}

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
        rightChildren={
          <div>
            <WhyFerrati />
          </div>
        }
        // href={`/calculate-price`}
      >
        <div className="">
          {selectedProduct.trustpilot && (
            <a
              href={
                selectedProduct.trustpilot.startsWith("http")
                  ? selectedProduct.trustpilot
                  : `https://${selectedProduct.trustpilot}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-lg">
                <SiTrustpilot className="text-green-400 size-8" />
                TrustPilot
              </Button>
            </a>
          )}
          {selectedProduct.google_reviews && (
            <a
              href={
                selectedProduct.google_reviews.startsWith("http")
                  ? selectedProduct.google_reviews
                  : `https://${selectedProduct.google_reviews}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="ml-2 bg-white text-lg">
                <FcGoogle className=" size-8" />
                Google Reviews
              </Button>
            </a>
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
              href={`/us/${categorySlug}/${product.slug || product.id}`}
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
      <ReviewsShowcase />
    </div>
  );
}
