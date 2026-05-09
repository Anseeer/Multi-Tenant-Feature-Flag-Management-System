import type { IUser } from "../../models/user/Iuser.js";

export interface IAuthService {
    SuperAdminLogin: (credentials: { email: string, password: string }) => Promise<{ access_token: string, refresh_token: string, admin: { email: string } }>;
    adminSignup: (credentials: Partial<IUser>) => Promise<{ access_token: string, refresh_token: string, user: Partial<IUser> }>;
    adminLogin: (credentials: Partial<IUser>) => Promise<{ access_token: string, refresh_token: string, user: Partial<IUser> }>;
    userSignup: (credentials: Partial<IUser>) => Promise<{ user: Partial<IUser> }>;
    userLogin: (credentials: Partial<IUser>) => Promise<{ access_token: string, refresh_token: string, user: Partial<IUser> }>;
}