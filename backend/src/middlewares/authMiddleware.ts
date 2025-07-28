import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { Role } from "../types/role";

const enableAuthentication = process.env.ENABLE_AUTHENTICATION === "true";

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: string;
        customerId?: string;
    };
}

export function authenticate(allowedRoles?: Role[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!enableAuthentication) { return next() };

        let token: string | undefined;

        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        } else if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ error: "error unauthorized: no token provided" });
        }

        try {
            const payload = verifyToken(token);
            req.user = {
                userId: payload.userId,
                role: payload.role,
                customerId: payload.customerId
            };

            if (allowedRoles && !allowedRoles.includes(payload.role as Role)) {
                return res.status(403).json({ error: "error forbidden: insufficient role" });
            }

            next();
        } catch (err) {
            return res.status(401).json({ error: "error unauthorized: invalid token" });
        }
    };
}
