import { Comment, Post } from '../models/index.js';

class CommentService {
  async createComment(data) {
    try {
      const { postId, content, userId } = data;

      const post = await Post.findByPk(postId);
      if (!post) {
        return { success: false, statusCode: 404, error: 'Post não encontrado' };
      }
      
      const comment = await Comment.create({ postId, content, userId });
      return { success: true, data: comment };
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
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
      console.error('Erro ao listar comentários:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteComment(commentId, userId) {
    try {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return { success: false, statusCode: 404, error: 'Comentário não encontrado' };
      }

      if (comment.userId !== userId) {
        return { success: false, statusCode: 403, error: 'Você não tem permissão para excluir este comentário' };
      }

      await comment.destroy();
      return { success: true, message: 'Comentário excluído com sucesso' };
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new CommentService();