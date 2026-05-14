export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { endpoint } = req.query;
  const API_KEY = 'b628ac78-e41e-4459-a0fd-e2c2dbe6ddc2';
  const urls = {
    'live': `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`,
    'matches': `https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`,
    'rankings-bat': `https://api.cricapi.com/v1/rankings?apikey=${API_KEY}&type=batsmen`,
    'rankings-bowl': `https://api.cricapi.com/v1/rankings?apikey=${API_KEY}&type=bowlers`,
    'rankings-team': `https://api.cricapi.com/v1/rankings?apikey=${API_KEY}&type=teams`,
  };
  const url = urls[endpoint] || urls['live'];
  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: 'failed' });
  }
}
