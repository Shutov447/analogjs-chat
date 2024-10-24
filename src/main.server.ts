import 'zone.js/node';
import '@angular/platform-server/init';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';
import { provideServerContext } from '@analogjs/router/server';
import { ServerContext } from '@analogjs/router/tokens';
import { drizzle } from 'drizzle-orm/node-postgres';
import { AppComponent, config } from '@app';
import pg from 'pg';
import { userTable } from './db/schema/user';
import { sql } from 'drizzle-orm';

const pool = new pg.Pool({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'chat',
});
export const db = drizzle({ client: pool });

// (async () => {
//     const hashPassword = await bcrypt.hash('12345678', 10);
//     const hashPassword2 = await bcrypt.hash('12345678', 10);
//     const hashPassword3 = await bcrypt.hash('12345678', 10);
//     console.log('hashPassword', hashPassword);
//     console.log('hashPassword2', hashPassword2);
//     console.log('hashPassword3', hashPassword3);
//     console.log(
//         'same?',
//         hashPassword === hashPassword2 && hashPassword === hashPassword3
//     );
// })();
// clear table
// (async () => await db.execute(sql`TRUNCATE TABLE users CASCADE;`))();

if (import.meta.env.PROD) {
    enableProdMode();
}

export function bootstrap() {
    return bootstrapApplication(AppComponent, config);
}

export default async function render(
    url: string,
    document: string,
    serverContext: ServerContext
) {
    const html = await renderApplication(bootstrap, {
        document,
        url,
        platformProviders: [provideServerContext(serverContext)],
    });

    return html;
}
