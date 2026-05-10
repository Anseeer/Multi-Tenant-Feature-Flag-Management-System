import express from "express";
import { FeatureController } from "../controllers/feature/feature.controller.js";
import { FeatureRepository } from "../repositories/feature/feature.repo.js";
import { FeatureService } from "../services/feature/feature.service.js";
import { auth } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();
const featRepo = new FeatureRepository();
const featService = new FeatureService(featRepo);
const featController = new FeatureController(featService);

router.post('/', auth, authorize('admin'), featController.addFeature);
router.delete('/:id', auth, authorize('admin'), featController.removeFeature);
router.put('/', auth, authorize('admin'), featController.updateFeature);
router.patch('/:id', auth, authorize('admin'), featController.toggleFeature);
router.get('/', auth, authorize('admin'), featController.findAll);
router.get('/orgId/:orgId', auth, authorize('admin', 'user'), featController.findByOrgId);

export default router;