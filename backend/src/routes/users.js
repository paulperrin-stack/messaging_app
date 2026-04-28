import { Router } from 'express';
import passport from '../middleware/auth.js';
import { getAllUsers, getUserById, updateUser } from '../controllers/usersController';

const router = Router();
const protect = passport.authenticate('jwt', { session: false });

router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

export default router;