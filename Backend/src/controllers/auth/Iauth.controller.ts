import type { NextFunction, Request, Response } from "express";

export interface IAuthController {
    SuperAdminLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    AdminSignUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    AdminLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    UserSignUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    UserLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}