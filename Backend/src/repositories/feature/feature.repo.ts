import mongoose from "mongoose";
import { Feature } from "../../models/feature/feature.schema.js";
import type { IFeature } from "../../models/feature/Ifeature.js";
import { BaseRepository } from "../base/base.repo.js";
import type { IFeatureRepository } from "./Ifeature.repo.js";

export class FeatureRepository extends BaseRepository<IFeature> implements IFeatureRepository {
    constructor() {
        super(Feature);
    }

    async update(data: Partial<IFeature>): Promise<IFeature> {
        try {
            if (!data.id) {
                throw new Error("Feature ID not found");
            }

            const oldValue = await this.model.findById(data.id);

            if (!oldValue) {
                throw new Error("Feature not found");
            }

            const updatedValue: Partial<IFeature> = {
                name: data.name ?? oldValue.name,
                isEnable: data.isEnable ?? oldValue.isEnable,
                updatedAt: new Date()
            };

            await this.model.updateOne(
                { _id: data.id },
                { $set: updatedValue }
            );

            const updatedFeature = await this.model.findById(data.id);

            if (!updatedFeature) {
                throw new Error("Updated feature not found");
            }

            return updatedFeature;

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async toggle(id: string): Promise<IFeature> {
        try {
            if (!id) {
                throw new Error("Id not found");
            }

            const feature = await this.model.findById(id);

            if (!feature) {
                throw new Error("Feature not found");
            }

            feature.isEnable = !feature.isEnable;
            feature.updatedAt = new Date();

            await feature.save();

            return feature;

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async findAll(): Promise<IFeature[]> {
        try {
            const feature = await this.model.find();
            if (!feature) {
                throw new Error("Feature not found");
            }
            return feature;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async findByOrgId(orgId: string): Promise<IFeature[]> {
        try {
            return await this.model.find({ orgId: new mongoose.Types.ObjectId(orgId), });
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

}