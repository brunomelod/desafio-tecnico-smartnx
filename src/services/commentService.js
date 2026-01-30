import { Comment, Post } from '../models/index.js';

class CommentService {
  async createComment(data) {
    try {
      const { postId, content, userId } = data;

      const post = await Post.findByPk(postId);
      if (!post) {
        return { success: false, error: 'Post não encontrado' };
      }
      
      const comment = await Comment.create({ postId, content, userId });
      return { success: true, data: comment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCommentsByPostId(postId) {
    try {
      const comments = await Comment.findAll({ 
        where: { postId },
        order: [['createdAt', 'DESC']] 
      });
      return { success: true, data: comments };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteComment(commentId) {
    try {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return { success: false, error: 'Comentário não encontrado' };
      }
      
      await comment.destroy();
      return { success: true, message: 'Comentário excluído com sucesso' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new CommentService();