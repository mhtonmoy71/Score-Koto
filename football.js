export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { endpoint } = req.query;
  const API_KEY = 'b3a4370cd7434e769f385e0f48aaf843';
  const urls = {
    'live': 'https://api.football-data.org/v4/matches?status=LIVE',
    'today': 'https://api.football-data.org/v4/matches',
    'pl-standings': 'https://api.football-data.org/v4/competitions/PL/standings',
  };
  const url = urls[endpoint] || urls['today'];
  try {
    const r = await fetch(url, { headers: { 'X-Auth-Token': API_KEY } });
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: 'failed' });
  }
}
