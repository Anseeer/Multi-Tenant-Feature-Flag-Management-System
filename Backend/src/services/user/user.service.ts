import type { IUser } from "../../models/user/Iuser.js";
import type { IUserRepository } from "../../repositories/user/Iuser.repo.js";
import type { IUserService } from "./Iuser.service.js";

export class UserService implements IUserService {
    private userRepository: IUserRepository;
    constructor(userRepo: IUserRepository) {
        this.userRepository = userRepo;
    }

    async findAll(): Promise<IUser[]> {
        try {
            return await this.userRepository.findAll();
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async findUser(userId: string): Promise<IUser | null> {
        try {
            if (!userId) throw new Error("UserId Not Found");
            return await this.userRepository.findById(userId);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }
    async findOrganaisationUser(orgId: string): Promise<IUser[]> {
        try {
            if (!orgId) throw new Error("OrgId Not Found");
            return await this.userRepository.findOrganaisationUser(orgId);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

}