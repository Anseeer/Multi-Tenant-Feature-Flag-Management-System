import type { Request, Response, NextFunction } from "express";
import type { IFeatureService } from "../../services/feature/Ifeature.service.js";
import type { IFeatureController } from "./Ifeature.controller.js";
import { ErrorResponse, SuccessResponse } from "../../utilities/response.js";
import { StatusCode } from "../../constants/status.code.js";

export class FeatureController implements IFeatureController {
    private featureService: IFeatureService;
    constructor(featureServ: IFeatureService) {
        this.featureService = featureServ;
    }

    addFeature = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, orgId } = req.body;
            if (!name || !orgId) {
                throw new Error("Feature data not found");
            }
            const data = await this.featureService.addFeature(req.body);
            const response = new SuccessResponse(StatusCode.CREATED, "Feature Added", data);

            res.status(StatusCode.CREATED).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.log(errMsg)
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to addFeature"));
        }
    }

    removeFeature = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Feature Id not found");
            }
            const data = await this.featureService.removeFeature(id as string);
            const response = new SuccessResponse(StatusCode.OK, "Feature Removed", data);

            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to removeFeature"));
        }
    }

    updateFeature = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log(req.body)
            const { id, name, isEnable } = req.body;
            if (!id || !name || !isEnable) {
                throw new Error("Data not found");
            }
            const data = await this.featureService.updateFeature(req.body);
            const response = new SuccessResponse(StatusCode.OK, "Feature Updated", data);

            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to updateFeature"));
        }
    }

    toggleFeature = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Id not found");
            }
            const data = await this.featureService.toggleFeature(id as string);
            const response = new SuccessResponse(StatusCode.OK, "Feature toggled", data);

            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.log("Error :", errMsg)
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to toggleFeature"));
        }
    }

    findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await this.featureService.findAll();
            const response = new SuccessResponse(StatusCode.OK, "find all", data);

            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to findAll"));
        }
    }

    findByOrgId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { orgId } = req.params;

            if (!orgId) {
                throw new Error("OrgID Not found");
            }

            const data = await this.featureService.findByOrgId(orgId as string);

            const response = new SuccessResponse(StatusCode.OK, "find org", data);

            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to findAll"));
        }
    }

}