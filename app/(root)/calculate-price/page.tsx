"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ProductSelectionPanel } from "@/components/calculate-price/ProductSelectionPanel";
import { ShoppingCartPanel } from "@/components/calculate-price/ShoppingCartPanel";
import { CartItem, Product, Category } from "@/types/calculate-price";
import Header from "@/components/custom-ui/header";

export default function PriceCalculator() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(50);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"selection" | "cart">("selection");

  const supabase = createClient();

  async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("title");

    if (error) throw error;
    return data || [];
  }

  async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories:category_id (
          id,
          title,
          description,
          image_url
        )
      `
      )
      .order("title");

    if (error) throw error;
    return data || [];
  }

  const loadData = async () => {
    try {
      setLoading(true);
      const [categoriesData, productsData] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);
      setCategories(categoriesData);
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category_id === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setSelectedProduct("");
  }, [selectedCategory, products]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category_id === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products, selectedCategory]);

  const addToCart = () => {
    if (!selectedProduct || quantity < 50) return;

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const existingItem = cart.find(
      (item) => item.product.id === selectedProduct
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === selectedProduct
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }

    // Reset form
    setSelectedProduct("");
    setQuantity(50);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 50) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.product.price || 0) * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value) || 50;
    setQuantity(Math.max(50, numValue));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 gap-8">
      <Header
        badge="OUR APPROACH"
        highlightedTitle="Selling"
        subtitle="We Believe In Building trust through unparalleled quality and genuine partnerships, allowing our exceptional work to speak for itself."
        title="Sell without "
      />

      {/* <SummaryStatistics
        categories={categories}
        products={products}
        cart={cart}
      /> */}

      <div className="space-y-6">
        {view === "selection" ? (
          <ProductSelectionPanel
            categories={categories}
            products={products}
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            addToCart={addToCart}
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onMakeNewQuote={() => setView("cart")}
          />
        ) : (
          <ShoppingCartPanel
            cart={cart}
            getTotalItems={getTotalItems}
            clearCart={clearCart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
            onBackToSelection={() => setView("selection")}
          />
        )}
      </div>
    </div>
  );
}
