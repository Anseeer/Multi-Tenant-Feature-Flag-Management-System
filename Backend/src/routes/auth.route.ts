import express from "express"
import { AuthController } from "../controllers/auth/auth.controller.js";
import { AuthServices } from "../services/auth/auth.service.js";
import { UserRepository } from "../repositories/user/user.repo.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();
const userRepo = new UserRepository();
const authService = new AuthServices(userRepo);
const authController = new AuthController(authService);

router.get('/me', auth, authController.GetCurrentUser);
router.post('/super-admin-login', authController.SuperAdminLogin);
router.post('/admin-signup', authController.AdminSignUp);
router.post('/admin-login', authController.AdminLogin);
router.post('/user-signup', authController.UserSignUp);
router.post('/user-login', authController.UserLogin);
router.get('/logout', auth, authController.Logout);


export default router;