import express from "express"
import { AuthController } from "../controllers/auth/auth.controller.js";
import { AuthServices } from "../services/auth/auth.service.js";

const router = express.Router();
const authService = new AuthServices();
const authController = new AuthController(authService);

router.post('/super-admin-login',authController.SuperAdminLogin);

export default router;