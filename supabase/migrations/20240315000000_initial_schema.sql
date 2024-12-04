-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'pizzeria', 'client')) DEFAULT 'client',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create pizzas table
CREATE TABLE pizzas (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    vegetarian BOOLEAN NOT NULL DEFAULT false,
    ingredients TEXT[] NOT NULL DEFAULT '{}',
    price_small DECIMAL(10,2) NOT NULL,
    price_medium DECIMAL(10,2) NOT NULL,
    price_large DECIMAL(10,2) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create extras table
CREATE TABLE extras (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    status TEXT NOT NULL CHECK (status IN ('en_attente', 'confirmee', 'en_preparation', 'prete', 'recuperee')) DEFAULT 'en_attente',
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    preparation_at TIMESTAMPTZ,
    ready_at TIMESTAMPTZ,
    estimated_ready_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    pizza_id BIGINT NOT NULL REFERENCES pizzas(id),
    size TEXT NOT NULL CHECK (size IN ('small', 'medium', 'large')),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    removed_ingredients TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create order_item_extras table
CREATE TABLE order_item_extras (
    id BIGSERIAL PRIMARY KEY,
    order_item_id BIGINT NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
    extra_id BIGINT NOT NULL REFERENCES extras(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create settings table
CREATE TABLE settings (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    logo_url TEXT,
    opening_hours JSONB NOT NULL,
    preparation_times JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pizzas_updated_at
    BEFORE UPDATE ON pizzas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_extras_updated_at
    BEFORE UPDATE ON extras
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at
    BEFORE UPDATE ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_item_extras_updated_at
    BEFORE UPDATE ON order_item_extras
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pizzas ENABLE ROW LEVEL SECURITY;
ALTER TABLE extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_item_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admin and pizzeria can view all users"
    ON users FOR SELECT
    USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Pizzas policies
CREATE POLICY "Anyone can view active pizzas"
    ON pizzas FOR SELECT
    USING (active = true);

CREATE POLICY "Admin and pizzeria can manage pizzas"
    ON pizzas FOR ALL
    USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));

-- Extras policies
CREATE POLICY "Anyone can view active extras"
    ON extras FOR SELECT
    USING (active = true);

CREATE POLICY "Admin and pizzeria can manage extras"
    ON extras FOR ALL
    USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));

-- Orders policies
CREATE POLICY "Users can view their own orders"
    ON orders FOR SELECT
    USING (auth.uid()::text = user_id::text);

CREATE POLICY "Admin and pizzeria can view all orders"
    ON orders FOR SELECT
    USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));

CREATE POLICY "Users can create orders"
    ON orders FOR INSERT
    WITH CHECK (auth.uid()::text = user_id::text);

-- Order items policies
CREATE POLICY "Users can view their own order items"
    ON order_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM orders
        WHERE orders.id = order_items.order_id
        AND orders.user_id::text = auth.uid()::text
    ));

CREATE POLICY "Admin and pizzeria can view all order items"
    ON order_items FOR SELECT
    USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));

CREATE POLICY "Users can create order items"
    ON order_items FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM orders
        WHERE orders.id = order_items.order_id
        AND orders.user_id::text = auth.uid()::text
    ));

-- Order item extras policies
CREATE POLICY "Users can view their own order item extras"
    ON order_item_extras FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM order_items
        JOIN orders ON orders.id = order_items.order_id
        WHERE order_items.id = order_item_extras.order_item_id
        AND orders.user_id::text = auth.uid()::text
    ));

CREATE POLICY "Admin and pizzeria can view all order item extras"
    ON order_item_extras FOR SELECT
    USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));

CREATE POLICY "Users can create order item extras"
    ON order_item_extras FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM order_items
        JOIN orders ON orders.id = order_items.order_id
        WHERE order_items.id = order_item_extras.order_item_id
        AND orders.user_id::text = auth.uid()::text
    ));

-- Settings policies
CREATE POLICY "Anyone can view settings"
    ON settings FOR SELECT
    USING (true);

CREATE POLICY "Admin and pizzeria can manage settings"
    ON settings FOR ALL
    USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));