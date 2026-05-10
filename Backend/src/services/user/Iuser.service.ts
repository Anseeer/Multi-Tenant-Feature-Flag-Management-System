import type { IUser } from "../../models/user/Iuser.js";

export interface IUserService {
    findAll(): Promise<IUser[]>;
    findUser(userId: string): Promise<IUser | null>;
    findOrganaisationUser(orgId: string): Promise<IUser[]>;
}