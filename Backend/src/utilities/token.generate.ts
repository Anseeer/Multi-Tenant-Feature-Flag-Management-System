import jwt, { type Secret } from "jsonwebtoken";

export const generate_Access_Token = (id: string, role: string): string => {
    const secret: Secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
    const expiresIn = (process.env.JWT_ACCESS_TOKEN_EXPIREN_IN as jwt.SignOptions['expiresIn']) || '1d';

    return jwt.sign({ id, role }, secret, { expiresIn });
};

export const generate_Refresh_Token = (id: string, role: string): string => {
    const secret: Secret = process.env.JWT_REFRESH_TOKEN_SECRET as string;
    const expiresIn = (process.env.JWT_REFRESH_TOKEN_EXPIREN_IN as jwt.SignOptions['expiresIn']) || '1d';

    return jwt.sign({ id, role }, secret, { expiresIn });
};
