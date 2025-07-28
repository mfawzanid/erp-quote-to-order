import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined");
}
const JWT_SECRET: string = secret;

const JWT_EXPIRES_IN = "1d";

interface TokenPayload {
    userId: string;
    role: string;
    customerId?: string,
}

export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
