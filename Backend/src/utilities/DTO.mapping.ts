import type { IUser } from "../models/user/Iuser.js";

export interface IUserResponse {
    id: string;
    name: string;
    email: string;
    role: string;
    orgId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const mapUserResponse = (
    user: IUser
): IUserResponse => {
    return {
        id: user._id.toString() as string,
        name: user.name,
        email: user.email,
        role: user.role,
        orgId: user.orgId as string,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};