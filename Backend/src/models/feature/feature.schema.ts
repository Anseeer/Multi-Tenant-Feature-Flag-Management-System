import mongoose from "mongoose";
import type { IFeature } from "./Ifeature.js";

const featureSchema = new mongoose.Schema<IFeature>({
    name: {
        type: String,
        required: true
    },
    isEnable: {
        type: Boolean,
        default: true
    },
    orgId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organaisation',
        required: true
    }
}, { timestamps: true });

export const Feature = mongoose.model<IFeature>('Feature', featureSchema);