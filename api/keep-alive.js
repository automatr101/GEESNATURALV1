// Vercel Cron Job: Keep Supabase Awake
// This function runs every 24 hours to prevent Supabase from pausing the project.

export default async function handler(req, res) {
    const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qbjovztybsuqhpyhkzrp.supabase.co';
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiam92enR5YnN1cWhweWhrenJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjgyNzIsImV4cCI6MjA4NzEwNDI3Mn0.sxb-viBgHVwhs7RnIpQEcEH6m9uwCjUMf2oD-EtSx8c';

    try {
        // Just a simple 'ping' to the orders table (minimal data)
        const response = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=id&limit=1`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Supabase returned ${response.status}`);
        }

        console.log('Supabase Keep-Alive Ping: Successful');
        return res.status(200).json({ status: 'Keep-Alive Successful' });
    } catch (error) {
        console.error('Supabase Keep-Alive Ping: Failed', error);
        return res.status(500).json({ error: 'Keep-Alive Failed', message: error.message });
    }
}
