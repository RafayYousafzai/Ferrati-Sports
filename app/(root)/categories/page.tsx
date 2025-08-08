import { cookies } from "next/headers";

import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import { createClient } from "@/lib/supabase/server";
import Separator from "@/components/separator";

const title = "Choose the most";
const highlightedTitle = " Suitable Fabrics";
const subtitle =
  "At Ascension International, discover the perfect fabric for  c is ideal for creating blank t-shirts, vintage hoodies, stylish jackets, or comfortable tracksuits. This comprehensive fabric guide covers everything from GSM, texture, available colors, care instructions, to its compatibility with different printing techniques—helping you make informed, confident choices for your clothing brand";

export default async function page() {
  const cookieStore: any = await cookies();
  const supabase = createClient(cookieStore);

  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <section>
      <Header
        badge="Ferrati"
        highlightedTitle={highlightedTitle}
        subtitle={subtitle}
        title={title}
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
              </Card>
            </div>
          ))}
      </div>
    </section>
  );
}
