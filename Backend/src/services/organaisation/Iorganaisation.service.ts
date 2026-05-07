import type { IOrganaisation } from "../../models/organaisation/Iorganaisation.js";

export interface IOrganaisationService {
    create(data: Partial<IOrganaisation>): Promise<IOrganaisation | null>;
    findAll():Promise<IOrganaisation[]>;
}