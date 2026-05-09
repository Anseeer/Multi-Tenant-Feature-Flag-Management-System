import type { Document } from "mongoose";

export interface IFeature extends Document {
    id: string,
    name: string,
    isEnable: boolean,
    createdAt: Date,
    updatedAt: Date,
}