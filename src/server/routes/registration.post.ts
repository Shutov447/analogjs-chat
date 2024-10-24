import 'dotenv';
import bcrypt from 'bcrypt';
import { defineEventHandler, getRequestURL, parseCookies, readBody } from 'h3';
import { UserRepository } from '../repositories/user';
import { db } from '../../main.server';
import { generateToken } from '../utils/generate-token';
import { User } from '../../db/schema/user';
import { IRegistrationResponse, IUserAuthData } from '../../shared/types';

export default defineEventHandler(
    async (event): Promise<IRegistrationResponse | void> => {
        if (getRequestURL(event).pathname.startsWith('/registration')) {
            const newUser = await readBody(event);

            try {
                const { email, password } = newUser as IUserAuthData;

                if (email && password) {
                    const userRepo = new UserRepository(db);
                    const hashPassword = await bcrypt.hash(password, 10);
                    const createdUser: User = await userRepo.create({
                        email,
                        hashPassword,
                    });

                    generateToken(event, email);

                    return {
                        statusCode: 201,
                        message: 'User registered successfully',
                        returnedUser: { email: createdUser.email },
                    };
                } else {
                    throw new Error(
                        'Email and password are required, but it have not: ' +
                            newUser
                    );
                }
            } catch (error) {
                console.error('Error during user registration:', error);

                return { statusCode: 500, message: 'Failed to register user' };
            }
        }
    }
);
