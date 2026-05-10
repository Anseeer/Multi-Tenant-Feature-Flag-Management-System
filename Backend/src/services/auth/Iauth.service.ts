import type { IUser } from "../../models/user/Iuser.js";
import type { IUserResponse } from "../../utilities/DTO.mapping.js";

export interface IAuthService {
    SuperAdminLogin: (credentials: { email: string, password: string }) => Promise<{ access_token: string, refresh_token: string, admin: { email: string } }>;
    adminSignup: (credentials: Partial<IUser>) => Promise<{ access_token: string, refresh_token: string, user: Partial<IUserResponse> }>;
    adminLogin: (credentials: Partial<IUser>) => Promise<{ access_token: string, refresh_token: string, user: Partial<IUserResponse> }>;
    userSignup: (credentials: Partial<IUser>) => Promise<{ user: Partial<IUserResponse> }>;
    userLogin: (credentials: Partial<IUser>) => Promise<{ access_token: string, refresh_token: string, user: Partial<IUserResponse> }>;
}