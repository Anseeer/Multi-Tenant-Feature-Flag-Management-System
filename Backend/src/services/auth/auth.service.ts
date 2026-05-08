import { generate_Access_Token, generate_Refresh_Token } from "../../utilities/token.generate.js";
import type { IAuthService } from "./Iauth.service.js";

export class AuthServices implements IAuthService {
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
}