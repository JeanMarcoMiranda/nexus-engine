import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infrastructure/database/drizzle/schema/**/*.ts',
  out: './src/infrastructure/database/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
  migrations: { table: 'drizzle_migrations' },
});
