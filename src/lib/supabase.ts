import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// 🚨 IMPORTANT: Create your Supabase project first!
// ============================================
// 1. Go to https://supabase.com
// 2. Sign in with GitHub
// 3. Create a new project (name: hatodnow)
// 4. Go to Settings > API
// 5. Copy Project URL and anon/public key
// 6. Replace the values below
// ============================================

const SUPABASE_URL = 'https://ebbthipueuntlcrazwbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYnRoaXB1ZXVudGxjcmF6d2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0Njg0OTYsImV4cCI6MjA4MTA0NDQ5Nn0.MnxLS2tNGQN7dki8x6PZzkJgAK_lH1pgqo1CGFbQ9oA';

// Create Supabase client with React Native AsyncStorage
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
    return SUPABASE_URL.length > 10 && SUPABASE_ANON_KEY.length > 10;
};

export default supabase;
