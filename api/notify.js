// Secure Backend Notification Handler for Gee's Naturals
// This script runs on Vercel's servers, hiding your Bot Token from the public.

module.exports = async (req, res) => {
    // 1. Diagnostics (You can visit /api/notify in your browser to see this)
    if (req.method === 'GET') {
        return res.status(200).send(`
      <h1>API is alive</h1>
      <p>Configured: ${!!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)}</p>
    `);
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.error('Missing Environment Variables');
        return res.status(500).json({ error: 'Missing environment variables on Vercel' });
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        console.log('Telegram response:', data);
        return res.status(response.status).json(data);
    } catch (error) {
        console.error('API Error:', error.message);
        return res.status(500).json({ error: 'Failed to communicate with Telegram', details: error.message });
    }
};
