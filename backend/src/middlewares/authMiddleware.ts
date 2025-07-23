import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { Role } from "../types/role";

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export function authenticate(allowedRoles?: Role[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "error unauthorized: no token provided" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const payload = verifyToken(token);
            req.user = {
                userId: payload.userId,
                role: payload.role,
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
