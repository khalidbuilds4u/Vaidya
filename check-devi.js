const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const res = await client.query("SELECT translations FROM \"Doctor\" WHERE name = 'Dr. Devi Shetty'");
  let trans = typeof res.rows[0].translations === 'string' ? JSON.parse(res.rows[0].translations) : res.rows[0].translations;
  console.log("biography in ar:", trans.ar?.biography);
  await client.end();
}
run();
