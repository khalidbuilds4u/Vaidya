const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres.hfpioqsydwrwfinhbbcd:Asad%40tourism2026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
  ssl: { rejectUnauthorized: false }
});
pool.query('SELECT NOW()')
  .then(res => { console.log("SUCCESS:", res.rows); process.exit(0); })
  .catch(err => { console.error("ERROR:", err); process.exit(1); });
