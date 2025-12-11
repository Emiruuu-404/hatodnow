// Quick test to check if Supabase connection is working
import { supabase, isSupabaseConfigured } from './src/lib/supabase';

async function testSupabaseConnection() {
    console.log('\n🔄 Testing Supabase Connection...\n');

    // Check 1: Is Supabase configured?
    console.log('1️⃣ Supabase Configured:', isSupabaseConfigured() ? '✅ YES' : '❌ NO');

    if (!isSupabaseConfigured()) {
        console.log('❌ Please configure Supabase in src/lib/supabase.ts');
        return;
    }

    // Check 2: Can we fetch restaurants?
    console.log('\n2️⃣ Fetching restaurants from database...');
    try {
        const { data: restaurants, error } = await supabase
            .from('restaurants')
            .select('*')
            .limit(5);

        if (error) {
            console.log('❌ Error:', error.message);
        } else if (restaurants && restaurants.length > 0) {
            console.log('✅ SUCCESS! Found', restaurants.length, 'restaurants:');
            restaurants.forEach((r: any) => {
                console.log(`   - ${r.name} (${r.barangay})`);
            });
        } else {
            console.log('⚠️ Connected, but no restaurants found. Run the schema SQL first.');
        }
    } catch (err) {
        console.log('❌ Connection Error:', err);
    }

    // Check 3: Can we fetch menu items?
    console.log('\n3️⃣ Fetching menu items...');
    try {
        const { data: menuItems, error } = await supabase
            .from('menu_items')
            .select('*')
            .limit(5);

        if (error) {
            console.log('❌ Error:', error.message);
        } else if (menuItems && menuItems.length > 0) {
            console.log('✅ SUCCESS! Found', menuItems.length, 'menu items:');
            menuItems.forEach((m: any) => {
                console.log(`   - ${m.name} (₱${m.price})`);
            });
        } else {
            console.log('⚠️ No menu items found.');
        }
    } catch (err) {
        console.log('❌ Error:', err);
    }

    console.log('\n========================================');
    console.log('🎉 Supabase Connection Test Complete!');
    console.log('========================================\n');
}

testSupabaseConnection();
