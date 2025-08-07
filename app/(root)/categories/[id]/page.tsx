import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

interface Category {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface Product {
  id: string;
  category_id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
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
    <div className="">
      <ProductDetails
        key={category.id}
        // sectionTitle={new Date(product.created_at).toLocaleDateString()}
        headline={category.title}
        description={[category.description]}
        buttonText={products.length + " " + "Products Available"}
        image={category.image_url}
        variant="orange"
      />

      <Header
        badge="Ferrati"
        title={"Explore more in "}
        highlightedTitle={category.title}
        subtitle={"All the products in this category"}
        leftAlign={false}
      />

      {/* Products Grid */}
      <h2 className="text-2xl font-semibold mb-6"></h2>

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
            sectionTitle={new Date(product.created_at).toLocaleDateString()}
            headline={product.title}
            description={[product.description]}
            buttonText="View positions"
            image={product.image_url}
            variant="white"
            reversed={index % 2 === 0} // Alternates between true and false
          />
        ))
      )}

      <Header badge="Ferrati" title="Explore our " highlightedTitle="fabrics" />

      {/* Related Fabrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {relatedFabrics?.map((item) => (
          <div key={item.id}>
            <Card
              description={undefined}
              title={item.title}
              image={item.image_url}
              href={`/fabrics/${item.id}`}
            >
              <div
                className="text-sm text-default-500 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
