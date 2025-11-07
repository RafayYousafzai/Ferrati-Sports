import {
  getCachedCategories,
  getCachedServices,
  getCachedFabrics,
} from "@/lib/supabase/cached-queries";

interface Category {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  slug?: string;
}

interface NavItem {
  id: string;
  name: string;
  slug: string;
}

interface NavbarData {
  categories: Category[];
  services: NavItem[];
  fabrics: NavItem[];
}

export async function getNavbarData(): Promise<NavbarData> {
  try {
    // Use cached data for better performance
    const [categoriesData, servicesData, fabricsData] = await Promise.all([
      getCachedCategories(null),
      getCachedServices(null),
      getCachedFabrics(null),
    ]);

    const categories = (categoriesData || []).map((cat: any) => ({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      image_url: cat.image_url,
      created_at: cat.created_at || new Date().toISOString(),
      slug: cat.slug,
    }));

    const services = (servicesData || []).map((service: any) => ({
      id: service.id,
      name: service.title || service.name,
      slug: service.slug,
    }));

    const fabrics = (fabricsData || []).map((fabric: any) => ({
      id: fabric.id,
      name: fabric.title || fabric.name,
      slug: fabric.slug,
    }));

    return {
      categories,
      services,
      fabrics,
    };
  } catch (error) {
    console.error("Error fetching navbar data:", error);

    // Return empty data on error
    return {
      categories: [],
      services: [],
      fabrics: [],
    };
  }
}
