"use client";

import { useState, useEffect } from "react";
import { Package, FolderOpen } from "lucide-react";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Tabs, Tab } from "@heroui/tabs";
import { createClient } from "@/lib/supabase/client";

// Import the new components
import CategoryModal from "./components/CategoryModal";
import ProductModal from "./components/ProductModal";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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

  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const [categoryForm, setCategoryForm] = useState({
    title: "",
    menu_title: "",
    slug: "",
    description: "",
    image_url: "",
  });
  const [productForm, setProductForm] = useState({
    title: "",
    menu_title: "",
    slug: "",
    subtitle: "",
    price: "",
    description: "",
    image_url: "",
    category_id: "",
    trustpilot: "",
    google_reviews: "",
    fabric_ids: [],
  });

  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [productImageFile, setProductImageFile] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState("");
  const [productImagePreview, setProductImagePreview] = useState("");

  const supabase = createClient();

  // Data Fetching
  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([fetchCategories(), fetchProducts(), fetchFabrics()]);
      setLoading(false);
    };
    fetchAllData();
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
    }
  };

  const fetchFabrics = async () => {
    try {
      const { data, error } = await supabase
        .from("fabrics")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setFabrics(data || []);
    } catch (error) {
      console.error("Error fetching fabrics:", error);
    }
  };

  // Image Handling
  const uploadImage = async (file, folder) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleImageChange = (e, setFile, setPreview) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Form Resets
  const resetCategoryForm = () => {
    setCategoryForm({
      title: "",
      slug: "",
      price: "",
      description: "",
      image_url: "",
    });
    setCategoryImageFile(null);
    setCategoryImagePreview("");
    setEditingCategory(null);
  };

  const resetProductForm = () => {
    setProductForm({
      title: "",
      menu_title: "",
      subtitle: "",
      slug: "",
      price: "",
      description: "",
      image_url: "",
      category_id: "",
      fabric_ids: [],
    });
    setProductImageFile(null);
    setProductImagePreview("");
    setEditingProduct(null);
  };

  // Modal Openers
  const openAddCategory = () => {
    resetCategoryForm();
    onCategoryOpen();
  };

  const openAddProduct = () => {
    resetProductForm();
    onProductOpen();
  };

  // Edit Handlers
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({ ...category });
    setCategoryImagePreview(category.image_url);
    onCategoryOpen();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({ ...product, fabric_ids: product.fabric_ids || [] });
    setProductImagePreview(product.image_url);
    onProductOpen();
  };

  // Submit Handlers
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = categoryForm.image_url;
      if (categoryImageFile) {
        imageUrl = await uploadImage(categoryImageFile, "categories");
      }

      // Prepare data - only include slug if it exists
      const categoryData = {
        title: categoryForm.title,
        menu_title: categoryForm.menu_title,
        slug: categoryForm.slug,
        description: categoryForm.description,
        image_url: imageUrl,
      };

      // Only add slug if it has a value
      if (categoryForm.slug && categoryForm.slug.trim()) {
        categoryData.slug = categoryForm.slug.trim();
      }

      const { error } = editingCategory
        ? await supabase
            .from("categories")
            .update(categoryData)
            .eq("id", editingCategory.id)
        : await supabase.from("categories").insert([categoryData]);

      if (error) {
        console.error("Database error:", error);
        alert(`Error saving category: ${error.message}`);
        throw error;
      }
      await fetchCategories();
      onCategoryClose();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleProductSubmit = async (e, editorRef) => {
    e.preventDefault();
    setUploading(true);

    if (!editorRef.current?.editor) {
      throw new Error("Editor not initialized");
    }

    try {
      const content = editorRef.current.getHTML();

      let imageUrl = productForm.image_url;
      if (productImageFile) {
        imageUrl = await uploadImage(productImageFile, "products");
      }

      const { id, created_at, ...productData } = {
        ...productForm,
        image_url: imageUrl,
      };

      // Prepare data - only include slug if it exists
      const dataToSave = {
        ...productData,
        description: content,
      };

      // Only add slug if it has a value
      if (productForm.slug && productForm.slug.trim()) {
        dataToSave.slug = productForm.slug.trim();
      }

      const { error } = editingProduct
        ? await supabase
            .from("products")
            .update(dataToSave)
            .eq("id", editingProduct.id)
        : await supabase.from("products").insert([dataToSave]);

      if (error) {
        console.error("Database error:", error);
        alert(`Error saving product: ${error.message}`);
        throw error;
      }
      await fetchProducts();
      onProductClose();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setUploading(false);
    }
  };

  // Delete Handlers
  const handleDeleteCategory = async (id) => {
    if (
      !confirm("Are you sure? This will delete all products in this category.")
    )
      return;
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
      await Promise.all([fetchCategories(), fetchProducts()]);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center h-64">
        <Spinner size="lg" />
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
            startContent={<Package size={18} />}
            variant="bordered"
            onPress={openAddProduct}
          >
            Add Product
          </Button>
        </div>
      </div>

      <Tabs
        aria-label="Categories and Products"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
        color="primary"
        variant="underlined"
      >
        <Tab key="categories" title="Categories">
          <CategoryList
            categories={categories}
            products={products}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
            onAdd={openAddCategory}
          />
        </Tab>
        <Tab key="products" title="All Products">
          <ProductList
            categories={categories}
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onAdd={openAddProduct}
          />
        </Tab>
      </Tabs>

      <CategoryModal
        isOpen={isCategoryOpen}
        onClose={() => {
          resetCategoryForm();
          onCategoryClose();
        }}
        onSubmit={handleCategorySubmit}
        uploading={uploading}
        editingCategory={editingCategory}
        categoryForm={categoryForm}
        setCategoryForm={setCategoryForm}
        imagePreview={categoryImagePreview}
        onImageChange={(e) =>
          handleImageChange(e, setCategoryImageFile, setCategoryImagePreview)
        }
        onImageRemove={() => {
          setCategoryImageFile(null);
          setCategoryImagePreview("");
          setCategoryForm({ ...categoryForm, image_url: "" });
        }}
      />

      <ProductModal
        isOpen={isProductOpen}
        onClose={() => {
          resetProductForm();
          onProductClose();
        }}
        onSubmit={handleProductSubmit}
        uploading={uploading}
        editingProduct={editingProduct}
        productForm={productForm}
        setProductForm={setProductForm}
        categories={categories}
        fabrics={fabrics}
        imagePreview={productImagePreview}
        onImageChange={(e) =>
          handleImageChange(e, setProductImageFile, setProductImagePreview)
        }
        onImageRemove={() => {
          setProductImageFile(null);
          setProductImagePreview("");
          setProductForm({ ...productForm, image_url: "" });
        }}
      />
    </div>
  );
}
