import type { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../constants/status.code.js";
import type { IUserService } from "../../services/user/Iuser.service.js";
import type { UserService } from "../../services/user/user.service.js";
import { ErrorResponse, SuccessResponse } from "../../utilities/response.js";
import type { IUserController } from "./Iuser.controller.js";

export class UserController implements IUserController {
    private userService: IUserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    findUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.params;
            if(!userId){
                throw new Error('UserId Not found')
            }
            const user = await this.userService.findUser(userId as string);
            if (!user) throw new Error("Faild to find all users");
            const response = new SuccessResponse(StatusCode.OK, "Find all users successfully", user);
            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to find all users"))
        }
    }

    findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.userService.findAll();
            if (!users) throw new Error("Faild to find all users");
            const response = new SuccessResponse(StatusCode.OK, "Find all users successfully", users);
            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to find all users"))
        }
    }

    findOrganaisationUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const users = await this.userService.findOrganaisationUser(id as string);
            const response = new SuccessResponse(StatusCode.OK, "Find Users", users);
            res.status(StatusCode.OK).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to find all users"))
        }
    }

}