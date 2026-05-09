import express from 'express';
import { UserRepository } from '../repositories/user/user.repo.js';
import { UserService } from '../services/user/user.service.js';
import { UserController } from '../controllers/user/user.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.get('/', auth, userController.findAll);
router.get('/organaisation-user/:id', auth, userController.findOrganaisationUser);

export default router;