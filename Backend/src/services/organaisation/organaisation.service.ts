import type { IOrganaisation } from "../../models/organaisation/Iorganaisation.js";
import type { IOrganaisationRepository } from "../../repositories/organaisation/Iorganaisation.repo.js";
import type { IOrganaisationService } from "./Iorganaisation.service.js";

export class OrganaisationService implements IOrganaisationService {
    private organaisationRepo: IOrganaisationRepository;
    constructor(orgRepo: IOrganaisationRepository) {
        this.organaisationRepo = orgRepo;
    }

    async create(data: Partial<IOrganaisation>): Promise<IOrganaisation | null> {
        try {
            if (!data.name || !data.description) {
                throw new Error("Data not found to create Organaisation")
            }
            const isRepeat = await this.organaisationRepo.findByName(data.name as string);
            if (isRepeat) {
                throw new Error("Its Already Exist!");
            }
            return await this.organaisationRepo.create(data);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async findAll(): Promise<IOrganaisation[]> {
        try {
            return await this.organaisationRepo.findAll();
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }

    async findByOrgId(orgId: string): Promise<IOrganaisation | null> {
        try {
            if (!orgId) {
                throw new Error("userId not found");
            }
            return await this.organaisationRepo.findById(orgId) ?? null;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(errMsg);
        }
    }
}