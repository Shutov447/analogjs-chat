import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgres://postgres:123@localhost:5432/chat',
    },
    verbose: true,
    strict: true,
});
