"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Edit, Trash2, Package } from "lucide-react";

export default function ProductList({
  categories,
  products,
  onEdit,
  onDelete,
  onAdd,
}) {
  const getProductsByCategory = (categoryId) => {
    return products.filter((product) => product.category_id === categoryId);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 mx-auto text-default-300 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No products yet</h3>
        <p className="text-default-500 mb-6">
          Add products to your categories to get started.
        </p>
        <Button color="secondary" onPress={onAdd}>
          Add Product
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-6">
      {categories.map((category) => {
        const categoryProducts = getProductsByCategory(category.id);
        if (categoryProducts.length === 0) return null;

        return (
          <div key={category.id}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                {category.title}
              </h2>
              <Chip color="secondary" size="sm" variant="flat">
                {categoryProducts.length} products
              </Chip>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product) => (
                <Card key={product.id} className="w-full">
                  <CardHeader className="p-0">
                    <Image
                      alt={product.title}
                      className="object-cover"
                      radius="lg"
                      src={product.image_url || "/placeholder.svg"}
                    />
                  </CardHeader>
                  <CardBody className="px-3 py-3">
                    <div className="flex items-start justify-between mb-2 mt-auto">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {product.title}
                      </h4>
                      <div className="flex gap-1 ml-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => onEdit(product)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          isIconOnly
                          color="danger"
                          size="sm"
                          variant="light"
                          onPress={() => onDelete(product.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-default-500 text-md line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    {product?.price && (
                      <Chip size="sm" color="danger">
                        Price {product?.price}
                      </Chip>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
