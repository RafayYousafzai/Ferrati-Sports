import { cookies } from "next/headers";

import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import { createClient } from "@/lib/supabase/server";

const title = "Choose the Most Suitable blogs for  ";
const highlightedTitle = "Your Brand";
const subtitle =
  "At Ascension International, discover the perfect blogs for your brand or clothing collection. Explore the advantages and disadvantages of each material, uncover the story behind its name, and understand its true identity. Learn how the blogs feels against the skin—whether it’s soft, textured, warm, or cool—and what it’s like to wear in real life. Find out which blogs is ideal for creating blank t-shirts, vintage hoodies, stylish jackets, or comfortable tracksuits. This comprehensive blogs guide covers everything from GSM, texture, available colors, care instructions, to its compatibility with different printing techniques—helping you make informed, confident choices for your clothing brand";

export default async function page() {
  const cookieStore: any = await cookies();
  const supabase = createClient(cookieStore);

  const { data: blogs } = await supabase.from("blogs").select("*");

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
        {blogs &&
          blogs.map((blogs) => (
            <div key={blogs.id}>
              <Card
                key={blogs.id}
                description={undefined}
                href={`/blogs/${blogs.id}`}
                image={blogs.image_url}
                title={blogs.title}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: blogs.description }}
                  className="text-sm text-default-500 line-clamp-3"
                />
              </Card>
            </div>
          ))}
      </div>
    </section>
  );
}
