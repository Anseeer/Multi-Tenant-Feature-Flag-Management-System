import type { NextFunction, Request, Response } from "express";

export interface IFeatureController {
    addFeature(req: Request, res: Response, next: NextFunction): Promise<void>;
    removeFeature(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateFeature(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleFeature(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    findByOrgId(req: Request, res: Response, next: NextFunction): Promise<void>;
}