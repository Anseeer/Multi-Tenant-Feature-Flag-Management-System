import type { Request, Response, NextFunction } from "express";
import type { IOrganaisationService } from "../../services/organaisation/Iorganaisation.service.js";
import type { IOrganaisationController } from "./Iorganaisation.controller.js";
import { ErrorResponse, SuccessResponse } from "../../utilities/response.js";
import { StatusCode } from "../../constants/status.code.js";

export class OrganaisationController implements IOrganaisationController {
    private organaisationService: IOrganaisationService;
    constructor(orgService: IOrganaisationService) {
        this.organaisationService = orgService;
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("Body :", req.body);
            const { name, description } = req.body;
            if (!name || !description) {
                throw new Error("Data Not Found");
            }

            const data = await this.organaisationService.create({ name, description });
            if (!data) throw new Error("Faild to create Organaisation");

            const response = new SuccessResponse(StatusCode.CREATED, "Organaisation Created Successfully", data);
            res.status(StatusCode.CREATED).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.BAD_REQUEST, errMsg, "Faild to create new organaisation"));
        }
    }

    findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await this.organaisationService.findAll();
            const response = new SuccessResponse(StatusCode.OK, "FindAll Organaisation Successfully", data);

            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.BAD_REQUEST, errMsg, "Faild to findAll Organaisation"));
        }
    }

}