import { cookies } from "next/headers";

import Header from "@/components/custom-ui/header";
import Card from "@/components/custom-ui/card";
import ProductDetails from "@/components/layout/product-details";
import { createClient } from "@/lib/supabase/server";

// Main page component
export default async function BlogPage({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetch the specific fabric by ID
  const { data: fabric } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!fabric) {
    return <div>Blog not found</div>;
  }

  // Fetch limited blogs for related products section
  const { data: relatedBlogs } = await supabase
    .from("blogs")
    .select("*")
    .limit(6);

  return (
    <section>
      <ProductDetails
        description={[
          `${fabric.description.substring(0, 600).replace(/<[^>]*>/g, "")}...`,
        ]}
        headline={fabric.title}
        image={fabric.image_url}
        sectionTitle="OPPORTUNITIES"
        variant="white"
        showButton={false}
      />

      {/* Full Blog Description */}
      <div className="max-w-4xl mx-auto p-6">
        <div dangerouslySetInnerHTML={{ __html: fabric.description }} />
      </div>

      <Header badge="Ferrati" highlightedTitle="blogs" title="Explore more " />

      {/* Related Blogs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {relatedBlogs?.map((item) => (
          <div key={item.id}>
            <Card
              description={undefined}
              href={`/blogs/${item.id}`}
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
