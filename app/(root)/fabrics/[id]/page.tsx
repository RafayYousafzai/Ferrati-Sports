import { cookies } from "next/headers";

import Header from "@/components/custom-ui/header";
import Card from "@/components/custom-ui/card";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";

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
        highlightedTitle="Technical Details"
        title="Fabric"
      />

      <ProductDetails
        description={[
          `${fabric.description.substring(0, 600).replace(/<[^>]*>/g, "")}...`,
        ]}
        headline={fabric.title}
        image={fabric.image_url}
        sectionTitle="OPPORTUNITIES"
        variant="white"
      />

      {/* Full Fabric Description */}
      <div className="max-w-4xl mx-auto p-6">
        <div dangerouslySetInnerHTML={{ __html: fabric.description }} />
      </div>

      <Header
        badge="Ferrati"
        highlightedTitle="fabrics"
        title="Explore more "
      />

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
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
