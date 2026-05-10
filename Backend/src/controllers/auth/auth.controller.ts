import type { NextFunction, Request, Response } from "express";
import type { IAuthController } from "./Iauth.controller.js";
import type { IAuthService } from "../../services/auth/Iauth.service.js";
import { StatusCode } from "../../constants/status.code.js";
import { ErrorResponse, SuccessResponse } from "../../utilities/response.js";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import { ROLE } from "../../constants/role.js";

export class AuthController implements IAuthController {
    private authService: IAuthService;
    constructor(AuthServie: IAuthService) {
        this.authService = AuthServie;
    }

    GetCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (req.user.role == ROLE.SUPER_ADMIN) {
                req.user.email = process.env.SUPER_ADMIN_EMAIL
            }
            const response = new SuccessResponse(StatusCode.OK, "Authenticated", req.user);
            res.status(200).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.log("Errr:", errMsg)
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, StatusCode.FORBIDDEN))
        }
    }

    SuperAdminLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
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
                maxAge: 15 * 60 * 1000,
                path: "/",
            })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            })

            res.status(StatusCode.OK).json(response)

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Faild to Login Super Admin"))
        }
    }

    AdminSignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, email, password, orgId } = req.body;
            if (!name || !email || !password || !orgId) {
                throw new Error("User data missing");
            }
            const { access_token, refresh_token, user } = await this.authService.adminSignup(req.body);
            const response = new SuccessResponse(StatusCode.OK, "User SignUp SuccessFully", user);

            res.cookie('access_token', access_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 60 * 1000,
                path: "/",
            })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            })

            res.status(StatusCode.OK).json(response)

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.BAD_REQUEST, errMsg, "Faild to Signup user"));
        }
    }

    AdminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error("Data Not Found");
            }
            const { access_token, refresh_token, user } = await this.authService.adminLogin(req.body);
            const response = new SuccessResponse(StatusCode.OK, "User Login SuccessFully", user);

            res.cookie('access_token', access_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 60 * 1000,
                path: "/",
            })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            })

            res.status(StatusCode.OK).json(response)

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.BAD_REQUEST, errMsg, "Faild to Login user"));
        }
    }

    UserSignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("USER SignUP :", req.body)
            const { name, email, password, orgId } = req.body;
            if (!name || !email || !password || !orgId) {
                throw new Error("User data missing");
            }
            const { user } = await this.authService.userSignup(req.body);
            const response = new SuccessResponse(StatusCode.OK, "User SignUp SuccessFully", user);

            res.status(StatusCode.OK).json(response)

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.log("Err :", errMsg)
            next(new ErrorResponse(StatusCode.BAD_REQUEST, errMsg, errMsg));
        }
    }

    UserLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error("Data Not Found");
            }
            const { access_token, refresh_token, user } = await this.authService.userLogin(req.body);
            const response = new SuccessResponse(StatusCode.OK, "User Login SuccessFully", user);

            res.cookie('access_token', access_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 60 * 1000,
                path: "/",
            })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            })

            res.status(StatusCode.OK).json(response)
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.BAD_REQUEST, errMsg, "Faild to Login user"));
        }
    }

    Logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.clearCookie("access_token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });

            res.clearCookie("refresh_token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });

            const response = new SuccessResponse(StatusCode.OK, "Logout Successfull", {});
            res.status(200).json(response);

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            next(new ErrorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, "Failed to logout"));
        }
    };

}