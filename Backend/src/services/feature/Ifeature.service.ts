import type { IFeature } from "../../models/feature/Ifeature.js";

export interface IFeatureService {
    addFeature(data: Partial<IFeature>): Promise<IFeature | null>;
    removeFeature(id: string): Promise<boolean>;
    updateFeature(data: Partial<IFeature>): Promise<IFeature>;
    toggleFeature(id: string): Promise<IFeature>;
    findAll(): Promise<IFeature[]>;
}