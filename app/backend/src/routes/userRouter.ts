import { Router } from 'express';
import UserController from '../controllers/UserController';
import auth from '../middleware/auth';
import validateFieldLogin from '../middleware/validateField';

const userController = new UserController();

const router = Router();

router.get('/validate', auth, userController.loginVerify);

router.post('/', validateFieldLogin, userController.loginUser);

export default router;
