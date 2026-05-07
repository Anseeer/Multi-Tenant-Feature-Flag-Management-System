
export interface IUser {
    id: string,
    email: string,
    password: string,
    isSuperAdmin: boolean,
    role: "user" | "admin",
    orgId?: string,
    createdAt: Date,
    updatedAt: Date
}