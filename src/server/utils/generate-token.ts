import { H3Event, setCookie } from 'h3';
import { SignJWT } from 'jose';

export const generateToken = async (event: H3Event, email: string) => {
    const secret = new TextEncoder().encode(
        process.env?.['SECRET_KEY_FOR_GENERATE_TOKEN']
    );
    const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(secret);
    setCookie(event, 'chatToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 20,
    });
};
