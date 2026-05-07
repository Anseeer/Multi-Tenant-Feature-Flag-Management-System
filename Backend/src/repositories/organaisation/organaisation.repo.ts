import type { IOrganaisation } from "../../models/organaisation/Iorganaisation.js";
import { Organization } from "../../models/organaisation/organaisation.schema.js";
import { BaseRepository } from "../base/base.repo.js";
import type { IOrganaisationRepository } from "./Iorganaisation.repo.js";


export class OrganaisationRepository extends BaseRepository<IOrganaisation> implements IOrganaisationRepository {
    constructor() {
        super(Organization)
    }

    async findAll(): Promise<IOrganaisation[]> {
        try {
            return await this.model.find().sort({ createdAt: -1 });
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

}