import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/product-details";
import {
  getCachedBlogs,
  getCachedFabrics,
} from "@/lib/supabase/cached-queries";
import Header from "@/components/custom-ui/header";
import Card from "@/components/custom-ui/card";

export default async function Page({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!service) {
    return <div>Blog not found</div>;
  }

  // Separate components for data fetching
  async function FabricsSection() {
    const relatedFabrics = await getCachedFabrics();

    return (
      <>
        <Header
          badge="Ferrati"
          highlightedTitle="Fabrics"
          subtitle="Discover our premium materials tailored for your needs."
          title="Explore our "
        />
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
      </>
    );
  }

  async function BlogsSection() {
    const blogs = await getCachedBlogs();

    return (
      <>
        <Header
          badge="Ferrati"
          highlightedTitle=" Blogs"
          subtitle="Insights, trends, and stories from the world of apparel manufacturing."
          title="Check Our Latest"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
          {blogs?.map((item) => (
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
      </>
    );
  }
  return (
    <div>
      <ProductDetails
        buttonText="All Services"
        description={[service.description]}
        headline={service.title}
        href="/request-quote"
        image={service.image_url}
        sectionTitle="Ferrati"
        variant="white"
        showButton={false}
      />

      <FabricsSection />

      <BlogsSection />
    </div>
  );
}
