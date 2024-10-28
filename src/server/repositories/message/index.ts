import { db } from '../../../main.server';
import {
    Message,
    messageTable,
    NewMessage,
} from '../../../../src/db/schema/message';

export interface IMessageRepository {
    findAll(): Promise<Message[]>;
    create(message: NewMessage): Promise<Message>;
}

export class MessageRepository implements IMessageRepository {
    constructor(private readonly database: typeof db) {}

    async create(message: NewMessage): Promise<Message> {
        const [createdMessage] = await this.database
            .insert(messageTable)
            .values(message)
            .returning();

        return createdMessage;
    }

    async findAll(): Promise<Message[]> {
        return this.database.select().from(messageTable);
    }
}
