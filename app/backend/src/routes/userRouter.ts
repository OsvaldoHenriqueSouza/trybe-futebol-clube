import { Router } from 'express';
import UserService from '../services/UserServices';
import UserController from '../controllers/UserController';
import auth from '../middleware/auth';
import validateFieldLogin from '../middleware/validateField';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post('/', validateFieldLogin, (req, res) => userController.loginUser(req, res));

router.get('/validate', auth, (req, res) => userController.verify(req, res));

export default router;
