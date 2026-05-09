import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generate_Access_Token } from "../utilities/token.generate.js";

export interface AuthRequest extends Request {
    user?: any;
}

export const auth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;

        if (accessToken) {
            try {

                const decoded = jwt.verify(
                    accessToken,
                    process.env.JWT_ACCESS_TOKEN_SECRET as string
                );

                req.user = decoded;

                return next();
            } catch (error) {
                console.log(
                    "Access token expired", error
                );
            }
        }

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_TOKEN_SECRET as string
            ) as any;

            const newAccessToken = generate_Access_Token(decoded.id, decoded.role);

            res.cookie("access_token", newAccessToken,
                {
                    httpOnly: true,
                    sameSite: "strict",
                    secure:
                        process.env.NODE_ENV ===
                        "production",
                    maxAge:
                        15 * 60 * 1000,
                }
            );

            req.user = decoded;

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid refresh token",
            });
        }
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Authentication failed",
        });
    }
};