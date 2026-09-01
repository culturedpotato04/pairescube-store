-- pairescube Supabase Schema
-- Run this in your Supabase SQL Editor

-- 1. Create Tables
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    sizes TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Categories Policies
-- Anyone can read categories
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

-- Only authenticated users (admins) can insert/update/delete categories
CREATE POLICY "Admins can insert categories" ON public.categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update categories" ON public.categories
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete categories" ON public.categories
    FOR DELETE USING (auth.role() = 'authenticated');


-- Products Policies
-- Anyone can read products
CREATE POLICY "Products are viewable by everyone" ON public.products
    FOR SELECT USING (true);

-- Only authenticated users (admins) can insert/update/delete products
CREATE POLICY "Admins can insert products" ON public.products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update products" ON public.products
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete products" ON public.products
    FOR DELETE USING (auth.role() = 'authenticated');


-- 3. Storage bucket for product images (Public)
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Images viewable by everyone" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admins can upload images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can update images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can delete images" ON storage.objects
    FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
