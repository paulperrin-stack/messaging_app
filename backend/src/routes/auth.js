import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import passport from '../middleware/auth.js';

const router = Router();
const protect = passport.authenticate('jwt', { session: false });

router.post('/register', register);
router.post('/login', login);
router.get('/', protect, getUsers);

export default router;