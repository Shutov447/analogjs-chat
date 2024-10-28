import {
    defineEventHandler,
    getRequestURL,
    parseCookies,
    sendRedirect,
} from 'h3';
import { verifyToken } from '../utils/verify-token';
import { IUserAuthData } from '../../../src/shared/types';
import { userRepo } from '../../../src/main.server';

export default defineEventHandler(async (event) => {
    const currentUrl = getRequestURL(event).pathname;

    if (!currentUrl.match(/^\/(login|registration)$/)) {
        const cookies = parseCookies(event);
        const token = cookies['chatToken'];

        if (token) {
            const { email } = (await verifyToken(
                token
            )) as unknown as IUserAuthData;

            if (email) {
                const foundUser = await userRepo.findByEmail(email);

                if (email === foundUser?.email) return;
            }
        }

        sendRedirect(event, '/login', 401);
    }
});
