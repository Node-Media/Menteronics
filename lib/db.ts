import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured');
}

const globalForDb = globalThis as unknown as { pool?: Pool; initPromise?: Promise<void> };

export const pool =
  globalForDb.pool ??
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

const initTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS student_registrations (
      id BIGSERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      course TEXT NOT NULL,
      education TEXT,
      goals TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS homepage_contact_messages (
      id BIGSERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
};

export const ensureTables = () => {
  if (!globalForDb.initPromise) {
    globalForDb.initPromise = initTables();
  }

  return globalForDb.initPromise;
};
