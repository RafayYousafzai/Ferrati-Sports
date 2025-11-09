import { cookies } from "next/headers";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

// 🔹 Helper to create Supabase client
async function getSupabase() {
  const cookieStore = await cookies();

  return createClient(cookieStore);
}

/* --------------------
   FABRICS
-------------------- */
// ✅ Cached (fast) — default limit is 3
export const getCachedFabrics = cache(async (limit: number | null = 3) => {
  const supabase = await getSupabase();
  let query = supabase.from("fabrics").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
});

// 🚀 Non-cached (always fresh)
export async function getFabrics(limit: number | null = null) {
  const supabase = await getSupabase();
  let query = supabase.from("fabrics").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
}

/* --------------------
   BLOGS
-------------------- */
export const getCachedBlogs = cache(async (limit: number | null = 3) => {
  const supabase = await getSupabase();
  let query = supabase.from("blogs").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
});

export async function getBlogs(limit: number | null = null) {
  const supabase = await getSupabase();
  let query = supabase.from("blogs").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
}

/* --------------------
   CATEGORIES
-------------------- */
export const getCachedCategories = cache(async (limit: number | null = 3) => {
  const supabase = await getSupabase();
  let query = supabase.from("categories").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
});

export async function getCategories(limit: number | null = null) {
  const supabase = await getSupabase();
  let query = supabase.from("categories").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
}

/* --------------------
   SERVICES
-------------------- */
export const getCachedServices = cache(async (limit: number | null = 3) => {
  const supabase = await getSupabase();
  let query = supabase.from("services").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
});

export async function getServices(limit: number | null = null) {
  const supabase = await getSupabase();
  let query = supabase.from("services").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
}

/* --------------------
   PRODUCTS
-------------------- */
export const getCachedProducts = cache(async (limit: number | null = null) => {
  const supabase = await getSupabase();
  let query = supabase.from("products").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
});

export async function getProducts(limit: number | null = null) {
  const supabase = await getSupabase();
  let query = supabase.from("products").select("*");

  if (limit) query = query.limit(limit);
  const { data } = await query;

  return data;
}
