import { createClient } from "@/lib/supabase/client";

export async function getAllContentBlocks() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("content_blocks")
      .select("key, value");
    
    if (error) {
      console.error("Error fetching content blocks:", error);
      return {};
    }

    // Convert array to object for easier lookup: { key: value }
    const contentMap = data.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    return contentMap;
  } catch (error) {
    console.error("Error in getAllContentBlocks:", error);
    return {};
  }
}
