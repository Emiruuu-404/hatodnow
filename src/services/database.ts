import { supabase, isSupabaseConfigured } from '../lib/supabase';

// ============================================
// Database Types
// ============================================

export interface DBUser {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    role: 'customer' | 'vendor' | 'rider';
    barangay: string | null;
    avatar_url: string | null;
    created_at: string;
}

export interface DBRestaurant {
    id: string;
    owner_id: string;
    name: string;
    description: string;
    image_url: string | null;
    barangay: string;
    rating: number;
    delivery_time: string;
    delivery_fee: number;
    cuisine: string[];
    is_open: boolean;
    featured: boolean;
    created_at: string;
}

export interface DBMenuItem {
    id: string;
    restaurant_id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    category: string;
    is_available: boolean;
    created_at: string;
}

export interface DBOrder {
    id: string;
    customer_id: string;
    restaurant_id: string;
    rider_id: string | null;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'on_the_way' | 'delivered' | 'cancelled';
    subtotal: number;
    delivery_fee: number;
    total: number;
    delivery_address: string;
    payment_method: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface DBOrderItem {
    id: string;
    order_id: string;
    menu_item_id: string;
    name: string;
    quantity: number;
    price: number;
    variant: string | null;
}

// ============================================
// Database Service Functions
// ============================================

class DatabaseService {
    // ==================
    // AUTH
    // ==================

    async signUp(email: string, password: string, name: string, role: 'customer' | 'vendor' | 'rider' = 'customer') {
        if (!isSupabaseConfigured()) {
            console.warn('Supabase not configured, using mock data');
            return { user: null, error: null };
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name, role },
            },
        });

        if (data.user && !error) {
            // Create user profile in database
            await supabase.from('users').insert({
                id: data.user.id,
                email,
                name,
                role,
            });
        }

        return { user: data.user, error };
    }

    async signIn(email: string, password: string) {
        if (!isSupabaseConfigured()) {
            console.warn('Supabase not configured, using mock data');
            return { user: null, error: null };
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        return { user: data.user, session: data.session, error };
    }

    async signOut() {
        if (!isSupabaseConfigured()) return { error: null };
        const { error } = await supabase.auth.signOut();
        return { error };
    }

    async getCurrentUser() {
        if (!isSupabaseConfigured()) return null;
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }

    async getUserProfile(userId: string): Promise<DBUser | null> {
        if (!isSupabaseConfigured()) return null;

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }

        return data;
    }

    // ==================
    // RESTAURANTS
    // ==================

    async getRestaurants(): Promise<DBRestaurant[]> {
        if (!isSupabaseConfigured()) return [];

        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('is_open', true)
            .order('rating', { ascending: false });

        if (error) {
            console.error('Error fetching restaurants:', error);
            return [];
        }

        return data || [];
    }

    async getFeaturedRestaurants(): Promise<DBRestaurant[]> {
        if (!isSupabaseConfigured()) return [];

        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('featured', true)
            .eq('is_open', true)
            .order('rating', { ascending: false });

        if (error) {
            console.error('Error fetching featured restaurants:', error);
            return [];
        }

        return data || [];
    }

    async getRestaurantById(id: string): Promise<DBRestaurant | null> {
        if (!isSupabaseConfigured()) return null;

        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching restaurant:', error);
            return null;
        }

        return data;
    }

    async getRestaurantsByBarangay(barangay: string): Promise<DBRestaurant[]> {
        if (!isSupabaseConfigured()) return [];

        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('barangay', barangay)
            .eq('is_open', true);

        if (error) {
            console.error('Error fetching restaurants by barangay:', error);
            return [];
        }

        return data || [];
    }

    // ==================
    // MENU ITEMS
    // ==================

    async getMenuItems(restaurantId: string): Promise<DBMenuItem[]> {
        if (!isSupabaseConfigured()) return [];

        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .eq('restaurant_id', restaurantId)
            .eq('is_available', true)
            .order('category');

        if (error) {
            console.error('Error fetching menu items:', error);
            return [];
        }

        return data || [];
    }

    // ==================
    // ORDERS
    // ==================

    async createOrder(order: Omit<DBOrder, 'id' | 'created_at' | 'updated_at'>, items: Omit<DBOrderItem, 'id' | 'order_id'>[]): Promise<DBOrder | null> {
        if (!isSupabaseConfigured()) return null;

        // Create order
        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert(order)
            .select()
            .single();

        if (orderError || !orderData) {
            console.error('Error creating order:', orderError);
            return null;
        }

        // Create order items
        const orderItems = items.map(item => ({
            ...item,
            order_id: orderData.id,
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) {
            console.error('Error creating order items:', itemsError);
        }

        return orderData;
    }

    async getOrders(userId: string, role: 'customer' | 'vendor' | 'rider'): Promise<DBOrder[]> {
        if (!isSupabaseConfigured()) return [];

        let query = supabase.from('orders').select('*');

        if (role === 'customer') {
            query = query.eq('customer_id', userId);
        } else if (role === 'rider') {
            query = query.eq('rider_id', userId);
        }
        // vendor: filter by restaurant_id would need join

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
            return [];
        }

        return data || [];
    }

    async getOrderById(orderId: string): Promise<DBOrder | null> {
        if (!isSupabaseConfigured()) return null;

        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error) {
            console.error('Error fetching order:', error);
            return null;
        }

        return data;
    }

    async updateOrderStatus(orderId: string, status: DBOrder['status']): Promise<boolean> {
        if (!isSupabaseConfigured()) return false;

        const { error } = await supabase
            .from('orders')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', orderId);

        if (error) {
            console.error('Error updating order status:', error);
            return false;
        }

        return true;
    }

    async assignRider(orderId: string, riderId: string): Promise<boolean> {
        if (!isSupabaseConfigured()) return false;

        const { error } = await supabase
            .from('orders')
            .update({ rider_id: riderId, status: 'picked_up', updated_at: new Date().toISOString() })
            .eq('id', orderId);

        if (error) {
            console.error('Error assigning rider:', error);
            return false;
        }

        return true;
    }

    // ==================
    // REAL-TIME SUBSCRIPTIONS
    // ==================

    subscribeToOrderUpdates(orderId: string, callback: (order: DBOrder) => void) {
        if (!isSupabaseConfigured()) return () => { };

        const subscription = supabase
            .channel(`order-${orderId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${orderId}`,
                },
                (payload) => {
                    callback(payload.new as DBOrder);
                }
            )
            .subscribe();

        // Return unsubscribe function
        return () => {
            subscription.unsubscribe();
        };
    }

    subscribeToNewOrders(restaurantId: string, callback: (order: DBOrder) => void) {
        if (!isSupabaseConfigured()) return () => { };

        const subscription = supabase
            .channel(`restaurant-orders-${restaurantId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'orders',
                    filter: `restaurant_id=eq.${restaurantId}`,
                },
                (payload) => {
                    callback(payload.new as DBOrder);
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }

    subscribeToAvailableOrders(callback: (order: DBOrder) => void) {
        if (!isSupabaseConfigured()) return () => { };

        const subscription = supabase
            .channel('available-orders')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders',
                    filter: 'status=eq.ready',
                },
                (payload) => {
                    if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
                        callback(payload.new as DBOrder);
                    }
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }
}

export const db = new DatabaseService();
export default db;
