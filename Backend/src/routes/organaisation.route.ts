import express from "express";
import { OrganaisationService } from "../services/organaisation/organaisation.service.js";
import { OrganaisationController } from "../controllers/organaisation/organaisation.controller.js";
import { OrganaisationRepository } from "../repositories/organaisation/organaisation.repo.js";
import { auth } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();
const orgRepo = new OrganaisationRepository();
const orgService = new OrganaisationService(orgRepo);
const orgController = new OrganaisationController(orgService);

router.post('/', auth, authorize('super_admin'), orgController.create);
router.get('/', auth, authorize('super_admin'), orgController.findAll);
router.get('/orgId/:orgId', auth, authorize('user','admin'), orgController.findById);

export default router;