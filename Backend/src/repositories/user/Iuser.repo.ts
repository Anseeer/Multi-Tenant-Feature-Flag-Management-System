import type { IUser } from "../../models/user/Iuser.js";
import type { IRead, IWrite } from "../base/Ibase.repo.js";

export interface IUserRepository extends IWrite<IUser>, IRead<IUser> {
    findAll(): Promise<IUser[]>;
    findOrganaisationUser(orgId: string): Promise<IUser[]>;
}