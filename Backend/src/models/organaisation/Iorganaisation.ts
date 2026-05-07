import type { Document } from "mongoose";

export interface IOrganaisation extends Document {
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updateAt: Date
}