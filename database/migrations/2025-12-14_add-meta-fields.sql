-- Add meta title and meta description columns to categories table
alter table if exists public.categories
add column if not exists meta_title text,
add column if not exists meta_description text;

-- Add meta title and meta description columns to products table
alter table if exists public.products
add column if not exists meta_title text,
add column if not exists meta_description text;
