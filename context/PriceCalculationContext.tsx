"use client";
// src/context/PriceCalculationContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { createClient } from "@/lib/supabase/client";
import { CartItem, Product, Category } from "@/types/calculate-price";

// Define the shape of the context
interface Ferrati {
  categories: Category[];
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  quantity: number;
  handleQuantityChange: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  addToCart: () => void;
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  loading: boolean;
  view: "selection" | "cart";
  setView: (value: "selection" | "cart") => void;
}

// Create context with default empty values
const PriceCalculationContext = createContext<Ferrati>({
  categories: [],
  products: [],
  filteredProducts: [],
  selectedCategory: "",
  setSelectedCategory: () => {},
  selectedProduct: "",
  setSelectedProduct: () => {},
  quantity: 50,
  handleQuantityChange: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  addToCart: () => {},
  cart: [],
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotalPrice: () => 0,
  getTotalItems: () => 0,
  loading: true,
  view: "selection",
  setView: () => {},
});

// Create provider
export const PriceCalculationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
        categories:category_id (*)
      `,
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
    if (products.length && categories.length) return;
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category_id === selectedCategory,
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
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      setFilteredProducts(filtered);
    } else if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category_id === selectedCategory,
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
      (item) => item.product.id === selectedProduct,
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === selectedProduct
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
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
          : item,
      ),
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

  return (
    <PriceCalculationContext.Provider
      value={{
        categories,
        products,
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        quantity,
        handleQuantityChange,
        searchTerm,
        setSearchTerm,
        addToCart,
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
        loading,
        view,
        setView,
      }}
    >
      {children}
    </PriceCalculationContext.Provider>
  );
};

// Hook to use the context
export const usePriceCalculation = () => useContext(PriceCalculationContext);
