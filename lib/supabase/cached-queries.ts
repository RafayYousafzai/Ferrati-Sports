import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { cache } from "react";

// Cache database queries to avoid repeated calls
export const getCachedFabrics = cache(async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: relatedFabrics } = await supabase
    .from("fabrics")
    .select("*")
    .limit(3);

  return relatedFabrics;
});

export const getCachedBlogs = cache(async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: blogs } = await supabase.from("blogs").select("*").limit(3);

  return blogs;
});

export const getCachedCategories = cache(async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .limit(3);

  return categories;
});
