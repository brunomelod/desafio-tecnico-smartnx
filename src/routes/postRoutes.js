import express from 'express';
import { createPost, listPosts, updatePost, deletePost} from '../controllers/postController.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createPost);
router.get('/', listPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


export default router;