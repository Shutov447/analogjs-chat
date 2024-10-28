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
import { WebSocketMessageController } from './server/web-socket';
import { UserRepository } from './server/repositories/user';
import { MessageRepository } from './server/repositories/message';

const pool = new pg.Pool({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'chat',
});
export const db = drizzle({ client: pool });
export const userRepo = new UserRepository(db);
export const messageRepo = new MessageRepository(db);

const wsmc = new WebSocketMessageController(
    'localhost',
    6969,
    userRepo,
    messageRepo
);
wsmc.listenTo();

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
