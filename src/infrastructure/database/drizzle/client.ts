import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as userSchema from './schema/iam/user.schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const schema = { ...userSchema };

export type DrizzleDb = NodePgDatabase<typeof schema> & {
  $release?: () => void;
};

export async function getDb(): Promise<DrizzleDb> {
  const client = await pool.connect();

  const db = drizzle(client, { schema }) as DrizzleDb;

  db.$release = () => client.release();

  return db;
}
