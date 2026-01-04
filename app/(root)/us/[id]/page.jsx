import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import AllProductsSummary from "@/components/layout/all-products-summary";
import QuoteContactForm from "@/components/layout/QuoteContactForm";
import FerratiAccordion from "@/components/layout/accordian";
import WhyFerrati from "@/components/layout/why-ferrati";

export async function generateMetadata({ params }) {
  const { id: categorySlug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", categorySlug)
    .single();

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  // Use meta_title and meta_description if available, otherwise fallback to title and description
  const title = category.meta_title || category.title;
  const description = category.meta_description || category.description;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      images: category.image_url ? [{ url: category.image_url }] : [],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { id: categorySlug } = await params;

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

  if (productsError) throw productsError;

  if (!category) {
    return (
      <div className="container mx-auto p-6">
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
    <div className="pt-20">
      <ProductDetails
        key={category.id}
        description={[category.description]}
        headline={category.title}
        image={category.image_url}
        variant="light"
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
      <Header
        highlightedTitle={category.title}
        leftAlign={false}
        subtitle="All the products in this category"
        title="Products in "
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
      {/* {products.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No products yet</h3>
          <p className="text-default-500">
            Products will be added to this category soon.
          </p>
        </div>
      ) : (
        products.map((product, index) => (
          <ProductDetails
            key={product.id}
            buttonText="Calculate Price"
            href={`/calculate-price`}
            description={[product.description]}
            headline={product.title}
            image={product.image_url}
            reversed={index % 2 === 0}
            sectionTitle={new Date(product.created_at).toLocaleDateString()}
            variant="white"
          />
        ))
      )} */}
      <AllProductsSummary order={["categories", "fabrics", "blogs"]} />
      <FerratiAccordion calculator={true} />
    </div>
  );
}
