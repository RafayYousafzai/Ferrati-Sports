"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Edit, Trash2, FolderOpen } from "lucide-react";

export default function CategoryList({
  categories,
  products,
  onEdit,
  onDelete,
  onAdd,
}) {
  const getProductsByCategory = (categoryId) => {
    return products.filter((product) => product.category_id === categoryId);
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <FolderOpen className="w-16 h-16 mx-auto text-default-300 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No categories yet</h3>
        <p className="text-default-500 mb-6">
          Start by creating your first category.
        </p>
        <Button color="primary" onPress={onAdd}>
          Create Category
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {categories.map((category) => {
        const categoryProducts = getProductsByCategory(category.id);
        return (
          <Card key={category.id} className="w-full">
            <CardHeader className="p-0">
              <Image
                alt={category.title}
                radius="lg"
                src={category.image_url}
              />
            </CardHeader>
            <CardBody className="px-4 py-4">
              <div className="flex items-start justify-between mb-2 mt-auto">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {category.title}
                </h3>
                <div className="flex gap-1 ml-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => onEdit(category)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    variant="light"
                    onPress={() => onDelete(category.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <p className="text-default-500 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <Chip color="secondary" size="sm" variant="flat">
                  {categoryProducts.length} products
                </Chip>
                <Chip size="sm" variant="bordered">
                  {new Date(category.created_at).toLocaleDateString()}
                </Chip>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
