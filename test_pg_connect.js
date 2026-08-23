const { Pool } = require('pg');
const pool = new Pool({
  connectionString: "postgresql://postgres.hfpioqsydwrwfinhbbcd:Asad%40tourism2026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error("Connection failed:", err.message);
  } else {
    console.log("Connection successful:", res.rows);
  }
  pool.end();
});
