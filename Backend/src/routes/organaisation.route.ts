import express from "express";
import { OrganaisationService } from "../services/organaisation/organaisation.service.js";
import { OrganaisationController } from "../controllers/organaisation/organaisation.controller.js";
import { OrganaisationRepository } from "../repositories/organaisation/organaisation.repo.js";

const router = express.Router();
const orgRepo = new OrganaisationRepository();
const orgService = new OrganaisationService(orgRepo);
const orgController = new OrganaisationController(orgService);

router.post('/',orgController.create);
router.get('/',orgController.findAll);

export default router;