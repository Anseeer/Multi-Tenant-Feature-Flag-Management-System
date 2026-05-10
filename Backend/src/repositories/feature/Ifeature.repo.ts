import type { IFeature } from "../../models/feature/Ifeature.js";
import type { IRead, IWrite } from "../base/Ibase.repo.js";

export interface IFeatureRepository extends IWrite<IFeature>, IRead<IFeature> {
    update(data: Partial<IFeature>): Promise<IFeature>;
    toggle(id: string): Promise<IFeature>;
    findAll(): Promise<IFeature[]>;
    findByOrgId(orgId: string): Promise<IFeature[]>;
}