import type { NextFunction, Request, Response } from "express";

export interface IUserController {
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    findOrganaisationUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}