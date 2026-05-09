import type { Document } from "mongoose";
import type { ROLE } from "../../constants/role.js";

export interface IUser extends Document {
    id: string,
    name: string,
    email: string,
    password: string,
    role: ROLE.USER | ROLE.ADMIN,
    orgId?: string,
    createdAt: Date,
    updatedAt: Date
}