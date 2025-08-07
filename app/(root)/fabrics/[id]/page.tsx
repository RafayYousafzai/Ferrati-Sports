import Header from "@/components/custom-ui/header";
import Card from "@/components/custom-ui/card";
import ProductDetails from "@/components/layout/product-details";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: fabric } = await supabase
    .from("fabrics")
    .select("*")
    .eq("id", params.id)
    .single();

  return {
    title: `${fabric?.title || "Fabric"} | Ascension International`,
    description: fabric?.description
      ? `${fabric.description.substring(0, 150).replace(/<[^>]*>/g, "")}...`
      : "Discover premium fabrics for your brand.",
    openGraph: {
      images: [fabric?.image_url || "/default-fabric.jpg"],
    },
  };
}

// Main page component
export default async function FabricPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetch the specific fabric by ID
  const { data: fabric } = await supabase
    .from("fabrics")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!fabric) {
    return <div>Fabric not found</div>;
  }

  // Fetch limited fabrics for related products section
  const { data: relatedFabrics } = await supabase
    .from("fabrics")
    .select("*")
    .limit(6);

  return (
    <section>
      <Header
        badge="Ferrati"
        title="Fabric"
        highlightedTitle="Technical Details"
      />

      <ProductDetails
        sectionTitle="OPPORTUNITIES"
        headline={fabric.title}
        description={[
          `${fabric.description.substring(0, 600).replace(/<[^>]*>/g, "")}...`,
        ]}
        image={fabric.image_url}
        variant="white"
      />

      {/* Full Fabric Description */}
      <div className="max-w-4xl mx-auto p-6">
        <div dangerouslySetInnerHTML={{ __html: fabric.description }} />
      </div>

      <Header
        badge="Ferrati"
        title="Explore more "
        highlightedTitle="fabrics"
      />

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
    </section>
  );
}
