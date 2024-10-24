import { jwtVerify } from 'jose';

export const verifyToken = async (token: string) => {
    try {
        const secret = new TextEncoder().encode(
            process.env?.['SECRET_KEY_FOR_GENERATE_TOKEN']
        );
        const { payload } = await jwtVerify(token, secret);

        return payload;
    } catch (error) {
        console.error('Token verification failed:', error);

        throw new Error('Invalid token: ' + error);
    }
};
