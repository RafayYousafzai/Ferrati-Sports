import { cookies } from "next/headers";

import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import AllProductsSummary from "@/components/layout/all-products-summary";

export default async function CategoryPage({ params }) {
  const categoryId = params.id;
  const productId = params.slug;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (categoryError) throw categoryError;

  // Fetch products in this category
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  const selectedProduct = products.find((product) => product.id === productId);

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
    <div>
      <ProductDetails
        key={selectedProduct.id}
        buttonText={`${products.length} Products Available`}
        description={[selectedProduct.description]}
        headline={selectedProduct.title}
        image={selectedProduct.image_url}
        variant="orange"
      />

      <Header
        badge="Ferrati"
        highlightedTitle={category.title}
        leftAlign={false}
        subtitle="More products in same category"
        title="Explore more in "
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {products?.map((product) => (
          <Card
            key={product.id}
            href={`/categories/${categoryId}/${product.id}`}
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

      <AllProductsSummary order={["categories", "fabrics", "blogs"]} />
    </div>
  );
}
