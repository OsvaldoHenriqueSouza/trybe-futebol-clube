import { Router } from 'express';
import UserService from '../services/UserServices';
import UserController from '../controllers/UserController';
import auth from '../middleware/auth';
import validateFieldLogin from '../middleware/validateField';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post('/login', validateFieldLogin, (req, res) => userController.loginUser(req, res));

router.get('/login/validate', auth, (req, res) => userController.loginVerify(req, res));

export default router;
