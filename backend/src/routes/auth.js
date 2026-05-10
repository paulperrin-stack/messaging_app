import { Router } from 'express';
import passport from '../middleware/auth.js';
import { register, login } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;