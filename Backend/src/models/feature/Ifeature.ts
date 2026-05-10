import type { Document, Types } from "mongoose";

export interface IFeature extends Document {
    id: string,
    name: string,
    isEnable: boolean,
    orgId: Types.ObjectId;
    createdAt: Date,
    updatedAt: Date,
}