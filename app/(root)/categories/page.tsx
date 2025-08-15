import { cookies } from "next/headers";
import { Button } from "@heroui/button";

import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import { createClient } from "@/lib/supabase/server";
import Separator from "@/components/separator";
import AllProductsSummary from "@/components/layout/all-products-summary";

export default async function page() {
  const cookieStore: any = await cookies();
  const supabase = createClient(cookieStore);

  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <section>
      <Header
        badge="Ferrati"
        highlightedTitle="Categories"
        subtitle="Browse our full range of premium apparel and gear — crafted to meet the highest standards for brands worldwide."
        title="Explore All"
      />

      <Separator bg="accent" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {categories &&
          categories.map((categories) => (
            <div key={categories.id}>
              <Card
                key={categories.id}
                description={undefined}
                href={`/categories/${categories.id}`}
                image={categories.image_url}
                title={categories.title}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: categories.description }}
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
      <AllProductsSummary order={["fabrics", "blogs"]} />
    </section>
  );
}
