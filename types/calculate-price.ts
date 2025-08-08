export interface CartItem {
  product: Product;
  quantity: number;
}

export type Product = {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  created_at: string;
  updated_at: string;
  categories: {
    id: string;
    title: string;
    description: string | null;
    image_url: string | null;
  };
};

export type Category = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};
