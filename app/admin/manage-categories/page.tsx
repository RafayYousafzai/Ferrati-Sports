"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit, Package, FolderOpen, Upload, X } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@heroui/spinner";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Select, SelectItem } from "@heroui/select";

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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Modal controls
  const {
    isOpen: isCategoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isProductOpen,
    onOpen: onProductOpen,
    onClose: onProductClose,
  } = useDisclosure();

  // Editing states
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    image_url: "",
    category_id: "",
  });

  // File upload states
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState<string>("");
  const [productImagePreview, setProductImagePreview] = useState<string>("");

  const supabase = createClient();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleCategoryImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCategoryImage = () => {
    setCategoryImageFile(null);
    setCategoryImagePreview("");
    setCategoryForm({ ...categoryForm, image_url: "" });
  };

  const removeProductImage = () => {
    setProductImageFile(null);
    setProductImagePreview("");
    setProductForm({ ...productForm, image_url: "" });
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = categoryForm.image_url;

      // Upload new image if file is selected
      if (categoryImageFile) {
        imageUrl = await uploadImage(categoryImageFile, "categories");
      }

      const categoryData = {
        ...categoryForm,
        image_url: imageUrl,
      };

      if (editingCategory) {
        const { error } = await supabase
          .from("categories")
          .update(categoryData)
          .eq("id", editingCategory.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("categories")
          .insert([categoryData]);

        if (error) throw error;
      }

      resetCategoryForm();
      onCategoryClose();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error saving category. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = productForm.image_url;

      // Upload new image if file is selected
      if (productImageFile) {
        imageUrl = await uploadImage(productImageFile, "products");
      }

      const productData = {
        title: productForm.title,
        description: productForm.description,
        image_url: imageUrl,
        category_id: productForm.category_id,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert([productData]);

        if (error) throw error;
      }

      resetProductForm();
      onProductClose();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (
      !confirm(
        "Are you sure? This will also delete all products in this category."
      )
    )
      return;

    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);

      if (error) throw error;
      fetchCategories();
      fetchProducts();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      title: category.title,
      description: category.description,
      image_url: category.image_url,
    });
    setCategoryImagePreview(category.image_url);
    onCategoryOpen();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      description: product.description,
      image_url: product.image_url,
      category_id: product.category_id,
    });
    setProductImagePreview(product.image_url);
    onProductOpen();
  };

  const resetCategoryForm = () => {
    setCategoryForm({ title: "", description: "", image_url: "" });
    setCategoryImageFile(null);
    setCategoryImagePreview("");
    setEditingCategory(null);
  };

  const resetProductForm = () => {
    setProductForm({
      title: "",
      description: "",
      image_url: "",
      category_id: "",
    });
    setProductImageFile(null);
    setProductImagePreview("");
    setEditingProduct(null);
  };

  const openAddCategory = () => {
    resetCategoryForm();
    onCategoryOpen();
  };

  const openAddProduct = () => {
    resetProductForm();
    onProductOpen();
  };

  const getProductsByCategory = (categoryId: string) => {
    return products.filter((product) => product.category_id === categoryId);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Categories & Products
          </h1>
          <p className="text-default-500 mt-1">
            Manage your product categories and items
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            color="primary"
            startContent={<FolderOpen size={18} />}
            onPress={openAddCategory}
          >
            Add Category
          </Button>
          <Button
            className="text-black"
            variant="bordered"
            startContent={<Package size={18} />}
            onPress={openAddProduct}
          >
            Add Product
          </Button>
        </div>
      </div>

      <Tabs
        aria-label="Categories and Products"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        <Tab key="categories" title="Categories">
          <div className="mt-6">
            {categories.length === 0 ? (
              <div className="text-center py-16">
                <FolderOpen className="w-16 h-16 mx-auto text-default-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No categories yet
                </h3>
                <p className="text-default-500 mb-6">
                  Start by creating your first category.
                </p>
                <Button color="primary" onPress={openAddCategory}>
                  Create Category
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const categoryProducts = getProductsByCategory(category.id);
                  return (
                    <Card key={category.id} className="w-full">
                      <CardHeader className="p-0">
                        <Image
                          src={category.image_url}
                          alt={category.title}
                          radius="lg"
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
                              onPress={() => handleEditCategory(category)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="danger"
                              onPress={() => handleDeleteCategory(category.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-default-500 text-sm mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Chip color="secondary" variant="flat" size="sm">
                            {categoryProducts.length} products
                          </Chip>
                          <Chip variant="bordered" size="sm">
                            {new Date(category.created_at).toLocaleDateString()}
                          </Chip>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </Tab>

        <Tab key="products" title="All Products">
          <div className="mt-6">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 mx-auto text-default-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products yet</h3>
                <p className="text-default-500 mb-6">
                  Add products to your categories to get started.
                </p>
                <Button color="secondary" onPress={openAddProduct}>
                  Add Product
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {categories.map((category) => {
                  const categoryProducts = getProductsByCategory(category.id);
                  if (categoryProducts.length === 0) return null;

                  return (
                    <div key={category.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-xl font-semibold text-foreground">
                          {category.title}
                        </h2>
                        <Chip color="secondary" variant="flat" size="sm">
                          {categoryProducts.length} products
                        </Chip>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categoryProducts.map((product) => (
                          <Card key={product.id} className="w-full">
                            <CardHeader className="p-0">
                              <Image
                                src={
                                  product.image_url ||
                                  "/placeholder.svg?height=200&width=200&query=product" ||
                                  "/placeholder.svg"
                                }
                                alt={product.title}
                                className="object-cover"
                                radius="lg"
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
                                    onPress={() => handleEditProduct(product)}
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    color="danger"
                                    onPress={() =>
                                      handleDeleteProduct(product.id)
                                    }
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-default-500 text-xs line-clamp-2">
                                {product.description}
                              </p>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Tab>
      </Tabs>

      {/* Category Modal */}
      <Modal
        isOpen={isCategoryOpen}
        onClose={onCategoryClose}
        placement="top-center"
        size="2xl"
      >
        <ModalContent>
          <form onSubmit={handleCategorySubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Title"
                placeholder="Enter category title"
                value={categoryForm.title}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, title: e.target.value })
                }
                isRequired
                variant="bordered"
              />

              <Textarea
                label="Description"
                placeholder="Enter category description"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    description: e.target.value,
                  })
                }
                variant="bordered"
                minRows={3}
              />

              {/* Image Upload Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Category Image</label>

                {/* Image Preview */}
                {categoryImagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={categoryImagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      className="absolute -top-2 -right-2"
                      onPress={removeCategoryImage}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}

                {/* File Input */}
                <div className="flex gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryImageChange}
                    className="hidden"
                    id="category-image-upload"
                  />
                  <Button
                    as="label"
                    htmlFor="category-image-upload"
                    variant="bordered"
                    startContent={<Upload size={16} />}
                    className="cursor-pointer"
                  >
                    Upload Image
                  </Button>
                </div>

                {/* URL Input as fallback */}
                <Input
                  label="Or enter image URL"
                  placeholder="https://example.com/image.jpg"
                  value={categoryForm.image_url}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      image_url: e.target.value,
                    })
                  }
                  variant="bordered"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  resetCategoryForm();
                  onCategoryClose();
                }}
                isDisabled={uploading}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={uploading}
                isDisabled={uploading}
              >
                {uploading ? "Saving..." : editingCategory ? "Update" : "Add"}{" "}
                Category
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Product Modal */}
      <Modal
        isOpen={isProductOpen}
        onClose={onProductClose}
        placement="top-center"
        size="2xl"
      >
        <ModalContent>
          <form onSubmit={handleProductSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </ModalHeader>
            <ModalBody>
              <Select
                label="Category"
                placeholder="Select a category"
                selectedKeys={
                  productForm.category_id ? [productForm.category_id] : []
                }
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setProductForm({ ...productForm, category_id: selectedKey });
                }}
                isRequired
                variant="bordered"
              >
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Title"
                placeholder="Enter product title"
                value={productForm.title}
                onChange={(e) =>
                  setProductForm({ ...productForm, title: e.target.value })
                }
                isRequired
                variant="bordered"
              />

              <Textarea
                label="Description"
                placeholder="Enter product description"
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
                variant="bordered"
                minRows={3}
              />

              {/* Image Upload Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Product Image</label>

                {/* Image Preview */}
                {productImagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={productImagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      className="absolute -top-2 -right-2"
                      onPress={removeProductImage}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}

                {/* File Input */}
                <div className="flex gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageChange}
                    className="hidden"
                    id="product-image-upload"
                  />
                  <Button
                    as="label"
                    htmlFor="product-image-upload"
                    variant="bordered"
                    startContent={<Upload size={16} />}
                    className="cursor-pointer"
                  >
                    Upload Image
                  </Button>
                </div>

                {/* URL Input as fallback */}
                <Input
                  label="Or enter image URL"
                  placeholder="https://example.com/image.jpg"
                  value={productForm.image_url}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      image_url: e.target.value,
                    })
                  }
                  variant="bordered"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  resetProductForm();
                  onProductClose();
                }}
                isDisabled={uploading}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={uploading}
                isDisabled={uploading}
              >
                {uploading ? "Saving..." : editingProduct ? "Update" : "Add"}{" "}
                Product
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
