-- pairescube Seed Data
-- Run this after running schema.sql to populate initial data

-- Insert Categories
INSERT INTO public.categories (name, slug) VALUES 
('Heels', 'heels'),
('Flats', 'flats'),
('Sneakers', 'sneakers'),
('Sandals', 'sandals'),
('Boots', 'boots'),
('Wedges', 'wedges');

-- Insert Products
WITH cat_heels AS (SELECT id FROM public.categories WHERE slug = 'heels' LIMIT 1),
     cat_flats AS (SELECT id FROM public.categories WHERE slug = 'flats' LIMIT 1),
     cat_sneakers AS (SELECT id FROM public.categories WHERE slug = 'sneakers' LIMIT 1)
INSERT INTO public.products (name, description, price, category_id, sizes, image_url, is_featured)
VALUES
('Classic Stiletto', 'Elegant black stiletto perfect for evening wear.', 2499, (SELECT id FROM cat_heels), ARRAY['5', '6', '7', '8'], 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80', true),
('Minimalist Ankle Strap', 'Minimalist beige heels for a chic look.', 1899, (SELECT id FROM cat_heels), ARRAY['6', '7', '8'], 'https://images.unsplash.com/photo-1596702206775-654859a0f4db?w=800&q=80', false),
('Everyday Loafers', 'Comfortable leather loafers for daily use.', 1499, (SELECT id FROM cat_flats), ARRAY['5', '6', '7', '8', '9'], 'https://images.unsplash.com/photo-1582213768528-98e39f37965b?w=800&q=80', true),
('Pointed Toe Flats', 'Sophisticated pointed toe flats in cream.', 1299, (SELECT id FROM cat_flats), ARRAY['6', '7'], 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80', false),
('Urban Platform Sneakers', 'Chunky platform sneakers for the modern city walk.', 2999, (SELECT id FROM cat_sneakers), ARRAY['6', '7', '8'], 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', true);
