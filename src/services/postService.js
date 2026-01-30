import { Post } from '../models/index.js';

class PostService {
  async createPost(data) {
    try {
      const { title, content, userId } = data;
      const post = await Post.create({ title, content, userId });
      return { success: true, data: post };
    } catch (error) {
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
      return { success: false, error: error.message };
    }
  }

  async updatePost(postId, data) {
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return { success: false, error: 'Post não encontrado' };
      }
      
      const { title, content } = data;
      await post.update({ title, content });
      return { success: true, data: post };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deletePost(postId) {
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return { success: false, error: 'Post não encontrado' };
      }
      
      await post.destroy();
      return { success: true, message: 'Post excluído com sucesso' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new PostService();