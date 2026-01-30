import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', addComment);
router.delete('/:id', deleteComment);

export default router;