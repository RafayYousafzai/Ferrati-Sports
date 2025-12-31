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
import { CartItem, Product, Category, Fabric } from "@/types/calculate-price";

// Define the shape of the context
interface Ferrati {
  categories: Category[];
  fabrics: Fabric[];
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedFabric: string;
  setSelectedFabric: (value: string) => void;
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  quantity: number;
  handleQuantityChange: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  addToCart: () => void;
  cart: CartItem[];
  updateQuantity: (
    productId: string,
    fabricId: string,
    newQuantity: number,
  ) => void;
  removeFromCart: (productId: string, fabricId: string) => void;
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
  fabrics: [],
  products: [],
  filteredProducts: [],
  selectedCategory: "",
  setSelectedCategory: () => { },
  selectedFabric: "",
  setSelectedFabric: () => { },
  selectedProduct: "",
  setSelectedProduct: () => { },
  quantity: 50,
  handleQuantityChange: () => { },
  searchTerm: "",
  setSearchTerm: () => { },
  addToCart: () => { },
  cart: [],
  updateQuantity: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
  getTotalPrice: () => 0,
  getTotalItems: () => 0,
  loading: true,
  view: "selection",
  setView: () => { },
});

// Create provider
export const PriceCalculationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedFabric, setSelectedFabric] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(50);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"selection" | "cart">("selection");

  const supabase = createClient();

  console.log(cart);

  async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("title");

    if (error) throw error;

    return data || [];
  }

  async function getFabrics(): Promise<Fabric[]> {
    const { data, error } = await supabase
      .from("fabrics")
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
      const [categoriesData, fabricsData, productsData] = await Promise.all([
        getCategories(),
        getFabrics(),
        getProducts(),
      ]);

      setCategories(categoriesData);
      setFabrics(fabricsData);
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
    if (!selectedProduct || !selectedFabric || quantity < 50) return;

    const product = products.find((p) => p.id === selectedProduct);
    const fabric = fabrics.find((f) => f.id === selectedFabric);

    if (!product || !fabric) return;

    const existingItem = cart.find(
      (item) =>
        item.product.id === selectedProduct &&
        item.fabric.id === selectedFabric,
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === selectedProduct &&
            item.fabric.id === selectedFabric
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCart([...cart, { product, quantity, fabric }]);
    }

    // Reset form
    setSelectedProduct("");
    setSelectedFabric("");
    setQuantity(50);
  };

  const updateQuantity = (
    productId: string,
    fabricId: string,
    newQuantity: number,
  ) => {
    // console.log("Updating quantity:", productId, fabricId, newQuantity);

    if (newQuantity < 1) {
      removeFromCart(productId, fabricId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.fabric.id === fabricId) {
          // console.log("Found item to update", item);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, fabricId: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product.id === productId && item.fabric.id === fabricId)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const productPrice = item.product.price || 0;
      const fabricPrice = item.fabric.price || 0;

      return total + (productPrice + fabricPrice) * item.quantity;
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
        fabrics,
        products,
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        selectedFabric,
        setSelectedFabric,
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
