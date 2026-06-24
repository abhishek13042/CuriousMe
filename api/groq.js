export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // req.url will be e.g. /openai/v1/chat/completions
  const path = req.url || '/openai/v1/chat/completions';

  const groqRes = await fetch(
    `https://api.groq.com${path}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    }
  );

  const data = await groqRes.json();
  res.status(groqRes.status).json(data);
}
