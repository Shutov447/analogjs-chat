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

const pool = new pg.Pool({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'chat',
});
const db = drizzle({ client: pool });

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
