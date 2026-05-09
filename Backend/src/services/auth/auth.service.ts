import { ROLE } from "../../constants/role.js";
import { StatusCode } from "../../constants/status.code.js";
import type { IUser } from "../../models/user/Iuser.js";
import type { IUserRepository } from "../../repositories/user/Iuser.repo.js";
import { ComparePassword, HashPassword } from "../../utilities/bcrypt.js";
import { SuccessResponse } from "../../utilities/response.js";
import { generate_Access_Token, generate_Refresh_Token } from "../../utilities/token.generate.js";
import type { IAuthService } from "./Iauth.service.js";

export class AuthServices implements IAuthService {
    private userRepository: IUserRepository;
    constructor(userRepo: IUserRepository) {
        this.userRepository = userRepo;
    }

    async SuperAdminLogin(credentials: { email: string, password: string }): Promise<{ access_token: string, refresh_token: string, admin: { email: string } }> {
        try {
            const { email, password } = credentials;
            console.log("Credentials :", credentials)
            if (!email || !password) {
                throw new Error("Credentials Not Found");
            }
            if (email !== process.env.SUPER_ADMIN_EMAIL || password !== process.env.SUPER_ADMIN_PASSWORD) {
                throw new Error("Invalid Credentials");
            }
            const access_token = generate_Access_Token("super_admin", "super_admin");
            const refresh_token = generate_Refresh_Token("super_admin", "super_admin");
            if (!refresh_token || !access_token) {
                throw new Error("Token Not Found")
            }
            return { access_token, refresh_token, admin: { email } };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async adminSignup(credentials: Partial<IUser>): Promise<{ access_token: string, refresh_token: string, user: Partial<IUser> }> {
        try {
            const { name, email, password, orgId } = credentials;

            if (!email || !name || !orgId || !password) {
                throw new Error("Credentials Not Found");
            }

            const isExisting = await this.userRepository.findByEmail(credentials.email as string);
            if (isExisting) {
                throw new Error("Already Exist With This Email!");
            }

            const hashpass = HashPassword(password);
            const payload: Partial<IUser> = {
                name,
                email,
                role: ROLE.ADMIN,
                password: (await hashpass).toString(),
                orgId
            }

            const data = await this.userRepository.create(payload);

            const access_token = generate_Access_Token(data?._id.toString(), ROLE.ADMIN);
            const refresh_token = generate_Refresh_Token(data?._id.toString(), ROLE.ADMIN);
            if (!refresh_token || !access_token) {
                throw new Error("Token Not Found")
            }
            return { access_token, refresh_token, user: data };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async adminLogin(credentials: Partial<IUser>): Promise<{ access_token: string, refresh_token: string, user: Partial<IUser> }> {
        try {
            const { email, password } = credentials;

            if (!email || !password) {
                throw new Error("Credentials Not Found");
            }

            const isExisting: IUser | null = await this.userRepository.findByEmail(email as string);
            if (!isExisting) {
                throw new Error("Not Found user in this email");
            }

            if (!ComparePassword(password, isExisting?.password)) {
                throw new Error("Invalid Password");
            }

            const access_token = generate_Access_Token(isExisting?._id.toString(), ROLE.ADMIN);
            const refresh_token = generate_Refresh_Token(isExisting?._id.toString(), ROLE.ADMIN);
            if (!refresh_token || !access_token) {
                throw new Error("Token Not Found")
            }
            return { access_token, refresh_token, user: isExisting };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async userSignup(data: Partial<IUser>): Promise<{ user: Partial<IUser>; }> {
        try {
            const { name, email, password, orgId } = data;

            if (!email || !name || !orgId || !password) {
                throw new Error("Credentials Not Found");
            }

            const isExisting = await this.userRepository.findByEmail(email as string);
            if (isExisting) {
                throw new Error("Already Exist With This Email!");
            }

            const hashpass = HashPassword(password);
            const payload: Partial<IUser> = {
                name,
                email,
                role: ROLE.USER,
                password: (await hashpass).toString(),
                orgId
            }

            const user = await this.userRepository.create(payload);
            return { user };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async userLogin(credentials: Partial<IUser>): Promise<{ access_token: string; refresh_token: string; user: Partial<IUser>; }> {
        try {
            const { email, password } = credentials;

            if (!email || !password) {
                throw new Error("Credentials Not Found");
            }

            const isExisting: IUser | null = await this.userRepository.findByEmail(email as string);
            if (!isExisting) {
                throw new Error("Not Found user in this email");
            }

            if (!ComparePassword(password, isExisting?.password)) {
                throw new Error("Invalid Password");
            }

            const access_token = generate_Access_Token(isExisting._id.toString(), ROLE.USER);
            const refresh_token = generate_Refresh_Token(isExisting._id.toString(), ROLE.USER);
            if (!refresh_token || !access_token) {
                throw new Error("Token Not Found")
            }
            return { access_token, refresh_token, user: isExisting };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }


}