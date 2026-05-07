import type { NextFunction, Request, Response } from "express";
import type { IAuthController } from "./Iauth.controller.js";
import type { IAuthService } from "../../services/auth/Iauth.service.js";
import { StatusCode } from "../../constants/status.code.js";
import { ErrorResponse, SuccessResponse } from "../../utilities/response.js";

export class AuthController implements IAuthController {
    private authService: IAuthService;
    constructor(AuthServie: IAuthService) {
        this.authService = AuthServie;
    }

    SuperAdminLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Body:",req.body)
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error("Credentials Not Found");
            }
            const { access_token, refresh_token, admin } = await this.authService.SuperAdminLogin({ email, password });
            const response = new SuccessResponse(StatusCode.OK, "Super Admin Login SuccessFully", admin);

            res.cookie('access_token', access_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 1 * 24 * 60 * 60 * 1000,
            })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            res.status(StatusCode.OK).json(response)

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, "Faild to Login Super Admin", errMsg))
        }
    }

}