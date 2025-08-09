import { cookies } from "next/headers";

import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import { createClient } from "@/lib/supabase/server";
import Separator from "@/components/separator";

export default async function page() {
  const cookieStore: any = await cookies();
  const supabase = createClient(cookieStore);

  const { data: blogs } = await supabase.from("blogs").select("*");

  return (
    <section>
      <Header
        badge="Ferrati"
        highlightedTitle="Blogs "
        title="All"
        subtitle="Explore all our latest articles, tips, and updates"
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
