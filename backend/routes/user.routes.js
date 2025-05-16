import {Router} from 'express';
import * as userController from '../controllers/user.controller.js';
import { body } from 'express-validator';
import * as authMiddlewre from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
     userController.createUser);

router.post('/login',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
     userController.loginUser);

router.get('/profile',authMiddlewre.authUser, userController.getUserProfile);
router.get('/logout',authMiddlewre.authUser, userController.logoutUser);
router.get('/all',authMiddlewre.authUser, userController.getAllUsers);

export default router;