export interface CartItem {
  product: Product;
  quantity: number;
  fabric: Fabric;
}

export type Fabric = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  created_at: string;
  updated_at: string;
  categories: Category | null;
};

export type Category = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};
