const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  await client.connect();
  
  const res = await client.query("SELECT id, name, translations FROM \"Doctor\"");
  for (const doc of res.rows) {
    let trans = typeof doc.translations === 'string' ? JSON.parse(doc.translations) : doc.translations;
    console.log(doc.name, ":", trans?.ar ? Object.keys(trans.ar) : "NO ARABIC");
  }
  
  await client.end();
}
run().catch(console.error);
