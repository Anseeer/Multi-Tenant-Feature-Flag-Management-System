import type { NextFunction, Request, Response } from "express";
import type { IOrganaisation } from "../../models/organaisation/Iorganaisation.js";

export interface IOrganaisationController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}