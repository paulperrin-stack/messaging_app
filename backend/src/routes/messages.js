import { Router } from 'express';
import passport from '../middleware/auth.js';
import { getConversation, sendMessage } from '../controllers/messageController.js';

const router = Router();
const protect = passport.authenticate('jwt', { session: false });

router.get('/:userId', protect, getConversation);
router.post('/:userId', protect, sendMessage);

export default router;