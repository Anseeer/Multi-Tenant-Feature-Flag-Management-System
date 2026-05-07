import type { NextFunction, Request, Response } from "express";

export interface IAuthController {
    SuperAdminLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}