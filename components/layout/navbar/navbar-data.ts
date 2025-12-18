import {
  getCachedCategories,
  getCachedServices,
  getCachedFabrics,
  getCachedProducts,
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

interface Product {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  slug?: string;
}

interface NavbarData {
  categories: Category[];
  services: NavItem[];
  fabrics: NavItem[];
  products: Product[];
}

export async function getNavbarData(): Promise<NavbarData> {
  try {
    // Use cached data for better performance
    const [categoriesData, servicesData, fabricsData, productsData] =
      await Promise.all([
        getCachedCategories(null),
        getCachedServices(null),
        getCachedFabrics(null),
        getCachedProducts(null),
      ]);

    const categories = (categoriesData || []).map((cat: any) => ({
      id: cat.id,
      title: cat.menu_title || cat.title,
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

    const products = (productsData || []).map((product: any) => ({
      id: product.id,
      category_id: product.category_id,
      title: product.menu_title || product.title,
      description: product.description,
      image_url: product.image_url,
      slug: product.slug,
    }));

    return {
      categories,
      services,
      fabrics,
      products,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching navbar data:", error);

    // Return empty data on error
    return {
      categories: [],
      services: [],
      fabrics: [],
      products: [],
    };
  }
}
