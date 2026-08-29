import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT title, "coverImage" FROM "BlogPost"');
    console.log(res.rows);
  } finally {
    client.release();
    pool.end();
  }
}

main().catch(console.error);
