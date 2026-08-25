const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const res = await client.query("SELECT biography FROM \"Doctor\" WHERE name = 'Dr. Devi Shetty'");
  console.log("English biography:", res.rows[0].biography);
  await client.end();
}
run();
