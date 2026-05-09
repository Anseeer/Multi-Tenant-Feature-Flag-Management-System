import type { IUser } from "../../models/user/Iuser.js";

export interface IUserService {
    findAll(): Promise<IUser[]>;
    findOrganaisationUser(orgId: string): Promise<IUser[]>;
}