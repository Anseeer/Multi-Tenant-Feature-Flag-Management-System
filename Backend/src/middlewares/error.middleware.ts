import type { NextFunction, Request, Response } from "express";
import { StatusCode } from "../constants/status.code.js";
import type { ErrorResponse } from "../utilities/response.js";

export const ErrorMiddleware = (err: ErrorResponse<unknown>, req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:err.message||"Internal Server Error",
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        data: err?.data || null,
    });
}