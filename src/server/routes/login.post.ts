import bcrypt from 'bcrypt';
import {
    defineEventHandler,
    getRequestURL,
    H3Event,
    parseCookies,
    readBody,
} from 'h3';
import { generateToken } from '../utils/generate-token';
import { db } from '../../main.server';
import { IUserRepository, UserRepository } from '../repositories/user';
import { IReturnedUser, IUserAuthData } from '../../shared/types';
import { verifyToken } from '../utils/verify-token';

export default defineEventHandler(
    async (event): Promise<IReturnedUser | void> => {
        if (getRequestURL(event).pathname.startsWith('/login')) {
            const userAuthData = await readBody(event);
            console.log('after not found email or password', userAuthData);
            const userRepo = new UserRepository(db);

            return !(userAuthData?.email && userAuthData?.password)
                ? authByToken(event, userRepo)
                : authByLoginData(event, userRepo, userAuthData);
        }
    }
);

const authByToken = async (
    event: H3Event,
    userRepo: IUserRepository
): Promise<{ email: string } | void> => {
    const token = parseCookies(event)['chatToken'];

    if (!token) return;

    const payload = (await verifyToken(token)) as unknown as IUserAuthData;
    const foundUser = await userRepo.findByEmail(payload.email);

    if (foundUser) return { email: foundUser.email };
};

const authByLoginData = async (
    event: H3Event,
    userRepo: IUserRepository,
    userAuthData: IUserAuthData
): Promise<{ email: string } | void> => {
    const foundUser = await userRepo.findByEmail(userAuthData.email);

    if (foundUser) {
        const isValidPassword = await bcrypt.compare(
            userAuthData.password,
            foundUser.hashPassword
        );

        if (isValidPassword) {
            generateToken(event, foundUser.email);
            return { email: foundUser.email };
        }
    }
};
