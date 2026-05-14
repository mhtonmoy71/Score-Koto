export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { endpoint, dateOffset } = req.query;
  const API_KEY = 'b3a4370cd7434e769f385e0f48aaf843';

  function getBDDate(offset = 0) {
    const now = new Date();
    // Convert to Bangladesh time (UTC+6)
    const bdTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
    bdTime.setDate(bdTime.getDate() + parseInt(offset || 0));
    return bdTime.toISOString().split('T')[0];
  }

  const targetDate = getBDDate(dateOffset || 0);

  const urls = {
    'today': `https://api.football-data.org/v4/matches?dateFrom=${targetDate}&dateTo=${targetDate}`,
    'pl-standings': 'https://api.football-data.org/v4/competitions/PL/standings',
    'cl-standings': 'https://api.football-data.org/v4/competitions/CL/standings',
    'bl1-standings': 'https://api.football-data.org/v4/competitions/BL1/standings',
    'pl-scorers': 'https://api.football-data.org/v4/competitions/PL/scorers',
  };

  const url = urls[endpoint] || urls['today'];

  try {
    const r = await fetch(url, { headers: { 'X-Auth-Token': API_KEY } });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'failed' });
  }
}
