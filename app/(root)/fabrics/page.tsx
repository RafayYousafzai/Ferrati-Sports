import { Metadata } from "next";
import { cookies } from "next/headers";

import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/Header";
import { createClient } from "@/lib/supabase/server";

const title = "Choose the Most Suitable Fabrics for  ";
const highlightedTitle = "Your Brand";
const subtitle =
  "At Ascension International, discover the perfect fabric for your brand or clothing collection. Explore the advantages and disadvantages of each material, uncover the story behind its name, and understand its true identity. Learn how the fabric feels against the skin—whether it’s soft, textured, warm, or cool—and what it’s like to wear in real life. Find out which fabric is ideal for creating blank t-shirts, vintage hoodies, stylish jackets, or comfortable tracksuits. This comprehensive fabric guide covers everything from GSM, texture, available colors, care instructions, to its compatibility with different printing techniques—helping you make informed, confident choices for your clothing brand";

export const metadata: Metadata = {
  title: title + " " + highlightedTitle,
  description: subtitle,
};

export default async function page() {
  const cookieStore: any = await cookies();
  const supabase = createClient(cookieStore);

  const { data: fabrics } = await supabase.from("fabrics").select("*");

  return (
    <section>
      <Header
        badge="Ferrati"
        highlightedTitle={highlightedTitle}
        leftAlign={true}
        subtitle={subtitle}
        title={title}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {fabrics &&
          fabrics.map((fabric) => (
            <div key={fabric.id}>
              <Card
                key={fabric.id}
                description={undefined}
                href={`/fabrics/${fabric.id}`}
                image={fabric.image_url}
                title={fabric.title}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: fabric.description }}
                  className="text-sm text-default-500 line-clamp-3"
                />
              </Card>
            </div>
          ))}
      </div>
    </section>
  );
}
