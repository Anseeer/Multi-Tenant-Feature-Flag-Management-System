import type { IUser } from "../../models/user/Iuser.js";
import { User } from "../../models/user/user.schema.js";
import { BaseRepository } from "../base/base.repo.js";
import type { IUserRepository } from "./Iuser.repo.js";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User);
    }

    async findAll(): Promise<IUser[]> {
        try {
            return await this.model.find().sort({ createdAt: -1 });
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async findOrganaisationUser(orgId: string): Promise<IUser[]> {
        try {
            if (!orgId) throw new Error("OrgId Not Found");
            return await this.model.find({ orgId }).sort({ createdAt: -1 });
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }
}