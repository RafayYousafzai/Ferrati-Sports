"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";

interface Category {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface Product {
  id: string;
  category_id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        // Fetch category details
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("*")
          .eq("id", categoryId)
          .single();

        if (categoryError) throw categoryError;
        setCategory(categoryData);

        // Fetch products in this category
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", categoryId)
          .order("created_at", { ascending: false });

        if (productsError) throw productsError;
        setProducts(productsData || []);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryAndProducts();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-default-500">
            The requested category could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3">
            <Image
              src={
                category.image_url ||
                "/placeholder.svg?height=300&width=400&query=category"
              }
              alt={category.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {category.title}
            </h1>
            <p className="text-default-600 text-lg mb-4">
              {category.description}
            </p>
            <Chip color="secondary" variant="flat">
              {products.length} products available
            </Chip>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Products in {category.title}
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-default-500">
              Products will be added to this category soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className="w-full hover:shadow-lg transition-shadow"
              >
                <CardHeader className="p-0">
                  <Image
                    src={
                      product.image_url ||
                      "/placeholder.svg?height=200&width=200&query=product"
                    }
                    alt={product.title}
                    className="w-full h-48 object-cover"
                    radius="lg"
                  />
                </CardHeader>
                <CardBody className="px-4 py-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {product.title}
                  </h3>
                  <p className="text-default-500 text-sm line-clamp-3">
                    {product.description}
                  </p>
                  <Chip variant="bordered" size="sm" className="mt-3">
                    {new Date(product.created_at).toLocaleDateString()}
                  </Chip>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
