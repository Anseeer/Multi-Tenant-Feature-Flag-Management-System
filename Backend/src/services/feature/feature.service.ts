import type { IFeature } from "../../models/feature/Ifeature.js";
import type { IFeatureRepository } from "../../repositories/feature/Ifeature.repo.js";
import type { IFeatureService } from "./Ifeature.service.js";


export class FeatureService implements IFeatureService {
    private featureRepository: IFeatureRepository;
    constructor(featureRepo: IFeatureRepository) {
        this.featureRepository = featureRepo;
    }

    async addFeature(data: Partial<IFeature>): Promise<IFeature | null> {
        try {
            if (!data) {
                throw new Error("Data Not Found");
            }
            const isExisting = await this.featureRepository.findByName(data.name as string);
            if (isExisting) {
                throw new Error("User Already Exist With This Email!");
            }
            return await this.featureRepository.create(data);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async removeFeature(id: string): Promise<boolean> {
        try {
            if (!id) {
                throw new Error("feature Id not found");
            }
            return await this.featureRepository.delete(id);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async updateFeature(data: Partial<IFeature>): Promise<IFeature> {
        try {
            if (!data || !data.id) {
                throw new Error("data not found");
            }
            return await this.featureRepository.update(data);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async toggleFeature(id: string): Promise<IFeature> {
        try {
            if (!id) {
                throw new Error("data not found");
            }
            return await this.featureRepository.toggle(id);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async findAll(): Promise<IFeature[]> {
        try {
            return await this.featureRepository.findAll()
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async findByOrgId(orgId: string): Promise<IFeature[]> {
        try {
            if (!orgId) {
                throw new Error("orgId not found");
            }
            console.log("orgId :", orgId);
            return await this.featureRepository.findByOrgId(orgId);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

}