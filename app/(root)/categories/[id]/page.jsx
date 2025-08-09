import { cookies } from "next/headers";

import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@heroui/button";

export default async function CategoryPage({ params }) {
  const categoryId = params.id;

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

  const { data: relatedFabrics } = await supabase
    .from("fabrics")
    .select("*")
    .limit(6);

  return (
    <div>
      <ProductDetails
        key={category.id}
        buttonText={`${products.length} Products Available`}
        description={[category.description]}
        headline={category.title}
        image={category.image_url}
        variant="orange"
      />

      <Header
        badge="Ferrati"
        highlightedTitle={category.title}
        leftAlign={false}
        subtitle="All the products in this category"
        title="Explore more in "
      />

      {products.length === 0 ? (
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
      )}
      <Header badge="Ferrati" highlightedTitle="fabrics" title="Explore our " />

      {/* Related Fabrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {relatedFabrics?.map((item) => (
          <div key={item.id}>
            <Card
              description={undefined}
              href={`/fabrics/${item.id}`}
              image={item.image_url}
              title={item.title}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
                className="text-sm text-default-500 line-clamp-3"
              />
              <br />
              <Button
                className="bg-orange-500 text-white"
                href={`/calculate-price`}
                radius="full"
                size="md"
              >
                Calculate Price
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
