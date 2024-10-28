import { eq } from 'drizzle-orm';
import { NewUser, User, userTable } from '../../../db/schema/user';
import { db } from '../../../main.server';

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null | undefined>;
    create(user: NewUser): Promise<User>;
}

export class UserRepository implements IUserRepository {
    constructor(private readonly database: typeof db) {}

    async create(user: NewUser): Promise<User> {
        const [createdUser] = await this.database
            .insert(userTable)
            .values(user)
            .returning();

        return createdUser;
    }

    async findByEmail(email: string): Promise<User | null | undefined> {
        const [user] = await this.database
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));

        return user;
    }

    async findById(id: number): Promise<User | null | undefined> {
        const [user] = await this.database
            .select()
            .from(userTable)
            .where(eq(userTable.id, id));

        return user;
    }
}
