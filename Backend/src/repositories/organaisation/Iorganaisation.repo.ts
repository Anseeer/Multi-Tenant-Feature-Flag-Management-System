import type { IOrganaisation } from "../../models/organaisation/Iorganaisation.js";
import type { IRead, IWrite } from "../base/Ibase.repo.js";

export interface IOrganaisationRepository extends IWrite<IOrganaisation>, IRead<IOrganaisation> {
    findAll(): Promise<IOrganaisation[]>;
}