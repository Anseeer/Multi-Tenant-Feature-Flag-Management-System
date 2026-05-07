
export interface IAuthService {
    SuperAdminLogin: (credentials: { email: string, password: string }) => Promise<{ access_token: string, refresh_token: string, admin:{email:string} }>;
}