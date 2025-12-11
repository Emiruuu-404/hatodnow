-- ============================================
-- HatodNow! Supabase Database Schema
-- For Sipocot, Camarines Sur Delivery App
-- ============================================
-- 
-- HOW TO USE:
-- 1. Go to https://supabase.com and sign in
-- 2. Create a new project (name: hatodnow)
-- 3. Go to SQL Editor
-- 4. Click "New Query"
-- 5. Copy-paste this entire file
-- 6. Click "Run"
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('customer', 'vendor', 'rider')) DEFAULT 'customer',
    barangay TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- RESTAURANTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    barangay TEXT NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    delivery_time TEXT DEFAULT '20-30 min',
    delivery_fee DECIMAL(10,2) DEFAULT 25,
    cuisine TEXT[] DEFAULT '{}',
    is_open BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MENU ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category TEXT DEFAULT 'Main',
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL NOT NULL,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL NOT NULL,
    rider_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way', 'delivered', 'cancelled')) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 25,
    total DECIMAL(10,2) NOT NULL,
    delivery_address TEXT NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'cash',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    variant TEXT
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_orders_rider ON orders(rider_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_barangay ON restaurants(barangay);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users: Can read own profile, admins can read all
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Restaurants: Anyone can view, owner can edit
CREATE POLICY "Anyone can view restaurants" ON restaurants
    FOR SELECT USING (true);

CREATE POLICY "Owner can manage restaurant" ON restaurants
    FOR ALL USING (auth.uid() = owner_id);

-- Menu Items: Anyone can view, restaurant owner can edit
CREATE POLICY "Anyone can view menu items" ON menu_items
    FOR SELECT USING (true);

CREATE POLICY "Restaurant owner can manage menu" ON menu_items
    FOR ALL USING (
        restaurant_id IN (
            SELECT id FROM restaurants WHERE owner_id = auth.uid()
        )
    );

-- Orders: Participants can view their orders
CREATE POLICY "Customer can view own orders" ON orders
    FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Rider can view assigned orders" ON orders
    FOR SELECT USING (auth.uid() = rider_id);

CREATE POLICY "Customer can create orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Participants can update orders" ON orders
    FOR UPDATE USING (
        auth.uid() = customer_id OR 
        auth.uid() = rider_id OR
        restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
    );

-- Order Items: Same as orders
CREATE POLICY "View order items" ON order_items
    FOR SELECT USING (
        order_id IN (SELECT id FROM orders WHERE customer_id = auth.uid() OR rider_id = auth.uid())
    );

CREATE POLICY "Create order items" ON order_items
    FOR INSERT WITH CHECK (
        order_id IN (SELECT id FROM orders WHERE customer_id = auth.uid())
    );

-- ============================================
-- ENABLE REALTIME FOR ORDERS
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- ============================================
-- SAMPLE DATA FOR SIPOCOT
-- ============================================

-- Insert sample restaurants
INSERT INTO restaurants (name, description, barangay, rating, delivery_time, delivery_fee, cuisine, is_open, featured) VALUES
('Sipocot Lechon House', 'Best lechon in Sipocot', 'Brgy. Centro', 4.8, '20-30 min', 25, ARRAY['Filipino'], true, true),
('Centro Carinderia', 'Affordable home-cooked meals', 'Brgy. Centro', 4.5, '15-25 min', 20, ARRAY['Filipino'], true, true),
('Impig Snack House', 'Snacks, drinks, and quick bites', 'Brgy. Impig', 4.3, '10-20 min', 15, ARRAY['Snacks', 'Drinks'], true, false),
('Lourdes Eatery', 'Traditional Filipino favorites', 'Brgy. Lourdes', 4.4, '20-30 min', 20, ARRAY['Filipino'], true, true),
('Kabayan Grill', 'Grilled dishes and BBQ specialties', 'Brgy. Centro', 4.6, '25-35 min', 25, ARRAY['BBQ', 'Grill'], true, false);

-- Insert sample menu items for Sipocot Lechon House
INSERT INTO menu_items (restaurant_id, name, description, price, category, is_available)
SELECT 
    r.id,
    m.name,
    m.description,
    m.price,
    m.category,
    true
FROM restaurants r
CROSS JOIN (
    VALUES 
        ('Lechon (1/4 kg)', 'Crispy roasted pork', 350, 'Main'),
        ('Lechon (1/2 kg)', 'Crispy roasted pork', 650, 'Main'),
        ('Lechon (1 kg)', 'Crispy roasted pork', 1200, 'Main'),
        ('Lechon Kawali', 'Deep fried pork belly', 180, 'Main'),
        ('Lechon Paksiw', 'Lechon in vinegar sauce', 150, 'Main'),
        ('Rice', 'Steamed white rice', 20, 'Sides'),
        ('Soft Drinks', 'Coke, Sprite, Royal', 35, 'Drinks')
) AS m(name, description, price, category)
WHERE r.name = 'Sipocot Lechon House';

-- Insert sample menu items for Centro Carinderia
INSERT INTO menu_items (restaurant_id, name, description, price, category, is_available)
SELECT 
    r.id,
    m.name,
    m.description,
    m.price,
    m.category,
    true
FROM restaurants r
CROSS JOIN (
    VALUES 
        ('Adobo', 'Classic Filipino chicken adobo', 80, 'Main'),
        ('Sinigang na Baboy', 'Pork in sour soup', 100, 'Main'),
        ('Bicol Express', 'Spicy pork in coconut cream', 95, 'Main'),
        ('Laing', 'Taro leaves in coconut milk', 75, 'Main'),
        ('Pinangat', 'Taro leaves wrapped in gabi', 65, 'Main'),
        ('Rice', 'Steamed white rice', 15, 'Sides'),
        ('Buko Juice', 'Fresh coconut juice', 35, 'Drinks')
) AS m(name, description, price, category)
WHERE r.name = 'Centro Carinderia';

-- ============================================
-- DONE! Your database is ready!
-- ============================================
-- 
-- Next steps:
-- 1. Go to Settings > API
-- 2. Copy "Project URL" and "anon/public key"
-- 3. Paste them in src/lib/supabase.ts
-- ============================================
