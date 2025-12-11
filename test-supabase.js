// Simple JavaScript test for Supabase connection
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ebbthipueuntlcrazwbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYnRoaXB1ZXVudGxjcmF6d2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0Njg0OTYsImV4cCI6MjA4MTA0NDQ5Nn0.MnxLS2tNGQN7dki8x6PZzkJgAK_lH1pgqo1CGFbQ9oA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
    console.log('\n🔄 Testing Supabase Connection...\n');

    try {
        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .limit(5);

        if (error) {
            console.log('❌ Error:', error.message);
        } else if (data && data.length > 0) {
            console.log('✅ SUCCESS! Connected to Supabase!');
            console.log(`📦 Found ${data.length} restaurants:\n`);
            data.forEach(r => {
                console.log(`   - ${r.name} (${r.barangay})`);
            });
        } else {
            console.log('⚠️ Connected but no data found');
        }
    } catch (err) {
        console.log('❌ Connection failed:', err.message);
    }

    console.log('\n✅ Test complete!\n');
}

testConnection();
