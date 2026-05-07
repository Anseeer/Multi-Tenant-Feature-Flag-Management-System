import mongoose, { isValidObjectId } from "mongoose";
import type { IUser } from "./Iuser.js";

const userSchema = new mongoose.Schema<IUser>({
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
        enum: ['user', 'admin'],
        default: 'user'
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    orgId: {
        type: mongoose.Schema.ObjectId,
        ref: "Organization"
    }
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);