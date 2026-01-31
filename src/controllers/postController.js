import postService from '../services/postService.js';

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }
    
    const result = await postService.createPost({ title, content, userId });
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.status(201).json(result.data);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const listPosts = async (req, res) => {
  try {
    const result = await postService.getAllPosts();
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.json(result.data);
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title && !content) {
      return res.status(400).json({ error: 'Título ou conteúdo são obrigatórios' });
    }
    
    const result = await postService.updatePost(id, { title, content }, userId);
    
    if (!result.success) {
      const statusCode = result.statusCode || 400;
      return res.status(statusCode).json({ error: result.error });
    }
    
    res.json(result.data);
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const result = await postService.deletePost(id, userId);
    
    if (!result.success) {
      const statusCode = result.statusCode || 400;
      return res.status(statusCode).json({ error: result.error });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};