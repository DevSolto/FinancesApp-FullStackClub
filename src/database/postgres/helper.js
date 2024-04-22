
import pg from "pg"

const { Pool } = pg

export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST, 
  port: process.env.PGPORT, 
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
});

export const PostgresHelper = {
  query: async (query, params) => {
    const client = await pool.connect()
    const results = await client.query(query, params)
    client.release()
    return results.rows
  }
}
