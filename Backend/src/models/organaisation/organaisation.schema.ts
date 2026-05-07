import mongoose from "mongoose";
import type { IOrganaisation } from "./Iorganaisation.js";

const organaisationSchema = new mongoose.Schema<IOrganaisation>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
}, { timestamps: true });

export const Organization = mongoose.model<IOrganaisation>('Organaisation', organaisationSchema);
