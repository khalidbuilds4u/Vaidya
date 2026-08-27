const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query("SELECT \"imageUrl\" FROM \"Doctor\" WHERE \"imageUrl\" IS NOT NULL")
  .then(res => {
    const urls = res.rows.map(r => r.imageUrl);
    const domains = new Set();
    for (const url of urls) {
      if (url && url.startsWith('http')) {
        try {
          domains.add(new URL(url).hostname);
        } catch (e) {}
      }
    }
    console.log(Array.from(domains));
    pool.end();
  })
  .catch(err => {
    console.error(err);
    pool.end();
  });
