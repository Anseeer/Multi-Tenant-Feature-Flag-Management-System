import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";

export interface IAuthController {
    GetCurrentUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    SuperAdminLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    AdminSignUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    AdminLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    UserSignUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    UserLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}