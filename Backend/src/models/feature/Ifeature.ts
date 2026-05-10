import type { Document, ObjectId } from "mongoose";

export interface IFeature extends Document {
    id: string,
    name: string,
    isEnable: boolean,
    orgId: ObjectId,
    createdAt: Date,
    updatedAt: Date,
}