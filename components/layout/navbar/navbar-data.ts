import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCachedCategories } from "@/lib/supabase/cached-queries";

interface Category {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  slug?: string;
}

interface NavbarData {
  categories: Category[];
}

export async function getNavbarData(): Promise<NavbarData> {
  try {
    // Use cached categories for better performance
    const categoriesData = await getCachedCategories(3);

    const categories = (categoriesData || []).map((cat: any) => ({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      image_url: cat.image_url,
      created_at: cat.created_at || new Date().toISOString(),
      slug: cat.slug,
    }));

    return {
      categories,
    };
  } catch (error) {
    console.error("Error fetching navbar data:", error);
    // Return empty data on error
    return {
      categories: [],
    };
  }
}
