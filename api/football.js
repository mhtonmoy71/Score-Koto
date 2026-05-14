export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { endpoint, date } = req.query;
  const API_KEY = 'b3a4370cd7434e769f385e0f48aaf843';

  // Bangladesh time (UTC+6)
  function getBDDate(offset = 0) {
    const now = new Date();
    now.setHours(now.getHours() + 6); // UTC to BD
    now.setDate(now.getDate() + offset);
    return now.toISOString().split('T')[0];
  }

  const dateMap = {
    0: getBDDate(-1), // গতকাল
    1: getBDDate(0),  // আজ
    2: getBDDate(1),  // আগামীকাল
    3: getBDDate(2),  // শুক্র
    4: getBDDate(3),  // শনি
  };

  const targetDate = dateMap[date] || getBDDate(0);

  const urls = {
    'today': `https://api.football-data.org/v4/matches?dateFrom=${targetDate}&dateTo=${targetDate}`,
    'pl-standings': 'https://api.football-data.org/v4/competitions/PL/standings',
    'cl-standings': 'https://api.football-data.org/v4/competitions/CL/standings',
    'bl1-standings': 'https://api.football-data.org/v4/competitions/BL1/standings',
  };

  const url = urls[endpoint] || urls['today'];

  try {
    const r = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'failed' });
  }
}
