import mongoose, { isValidObjectId } from "mongoose";
import type { IUser } from "./Iuser.js";
import { ROLE } from "../../constants/role.js";

const userSchema = new mongoose.Schema<IUser>({
    name:{
        typ:String,
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [ROLE.USER,ROLE.ADMIN],
        default: ROLE.USER
    },
    orgId: {
        type: mongoose.Schema.ObjectId,
        ref: "Organization"
    }
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);