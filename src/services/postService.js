import { Post } from '../models/index.js';

class PostService {
  async createPost(data) {
    try {
      const { title, content, userId } = data;
      const post = await Post.create({ title, content, userId });
      return { success: true, data: post };
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllPosts() {
    try {
      const posts = await Post.findAll({ 
        order: [['createdAt', 'DESC']] 
      });
      return { success: true, data: posts };
    } catch (error) {
      console.error('Erro ao listar posts:', error);
      return { success: false, error: error.message };
    }
  }

  async getPostById(postId) {
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return { success: false, error: 'Post não encontrado' };
      }
      return { success: true, data: post };
    } catch (error) {
      console.error('Erro ao buscar post', error);
      return { success: false, error: error.message };
    }
  }

  async updatePost(postId, data, userId) {
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return { success: false, statusCode: 404, error: 'Post não encontrado' };
      }

      if (post.userId !== userId) {
        return { success: false, statusCode: 403, error: 'Você não tem permissão para editar este post' };
      }
      
      const { title, content } = data;
      await post.update({ title, content });
      return { success: true, data: post };
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      return { success: false, error: error.message };
    }
  }

  async deletePost(postId, userId) {
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return { success: false, statusCode: 404, error: 'Post não encontrado' };
      }

      if (post.userId !== userId) {
        return { success: false, statusCode: 403, error: 'Você não tem permissão para excluir este post' };
      }

      await post.destroy();
      return { success: true, message: 'Post excluído com sucesso' };
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new PostService();